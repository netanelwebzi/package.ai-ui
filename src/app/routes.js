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
		path: '/home',
		name: 'home.index',
		component: require('pages/home/index/index.vue'),

		// If the user needs to be authenticated to view this page
		meta: {
			auth: true,
		},
	},

	// Login
	{
		path: '/login',
		name: 'login.index',
		component: require('pages/login/index/index.vue'),

		// If the user needs to be a guest to view this page
		meta: {
			guest: true,
		},
	},
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/*',
		redirect: '/home',
	},
];
