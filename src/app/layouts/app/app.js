/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

import authService from './../../services/auth';

export default {
	data() {
		const d = new Date();
		return {
			showDropdownBox: false,
			todayDate: d.getDate() + '/' + parseInt(d.getMonth() + 1) + '/' + d.getFullYear()
		}
	},
	methods: {
		onLogoutConfirmClose(button) {
			if(button == 'ok'){
				this.$router.push({name: 'auth.login'})
			}
		},
		logout() {
			authService.logout();
		},
	},
};
