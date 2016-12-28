<template>
	<auth-layout>
		<div class="spacer-10"></div>
		<form action="" novalidate>
			<p class="text-left">To reset your user password, please enter your email address.</p>
			<md-input-container>
				<label>Email</label>
				<md-input v-model="email"></md-input>
			</md-input-container>
			<div class="spacer-20"></div>
			<md-button class="md-raised md-primary full-width no-margin">Reset password</md-button>
			<div class="spacer-40"></div>
			<a href="/#/auth/login">Back to login</a>
		</form>
	</auth-layout>
</template>

<script>
export default {
	data() {
		return {
			email: ''
		}
	}
}
</script>