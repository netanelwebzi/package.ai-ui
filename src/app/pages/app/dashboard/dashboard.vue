<template src="./dashboard.html"></template>
<script src="./dashboard.js" lang="babel"></script>
<style lang="scss" scoped>
	#gmap_canvas img{max-width:none!important;background:none!important}
	iframe {
		height: 100vh;
		width: 100%;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.4s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

	#dashboard-container {
		padding-right: 0px;
		padding-left: 0px;

		.col-xs, .col-xs-4 {
			padding-right: 0px;
			padding-left: 0px;
			height:100vh;

			.md-whiteframe {
				height: 100%;

				&#list-panel {
					background: #262d34;
					overflow: scroll;
					padding-bottom: 20px;

					.md-divider.md-inset {
						margin-left: 0px;
					}

					.md-list {
						padding: 0px;

						.selected {
							background: #00baff;
							color: #fff;
							.md-icon, p, span {
								color: #fff;
							}
						}
					}
				}

				&#chat-panel {
					background: #ecedf0;
				}
			}
		}
	}
</style>