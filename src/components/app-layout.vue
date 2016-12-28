<template>
	<div class="layout" md-theme="indigo_yellow">
		<md-dialog :md-click-outside-to-close="false" :md-esc-to-close="false" ref="jennyDialog" class="jenny-dialog">
			<md-dialog-content>
				<img src="~assets/img/jenny_dialog_icon.png" alt="">
				<h3>Hi, John Doe</h3>
				<p>
					I'm about to contact <strong>123</strong> recipients and<br />
					export the route to the driver.
				</p>
				<strong>Are you sure you want me to go ahead ?</strong>
			</md-dialog-content>
			<md-dialog-actions>

				<md-button class="md-raised" @click="$refs.jennyDialog.close()">Cancel</md-button>
				<md-button md-theme="indigo_pink" class="md-raised md-primary" @click="$refs.jennyDialog.close()">Yes</md-button>
			</md-dialog-actions>
		</md-dialog>
		<md-dialog-confirm
				md-title="Just a second"
				:md-content-html="'Are you sure you want to logout ?'"
				md-ok-text="Yes, take me out"
				md-cancel-text="Nope, Im staying"
				@close="onLogoutConfirmClose"
				ref="logoutConfirmDialog">
		</md-dialog-confirm>
		<md-toolbar id="app-toolbar">
			<a href="/#/dashboard"><img src="~assets/img/logo.png" alt=""></a>
			<transition name="fade">
				<md-whiteframe md-elevation="2" id="dropdown-box" v-if="showDropdownBox">
					<div class="row">
						<div class="col-xs-4 left-none top-none">

						</div>
						<div class="col-xs-4 top-none left-none">

						</div>
						<div class="col-xs-4 top-none right-none left-none">

						</div>
						<div class="col-xs-4 left-none top-none bottom-none">

						</div>
						<div class="col-xs-4 top-none bottom-none left-none">

						</div>
						<div class="col-xs-4 right-none bottom-none top-none left-none">

						</div>
					</div>
				</md-whiteframe>
			</transition>
			<div class="pull-right" id="right-actions">
				<ul>
					<li>
					<strong>{{ todayDate }}</strong>
					</li>
					<li>
						<md-button class="md-icon-button md-raised" @click="showDropdownBox=!showDropdownBox">
							<md-icon>dashboard</md-icon>
						</md-button>
					</li>
					<li>
						<md-menu :md-offset-x="10" md-offset-y="60">
							<md-button md-menu-trigger>
								<span>Netanel Edri</span>
								<md-avatar class="md-avatar-icon md-raised">
									<md-icon>face</md-icon>
								</md-avatar>
							</md-button>

							<md-menu-content>
								<md-menu-item>Profile</md-menu-item>
								<md-menu-item @click="$refs.logoutConfirmDialog.open()">Sign out</md-menu-item>
							</md-menu-content>
						</md-menu>
					</li>
				</ul>
			</div>
		</md-toolbar>
		<md-toolbar id="app-sub-toolbar" class="md-accent">
			<h2 class="md-title" style="flex: 1">
				Route ID <strong>12312312</strong>
			</h2>
			<md-button class="md-raised md-accent jenny-button" md-theme="indigo_yellow" id="jenny-button" @click="$refs.jennyDialog.open()">
				RUN Jenny, RUN !
			</md-button>
		</md-toolbar>
		<slot></slot>
	</div>
</template>

<script>
export default {
	data() {
		const d = new Date();
		return {
			showDropdownBox: false,
			todayDate: this.moment().format('dddd, D/MM/YYYY')
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
	}
}
</script>
<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity 2s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

	#app-toolbar {
		background: url('~assets/img/toolbar_bg.png') repeat;
		padding: 0px 20px !important;
		display: block !important;
		position: relative;
		z-index: 99999;

		#dropdown-box {
			height: 240px;
			width: 300px;
			position: absolute;
			background: #fff;
			z-index: 9999999999;
			display: block;
			padding: 20px 10px 0px 25px;
			right: 115px;
			margin-top: 5px;
			transition-property: all;
			transition-duration: .5s;
			transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

			.row {
				width: 100%;

				.col-xs-4 {
					border: 1px dashed gray;
					height: 100px;
					padding: 5px;

					&.left-none {
						border-left-width: 0px;
					}

					&.top-none {
						border-top-width: 0px;;
					}

					&.right-none {
						border-right-width: 0px;
					}

					&.bottom-none {
						border-bottom-width: 0px;
					}
				}
			}
		}

		#dropdown-box::after {
			height: 0px;
			width: 0px;
			border-bottom: 10px solid #fff;
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			position: absolute;
			left: 50%;
			top: -10px;
			margin-left: -10px;
			content: ' ';
		}

		#right-actions {
			.md-menu button {
				margin-top: 1px;
			}
			ul {
				list-style-type: none;

				li {
					float: left;
					padding-right: 15px;
					border-right: 1px dashed #fff;

					&:nth-child(1){
						color: #2196F3;
						padding-bottom: 2px;
					}

					&:nth-child(2){
						padding-left: 15px;
					}

					&:nth-child(1), &:nth-child(2){
						line-height: 37px;
					}

					&:last-child {
						margin-right: 0px;
						border-right: 0px;
						padding-right: 0px;
						padding-left: 15px;
					}
				}
			}
		}
	}

	#app-sub-toolbar {
		background: #2196F3 !important;
		color: #fff;
		width: 100%;
	}

</style>