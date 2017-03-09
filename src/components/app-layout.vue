<template>
	<div class="layout" md-theme="blue">
		<md-dialog-alert
				md-content="Access denied"
				md-ok-text="OK"
				ref="uploadNewDeliversErrorDialog">
		</md-dialog-alert>
		<md-dialog-confirm
				md-title="Hold on"
				md-content="Are you sure ?"
				md-ok-text="Yes, do it"
				md-cancel-text="Cancel"
				@close="onDialog5Close"
				ref="dialog5">
		</md-dialog-confirm>
		<md-dialog-confirm
				md-title="Hold on"
				md-content="Are you sure ?"
				md-ok-text="Yes, do it"
				md-cancel-text="Cancel"
				@close="onNewDeliversConfirmDialogClose"
				ref="newDeliveriesConfirmDialog">
		</md-dialog-confirm>
		<md-dialog :md-click-outside-to-close="false" :md-esc-to-close="false" ref="jennyDialog" class="jenny-dialog">
			<md-dialog-content>
				<img src="~assets/img/jenny_dialog_icon.png" alt="">
				<h3 style="margin-bottom:5px;">Hi, {{ user.name }}</h3>
				<p>
					I'm about to contact <strong>{{ deliveries.length }}</strong> recipients<br/>
					and export the route to the driver.
				</p>
				<strong style="height:17px;">Are you sure you want me to go ahead ?</strong>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-raised" @click="$refs.jennyDialog.close()">Cancel</md-button>
				<md-button md-theme="blue" class="md-raised md-primary" @click="onJennyOK">Yes</md-button>
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
				<!--<div v-for="phaseLabel in phases" :class="{current: phase == phaseLabel}">-->
					<!--{{phaseLabel}}-->
				<!--</div>-->
				<phase-progress-bar></phase-progress-bar>
			</div>
			<div v-else id="phases-progress" style="margin-top:10px;">
				<div class="current">
					Today's<br />
					Conversations
				</div>
			</div>
			<div id="app-toolbar-summery" v-if="onPhaseMonitoring()">
				<div>
					<img src="~assets/img/round.png">
					<div>
						{{ Math.round((metrics.delivered / metrics.totalDeliveries) * 100) }}% Delivered<br />
						<span>({{ metrics.delivered }})</span>
					</div>
				</div>
				<div>
					<img src="~assets/img/cancel.png">
					<div>
						{{ Math.round((metrics.misdelivered / metrics.totalDeliveries) * 100) }}% Missed<br />
						<span>({{ metrics.misdelivered }})</span>
					</div>
				</div>
			</div>
			<transition name="fade">
				<md-whiteframe md-elevation="2" id="dropdown-box" v-if="showDropdownBox" v-click-outside="onDropdownBoxClickOutSide">
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
							<a @click.prevent="uploadNewDeliveries">
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
			<div class="pull-right" id="right-toolbar-actions">
				<div>
					<inline-date-picker format="D, dd/MM/yyyy" v-model="startTime.time"></inline-date-picker>
				</div>
				<div>
					<md-button @click.prevent="uploadNewDeliveries">
						<md-icon>add</md-icon>
						Upload
						<md-tooltip placement="bottom">Upload new deliveries</md-tooltip>
					</md-button>
				</div>
				<div>
					<md-menu :md-offset-x="10" md-offset-y="60">
						<md-button md-menu-trigger>
							<md-avatar class="md-avatar-icon md-raised">
								<md-icon>face</md-icon>
							</md-avatar>
						</md-button>

						<md-menu-content>
							<md-menu-item>Profile</md-menu-item>
							<md-menu-item @click="$refs.logoutConfirmDialog.open()">Sign out</md-menu-item>
						</md-menu-content>
					</md-menu>
				</div>
			</div>
			<!--<div class="pull-right" id="right-actions">-->
				<!--<ul>-->
					<!--<li>-->
						<!--<inline-date-picker format="D, dd/MM/yyyy" v-model="startTime.time"></inline-date-picker>-->
					<!--</li>-->
					<!--<li>-->
						<!--<md-button @click.prevent="uploadNewDeliveries">-->
							<!--<md-icon>add</md-icon>-->
							<!--<md-tooltip placement="bottom">Upload new deliveries</md-tooltip>-->
						<!--</md-button>-->
						<!--&lt;!&ndash;<md-button class="md-icon-button md-raised" @click="showDropdownBox=!showDropdownBox"&ndash;&gt;-->
						           <!--&lt;!&ndash;style="margin-left:19px;">&ndash;&gt;-->
							<!--&lt;!&ndash;<md-icon>dashboard</md-icon>&ndash;&gt;-->
						<!--&lt;!&ndash;</md-button>&ndash;&gt;-->
					<!--</li>-->
					<!--<li>-->
						<!--<md-menu :md-offset-x="10" md-offset-y="60">-->
							<!--<md-button md-menu-trigger>-->
								<!--<md-avatar class="md-avatar-icon md-raised">-->
									<!--<md-icon>face</md-icon>-->
								<!--</md-avatar>-->

							<!--</md-button>-->

							<!--<md-menu-content>-->
								<!--<md-menu-item>Profile</md-menu-item>-->
								<!--<md-menu-item @click="$refs.logoutConfirmDialog.open()">Sign out</md-menu-item>-->
							<!--</md-menu-content>-->
						<!--</md-menu>-->
					<!--</li>-->
				<!--</ul>-->
			<!--</div>-->
		</md-toolbar>
		<md-toolbar id="app-sub-toolbar" class="md-accent">
			<!--<h2 class="md-title" v-show="!onPhaseUpload() && !onPhaseRoute()" :class="{'flex-1': onPhaseJenny() || onPhaseExport()}" style="padding-right: 70px;">-->
				<!--Route ID <strong>{{ routePlan.id }}</strong>-->
				<!--<span id="delimiter"></span>-->
				<!--<span id="deliveries-count">{{ onPhaseMonitoring() ? metrics.totalDeliveries : deliveries.length }} Deliveries</span>-->
			<!--</h2>-->
			<div :class="{'flex-1': onPhaseJenny() || onPhaseExport()}">
				<md-menu md-align-trigger v-if="availableRoutePlans.length > 0">
					<md-button md-menu-trigger>
						{{ routePlanSelectorButtonText }}
						<md-icon>arrow_drop_down</md-icon>
					</md-button>
					<md-menu-content>
						<md-menu-item v-for="routePlanObject in availableRoutePlans" @click="chooseCurrentRoutePlan(routePlanObject.id)" v-if="availableRoutePlans.length > 1 || (availableRoutePlans.length == 1 && onPhaseUpload())">{{ routePlanObject.id }}</md-menu-item>
						<md-menu-item v-if="availableRoutePlans.length == 1 && !onPhaseUpload()"><span style="font-size:13px;">No additional routes</span></md-menu-item>
					</md-menu-content>
				</md-menu>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #88db5f" @click="selectConversationStatus('CONFIRMED')" :class="{selected: selectedConversationStatus == 'CONFIRMED'}">
				<img src="~assets/img/toolbar_status_icon_2.png">
				<div class="value">{{ metrics.confirmed }}</div>
				<div class="top-content">
					<div class="top">
						Confirmed
					</div>
					<div class="bottom">Deliveries</div>
				</div>
				<md-ink-ripple></md-ink-ripple>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #ffb73a" @click="selectConversationStatus('POSTPONED')" :class="{selected: selectedConversationStatus == 'POSTPONED'}">
				<img src="~assets/img/toolbar_status_icon_3.png">
				<div class="value">{{ metrics.postponed }}</div>
				<div class="top-content">
					<div class="top">
						Different
					</div>
					<div class="bottom">Day</div>
				</div>
				<md-ink-ripple></md-ink-ripple>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #9a67d9" @click="selectConversationStatus('IN_PROGRESS')" :class="{selected: selectedConversationStatus == 'IN_PROGRESS'}">
				<img src="~assets/img/toolbar_status_icon_4.png">
				<div class="value">{{ metrics.conversing }}</div>
				<div class="top-content">
					<div class="top">
						In
					</div>
					<div class="bottom">Progress</div>
				</div>
				<md-ink-ripple></md-ink-ripple>
			</div>
			<div v-show="onPhaseMonitoring()" class="top-info" style="border-top:3px solid #f75252" @click="selectConversationStatus('NO_RESPONSE')" :class="{selected: selectedConversationStatus == 'NO_RESPONSE'}">
				<img src="~assets/img/toolbar_status_icon_5.png">
				<div class="value">{{ metrics.noResponse }}</div>
				<div class="top-content">
					<div class="top">
						No
					</div>
					<div class="bottom">Response</div>
				</div>
				<md-ink-ripple></md-ink-ripple>
			</div>
			<md-button class="md-raised" v-show="onPhaseRoute()" :disabled="hasErrorsInDeliveries" @click="createDeliverySchedule()" style="position: absolute;top: 7px; right: 0px;">
				<md-icon>date_range</md-icon>
				Create delivery schedule
			</md-button>
			<md-button class="md-raised" v-show="onPhaseExport()" @click="exportSchedule()">
				<md-icon>send</md-icon>
				Dispatch
			</md-button>
			<md-button class="md-raised jenny-button" md-theme="yellow" id="jenny-button"
			           @click="$refs.jennyDialog.open()" v-show="onPhaseJenny()">
				RUN Jenny, RUN !
			</md-button>
		</md-toolbar>
		<slot></slot>
	</div>
