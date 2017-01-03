<template>
	<div class="col-xs" v-if="setup.selectedItem !== undefined">
		<md-whiteframe md-tag="section" id="edit-panel">
			<div class="item-details">
				<div class="row">
					<div class="col-xs-8 principal">
						<div class="title">{{ setup.selectedItem.title }}</div>
						<div id="places-input" class="item-detail">
              <md-icon>location_on</md-icon>
							<place-input placeholder="Search location"></place-input>
						</div>
						<md-input-container class="item-detail">
              <md-icon>call</md-icon>
							<md-input v-model="setup.selectedItem.phoneNumber"></md-input>
						</md-input-container>
						<md-input-container class="item-detail">
              <i class="fa fa-truck"></i>
							<md-input v-model="setup.selectedItem.id" disabled></md-input>
						</md-input-container>
					</div>
					<div class="col-xs-4 secondary">
						<div class="status">
							<md-icon class="md-primary">done</md-icon>
							<div>Done!</div>
						</div>
            <div class="item-detail">Mon, 08/11/2016</div>
            <div id="timeslot-picker" class="item-detail">
              <vue-timepicker format="hh:mm A" :minute-interval="30"></vue-timepicker>
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
	import * as VueGoogleMaps from 'vue2-google-maps'
	import Vue from 'vue'
	import VueTimepicker from 'vue2-timepicker'

	Vue.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw',
			libraries: 'places'
		},
	})

	export default {

		store: ['setup'],

		components: {
			PlaceInput: VueGoogleMaps.PlaceInput,
			VueTimepicker: VueTimepicker
		},

		data() {
			return {
			}
		},

		methods: {
			unselectItem() {
			    this.setup.selectedItem = void 0;
			}
		}

	}
</script>

<style lang="scss">
	.md-whiteframe {
		height: 100%;

		&#edit-panel {
			background: #ecedf0;

			> .item-details {
				background: #fff;
				padding: 20px;

        .secondary {
          margin-top: -10px;
          .item-detail {
            margin-top: 5px;
          }
          .item-detail, .item-detail input {
            font-size: 12px;
          }
        }

				.title {
					line-height: 1.1em;
					color: #00baff;
          font-size: 18px;
          font-weight: 200;
          font-family: 'overpass', arial;
				}

				.status {
					text-align: center;
					margin-top: 0;
          padding-bottom: 10px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 60%;
            margin-left: -30%;
            border-bottom: 1px dashed #a8a8a8;
          }
          $size-md-icon-here: 50px;
					.md-icon {
						width: $size-md-icon-here;
						max-width: $size-md-icon-here;
						height: $size-md-icon-here;
						max-height: $size-md-icon-here;
						font-size: $size-md-icon-here;
					}

					div {
						font-size: 16px;
            line-height: 1em;
					}
				}

				.cancel {
					position: absolute;
					top: 0px;
					right: -2px;
				}

        .item-detail, .item-detail input{
          margin: 0;
          padding: 0;
          color: #777;
          font-size: 15px;
          height: auto;
          min-height: auto;
          line-height:1.1em;
        }
        .item-detail {
          margin-top: 10px;
          padding-top: 2px;
          padding-bottom: 2px;
          margin-left: 24px;
          position: relative;
          label {
            margin: 0;
            padding: 0;
          }
          .md-icon, i.fa{
            left: -27px;
            top: -3px;
            position: absolute;
          }
          i.fa {
            font-size: 22px;
          }
          input, &::after{
            border: none;
            background-color: transparent;
            background-image: none;
          }
        }
      }
		}
	}

	.col-xs, .col-xs-4 {
		padding-right: 0px;
		padding-left: 0px;
		height: calc(100vh - 64px * 2);
	}

	#timeslot-picker {
		label {
			font-size: 12px;
			display: block;
			margin-bottom: 5px;
		}

		margin-bottom: 20px;

		input {
			border: 0px;
			border-bottom: 1px solid #ddd;
			width: 100%;
		}

		.time-picker {
			display: block;
			width: 100%;
		}
	}

	#places-input {
		label {
			font-size: 12px;
			display: block;
			margin-bottom: 5px;
		}

		input {
			outline: 0;
			border:0px;
			width:100%;
			border-bottom: 1px solid #ddd;
			font-size: 16px;

			&:focus {
				border-bottom-color: #3F51B5;
				border-bottom-width: 2px;
			}
		}

		margin-bottom: 20px;
	}
</style>
