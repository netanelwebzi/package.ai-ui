<template>
	<div class="map-time-slots">
		<transition name="fade">
			<div v-show="toggled">
				<div class="has-ripple time-slot-circle" v-for="(timeSlot, index) in timeSlots" :class="{active: active.indexOf('slot-' + index) !== -1}" @click="toggleSlot(index)">
					<md-ink-ripple></md-ink-ripple>
					<span>{{ timeSlot.start }}</span>
					<md-icon>arrow_drop_down</md-icon>
					<span>{{ timeSlot.end }}</span>
				</div>
			</div>
		</transition>
		<md-button class="md-icon-button md-raised md-dense" @click="toggled=!toggled" :class="{'md-primary': !toggled, 'md-accent': toggled}">
			<md-icon>{{ toggled ? 'close' : 'access_time' }}</md-icon>
		</md-button>
	</div>
</template>

<script>
export default {
	props: {
		timeSlots: {
			default: [
				{
					start: '10:00',
					end: '11:00'
				},
				{
					start: '11:00',
					end: '12:00'
				},
				{
					start: '12:00',
					end: '13:00'
				},
				{
					start: '13:00',
					end: '14:00'
				},
				{
					start: '14:00',
					end: '15:00'
				}
			]
		}
	},
	methods: {
		toggleSlot(index) {
			const i = this.active.indexOf('slot-' + index)
			if(i !== -1)
				this.active.splice(i, 1)
			else
				this.active.push('slot-' + index)
		}
	},
	data() {
		return {
			active: [],
			toggled: false
		}
	}
}

</script>

<style scoped lang="scss">

	.map-time-slots {
		position: absolute;
		bottom: 35px;
		right: 30px;
		z-index: 999999999999;
		width: 70px;

		.md-button {
			margin: auto;
			display: block;
			background: #fff;
		}

		.time-slot-circle {
			background: #fff;
			height: 70px;
			width: 70px;
			border-radius: 100%;
			border: 2px solid #ddd;
			cursor: pointer;
			text-align: center;
			font-size: 12px;
			line-height: 10px;
			padding-top: 12px;
			margin-bottom: 10px;
			span, i {
				display: block;
			}

			i {
				color: #00baff;
			}

			&.active {
				background: #00baff;
				color: #fff;

				i {
					color: #ffdb00;
				}
			}
		}
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.5s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}
</style>