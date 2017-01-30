import Vue from 'vue'
import Axios from 'axios'
import moment from 'moment'
import _ from 'underscore'
import JWTDecode from 'jwt-decode'
import store from './store'
import config from './config'
import LocalStorage from './local-storage'
let $localStorage = new LocalStorage

// Axios
Axios.defaults.baseURL = window.location.href.indexOf('switchapi') !== -1 ? config.api.second : config.api.first
Axios.defaults.headers.common['Content-Type'] = 'application/json'
Axios.defaults.headers.common['Accept'] = 'application/json'

Axios.interceptors.request.use((config) => {
	if(Auth.check()){
		config.headers['Authorization'] = 'Bearer ' + store.user.token
	}

	return config
});

// normalize
const getNormalizedItems = (type, data) => {
	let items = []

	switch (type)
	{
		case 'deliveries':
			_.each(data, (delivery, key) => {
				items.push({
					title: `${delivery.recipient.firstName} ${delivery.recipient.lastName}`,
					description: delivery.address.formattedAddress,
					address: {
						formattedAddress: delivery.address.formattedAddress
					},
					recipientPhone: delivery.recipient.phone,
					storeName: delivery.retailer.name,
					barcode: delivery.barcode || '',
					state: delivery.state,
					shippingDate: delivery.shippingDate
				})
			})

			break;

		case 'merge':
			_.each(data.conversations, (conversation, key) => {
				items.push({
					title: `${conversation.recipientFirstName} ${conversation.recipientLastName}`,
					description: conversation.lastMessageDirection == 'OUTGOING' ? `<strong>Jenny: </strong>${conversation.lastMessageText.substring(0,47)}` : conversation.lastMessageText.substring(0,47),
					recipientPhone: conversation.recipientPhone,
					storeName: conversation.store,
					address: {
						formattedAddress: conversation.address
					}
				})
				let deliveries_ids = conversation.deliveries
				conversation.deliveries = []
				conversation.barcodes = []
				_.each(deliveries_ids, (delivery_id, dkey) => {
					let delivery = _.findWhere(data.deliveries, {id: delivery_id})
					conversation.barcodes.push(delivery.barcode)
					conversation.deliveries.push({
						id: delivery_id,
						state: delivery.state
					})
				})
			})

			break;
	}

	return items
}

// load
const init = (date) => {
	date = date || moment(store.currentDate).format('YYYY-MM-DD')
	store.selectedItem = null
	store.routePlan = {}
	store.deliveries = []
	store.displayOverlay = true

	Plans.get(date).then((plan) => {
		if(plan.length == 0){
			Deliveries.get(date).then((deliveries) => {
				if(deliveries.length > 0){
					//store.items = getNormalizedItems('deliveries', deliveries)
					store.deliveries = deliveries
					store.phase = 'route'
				} else {
					store.phase = 'upload'
				}
				store.displayOverlay = false
			})
		} else {
			plan = plan[0]
			store.routePlan = plan
			switch(plan.state)
			{
				case 'ROUTED':
					Deliveries.get(date).then((deliveries) => {
						store.deliveries = deliveries
						//store.items = getNormalizedItems('deliveries', deliveries)
						store.phase = 'export'
						store.displayOverlay = false
					})
					// get deliveries & phase = export

					break;

				case 'CREATED':

					// get deliveries & phase = route
					Deliveries.get(date).then((deliveries) => {
						store.deliveries = deliveries
						//store.items = getNormalizedItems('deliveries', deliveries)
						store.phase = 'route'
						store.displayOverlay = false
					})
					break;

				case 'EXPORTED':

					// get deliveris & phase = jenny
					Deliveries.get(date).then((deliveries) => {
						store.deliveries = deliveries
						//store.items = getNormalizedItems('deliveries', deliveries)
						store.phase = 'jenny'
						store.displayOverlay = false
					})
					break;

				case 'CONTACTED':

					Deliveries.get(date).then((deliveries) => {
						Conversations.get(store.routePlan.id).then((conversations) => {
							//store.items = getNormalizedItems('merge', {deliveries, conversations})
							_.each(conversations, (conversation, key) => {
								let deliveries_ids = conversation.deliveries
								conversation.deliveries = []
								conversation.barcodes = []
								_.each(deliveries_ids, (delivery_id, dkey) => {
									let delivery = _.findWhere(deliveries, {id: delivery_id})
									conversation.barcodes.push(delivery.barcode)
									conversation.deliveries.push({
										id: delivery_id,
										state: delivery.state,
										address: delivery.address,
										recipient: delivery.recipient,
										finishTime: delivery.finishTime,
										accurateStartTime: delivery.accurateStartTime,
										startTime: delivery.startTime,
										conversationState: conversation.state,
										positionInRoute: delivery.positionInRoute
									})
								})
							})
							store.conversations = conversations
							Plans.metrics(store.routePlan.id).then((metrics) => {
								store.metrics = metrics
								store.phase = 'monitoring'
								store.displayOverlay = false
							})
						})
					})

					break;
			}
		}
	})
}

class Auth
{
	static login(username, password)
	{
		return Axios.post('auth/login', {username, password}).then((response) => {
			let data = JWTDecode(response.data.value)
			data.token = response.data.value
			store.user = data
			store.authenticated = true
			$localStorage.set('user', data)
		})
	}

	static check()
	{
		return store.authenticated === true
	}

	static forget()
	{
		return new Promise((resolve, reject) => {
			store.authenticated = false
			store.user = false
			$localStorage.set('user', false)
			resolve()
		})
	}
}

class Plans
{
	static get(date)
	{
		return Axios.get(`plans?date=${date}`).then((response) => {
			return response.data
		})
	}

	static schedule(date)
	{
		return Axios.post('plans', {date}).then((response) => {
			return response.data
		})
	}

	static run(id)
	{
		return Axios.put(`plans/${id}`, {
			id: id,
			state: 'CONTACTED'
		}).then((response) => {
			return response.data
		})
	}

	static export(id)
	{
		return Axios.put(`plans/${id}`, {
			id: id,
			state: 'EXPORTED'
		}).then((response) => {
			return response.data
		})
	}

	static bot(id)
	{
		return Axios.post(`plans/${id}/bot`).then((response) => {

		})
	}

	static metrics(id)
	{
		return Axios.get(`plans/${id}/metrics`).then((response) => {
			return response.data
		})
	}
}

class Recipients
{
	static update(id, body)
	{
		return Axios.put(`recipients/${id}`, body).then((response) => {
			return response.data
		})
	}
}

class Deliveries
{
	static get(date)
	{
		return Axios.get(`deliveries?date=${date}`).then((response) => {
			return response.data
		})
	}

	static update(id, body)
	{
		return Axios.put(`deliveries/${id}`, body).then((response) => {
			return response.data
		})
	}

	static delete(id)
	{
		return Axios.delete(`deliveries/${id}`).then((response) => {

		})
	}

	static updateRecipient(id, phone)
	{
		return Axios.put(`recipients/${id}`, {phone}).then((response) => {

		})
	}
}


class Conversations
{
	static get(routePlanId)
	{
		return Axios.get(`conversations?routePlanId=${routePlanId}`).then((response) => {
			return response.data
		})
	}

	static getMessages(convId)
	{
		return Axios.get(`messages?convId=${convId}`).then((response) => {
			return response.data
		})
	}
}

export {
	Auth,
	Plans,
	Deliveries,
	Conversations,
	Recipients,
	init
}