/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */

import AppLayout from './../../../layouts/app/app.vue'
import {load, Map, Marker} from 'vue-google-maps'
load({
  key: 'AIzaSyC182qWUU8rYQxXor7hBPuwCnhoBsePTmA',
  v: '3.25',                // Google Maps API version
  libraries: 'places',   // If you want to use places input
})
export default {
	components: {
		appLayout: AppLayout,
		packageMap: Map
	},
};
