<template>
	<div id="app">
		<transition name="fade">
			<div id="overlay" v-show="displayOverlay">
				<div>
					<md-spinner :md-size="150" md-indeterminate></md-spinner>
					<span>{{ overlayMessage }}</span>
				</div>
			</div>
		</transition>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		store: ['displayOverlay', 'overlayMessage'],
		mounted() {
			setTimeout(() => this.displayOverlay = false, 2000)
		}
	}
</script>

<style scoped lang="scss">
	#overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999999;
		background-color: rgba(255, 255, 255, 0.9);

		> div {
			top: 50% !important;
			left: 50% !important;
			position: absolute;
			text-align: center;
			color: #000;
			margin: -100px 0px 0px -100px;

			span {
				display: block;
				font-weight: bold;
				font-size: 18px;
			}
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.4s
	}

	.fade-enter, .fade-leave-active {
		opacity: 0
	}
</style>