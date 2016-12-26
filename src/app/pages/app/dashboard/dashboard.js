/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */

import AppLayout from './../../../layouts/app/app.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import FileUpload from 'vue-upload-component'
import store from '../../../utils/store'
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
	},
});

export default {
	data() {
		return {
			setup: store.getters.setup,
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
		appLayout: AppLayout,
			FileUpload: FileUpload,
			gmapMap: VueGoogleMaps.Map,
			gmapMarker: VueGoogleMaps.Marker
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
};
