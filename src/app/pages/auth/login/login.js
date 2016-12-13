/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login
 */

import authService from './../../../services/auth'
import AuthLayout from './../../../layouts/auth/auth.vue'
export default {

	data() {
		return {
			user: {
				username: null,
				password: null,
				remember: true
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
		authLayout: AuthLayout
	},
};
