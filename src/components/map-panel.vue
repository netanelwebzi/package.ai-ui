<template>
	<div class="col-xs">
		<map-time-slots v-show="phase == 'planning.schedule' || phase == 'monitoring'"></map-time-slots>
		<gmap-map
				:center="mapCenter"
				:zoom="2"
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
					@click="onMarkerClick(m, index)" v-if="phase !== 'planning.upload'">
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
		store: ['setup', 'phase', 'mapCenter', 'selectedItem', 'deliveries'],
		components: {
			gmapMap: VueGoogleMaps.Map,
			gmapMarker: VueGoogleMaps.Marker,
			MapTimeSlots: MapTimeSlots
		},
		computed: {
			markers() {
				let markers = []

				for(var i in this.deliveries){
					var delivery = this.deliveries[i]
					markers.push({
						position: {lat: delivery.address.coordinates.latitude, lng: delivery.address.coordinates.longitude},
						opened: false,
						text: delivery.id,
						icon: {
							url: 'https://s27.postimg.org/nw2j43dbn/marker_in_progress_icon.png'
						}
					})
				}

				return markers
			}
		},
		data() {

			return {
				center: {lat: 10.0, lng: 10.0},
				options: {
					zoomControl: true,
					scaleControl: true,
					streetViewControl: false,
					fullScreeenControl: true
				}
			}
		},

		methods: {
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
				marker.opened = true
				this.mapCenter = marker.position
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