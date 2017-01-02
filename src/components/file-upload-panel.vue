<template>
	<div class="col-xs-4">
		<md-whiteframe md-tag="section" id="upload-panel">
			<div class="file-drop">
								<!--<file-upload ref="fileUploader" post-action="/upload" :events="events"-->
											 <!--:extensions="extensions" :files="files" :title="'Choose csv file'"-->
											 <!--drop=".file-drop" class="md-button md-primary md-raised"></file-upload>-->

<!--				<div>
					<div>
						<md-icon>backup</md-icon>
						<div>
							Drag & drop your delivery list here
							<br />
							OR
							<br />
						</div>
					</div>
				</div>-->
				<dropzone id="file-dropzone" @vdropzone-success="onFileUploaded" url="https://httpbin.org/post" :useCustomDropzoneOptions="useCustomDropzoneOptions" :dropzoneOptions="dropzoneOptions"></dropzone>
			</div>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	import FileUpload from 'vue-upload-component'
	import Dropzone from 'vue2-dropzone'
	export default {

		store: ['setup', 'phase'],

		data() {
			return {
				files: [],
				extensions: ['xls', 'xlsx', 'csv'],
				fileUploadedEvents: {
					add: (file, component) => {
						component.active = true
					}
				},
				events: {

				},
				dropzoneOptions: {
					dictDefaultMessage: '<i class="md-icon material-icons md-theme-default">backup</i>Drag & Drop your delivery list here'
				},
				useCustomDropzoneOptions: true
			}
		},
		methods: {
			onFileUploaded: function(){
				setTimeout(() => this.phase = 'planning.edit', 3000)
			}
		},
		components: {
			Dropzone
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