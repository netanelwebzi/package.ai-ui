// Import libraries
import Vue from 'vue'
import VueEvents from 'vue-events'
import VueStash from 'vue-stash'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueMaterial from 'vue-material'
import moment from 'moment'
import Axios from 'axios'
import App from '../App'
import store from './store'
import router from './router'
import 'vue-material/dist/vue-material.css'

// Install plugins
Vue.use(VueEvents)
Vue.use(VueStash)
Vue.use(VeeValidate)
Vue.use(VueMaterial)

// Axios
Axios.defaults.baseURL = ''
Axios.defaults.headers.common.Accept = 'application/json'
Vue.prototype.$http = Axios

// Moment
Vue.prototype.moment = moment


// Vue Material
Vue.material.registerTheme({
	indigo_pink: {
		primary: 'indigo',
		accent: 'pink', // default is pink
		warn: 'deep-orange',
		background: 'grey'
	},
	indigo_yellow: {
		primary: 'indigo',
		accent: 'yellow', // default is pink
		warn: 'deep-orange',
		background: 'grey'
	}
})

// Global components
import AuthLayoutComponent from '../components/auth-layout'
import AppLayoutComponent from '../components/app-layout'
Vue.component('authLayout', AuthLayoutComponent)
Vue.component('appLayout', AppLayoutComponent)

// ui css frameworks
require('flexboxgrid/dist/flexboxgrid.min.css')
require('font-awesome/less/font-awesome.less')

// app styles
require('../assets/styles/main.scss')

export {Vue, App, store, router}