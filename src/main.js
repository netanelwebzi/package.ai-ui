import {Vue, App, store, router} from './core/bootstrap'

/* eslint-disable no-new */
new Vue({
	router,
	el: '#app',
	data: {
		store
	},
	template: '<App/>',
	components: {App}
})
