<template>
	<div class="col-xs" v-if="selectedItem !== null">
		<md-whiteframe md-tag="section" id="edit-panel">
			<div class="item-details">
				<div class="row">
					<div class="col-xs-8 principal">
						<div class="title">{{ selectedItem.recipient.firstName + ' ' + selectedItem.recipient.lastName
							}}
						</div>
						<div id="places-input" class="item-detail" v-if="onPhaseRoute()">
							<md-icon>location_on</md-icon>
							<place-input placeholder="Search location"
							             :default-place="selectedItem.address.formattedAddress"
							             @place_changed="onPlaceChange" ref="placeComponent"></place-input>
						</div>
						<md-input-container class="item-detail" v-else>
							<md-icon>location_on</md-icon>
							<md-input v-model="selectedItem.address.formattedAddress" disabled></md-input>
						</md-input-container>
						<md-input-container class="item-detail" :class="{'md-input-invalid': !valid_phone}">
							<md-icon>call</md-icon>
							<md-input v-model="selectedItem.recipient.phone" :disabled="!onPhaseRoute()"></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
							<md-icon>inbox</md-icon>
							<md-input v-model="selectedItem.retailer.name" disabled></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
							<i class="fa fa-truck"></i>
							<md-input v-model="selectedItem.barcode" disabled></md-input>
						</md-input-container>
					</div>
					<div class="col-xs-4 secondary">
						<div class="status" style="margin-top:13px;">
							<img src="~assets/img/status_icon_1.png">
							<div style="color:#9a67d9;font-size:12px;padding-top:5px;">{{selectedItem.state}}</div>
						</div>
						<div class="item-detail">{{selectedItem.shippingDate}}</div>
						<div id="timeslot-picker" class="item-detail" v-if="!onPhaseRoute()">
							<vue-timepicker format="hh:mm A" :minute-interval="30"></vue-timepicker>
							<span style="display:inline-block;margin-top:3px;">{{ timeSlotEnd }}<md-tooltip
									md-direction="bottom">Time slot end</md-tooltip></span>
						</div>
					</div>
				</div>
				<div class="cancel">
					<md-button class="md-primary md-icon-button" @click="unselectItem()">
						<md-icon>clear</md-icon>
					</md-button>
				</div>
			</div>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	import * as VueGoogleMaps from 'vue2-google-maps'
	import Vue from 'vue'
	import VueTimepicker from 'vue2-timepicker'
	import {isValidNumber} from 'libphonenumber-js'

	Vue.use(VueGoogleMaps, {
		load: {
			language: 'en',
			key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
			libraries: 'places',
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

		watch: {
			'selectedItem.recipient.phone': function(){
				if(this.selectedItem !== null) {
					this.onPhoneChange()
				}
			}
		},

		data() {
			return {
				valid_phone: false
			}
		},

		methods: {
			unselectItem() {
				this.selectedItem = null;
			},
			onPlaceChange(value) {
				const newFormattedAddress = value.formatted_address
				this.$services.Deliveries.update(this.selectedItem.id, {
					id: this.selectedItem.id,
					address: {
						formattedAddress: newFormattedAddress
					}
				}).then((response) => {
					console.log('updated', response)
				})
			},
			onPhoneChange() {
				this.valid_phone = isValidNumber(this.selectedItem.recipient.phone)
				console.log(this.valid_phone)
				if(this.valid_phone) {
					this.$services.Recipients.update(this.selectedItem.recipientId, {
						id: this.selectedItem.recipientId,
						phone: this.selectedItem.recipient.phone
					}).then((response) => {
						console.log('updated', response)
					})
				}
			}
		},

		computed: {
			place: function () {
				return {
					name: this.selectedItem.address.formattedAddress
				}
			},
			timeSlotEnd: function () {
				/**var h = parseInt(this.selectedItem.timeSlotStart.hh);
				 h = parseInt(h + 2)
				 if (h < 10) {
					h = '0' + h
				}
				 return h + ':' + this.selectedItem.timeSlotStart.mm;**/
			}
		}

	}
</script>

<style lang="scss">
	.md-whiteframe {
		height: 100%;

		&#edit-panel {
			background: #ecedf0;

			> .item-details {
				background: #fff;
				padding: 20px;

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
						border: 0px;
						background-color: transparent;
						background-image: none;
					}

					input {
						border: 0px;
						padding-bottom: 5px !important;
						border-bottom: 1px solid #ddd;
						width: 93%;

						&:focus {
							border-bottom-color: #3F51B5;
							border-bottom-width: 2px;
						}
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
			margin-top: 11px;
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
			width: 100% !important;
			border-bottom: 1px solid #ddd;
			font-size: 16px;

			&:focus {
				border-bottom-color: #3F51B5;
				border-bottom-width: 2px;
			}
		}

		margin-bottom: 20px;
	}
</style>
