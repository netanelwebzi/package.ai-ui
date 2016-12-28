<template>
	<app-layout>
		<!--<div id="map" style="display: block;height:500vh;width:100%;"></div>-->
		<div class="container-fluid" id="dashboard-container">
			<div class="row">
				<div class="col-xs-4">
					<md-whiteframe md-tag="section" id="list-panel">
						<div class="file-drop" v-if="setup.step === 1">
							<file-upload ref="fileUploader" :events="fileUploadedEvents" post-action="https://httpbin.org/post" :drop="true"></file-upload>
							<div>
								<div>
									<md-icon>backup</md-icon>
									<div>
										Drag & drop your delivery list here
									</div>
								</div>
							</div>
						</div>

						<md-list class="custom-list md-triple-line" v-if="setup.step === 2 || setup.step === 3">
							<md-list-item v-for="item in setup.items" @click="selectItem(item)" :class="{ selected: setup.selectedItem === item }">
								<div class="md-list-text-container">
									<h1>{{ item.title }}</h1>
									<h2>{{ item.address }}</h2>
									<p>{{ item.description }}</p>
								</div>

								<md-button class="md-icon-button md-list-action">
									<md-icon class="md-primary">star</md-icon>
								</md-button>

								<md-divider class="md-inset"></md-divider>
							</md-list-item>
						</md-list>
					</md-whiteframe>
				</div>
				<!--<transition name="fade">-->
				<div class="col-xs" v-if="setup.step === 3">
					<md-whiteframe md-tag="section" id="chat-panel">
						<div class="item-details">
							<div class="row">
								<div class="col-xs-8">
									<div class="title">
										{{ setup.selectedItem.title }}
									</div>
									<div class="spacer-20"></div>

									<md-input-container>
										<label>Address</label>
										<md-input v-model="setup.selectedItem.address"></md-input>
									</md-input-container>
									<md-input-container>
										<label>Time slot</label>
										<md-input v-model="setup.selectedItem.timeSlot"></md-input>
									</md-input-container>
								</div>
								<div class="col-xs-4">
									<div class="status">
										<md-icon class="md-primary">done</md-icon>
										<div>
											Done!
										</div>
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
				<!--</transition>-->
				<div class="col-xs">
					<map-time-slots></map-time-slots>
					<gmap-map
							:center="center"
							:zoom="7"
							:zoomControl="true"
							:scaleControl="true"
							:draggable="true"
							:options="options"
					>
						<gmap-marker
								v-for="m in markers"
								:position="m.position"
								:clickable="true"
								:draggable="false"
								@click="m.opened=true"
						>
							<gmap-info-window
									:content="m.text"
									:opened="m.opened"
									@closeclick="m.opened=false"
							></gmap-info-window>
						</gmap-marker>
					</gmap-map>
				</div>
			</div>
		</div>
	</app-layout>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import FileUpload from 'vue-upload-component'
import Vue from 'vue'
import MapTimeSlots from '../../components/map-time-slots'


Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
	},
})

export default {
	store: ['setup'],
	data() {
		return {
			fileUploadedEvents: {
				add: (file, component) => {
					component.active = true
				}
			},
			popup: {
				opened: false,
				position: {}
			},
			options: {
				zoomControl: true,
				scaleControl: true,
				streetViewControl: false,
				fullScreeenControl: true
			},
			toggle: false,
			selectedItem: null,
			center: {lat: 10.0, lng: 10.0},
			markers: [{
				position: {lat: 10.0, lng: 10.0},
				opened: false,
				text: 'text'
			}, {
				position: {lat: 11.0, lng: 11.0},
				opened: false,
				text: 'text'
			}]
		}
	},
	components: {
		FileUpload: FileUpload,
		gmapMap: VueGoogleMaps.Map,
		gmapMarker: VueGoogleMaps.Marker,
		MapTimeSlots: MapTimeSlots
	},
	methods: {
		fileUploaded() {
			this.setup = {
				step: 2,
				items: [
					{
						id: 1,
						title: 'Lorem Ipsum bla bla bla...',
						description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
						address: 'BlaBla 7, Tel Aviv, Israel',
						phoneNumber: '050-1231231',
						status: 'in-progress',
						date: new Date(),
						timeSlot: '14:00 - 14:15'
					},
					{
						id: 2,
						title: 'Lorem Ipsum bla bla bla 2...',
						description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
						address: 'BlaBla 7, Tel Aviv, Israel',
						phoneNumber: '050-1231231',
						status: 'in-progress',
						date: new Date(),
						timeSlot: '14:00 - 14:15'
					}
				]
			}
		},
		selectItem(item) {
			this.setup.step = 3
			this.$set(this.setup, 'selectedItem', item)
		},
		unselectItem() {
			this.setup.step = 2
			delete this.setup.selectedItem
		},
		onMarkerClicked: function ($event) {
			console.log($event)
		},
		showPopup: function (m, event) {
			console.log(arguments);
			var popup;
			this.center = m.position;
			m.opened = true;
			popup = $('<div class="popup-google-map"><span class="close"></span>' + m.text + '</div>');
		}
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
	#gmap_canvas img{max-width:none!important;background:none!important;z-index:1;}
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
						border: 6px dashed #88979d;
						margin: 16px 16px 16px 32px;
						position: relative;
						line-height: 40px;


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
							color: #000;
							font-size: 32px;
							text-align: center;

							i {
								width: 80px;
								max-width: 80px;
								height: 80px;
								max-height: 80px;
								font-size: 80px;
								margin-bottom: 5px;
								color: #00baff;
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