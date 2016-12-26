<template src="./dashboard.html"></template>
<script src="./dashboard.js" lang="babel"></script>
<style lang="scss">
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
			height: calc(100vh - 64px * 2);

			.md-whiteframe {
				height: 100%;

				&#list-panel {
					background: #fff;
					overflow: scroll;

					.md-divider.md-inset {
						margin-left: 0px;
					}

					.file-drop {
						height: calc(100% - 32px);
						border: 6px dashed #2196F3;
						margin: 16px 16px 16px 32px;
						position: relative;
						

						> label {
							width: 100%;
							height: 100%;
							position: absolute;
							top: 0;
							left: 0;

							> span {
								display: none;
							}
						}

						> div {
							width: 100%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							top: 0;
							left: 0;
							color: #00baff;
							font-size: 32px;
							text-align: center;

							i {
								width: 80px;
								max-width: 80px;
								height: 80px;
								max-height: 80px;
								font-size: 80px;
								margin-bottom: 5px;
							}
						}
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

					> .item-details {
						background: #fff;
						padding: 20px;

						.title {
							line-height: 36px;
							color: #2196F3;
							font-size: 36px;
						}

						.status {
							text-align: center;
							margin-top: 10px;

							.md-icon {
								width: 60px;
								max-width: 60px;
								height: 60px;
								max-height: 60px;
								font-size: 60px;
							}

							div {
								font-size: 32px;
							}
						}

						 .cancel {
							position: absolute;
							top: 10px;
							right: 10px;
						}
					}
				}
			}
		}
	}
</style>