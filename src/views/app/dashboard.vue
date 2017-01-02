<template>
	<app-layout>
		<div class="container-fluid" id="dashboard-container">
			<div class="row">
				<component v-for="panel in panels" :is="panel"></component>
			</div>
		</div>
	</app-layout>
</template>

<script lang="babel">
import Vue from 'vue'

// panels
import FileUploadPanel from '../../components/file-upload-panel'
import ItemChatPanel from '../../components/item-chat-panel'
import ItemEditPanel from '../../components/item-edit-panel'
import ListPanel from '../../components/list-panel'
import MapPanel from '../../components/map-panel'

export default {
	store: ['setup', 'phase'],
	data() {
		return {
			popup: {
				opened: false,
				position: {}
			},
			toggle: false,
			selectedItem: null
		}
	},
	computed: {
		panels: function(){
			switch(this.phase)
			{
				case 'planning.upload':
					return {
						FileUploadPanel: FileUploadPanel,
						MapPanel: MapPanel
					}

					break;

				case 'planning.edit':
					return {
						ListPanel: ListPanel,
						ItemEditPanel: ItemEditPanel,
						MapPanel: MapPanel
					}

					break;

				case 'planning.schedule':
					return {
						ListPanel: ListPanel,
						ItemEditPanel: ItemEditPanel,
						MapPanel: MapPanel
					}
					break;

				case 'planning.ready':

					break;

				case 'monitoring':
					return {
						ListPanel: ListPanel,
						ItemChatPanel: ItemChatPanel,
						MapPanel: MapPanel
					}
					break;
			}
		}
	}
}

</script>

<style lang="scss" scoped>
	#gmap_canvas img {
		max-width: none !important;
		background: none !important;
		z-index: 1;
	}

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
	}

	.col-xs, .col-xs-4 {
		padding-right: 0px;
		padding-left: 0px;
		height: calc(100vh - 64px * 2);
	}

	.md-whiteframe {
		height: 100%;
	}
</style>