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
			errors: {
				username: false,
				password: false
			},
			loading: false,
			checked: true
		};
	},
	watch: {
		'user.username': function () {
			console.log('changed');
			if(this.user.username == null || this.user.username == '' || this.user.username.length < 2){
				this.errors.username = true;
			} else {
				this.errors.username = false;
			}
		},
		'user.password': function() {
			if(this.user.password == null || this.user.password == '' || this.user.password.length < 2){
				this.errors.password = true;
			} else {
				this.errors.password = false;
			}
		}
	},
	methods: {
		login() {
			// authService.login(user);
			if(this.user.username == null || this.user.username == '' || this.user.username.length < 2){
				this.errors.username = true;
			} else {
				this.errors.username = false;
			}

			if(this.user.password == null || this.user.password == '' || this.user.password.length < 2){
				this.errors.password = true;
			} else {
				this.errors.password = false;
			}

			if(!this.errors.username && !this.errors.password && this.user.username == 'admin' && this.user.password == '123'){
				this.$router.push({name: 'app.dashboard'});
			} else {
				this.$refs.errorDialog.open();
			}
		},
	},

	components: {
		authLayout: AuthLayout
	},
};
