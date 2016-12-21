/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */

import AppLayout from './../../../layouts/app/app.vue'
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
  },
});

export default {
	data() {
		return {
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
    components: {
      gmapMap: VueGoogleMaps.Map,
      gmapMarker: VueGoogleMaps.Marker
    }
	},
  methods: {
	  showPopup: function (m, event) {
	    console.log(arguments);
      var popup;
	    this.center = m.position;
	    m.opened = true;
	    popup = $('<div class="popup-google-map"><span class="close"></span>'+m.text+'</div>');
    }
  },
	mounted() {
	}
};
