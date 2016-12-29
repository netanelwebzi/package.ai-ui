<template>
	<div class="col-xs" v-if="setup.step === 3">
		<md-whiteframe md-tag="section" id="edit-panel">
			<div class="item-details">
				<div class="row">
					<div class="col-xs-8">
						<div class="title">
							{{ setup.selectedItem.title }}
						</div>
						<div class="spacer-20"></div>

						<md-input-container>
							<label>Address</label>
							<md-input v-model="setup.selectedItem.address"></md-input>
						</md-input-container>
						<md-input-container>
							<label>Time slot</label>
							<md-input v-model="setup.selectedItem.timeSlot"></md-input>
						</md-input-container>
						<md-input-container>
							<label>Phone</label>
							<md-input v-model="setup.selectedItem.phoneNumber" disabled></md-input>
						</md-input-container>
						<md-input-container>
							<label>ID</label>
							<md-input v-model="setup.selectedItem.id" disabled></md-input>
						</md-input-container>
					</div>
					<div class="col-xs-4">
						<div class="status">
							<md-icon class="md-primary">done</md-icon>
							<div>
								Done!
							</div>
						</div>
					</div>
				</div>
				<div class="cancel">
					<md-button class="md-primary md-icon-button" @click="unselectItem()">
						<md-icon>clear</md-icon>
					</md-button>
				</div>
			</div>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	export default {

		store: ['setup'],

		data() {
			return {

			}
		},

		methods: {
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

		&#edit-panel {
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

	.col-xs, .col-xs-4 {
		padding-right: 0px;
		padding-left: 0px;
		height: calc(100vh - 64px * 2);
	}
</style>