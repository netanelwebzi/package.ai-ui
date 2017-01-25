<template>
	<div class="col-xs-4">
		<md-whiteframe md-tag="section" id="list-panel">
			<div style="padding:0px 15px;">
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

			<md-list class="custom-list md-triple-line" v-if="!onPhaseMonitoring()">
				<md-list-item v-for="item in filteredItems" @click="selectItem(item)"
				              :class="{ selected: selectedItem === item }">
					<div class="item-container">
						<div class="md-list-text-container">
							<h1>{{ item.recipient.firstName + ' ' + item.recipient.lastName }}</h1>
							<p>{{ item.address.formattedAddress }}</p>
						</div>

						<div class="container-action-icons">
							<img src="~assets/img/AlertIcon.png" v-if="item.errors.length > 0">
							<img src="~assets/img/Calendar_Orange_LeftPanel.png" v-if="item.errors.length == 0 && item.state == 'POSTPONED'">
							<span v-if="item.errors.length == 0 && item.state == 'POSTPONED'">{{ item.startTime + '-' + item.finishTime }}</span>
						</div>
					</div>

					<md-divider class="md-inset"></md-divider>
				</md-list-item>
			</md-list>
			<md-list class="custom-list md-triple-line" v-else>
				<md-list-item v-for="item in filteredConversations" @click="selectItem(item)"
				              :class="{ selected: selectedItem === item }">
					<div class="item-container">
						<div class="md-list-text-container">
							<h1>{{ item.recipientFirstName + ' ' + item.recipientLastName }}</h1>
							<p v-if="item.lastMessageText !== undefined && item.lastMessageText !== null && item.lastMessageText.length > 0"><strong v-if="item.lastMessageDirection == 'OUTGOING'">Jenny: </strong>{{ item.lastMessageText.substring(0,47) }}...</p>
							<p v-else>-- Not started --</p>
						</div>

						<div class="container-action-icons">
							<!--<img src="~assets/img/status_icon_1.png">-->
						</div>
					</div>

					<md-divider class="md-inset"></md-divider>
				</md-list-item>
			</md-list>
		</md-whiteframe>
	</div>
</template>

<script lang="babel">
	import _ from 'underscore'

	export default {
		store: ['setup', 'mapCenter', 'selectedItem', 'deliveries', 'conversations'],

		data() {
			return {
				itemsSearch: ''
			}
		},

		computed: {
			filteredItems: function () {
				let search = this.itemsSearch
				let results = this.deliveries.filter(function (item) {
					return item.recipient.firstName.indexOf(search) !== -1 || item.recipient.lastName.indexOf(search) !== -1 || item.address.formattedAddress.indexOf(search) !== -1
				})

				if(this.onPhaseRoute()) {
					let list = _.sortBy(results, (item) => {
						return item.errors.length
					})
				} else {
					// @TODO sort by error & positionInRoute
				}

				return list
			},
			filteredConversations: function(){
				let search = this.itemsSearch
				let results = this.conversations.filter(function(item){
					return item.recipientFirstName.indexOf(search) !== -1 || item.recipientLastName.indexOf(search) !== -1
				})

				let list = _.sortBy(results, (item) => {
					return this.moment(item.updated)
				})

				return list.reverse()
			}
		},

		methods: {
			selectItem(item) {
				if(this.onPhaseMonitoring()){
					this.$services.Conversations.getMessages(item.id).then((messages) => {
						item.chatMessages = messages
						console.log(messages)
						this.selectedItem = item
					})
				} else {
					this.selectedItem = item
				}
			},
			unselectItem() {
				this.selectedItem = null
			}
		},

		created() {
//			this.$services.Conversations.get().then((response) => {
//				console.log('convs', response)
//			})
//			this.$services.Deliveries.get().then((response) => {
//				this.deliveries = response
//			})
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

			.item-container {
				display: flex;
				width: 100%;
				flex-flow: row;
				align-items: stretch;
				.md-list-action {
					align-self: center;
				}
				.container-action-icons {
					display: flex;
					flex-flow: column;
					justify-content: space-around;
					flex-basis: 50px;
					align-items: center;
					position: relative;
					padding-left: 10px;
					img {
						max-height: 40px;
						position: relative;
					}
					&:before {
						content: '';
						position: absolute;
						top: 10%;
						left: 0;
						height: 80%;
						border-left: 1px dashed #ddd;
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
