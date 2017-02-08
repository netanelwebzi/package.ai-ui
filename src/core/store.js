import LocalStorage from './local-storage'
import JWTDecode from 'jwt-decode'
import Vue from 'vue'
import moment from 'moment'
let $localStorage = new LocalStorage
Vue.use($localStorage)

let phase = ''
let user = false
let authenticated = false
let token = null
let currentDate = null
let currentRoutePlanId = null

if($localStorage.has('phase')){
	phase = $localStorage.get('phase')
} else {
	$localStorage.set('phase', 'upload')
	phase = 'upload'
	// $localStorage.set('phase', 'monitoring')
	// phase = 'monitoring'
}

if($localStorage.has('user')){
	user = $localStorage.get('user')
} else {
	$localStorage.set('user', false)
}

if(user !== false && user.token.length > 0 && typeof JWTDecode(user.token).iss !== undefined){
	authenticated = true
}

if(!$localStorage.has('currentDate')){
	currentDate = moment()
	$localStorage.set('currentDate', currentDate)
} else {
	currentDate = $localStorage.get('currentDate')
}

if($localStorage.has('currentRoutePlanId')){
	currentRoutePlanId = $localStorage.get('currentRoutePlanId')
}

export default {
	user: user,
	selectedItem: null,
	authenticated: authenticated,
	mapCenter: {
		lat: 51.5287352,
		lng: 0.1785845
	},
	metrics: {},
	routePlan: {},
	availableRoutePlans: [],
	currentRoutePlanId: currentRoutePlanId,
	deliveries: [],
	items: [],
	metrics: {},
	selectedConversationStatus: '',
	selectedTimeSlot: null,
	conversations: [],
	tempMarkers: [],
	displayOverlay: true,
	currentDate: currentDate,
	overlayMessage: 'Hold tight',
	phases: [
		'upload',
		'route',
		'export',
		'jenny',
		'monitoring'
	],
	phase: phase
}