<template>
	<div class="col-xs-4">
		<md-whiteframe md-tag="section" id="list-panel">
			<div class="file-drop" v-if="setup.step === 1">
<!--
				<file-upload ref="fileUploader" post-action="/upload" :events="events"
				             :extensions="extensions" :files="files" :title="'Choose csv file'"
				             drop=".file-drop" class="md-button md-primary md-raised"></file-upload>
-->

				<div>
				<div>
				<md-icon>backup</md-icon>
				<div>
				Drag & drop your delivery list here
				<br />
				OR
				<br />
				</div>
				</div>
				</div>
			</div>

			<div v-if="setup.step >= 2" style="padding:0px 15px;">
				<div class="row">
					<div class="col-xs-1" style="padding-top:25px;">
						<md-icon>search</md-icon>
					</div>
					<div class="col-xs-11">
						<md-input-container>
							<label>Search package or conversation...</label>
							<md-input v-model="itemsSearch"></md-input>
						</md-input-container>
					</div>
				</div>
			</div>

			<md-list class="custom-list md-triple-line" v-if="setup.step === 2 || setup.step === 3">
				<md-list-item v-for="item in filteredItems" @click="selectItem(item)"
				              :class="{ selected: setup.selectedItem === item }">
					<div class="md-list-text-container">
						<h1>{{ item.title }}</h1>
						<p>{{ item.description }}</p>
					</div>

					<md-button class="md-icon-button md-list-action">
						<md-icon class="md-primary">star</md-icon>
					</md-button>

					<md-divider class="md-inset"></md-divider>
				</md-list-item>
			</md-list>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	export default {
		store: ['setup'],

		data() {
			return {
				itemsSearch: '',
				selectedItem: null
			}
		},

		computed: {
			filteredItems: function(){
				let search = this.itemsSearch
				return this.setup.items.filter(function(item){
					return item.title.indexOf(search) !== -1 || item.description.indexOf(search) !== -1
				})
			}
		},

		methods: {
			selectItem(item) {
				this.setup.step = 3
				this.$set(this.setup, 'selectedItem', item)
			},
			unselectItem() {
				this.setup.step = 2
				delete this.setup.selectedItem
			}
		}

	}
</script>


<style scoped lang="scss">
	.md-whiteframe {
		height: 100%;

		&#list-panel {
			background: #fff;
			overflow-y: scroll;

			.md-divider.md-inset {
				margin-left: 0px;
			}

			.md-list {
				padding: 0px;

				.selected {
					background: #00baff;
					color: #fff;
					.md-icon, p, span {
						color: #fff;
					}
				}
			}
		}

		&#chat-panel {
			background: #ecedf0;

			> .item-details {
				background: #fff;
				padding: 20px;

				.title {
					line-height: 36px;
					color: #2196F3;
					font-size: 36px;
				}

				.status {
					text-align: center;
					margin-top: 10px;

					.md-icon {
						width: 60px;
						max-width: 60px;
						height: 60px;
						max-height: 60px;
						font-size: 60px;
					}

					div {
						font-size: 32px;
					}
				}

				.cancel {
					position: absolute;
					top: 10px;
					right: 10px;
				}
			}
		}
	}
</style>