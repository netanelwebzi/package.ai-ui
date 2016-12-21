/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */


/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
	// Home
	{
		path: '/dashboard',
		name: 'app.dashboard',
		component: require('pages/app/dashboard/dashboard.vue'),

		// If the user needs to be authenticated to view this page
		meta: {
			guest: true,
		},
	},

	// Login
	{
		path: '/login',
		name: 'auth.login',
		component: require('pages/auth/login/login.vue'),

		// If the user needs to be a guest to view this page
		meta: {
			guest: true,
		},
	},
	{
		path: '/forgot-password',
		name: 'auth.forgot-password',
		component: require('pages/auth/forgot-password/forgot-password.vue'),

		// If the user needs to be a guest to view this page
		meta: {
			guest: true,
		},
	},	
	{
		path: '/',
		redirect: '/dashboard',
	},
	{
		path: '/*',
		redirect: '/dashboard',
	},
];
