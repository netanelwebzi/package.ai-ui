/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login
 */

import authService from './../../../services/auth';

export default {

	data() {
		return {
			user: {
				username: null,
				password: null,
			},
			loading: false,
			checked: true
		};
	},

	methods: {
		login(user) {
			authService.login(user);
		},
	},

	components: {
	},
};