</template>

<script lang="babel">
	import PhaseProgressBar from './phase-progress'
	import InlineDatePicker from 'vuejs-datepicker'
	import LocalStorage from '../core/local-storage'
	import ClickOutSide from '../core/click-outside'
	import _ from 'underscore'
	let $localStorage = new LocalStorage

	function capitalize(s) {
		return s && s[0].toUpperCase() + s.slice(1);
	}

	let clickOutsideCounter = 0

	export default {
		components: {
			InlineDatePicker,
			PhaseProgressBar
		},
		directives: {
			'click-outside': {
				bind: function(el, binding, vNode) {
					// Provided expression must evaluate to a function.
					if (typeof binding.value !== 'function') {
						const compName = vNode.context.name
						let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
						if (compName) { warn += `Found in component '${compName}'` }

						console.warn(warn)
					}
					// Define Handler and cache it on the element
					const bubble = binding.modifiers.bubble
					const handler = (e) => {
						if(e.target.className != "md-icon material-icons md-theme-default") {
							if (bubble || (!el.contains(e.target) && el !== e.target)) {
								binding.value(e)
							}
						}
					}
					el.__vueClickOutside__ = handler

					// add Event Listeners
					document.addEventListener('click', handler)
				},

				unbind: function(el, binding) {
					// Remove Event Listeners
					document.removeEventListener('click', el.__vueClickOutside__)
					el.__vueClickOutside__ = null

				}
			}
		},
		store: ['availableRoutePlans', 'currentRoutePlanId', 'phase', 'displayOverlay', 'selectedConversationStatus', 'user', 'phases', 'metrics', 'routePlan', 'deliveries', 'overlayMessage', 'currentDate', 'metrics', 'conversations', 'selectedItem'],
		data() {
			const d = new Date();
			return {
				delivery: '',
				showDropdownBox: false,
				todayDate: this.moment().format('dddd, DD/MM/YYYY'),
				routePlanId: null,
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
			}
		},
		watch: {
			'startTime.time': function(){
				$localStorage.set('currentDate', this.startTime.time)
				this.currentRoutePlanId = null
				this.$store.currentDate = this.startTime.time
				this.$services.init(this.moment(this.startTime.time, 'dddd, DD/MM/YYYY').format('YYYY-MM-DD'))
			},
			currentRoutePlanId() {
				this.$localStorage.set('currentRoutePlanId', this.currentRoutePlanId)
			},
			phase: function () {
				this.displayOverlay = true
				this.$localStorage.set('phase', this.phase)

				if(this.phase == 'monitoring'){
					this.listenForUpdates()
//					this.$services.Plans.metrics(this.routePlan.id).then((metrics) => {
//						this.metrics = metrics
//					})
				}

				setTimeout(() => this.displayOverlay = false, 2000)
			}
		},
		created() {
			if(this.onPhaseMonitoring()){
				setTimeout(() => {
					this.listenForUpdates()
				}, 5000)
			}

			let channel = this.$services.pusher.subscribe('private-only_tenant.qa.plans.upload')
			channel.bind_global((event, data) => {
				switch (event)
				{
					case 'UPDATED':
						if(data.subResourceName == undefined && data.payload.state !== undefined && data.payload.state == 'ROUTED'){
							this.$services.Plans.get(this.moment(this.currentDate).format('YYYY-MM-DD')).then((plan) => {
								this.routePlan = plan[0]
								this.$services.Deliveries.get(this.moment(this.currentDate).format('YYYY-MM-DD')).then((deliveries) => {
									console.log('before moving to export', deliveries)
									this.deliveries = deliveries
									this.phase = 'export'
									this.displayOverlay = false
								})
							})
						}
						break;
				}
			})
		},
		methods: {
			chooseCurrentRoutePlan (route_plan_id) {
				this.currentRoutePlanId = route_plan_id
				setTimeout(() => {
					window.location.reload()
				}, 200)
			},
			onDropdownBoxClickOutSide() {
				clickOutsideCounter++
				if(this.showDropdownBox === true && clickOutsideCounter > 1)
					this.showDropdownBox = false
			},
			selectConversationStatus(status) {
				if(status != this.selectedConversationStatus) {
					this.selectedConversationStatus = status
				} else {
					this.selectedConversationStatus = ''
				}
			},
			listenForUpdates() {
				let channel = this.$services.pusher.subscribe(`private-only_tenant.qa.plans.${this.routePlan.id}.upload`)
				let that = this
				channel.bind_global((event, data) => {
					if(event == 'UPDATED' && data.subResourceName !== undefined && data.subResourceName == 'conversations' && data.payload.lastMessageText !== undefined){
						const foundConversation = _.findWhere(that.conversations, {id: data.subResourceId})
						if(data.payload !== undefined && Object.keys(data.payload).length > 0) {
							if(data.payload.lastMessageDirection !== undefined && data.payload.lastMessageDirection !== null) {
								foundConversation.lastMessageDirection = data.payload.lastMessageDirection
							}

							if(data.payload.lastMessageText !== undefined && data.payload.lastMessageText !== null) {
								foundConversation.lastMessageText = data.payload.lastMessageText
							}

							if(data.payload.updated !== undefined && data.payload.updated !== null) {
								foundConversation.updated = data.payload.updated
							}

							if(data.payload.schedulingState !== undefined && data.payload.schedulingState !== null){
								foundConversation.schedulingState = data.payload.schedulingState
							}
						}
					}

					if(event == 'UPDATED' && data.subResourceName !== undefined && (data.subResourceName == 'deliveries' || data.subResourceName == 'conversations')){
						debugger
						this.$services.Plans.metrics(that.routePlan.id).then((metrics) => {
							that.metrics = metrics
						})
					}

					if(event == 'CREATED' && data.subResourceName !== undefined && data.subResourceName == 'conversations'){
						this.$services.loadMergedData(this.moment(this.currentDate).format('YYYY-MM-DD'))
					}

					if(event == 'UPDATED' && data.subResourceName !== undefined && data.subResourceName == 'conversations' && data.payload.schedulingState !== undefined){
						const foundConversation = _.findWhere(that.conversations, {id: data.subResourceId})
						if(foundConversation !== undefined) {
							foundConversation.schedulingState = data.payload.schedulingState
						}
					}
				})
			},
			onNewDeliversConfirmDialogClose(button) {
				if(button == 'ok'){
					this.phase = 'upload'
				}
			},
			uploadNewDeliveries() {
				this.$refs.newDeliveriesConfirmDialog.open()

				this.showDropdownBox = false
			},
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
				this.displayOverlay = true
				this.overlayMessage = 'Running...'
				this.$services.Plans.run(this.routePlan.id).then((response) => {
					this.$services.loadMergedData(this.moment(this.currentDate).format('YYYY-MM-DD'))
				})
			},
			exportSchedule() {
				this.displayOverlay = true
				this.overlayMessage = 'Exporting...'
				this.$services.Plans.export(this.routePlan.id).then((response) => {
					this.phase = 'jenny'
					this.displayOverlay = false
				})
			},
			createDeliverySchedule() {
				this.displayOverlay = true
				this.overlayMessage = 'Preparing route plan...'
				this.selectedItem = null
				this.$services.Plans.schedule(this.moment(this.currentDate).format('YYYY-MM-DD')).then((response) => {
					this.routePlanId = response.routePlanId
				}).catch((error) => {
					this.displayOverlay = false
					alert(error.response.data.message)
				})
			},
			logout() {

			},
		},
		computed: {
			routePlanSelectorButtonText() {
				if(this.currentRoutePlanId == null) {
					return 'Select Route Plan'
				} else {
					let x = this.onPhaseMonitoring() ? this.metrics.totalDeliveries : this.deliveries.length
					return `Route ID ${this.currentRoutePlanId} (${x} deliveries)`
				}
			},
			hasErrorsInDeliveries: function(){
				let count = 0

				if(this.onPhaseRoute()){
					_.each(this.deliveries, (delivery, key) => {
						if(delivery.errors !== undefined){
							count = parseInt(count + delivery.errors.length)
						}
					});
				}

				return count > 0
			}
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

		#app-toolbar-summery {
			@media screen and (max-width: 1025px) {
				margin-left: 0px;
				> div {
					&:first-of-type {
						margin-right: 20px !important;
					}
					img {
						display: none;
					}
				}
			}
			float: left;
			margin-left: 50px;

			> div {
				float: left;
				margin-top: 15px;

				&:first-of-type {
					margin-left: 40px;
					margin-right: 50px;
				}

				img {
					float: left;
					height: 36px;
					width: 36px;
					margin-right: 10px;
				}

				div {
					float: left;
					font-weight: bold;
					color: #fff;
					span {
						color: gray;
					}
				}
			}
		}

		#phases-progress {
			display: block;
			float: left;
			max-width: 480px;
			margin-top: 25px;
			margin-left: 20px;
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
			right: 32px;
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

		#right-toolbar-actions {
			.datepicker {
				color: #000;
				margin-top: 3px;
			}

			> div {
				float: left;
				border-right: 1px dashed #fff;
				height: 30px;
				margin-top: 17px;

				&:first-of-type {
					padding-right: 15px;
				}

				&:nth-child(2) {
					padding: 0px 5px;
				}

				&:last-of-type {
					border-right: 0px;
				}

				button {
					min-height: auto;
					min-width: auto;
					padding: 0px;
					line-height: 0px;
					text-transform: none;
				}

				.md-avatar {
					min-height: auto;
					height: 30px;
					.md-icon {
						top: 39%;
					}
				}

				.md-avatar .md-icon {
					top: 39%;
				}
			}
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
		@media screen and (max-width: 1025px) {
			h2 {
				padding-right: 10px !important;
			}
		}
		background: #2196F3 !important;
		color: #fff;
		padding: 0px;
		width: 100%;
		.md-select-container {
			.md-select {
				margin-top: 13px !important;
			}
		}
		.md-select-container, .top-info {
			&.selected {
				background: darken(#2196F3, 15%);
			}

			flex: 1;
			height: 64px;
			cursor: pointer;
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

	.jenny-dialog .md-dialog {
		padding: 0px 30px;
	}

	#jenny-button {
		background-color: #FFEB3B !important;
		color: #000;
	}

	#delimiter {
		height: 15px;
		width: 1px;
		margin:0px 10px;
		background: #000;
		display: inline-block;
	}

	#deliveries-count {}

	.flex-1 {
		flex: 1;
	}
</style>