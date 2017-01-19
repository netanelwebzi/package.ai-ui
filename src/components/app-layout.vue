<template>
	<div class="layout" md-theme="indigo_yellow">
		<md-dialog-confirm
				md-title="Hold on"
				md-content="Are you sure ?"
				md-ok-text="Yes, do it"
				md-cancel-text="Cancel"
				@close="onDialog5Close"
				ref="dialog5">
		</md-dialog-confirm>
		<md-dialog :md-click-outside-to-close="false" :md-esc-to-close="false" ref="jennyDialog" class="jenny-dialog">
			<md-dialog-content>
				<img src="~assets/img/jenny_dialog_icon.png" alt="">
				<h3>Hi, John Doe</h3>
				<p>
					I'm about to contact <strong>123</strong> recipients and<br/>
					export the route to the driver.
				</p>
				<strong>Are you sure you want me to go ahead ?</strong>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-raised" @click="$refs.jennyDialog.close()">Cancel</md-button>
				<md-button md-theme="indigo_pink" class="md-raised md-primary" @click="onJennyOK">Yes</md-button>
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
			<div id="phases-progress" v-if="!onPhaseMonitoring()">
				<div v-for="phaseLabel in phases" :class="{current: phase == phaseLabel}">
					{{phaseLabel}}
				</div>
			</div>
			<div v-else id="phases-progress">
				<div class="current">
					Today's Conversations
				</div>
			</div>
			<transition name="fade">
				<md-whiteframe md-elevation="2" id="dropdown-box" v-if="showDropdownBox">
					<div class="row">
						<div class="col-xs-4 left-none top-none">
							<a href="">
								<md-ink-ripple></md-ink-ripple>

								<i class="fa fa-dashboard"></i>
								Dashboard
							</a>
						</div>
						<div class="col-xs-4 top-none left-none">
							<a>
								<i class="fa fa-truck"></i>
								Route Planning
							</a>
						</div>
						<div class="col-xs-4 top-none right-none left-none">
							<a>
								<i class="fa fa-plus-square"></i>
								New Deliveries
							</a>
						</div>
						<div class="col-xs-4 left-none top-none bottom-none">
							<a>
								<i class="fa fa-clock-o"></i>
								Scheduled Deliveries
							</a>
						</div>
						<div class="col-xs-4 top-none bottom-none left-none">
							<a>
								<i class="fa fa-dashboard"></i>
								Assist
							</a>
						</div>
						<div class="col-xs-4 right-none bottom-none top-none left-none">
							<a>
								<i class="fa fa-line-chart"></i>
								Reports
							</a>
						</div>
					</div>
				</md-whiteframe>
			</transition>
			<div class="pull-right" id="right-actions">
				<ul>
					<li>
						<date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
						<!--<strong>{{ todayDate }}</strong>-->
					</li>
					<li>
						<div class="top-info" v-show="onPhaseMonitoring()">
							<img src="~assets/img/round.png">
							<div class="top-content">
								<div class="top">
									<span class="big">20%</span><span class="small">(115)</span>
								</div>
								<div class="bottom">Delivered</div>
							</div>
						</div>
					</li>
					<li>
						<div class="top-info" v-show="onPhaseMonitoring()" style="margin-left:15px;">
							<img src="~assets/img/cancel.png">
							<div class="top-content">
								<div class="top">
									<span class="big">80%</span><span class="small">(115)</span>
								</div>
								<div class="bottom">Missdelivered</div>
							</div>
						</div>
					</li>
					<li>
						<md-button class="md-icon-button md-raised" @click="showDropdownBox=!showDropdownBox"
						           style="margin-left:19px;">
							<md-icon>dashboard</md-icon>
						</md-button>
					</li>
					<li>
						<md-menu :md-offset-x="10" md-offset-y="60">
							<md-button md-menu-trigger>
								<md-avatar class="md-avatar-icon md-raised">
									<md-icon>face</md-icon>
								</md-avatar>
								<span>{{ user.name }}</span>
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
			<h2 class="md-title" v-show="!onPhaseUpload() && !onPhaseRoute()" style="flex: 1">
				Route ID <strong>{{ routePlan.id }}</strong>
			</h2>
			<div class="md-select-container" v-show="onPhaseMonitoring()">
				<md-select name="delivery" v-model="delivery" placeholder="Select deliveries type">
					<md-option value="option1">Today Deliveries</md-option>
					<md-option value="option2">Confirmed Deliveries</md-option>
					<md-option value="option3">Different Day</md-option>
					<md-option value="option4">In Progress</md-option>
					<md-option value="option5">No Response</md-option>
				</md-select>
			</div>
			<div v-show="!onPhaseUpload()" class="top-info" style="justify-content: flex-start">
				<img src="~assets/img/cancel.png">
				<div class="value">{{ deliveries.length }}</div>
				<div class="top-content">
					<div class="top">
						Today
					</div>
					<div class="bottom">Deliveries</div>
				</div>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #88db5f">
				<img src="~assets/img/toolbar_status_icon_2.png">
				<div class="value">115</div>
				<div class="top-content">
					<div class="top">
						Confirmed
					</div>
					<div class="bottom">Deliveries</div>
				</div>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #ffb73a">
				<img src="~assets/img/toolbar_status_icon_3.png">
				<div class="value">2</div>
				<div class="top-content">
					<div class="top">
						Different
					</div>
					<div class="bottom">Day</div>
				</div>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #9a67d9">
				<img src="~assets/img/toolbar_status_icon_4.png">
				<div class="value">5</div>
				<div class="top-content">
					<div class="top">
						In
					</div>
					<div class="bottom">Progress</div>
				</div>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #f75252">
				<img src="~assets/img/toolbar_status_icon_5.png">
				<div class="value">1</div>
				<div class="top-content">
					<div class="top">
						No
					</div>
					<div class="bottom">Response</div>
				</div>
			</div>
			<md-button class="md-raised" v-show="onPhaseRoute()" @click="createDeliverySchedule()">
				<md-icon>date_range</md-icon>
				Create delivery schedule
			</md-button>
			<md-button class="md-raised" v-show="onPhaseExport()" @click="phase='jenny'">
				<md-icon>send</md-icon>
				Export schedule
			</md-button>
			<md-button class="md-raised md-accent jenny-button" md-theme="indigo_yellow" id="jenny-button"
			           @click="$refs.jennyDialog.open()" v-show="onPhaseJenny()">
				RUN Jenny, RUN !
			</md-button>
		</md-toolbar>
		<slot></slot>
	</div>
