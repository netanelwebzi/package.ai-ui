<template>
	<div class="col-xs" v-if="selectedItem !== null">
		<md-whiteframe md-tag="section" id="chat-panel">
			<div class="item-details">
				<div class="row">
					<div class="col-xs-8 principal">
						<div class="title">{{ selectedItem.recipientFirstName + ' ' + selectedItem.recipientLastName
							}}
						</div>
						<md-input-container class="item-detail">
							<md-icon>location_on</md-icon>
							<md-input v-model="selectedItem.address" disabled></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
							<md-icon>call</md-icon>
							<md-input v-model="selectedItem.recipientPhone" :disabled="!onPhaseRoute()"></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
							<md-icon>inbox</md-icon>
							<md-input v-model="selectedItem.store" disabled></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
							<i class="fa fa-truck"></i>
							<md-input disabled></md-input>
						</md-input-container>
					</div>
					<div class="col-xs-4 secondary">
						<div class="status">
							<img src="~assets/img/status_icon_1.png">
							<div style="color:#9a67d9;font-size:12px;padding-top:5px;">In Progress</div>
						</div>
						<div class="item-detail">Mon, 08/11/2016</div>
						<div id="timeslot-picker" class="item-detail">
							<vue-timepicker format="hh:mm A" :minute-interval="30"></vue-timepicker>
						</div>
					</div>
				</div>
				<div class="cancel">
					<md-button class="md-primary md-icon-button" @click="unselectItem()">
						<md-icon>clear</md-icon>
					</md-button>
				</div>
			</div>
			<div id="chatter">
				<div v-for="(msg, msgIndex) in selectedItem.chatMessages" class="chat regular"
				     v-bind:class="">
					<div class="chat-image">
						<div class="no-image" v-if="msg.direction == 'INCOMING'">{{ selectedItem.recipientFirstName.charAt(0) }}</div>
						<div v-else><img src="~assets/img/jenny_avatar.png"></div>
						<div class="time text-center">{{ moment(msg.created).format('HH:mm') }}</div>
					</div>
					<div>
						<div class="chat-content">{{ msg.text }}</div>
					</div>
				</div>
			</div>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	import * as VueGoogleMaps from 'vue2-google-maps'
	import Vue from 'vue'
	import VueTimepicker from 'vue2-timepicker'

	Vue.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
			libraries: 'places',
			language: 'en',
			options: {
				language: 'en'
			}
		},
	})



	export default {

		store: ['selectedItem'],

		components: {
			PlaceInput: VueGoogleMaps.PlaceInput,
			VueTimepicker: VueTimepicker
		},

		data() {
			return {
				messages: [{
					time: '12:00',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.',
					user_id: 2
				}, {
					time: '12:00',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.' +
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.',
					user_id: 1
				}, {
					time: '12:00',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.' +
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.',
					user_id: 1
				}, {
					time: '12:00',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.' +
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.',
					user_id: 1
				}, {
					time: '12:00',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.' +
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem itaque maxime quidem vero.',
					user_id: 1
				}]
			}
		},

		methods: {
			unselectItem() {
				this.selectedItem = null
			}
		},

		mounted() {
//			let that = this
//			this.$nextTick(function () {
//				var container = that.$el.querySelector("#chatter");
//				container.scrollTop = container.scrollHeight;
//			})
		}

	}
</script>

<style lang="scss">
	.md-whiteframe {
		height: 100%;

		&#chat-panel {
			background: #ecedf0;

			> .item-details {
				background: #fff;
				padding: 20px;
				height: 164px;
				box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
				overflow: hidden;

				.secondary {
					margin-top: -10px;
					.item-detail {
						margin-top: 5px;
					}
					.item-detail, .item-detail input {
						font-size: 12px;
					}
				}

				.title {
					line-height: 1.1em;
					color: #00baff;
					font-size: 18px;
					font-weight: 200;
					font-family: 'overpass', arial;
				}

				.status {
					text-align: center;
					margin-top: 0;
					padding-bottom: 10px;
					position: relative;
					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						width: 60%;
						margin-left: -30%;
						border-bottom: 1px dashed #a8a8a8;
					}
					$size-md-icon-here: 50px;
					.md-icon {
						width: $size-md-icon-here;
						max-width: $size-md-icon-here;
						height: $size-md-icon-here;
						max-height: $size-md-icon-here;
						font-size: $size-md-icon-here;
					}

					div {
						font-size: 16px;
						line-height: 1em;
					}
				}

				.cancel {
					position: absolute;
					top: 0px;
					right: -2px;
				}

				.item-detail, .item-detail input {
					margin: 0;
					padding: 0;
					color: #777;
					font-size: 15px;
					height: auto;
					min-height: auto;
					line-height: 1.1em;
				}
				.item-detail {
					margin-top: 10px;
					padding-top: 2px;
					padding-bottom: 2px;
					margin-left: 24px;
					position: relative;
					label {
						margin: 0;
						padding: 0;
					}
					.md-icon, i.fa {
						left: -27px;
						top: -3px;
						position: absolute;
					}
					i.fa {
						font-size: 22px;
					}
					input, &::after {
						border: none;
						background-color: transparent;
						background-image: none;
					}
				}
			}
		}
	}

	.col-xs, .col-xs-4 {
		padding-right: 0px;
		padding-left: 0px;
		height: calc(100vh - 64px * 2);
	}

	#timeslot-picker {
		label {
			font-size: 12px;
			display: block;
			margin-bottom: 5px;
		}

		margin-bottom: 20px;

		input {
			border: 0px;
			border-bottom: 1px solid #ddd;
			width: 100%;
		}

		.time-picker {
			display: block;
			width: 100%;
		}
	}

	#places-input {
		label {
			font-size: 12px;
			display: block;
			margin-bottom: 5px;
		}

		input {
			outline: 0;
			border: 0px;
			width: 100%;
			border-bottom: 1px solid #ddd;
			font-size: 16px;

			&:focus {
				border-bottom-color: #3F51B5;
				border-bottom-width: 2px;
			}
		}

		margin-bottom: 20px;
	}

	#chatter {
		padding-top: 15px;
		padding-bottom: 20px;
		overflow: scroll;
		height: calc(100vh - 64px * 2 - 150px);
		.chat {
			display: flex;
			flex-flow: row;
			padding: 10px;
			.no-image {
				height: 50px;
				width: 50px;
				border-radius: 50%;
				background-color: #9A67D9;
				color: #fff;
				font-size: 30px;
				font-weight: bold;
				text-align: center;
				line-height: 50px;
			}
			&.reverse {
				.chat-image {
					order: 1;
				}
				.chat-content {
					margin-left: 10px;
					margin-right: 20px;
					background-color: #00baff;
					color: #fff;
					font-weight: 300;
					&:before {
						right: -10px;
						border-right: 0;
						border-left: 10px solid #00baff;
					}
				}
			}
			&.regular {
				.chat-content {
					&:before {
						left: -10px;
					}
				}

			}
			.chat-content {
				position: relative;
				padding: 10px;
				background-color: #fff;
				margin-left: 20px;
				margin-right: 10px;
				border-radius: 5px;
				&:before {
					content: '';
					position: absolute;
					top: 15px;
					border-right: 10px solid #fff;
					border-top: 10px solid transparent;
					border-bottom: 10px solid transparent;
				}
			}
		}
	}
</style>
