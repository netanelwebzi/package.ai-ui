import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let load = (file) => {return require('../views/' + file + '.vue')}

const router = new Router({

	routes: [
		{
			path: '/app/dashboard',
			name: 'app.dashboard',
			component: load('app/dashboard'),

			// If the user needs to be authenticated to view this page
			meta: {
				guest: true,
			},
		},

		// Login
		{
			path: '/auth/login',
			name: 'auth.login',
			component: load('auth/login'),

			// If the user needs to be a guest to view this page
			meta: {
				guest: true,
			},
		},
		{
			path: '/auth/forgot-password',
			name: 'auth.forgot-password',
			component: load('auth/forgot-password'),

			// If the user needs to be a guest to view this page
			meta: {
				guest: true,
			},
		},
		{
			path: '/',
			redirect: '/app/dashboard',
		},
		{
			path: '/*',
			redirect: '/app/dashboard',
		}
	]

})

router.beforeEach((to, from, next) => {

	next()

})


export default router