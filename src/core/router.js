import Vue from 'vue'
import Router from 'vue-router'
import {Auth} from './services'

Vue.use(Router)

let load = (file) => {return require('../views/' + file + '.vue')}

const router = new Router({

	routes: [
		{
			path: '/app/dashboard',
			name: 'app.dashboard',
			component: load('app/dashboard')
		},

		// Login
		{
			path: '/auth/login',
			name: 'auth.login',
			component: load('auth/login')
		},
		{
			path: '/auth/forgot-password',
			name: 'auth.forgot-password',
			component: load('auth/forgot-password')
		},
		{
			path: '/',
			redirect: '/auth/login',
		},
		{
			path: '/*',
			redirect: '/app/dashboard',
		}
	]


})

router.beforeEach((to, from, next) => {
	if(Auth.check()){
		if(to.name.startsWith('auth.')){
			next('/app/dashboard')
		} else {
			next()
		}
	} else {
		if(to.name.startsWith('app.')){
			next('/auth/login')
		} else {
			next()
		}
	}
})


export default router