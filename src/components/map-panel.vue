<template>
	<div class="col-xs">
		<md-button id="map-focus-button" class="md-raised" @click="focus()" v-show="!onPhaseUpload()">
			<md-tooltip md-direction="top">Click for auto zoom map to markers</md-tooltip>
			<md-icon>center_focus_weak</md-icon>Focus
		</md-button>
		<map-time-slots v-show="!onPhaseUpload() && !onPhaseRoute()"></map-time-slots>
		<gmap-map
				:center="mapCenter"
				:zoom="10"
				:zoomControl="true"
				:scaleControl="true"
				:draggable="true"
				id="map"
				ref="googleMap"
				:options="options" @resize="onMapResize">
			<gmap-marker
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					:draggable="false"
					v-if="isMarkerInTimeSlot(m)"
					:icon="m.icon"
					@click="onMarkerClick(m, index)">
				<gmap-info-window
						:content="m.text"
						:opened="tempMarkers[index].opened"
						@closeclick="m.opened=false"
				></gmap-info-window>
			</gmap-marker>

		</gmap-map>
	</div>
</template>

<script lang="babel">
	import * as VueGoogleMaps from 'vue2-google-maps'
	import MapTimeSlots from './map-time-slots'
	import Vue from 'vue'
	import _ from 'underscore'

	Vue.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
			language: 'en',
			options: {
				language: 'en'
			}
		},
	})

	export default {
		store: ['setup', 'phase', 'mapCenter', 'selectedItem', 'deliveries', 'routePlan', 'conversations' , 'selectedTimeSlot', 'tempMarkers'],
		components: {
			gmapMap: VueGoogleMaps.Map,
			gmapMarker: VueGoogleMaps.Marker,
			MapTimeSlots: MapTimeSlots
		},
		computed: {
			markers() {
				let markers = []
				if(!this.onPhaseUpload() && !this.onPhaseMonitoring()) {
					for (var i in this.deliveries) {
						var delivery = this.deliveries[i]
						if(delivery.address != undefined && delivery.address.coordinates !== undefined && Object.keys( delivery.address.coordinates).length > 0) {
							markers.push({
								position: {
									lat: delivery.address.coordinates.latitude,
									lng: delivery.address.coordinates.longitude
								},
								opened: false,
								deliveryIndex: i,
								deliveryId: delivery.id,
								accurateStartTime: delivery.accurateStartTime,
								text: delivery.recipient.firstName + ' ' + delivery.recipient.lastName + ' : ' + delivery.address.formattedAddress,
								icon: {
									url: this.getMarkerIconUrl(delivery)
								}
							})
						}
					}
				}

				if(this.onPhaseMonitoring()) {
					for (var i in this.conversations){
						let conversationId = this.conversations[i].id
						for(var y in this.conversations[i].deliveries) {
							var delivery = this.conversations[i].deliveries[y]
							markers.push({
								position: {
									lat: delivery.address.coordinates.latitude,
									lng: delivery.address.coordinates.longitude
								},
								conversationId: conversationId,
								deliveryIndex: y,
								conversationIndex: i,
								accurateStartTime: delivery.accurateStartTime,
								opened: false,
								text: delivery.recipient.firstName + ' ' + delivery.recipient.lastName + ' : ' + delivery.address.formattedAddress,
								icon: {
									url: this.getMarkerIconUrl(delivery, this.conversations[i].schedulingState)
								}
							})
						}
					}
				}

				this.tempMarkers = markers

				return markers
			}
		},
		created() {
			this.$events.on('list:item:selected', (item) => {
				setTimeout(() => {
					this.focus()
					if(item !== null && item.id !== null) {
						_.each(this.markers, (marker, key) => {
							if (marker.conversationId == item.id || marker.deliveryId == item.id) {
								this.tempMarkers[key].opened = true
							} else {
								this.tempMarkers[key].opened = false
							}
						})
					}
				}, 500)
			})
			setTimeout(() => {
				this.$refs.googleMap.$mapCreated.then((gmapObject) => {
					if(gmapObject !== undefined) {
						var markers = this.markers
						if(markers.length > 0) {
							var bounds = new window.google.maps.LatLngBounds()

							for (var i = 0; i < markers.length; i++) {
								bounds.extend(markers[i].position)
							}

							gmapObject.fitBounds(bounds)
						}
					}
				})
			}, 5000)
		},
		data() {
			return {
				center: {lat: 51.5287352, lng: 0.1785845},
				options: {
					zoomControl: true,
					scaleControl: true,
					streetViewControl: false,
					fullScreeenControl: true
				}
			}
		},

		methods: {
			isMarkerInTimeSlot(marker) {
				if(this.selectedTimeSlot == null){
					return true
				}

				const x11 = parseInt(marker.accurateStartTime)
				const y11 = parseInt(this.selectedTimeSlot.start)
				const y22 = parseInt(this.selectedTimeSlot.end)

				if(x11 == y11 || (x11 > y11 && x11 < y22)) {
					return true
				} else {
					return false;
				}
			},
			focus () {
				this.$refs.googleMap.$mapCreated.then((gmapObject) => {
					var markers = this.markers
					var bounds = new window.google.maps.LatLngBounds()
					for (var i = 0; i < markers.length; i++) {
						bounds.extend(markers[i].position)
					}

					gmapObject.fitBounds(bounds)
				})
			},
			getMarkerIconUrl (delivery, schedulingState) {
				schedulingState = schedulingState || false
				const baseUrl = 'https://s3.eu-west-2.amazonaws.com/package.ai.eu.demo.static/images/maps/marker-'
				switch (this.phase)
				{
					case 'route':
						if(delivery.state == 'CREATED'){
							return `${baseUrl}created-not-routed.png`
						} else if (delivery.state == 'POSTPONED'){
							return `${baseUrl}postponed-not-routed.png`
						}
						break;

					case 'export':
					case 'jenny':
						if(delivery.state == 'CREATED' && this.routePlan.state == 'ROUTED'){
							return `${baseUrl}created-${delivery.positionInRoute}.png`
						}

						if (delivery.state == 'POSTPONED' && this.routePlan.state == 'ROUTED'){
							return `${baseUrl}postponed-${delivery.positionInRoute}.png`
						}

						break;

					case 'monitoring':
						if(schedulingState == 'CONFIRMED'){
							return `${baseUrl}confirmed.png`
						}

						if(schedulingState == 'IN_PROGRESS'){
							return `${baseUrl}in-progress.png`
						}

						if(schedulingState == 'NO_RESPONSE'){
							return `${baseUrl}no-response.png`
						}

						if(schedulingState == 'POSTPONED'){
							return `${baseUrl}postponed-conversation.png`
						}

						return `${baseUrl}`
						break;
				}
			},
			onMarkerClick(marker, index) {
				for(let i in this.markers){
					this.markers[i].opened = false
				}
				marker.opened = true
				this.mapCenter = marker.position
				if(this.onPhaseMonitoring()) {
					this.selectItem(this.conversations[marker.conversationIndex])
				} else {
					this.selectItem(this.deliveries[marker.deliveryIndex])
				}
				setTimeout(() => this.mapCenter = marker.position, 1000)
				//this.selectItem()
			},
			selectItem(item) {
				if(this.onPhaseMonitoring()){
					this.$services.Conversations.getMessages(item.id).then((messages) => {
						item.chatMessages = messages
						this.selectedItem = item
					})
				} else {
					this.selectedItem = item
				}
				this.$events.emit('list:item:selected')
			},
			onMapResize() {

			}
		}

	}
</script>

<style scoped lang="scss">
	#map-focus-button {
		position: absolute;
		z-index: 999999;
		bottom: 29px;
		line-height: 32px !important;
		min-height: 32px !important;
		right: 80px;
	}
</style>