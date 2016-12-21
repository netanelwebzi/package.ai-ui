/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */

import AppLayout from './../../../layouts/app/app.vue'
import Vue from 'vue';

export default {
	data() {
		return {
			toggle: false,
			selectedItem: null
		}
	},
	components: {
		appLayout: AppLayout,
	},
	mounted() {
	}
};
