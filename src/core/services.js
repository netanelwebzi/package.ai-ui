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

// load
const loadMergedData = (date) => {
	Deliveries.get(date).then((deliveries) => {
		Conversations.get(store.routePlan.id).then((conversations) => {
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
						externalId: delivery.externalId,
						address: delivery.address,
						shippingDate: delivery.shippingDate,
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
}
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
			store.availableRoutePlans = plan
			if(store.currentRoutePlanId == null) {
				plan = plan[0]
				console.log('no current', plan)
				store.currentRoutePlanId = plan.id
			} else {
				console.log('current', store.currentRoutePlanId)
				plan = _.findWhere(plan, {id: store.currentRoutePlanId})
			}
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
						store.phase = 'jenny'
						store.displayOverlay = false
					})
					break;

				case 'CONTACTED':

					loadMergedData(date)

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
			let tokenData = JWTDecode(response.data.value)
			tokenData.token = response.data.value
			store.user = tokenData
			store.authenticated = true
			$localStorage.set('user', tokenData)
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
	init,
	loadMergedData
}