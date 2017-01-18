import Vue from 'vue'
import Axios from 'axios'
import moment from 'moment'
import JWTDecode from 'jwt-decode'
import store from './store'
import config from './config'
import LocalStorage from './local-storage'
let $localStorage = new LocalStorage

// Axios
Axios.defaults.baseURL = config.api.baseUrl
Axios.defaults.headers.common['Content-Type'] = 'application/json'
Axios.defaults.headers.common['Accept'] = 'application/json'

Axios.interceptors.request.use((config) => {
	if(Auth.check()){
		config.headers['Authorization'] = 'Bearer ' + store.user.token
	}

	return config
});

// load
const init = (date) => {
	date = date || moment(store.currentDate, 'dddd, DD/MM/YYYY').format('YYYY-MM-DD')
	store.selectedItem = null
	store.routePlan = {}
	store.deliveries = []
	store.displayOverlay = true

	Plans.get(date).then((plan) => {
		if(plan.length == 0){
			Deliveries.get(date).then((deliveries) => {
				if(deliveries.length > 0){
					store.deliveries = deliveries
					store.phase = 'route'
				} else {
					store.phase = 'upload'
				}
				store.displayOverlay = false
			})
		} else {
			store.routePlan = plan

			switch(plan.state)
			{
				case 'ROUTED':
					Deliveries.get(date).then((deliveries) => {
						store.deliveries = deliveries
						store.phase = 'export'
						store.displayOverlay = false
					})
					// get deliveries & phase = export

					break;

				case 'CREATED':

					// get deliveries & phase = route
					Deliveries.get(date).then((deliveries) => {
						store.deliveries = deliveries
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


					// phase = monitoring
					store.phase = 'monitoring'

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

	static new()
	{
		return Axios.post('plans/new').then((response) => {

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

	getMessages(convId)
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
	init
}