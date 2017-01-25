<template>
	<div class="layout" md-theme="blue">
		<div class="container-fluid wrap">
			<div class="row middle-md middle-xs middle-lg center-md center-xs center-lg" style="height:100vh;">
				<div class="col-xs-12 col-md-8 col-lg-8">
					<div class="card">
						<div class="row">
							<div class="col-xs-12 col-md-5 col-lg-5">
								<img src="~assets/img/login_jenny.png" id="jenny-picture" alt="">
							</div>
							<div class="col-xs-12 col-md-7 col-lg-7">
								<img src="~assets/img/PackageBlueLogo.png" id="logo-picture" alt="">
								<div class="clear"></div>
								<slot></slot>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped lang="css">
	.card img {
	}

	.card {
		border-radius: 0px;
		position: relative;
	}

	#logo-picture {
		width: 400px;
		float: left;
	}

	#jenny-picture {
		position: absolute;
		bottom: 0px;
		left: -40px;
	}

	form {
		clear: both;
		padding-top: 10px;
	}
</style>