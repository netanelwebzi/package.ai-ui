<template>
	<auth-layout>
		<form action="" novalidate>
			<md-input-container :class="{'md-input-invalid': errors.username}">
				<label>Username</label>
				<md-input v-model="user.username"></md-input>
				<span class="md-error" v-if="errors.username">Required</span>
			</md-input-container>
			<div class="spacer-20"></div>
			<md-input-container md-has-password :class="{'md-input-invalid': errors.password}">
				<label>Password</label>
				<md-input type="password" v-model="user.password"></md-input>
				<span class="md-error" v-if="errors.password">Required</span>
			</md-input-container>
			<div class="spacer-20"></div>
			<md-checkbox id="my-test1" name="my-test1" v-model="user.remember" class="pull-left">Remember me
			</md-checkbox>
			<md-button class="md-raised md-primary pull-right" @click="login()">Login</md-button>
			<div class="spacer-40"></div>
			<a href="/#/auth/forgot-password">Forgot password ?</a>
		</form>
		<md-dialog-alert
				md-content="Invalid username or password"
				md-ok-text="OK"
				ref="errorDialog">
		</md-dialog-alert>
	</auth-layout>
</template>

<script lang="babel">
	import {Auth} from '../../core/services'

	export default {
		store: ['displayOverlay'],
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
				if (this.user.username == null || this.user.username == '' || this.user.username.length < 2) {
					this.errors.username = true;
				} else {
					this.errors.username = false;
				}
			},
			'user.password': function () {
				if (this.user.password == null || this.user.password == '' || this.user.password.length < 2) {
					this.errors.password = true;
				} else {
					this.errors.password = false;
				}
			}
		},
		methods: {
			login() {
				if (this.user.username == null || this.user.username == '' || this.user.username.length < 2) {
					this.errors.username = true;
				} else {
					this.errors.username = false;
				}

				if (this.user.password == null || this.user.password == '' || this.user.password.length < 2) {
					this.errors.password = true;
				} else {
					this.errors.password = false;
				}

				if (!this.errors.username && !this.errors.password) {
					this.displayOverlay = true
//					setTimeout(() => this.displayOverlay = false, 2000)
					this.$services.Auth.login(this.user.username, this.user.password).then(() => {
						this.displayOverlay = false
						this.$router.push({name: 'app.dashboard'})
					}, () => {
						this.displayOverlay = false
						this.$refs.errorDialog.open()
					})
				} else {
					this.$refs.errorDialog.open()
				}
			},
		}
	}

</script>

<style>
	.layout {
		background: url('~assets/img/login_jenny.png') no-repeat bottom left;
	}

	small {
		font-size: 13px;
	}


</style>