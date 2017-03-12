// Import libraries
import Vue from 'vue'
import VueEvents from 'vue-events'
import VueStash from 'vue-stash'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueMaterial from 'vue-material'
import Pusher from 'pusher-js'
import VueLocalStorage from './local-storage'
import moment from 'moment'
import Axios from 'axios'
import config from './config'
import App from '../App'
import store from './store'
import router from './router'
import componentMixin from './component-mixin'
import 'vue-material/dist/vue-material.css'

// Install plugins
Vue.use(VueEvents)
Vue.use(VueStash)
Vue.use(VeeValidate)
Vue.use(VueMaterial)

// Global mixins
Vue.mixin(componentMixin)

// Pusher
Pusher.logToConsole = false
let pusher = new Pusher(config.pusher.key, {
	encrypted: true,
	cluster: config.pusher.cluster,
	authEndpoint: window.location.href.indexOf('switchapi') != -1 ? config.api.second + 'hooks/pusher/auth' : config.api.first + 'hooks/pusher/auth'
})


// Services
import * as services from './services'
services.pusher = pusher
Vue.prototype.$services = services

// Moment
Vue.prototype.moment = moment

// Vue Material
Vue.material.registerTheme('default', config.themes.default)
Vue.material.setCurrentTheme('default')

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