</template>

<script lang="babel">
	import DatePicker from './datepicker'
	import LocalStorage from '../core/local-storage'
	let $localStorage = new LocalStorage

	function capitalize(s) {
		return s && s[0].toUpperCase() + s.slice(1);
	}

	export default {
		components: {
			DatePicker
		},
		store: ['phase', 'displayOverlay', 'user', 'phases', 'metrics', 'routePlan', 'deliveries', 'overlayMessage'],
		data() {
			const d = new Date();
			return {
				delivery: '',
				showDropdownBox: false,
				todayDate: this.moment().format('dddd, DD/MM/YYYY'),
				startTime: {
					time: $localStorage.get('currentDate')
				},
				endtime: {
					time: ''
				},
				option: {
					type: 'day',
					week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
					month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					format: 'dddd, DD/MM/YYYY',
					placeholder: 'Choose date',
					buttons: {
						ok: 'Choose',
						cancel: 'Cancel'
					},
					overlayOpacity: 0.8, // 0.5 as default
					dismissible: true // as true as default
				},
				limit: [{
					type: 'weekday',
					available: [1, 2, 3, 4, 5, 6, 7]
				}],
			}
		},
		watch: {
			'startTime.time': function(){
				$localStorage.set('currentDate', this.startTime.time)
				this.$store.currentDate = this.startTime.time
				this.$services.init(this.moment(this.startTime.time, 'dddd, DD/MM/YYYY').format('YYYY-MM-DD'))
			},
			phase: function () {
				this.displayOverlay = true
				this.$localStorage.set('phase', this.phase)
				setTimeout(() => this.displayOverlay = false, 2000)
			}
		},
		methods: {
			onDialog5Close(type) {
				console.log(type)
			},
			onLogoutConfirmClose(button) {
				if (button == 'ok') {
					this.$services.Auth.forget().then(() => {
						this.$router.push({name: 'auth.login'})
					})
				}
			},
			onJennyOK: function () {
				this.$refs.jennyDialog.close()
				this.phase = 'monitoring'
			},
			createDeliverySchedule() {
				this.displayOverlay = true
				this.overlayMessage = 'Preparing route plan...'
			},
			logout() {

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

		/*#right-bg {*/
			/*background: url('~assets/img/toolbar_right_bg.png') no-repeat;*/
			/*position: absolute;*/
			/*bottom: 0px;*/
			/*right: 0px;*/
			/*height: 23px;*/
			/*width: 817px;*/
		/*}*/

		> a {
			display: block;
			float: left;
		}

		#phases-progress {
			display: block;
			float: left;
			margin-top: 15px;
			margin-left: 20px;
			div {
				color: gray;
				float: left;
				padding: 5px 15px;
				font-size: 18px;
				text-transform: capitalize;
				line-height: 35px;
				&.current {
					height: 49px;
					background: #2196F3;
					color: #fff;
					font-weight:bold;
					border-top-right-radius: 10px;
					border-top-left-radius: 10px;
				}
			}
		}

		/*#phases-progress {*/
			/*float: left;*/
			/*margin-top: 0px;*/

			/*ul {*/
				/*list-style-type: none;*/
				/*border: 2px solid darken(#2196F3, 20%);*/
				/*display: block;*/
				/*height: 36px;*/
				/*padding: 0px;*/
				/*width: 100%;*/

				/*li {*/
					/*color: gray;*/
					/*float: left;*/
					/*display: block;*/
					/*background: #fff;*/
					/*padding: 6px 10px;*/
					/*font-size: 16px;*/
					/*font-weight: bold;*/
					/*text-transform: capitalize;*/

					/*&.current {*/
						/*color: #fff;*/
						/*background: darken(#2196F3, 20%);;*/
					/*}*/
				/*}*/
			/*}*/
		/*}*/

		#toolbar-phase {
			color: #2196F3;
			float: left;
			display: block;
			border: 2px solid darken(#2196F3, 20%);
			background: #fff;
			border-radius: 20px;
			padding: 5px 10px;
			font-size: 16px;
			font-weight: bold;
			margin-top: 12px;
		}

		#dropdown-box {
			height: 240px;
			width: 300px;
			position: absolute;
			background: #fff;
			z-index: 9999999999;
			display: block;
			padding: 20px 10px 0px 25px;
			right: 127px;
			margin-top: 64px;
			transition-property: all;
			transition-duration: .5s;
			transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

			.row {
				width: 100%;

				.col-xs-4 {
					border: 1px dashed gray;
					height: 100px;
					padding: 5px;

					a, a:visited {
						margin-top: 5px;
						color: #000;
						display: block;
						text-align: center;
						font-size: 15px;
						cursor: pointer;
						text-decoration: none;

						i {
							display: block;
							font-size: 40px;
						}
					}

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

					&:nth-child(1) {
						color: #2196F3;
						padding-bottom: 2px;
					}

					&:nth-child(2) {
						padding-left: 15px;
					}

					&:nth-child(1), &:nth-child(2) {
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
		.md-select-container {
			.md-select {
				margin-top: 13px !important;
			}
		}
		.md-select-container, .top-info {
			flex: 1;
			height: 64px;
			padding-left: 20px;
			padding-right: 20px;
			position: relative;
			justify-content: center;
			& > * {
				margin-left: 3px;
				margin-right: 3px;
			}
			.value {
				font-size: 34px;
				color: #fff;
			}
			&:before {
				position: absolute;
				top: 0;
				left: 0;
				height: 74px;
				background-color: #666;
				width: 1px;
				content: '';
				margin-top: -14px;
			}
		}
		.md-select-container {
			.md-select {
				border-bottom: 1px solid #ccc;
			}
			&:before {
				height: 100%;
				width: 0;
				border-left: 1px dashed #fff;
				background-color: transparent;
				margin-top: 0;
			}
		}
	}

	.top-info {
		display: flex;
		flex-flow: row;
		align-items: center;
		padding-top: 3px;
		padding-bottom: 3px;
		img {
			height: 35px;
			margin-right: 5px;
		}
		.top-content {
			display: flex;
			flex-flow: column;
			.top {
				font-weight: bold;
				line-height: 1em;
				.big {
					font-size: 20px;
					font-weight: bold;
					color: #2196F3;
				}
				.small {
					color: rgb(80, 80, 80);
				}
			}
			.bottom {
				line-height: 1em;
				color: #fff;
				margin-top: 2px;
				font-weight: bold;
			}
		}
	}

</style>