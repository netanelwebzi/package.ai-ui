<template>
	<div class="col-xs">
		<map-time-slots v-show="phase == 'planning.schedule' || phase == 'monitoring'"></map-time-slots>
		<gmap-map
				:center="mapCenter"
				:zoom="7"
				:zoomControl="true"
				:scaleControl="true"
				:draggable="true"
				id="map"
				:options="options" @resize="onMapResize">
			<gmap-marker
					v-for="(m, index) in markers"
					:position="m.position"
					:clickable="true"
					:draggable="false"
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
			key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
		},
	})

	export default {
		store: ['setup', 'phase', 'mapCenter'],
		components: {
			gmapMap: VueGoogleMaps.Map,
			gmapMarker: VueGoogleMaps.Marker,
			MapTimeSlots: MapTimeSlots
		},
		data() {
			return {
				center: {lat: 10.0, lng: 10.0},
				markers: [{
					position: {lat: 10.0, lng: 10.0},
					opened: false,
					text: 'text'
				}, {
					position: {lat: 11.0, lng: 11.0},
					opened: false,
					text: 'text'
				}],
				options: {
					zoomControl: true,
					scaleControl: true,
					streetViewControl: false,
					fullScreeenControl: true
				}
			}
		},

		methods: {
			onMarkerClick(marker, index) {
				marker.opened = true
				this.selectItem(this.setup.items[index])
			},
			selectItem(item) {
				this.setup.step = 3
				this.$set(this.setup, 'selectedItem', item)
				this.mapCenter = {lat: 10.0, lng: 10.0}
			},
			onMapResize() {
				console.log('cool resize')
			}
		}

	}
</script>

<style scoped lang="scss">

</style>