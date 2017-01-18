<template>
	<div class="layout" md-theme="default">
		<div class="container-fluid wrap">
			<div class="row middle-md middle-xs middle-lg center-md center-xs center-lg" style="height:100vh;">
				<div class="col-xs-6 col-md-4 col-lg-4">
					<div class="card">
						<img src="~assets/img/packageai-logo_negative.png" alt="" width="400">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>
	.card img {
		margin-bottom: 10px;
	}
</style>