<template>
	<div class="col-xs">
		<map-time-slots v-show="phase == 'planning.schedule' || phase == 'monitoring'"></map-time-slots>
		<gmap-map
				:center="mapCenter"
				:zoom="8"
				:zoomControl="true"
				:scaleControl="true"
				:draggable="true"
				id="map"
				@rightclick="mapRclicked"
				:options="options" @resize="onMapResize">
			<gmap-marker
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					:draggable="false"
					:icon="m.icon"
					@click="onMarkerClick(m, index)">
				<gmap-info-window
						:content="m.text"
						:opened="m.opened"
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
		store: ['setup', 'phase', 'mapCenter', 'selectedItem', 'deliveries', 'routePlan', 'conversations'],
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
						markers.push({
							position: {
								lat: delivery.address.coordinates.latitude,
								lng: delivery.address.coordinates.longitude
							},
							opened: false,
							text: delivery.recipient.firstName + ' ' + delivery.recipient.lastName + ' : ' + delivery.address.formattedAddress,
							icon: {
								url: this.getMarkerIconUrl(delivery)
							}
						})
					}
				}

				if(this.onPhaseMonitoring()) {
					for (var i in this.conversations){
						for(var y in this.conversations[i].deliveries) {
							var delivery = this.conversations[i].deliveries[y]
							markers.push({
								position: {
									lat: delivery.address.coordinates.latitude,
									lng: delivery.address.coordinates.longitude
								},
								opened: false,
								text: delivery.recipient.firstName + ' ' + delivery.recipient.lastName + ' : ' + delivery.address.formattedAddress,
								icon: {
									url: this.getMarkerIconUrl(delivery)
								}
							})
						}
					}
				}

				return markers
			}
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
			getMarkerIconUrl (delivery) {
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
						if(delivery.state == 'CREATED' && this.routePlan.state == 'ROUTED'){
							return `${baseUrl}created-${delivery.positionInRoute}.png`
						}

						if (delivery.state == 'POSTPONED' && this.routePlan.state == 'ROUTED'){
							return `${baseUrl}postponed-${delivery.positionInRoute}.png`
						}

						break;

					case 'monitoring':
						return `${baseUrl}in-progress.png`
						// @TODO decide icon by conversation state
						if(delivery.conversationState == 'CONFIRMED'){
							return `${baseUrl}confirmed.png`
						}

						if(delivery.conversationState == 'IN_PROGRESS'){
							return `${baseUrl}in-progress.png`
						}

						if(delivery.conversationState == 'NO_RESPONSE'){
							return `${baseUrl}no-response.png`
						}

						if(delivery.conversationState == 'POSTPONED'){
							return `${baseUrl}postponed-conversation.png`
						}
						break;
				}
			},
			mapRclicked (mouseArgs) {
				const createdMarker = this.addMarker();
				createdMarker.position.lat = mouseArgs.latLng.lat();
				createdMarker.position.lng = mouseArgs.latLng.lng();
			},
			addMarker: function addMarker() {
				this.markers.push({
					position: { lat: 48.8538302, lng: 2.2982161 },
					opacity: 1,
					draggable: false,
					enabled: false,
					clicked: 0,
					rightClicked: 0,
					icon: {
						url: 'https://s27.postimg.org/nw2j43dbn/marker_in_progress_icon.png',
					},
					dragended: 0
				});
				return this.markers[this.markers.length - 1];
			},
			onMarkerClick(marker, index) {
				for(let i in this.markers){
					this.markers[i].opened = false
				}
				marker.opened = true
				this.mapCenter = marker.position
				this.selectItem(this.deliveries[index])
				setTimeout(() => this.mapCenter = marker.position, 1000)
				//this.selectItem()
			},
			selectItem(item) {
				this.selectedItem = item
			},
			onMapResize() {

			}
		}

	}
</script>

<style scoped lang="scss">

</style>