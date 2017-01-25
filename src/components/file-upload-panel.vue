<template>
	<div class="col-xs-4">
		<md-whiteframe md-tag="section" id="upload-panel">
			<div class="file-drop">
				<dropzone ref="dropzoneUploader" id="file-dropzone" @vdropzone-success="onFileUploaded" @vdropzone-error="onFileError" :url="endpointUrl" :useCustomDropzoneOptions="useCustomDropzoneOptions" :dropzoneOptions="dropzoneOptions"></dropzone>
			</div>
		</md-whiteframe>
		<md-dialog-alert
				:md-content-html="failedDialogMessage"
				md-ok-text="OK, I will try again"
				ref="failedDialog">
		</md-dialog-alert>
	</div>
</template>

<script lang="babel">
	import FileUpload from 'vue-upload-component'
	import Dropzone from 'vue2-dropzone'
	import config from '../core/config'
	import {Deliveries} from '../core/services'
	export default {

		store: ['setup', 'phase', 'currentDate', 'displayOverlay', 'overlayMessage', 'currentDate', 'deliveries'],

		data() {
			let that = this
			return {
				failedDialogMessage: 'test',
				resourceId: null,
				files: [],
				extensions: ['xls', 'xlsx', 'csv'],
				endpointUrl: `${config.api.baseUrl}deliveries/upload`,
				dropzoneOptions: {
					init: function(){
						this.on('sending', function(file, xhr, formData){
							const date = that.moment(that.currentDate).format('YYYY-MM-DD')
							formData.append('data', JSON.stringify({date: date}))
						})
					},
					paramName: 'uploaded_file',
					dictDefaultMessage: '<i class="md-icon material-icons md-theme-default">backup</i>Drag & Drop your delivery list here'
				},
				useCustomDropzoneOptions: true
			}
		},
		methods: {
			onFileUploaded: function(file, response){
				console.log(file, response)
				this.resourceId = response.uploadId
				this.listen()
				this.displayOverlay = true
				this.overlayMessage = 'Processing deliveries...'
//				setTimeout(() => this.phase = 'route', 3000)
			},
			onFileError(file) {
				const message = JSON.parse(file.xhr.response).message
				this.failedDialogMessage = message
				this.$refs.dropzoneUploader.removeAllFiles()
				this.resourceId = null
				this.$refs.failedDialog.open()
			},
			listen() {
				let that = this
				let channel = this.$services.pusher.subscribe(`private-only_tenant.dev.deliveries_uploads.${this.resourceId}.demo`)
				channel.bind_global((event, data) => {
					switch(event)
					{
						case 'FAILED':
							// @TODO data.payload.error : need to decide what to display
							this.displayOverlay = false
							this.$refs.dropzoneUploader.removeAllFiles()
							this.resourceId = null
							this.failedDialogMessage = 'Invalid deliveries found on this file. Please try to upload a valid deliveries file'
							this.$refs.failedDialog.open()
							break;

						case 'SUCCESS':
							this.phase = 'route'
							this.displayOverlay = true
							const date = that.moment(that.currentDate).format('YYYY-MM-DD')
							setTimeout(() => {
								Deliveries.get(date).then((deliveries) => {
									that.deliveries = deliveries
									that.displayOverlay = false
								})
							}, 300)
							break;

						default:

							break;
					}
					console.log('the event ' + event + ' fired !', data)
				})
			}
		},
		components: {
			Dropzone
		},

		created() {
		}

	}
</script>

<style lang="scss">
	.col-xs, .col-xs-4 {
		padding-right: 0px;
		padding-left: 0px;
		height: calc(100vh - 64px * 2);
	}

	#upload-panel {
		background: #fff;
		padding-top: 25px;
	}

	.file-drop {
		height: calc(100% - 32px);
		border: 6px dashed #88979d;
		margin: 0px 16px 0px 32px;
		clear: both;
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

	.md-whiteframe {
		height: 100%;
	}

	.dropzone {
		height: 100%;
		min-height: 100%;
		font-size: 30px;
		border: 0px;
		border: 0px !important;
		.dz-message {
			margin: 6em 0 !important;
			color: #000;

			i {
				color: #00baff;
				display: block;
				font-size: 50px;
				padding-bottom: 50px;
				padding-left: 0px;
				margin: auto;
			}
		}

		.dz-preview {
			position: static !important;
		}
	}
</style>