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
			email: ''
		};
	},

	methods: {
		
	},

	components: {
		authLayout: AuthLayout
	},
};
