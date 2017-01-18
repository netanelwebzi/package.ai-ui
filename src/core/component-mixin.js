export default {
	store: ['phase'],
	methods: {
		onPhaseUpload() {
			return this.phase == 'upload'
		},
		onPhaseRoute() {
			return this.phase == 'route'
		},
		onPhaseExport() {
			return this.phase == 'export'
		},
		onPhaseJenny() {
			return this.phase == 'jenny'
		},
		onPhaseMonitoring() {
			return this.phase == 'monitoring'
		}
	}
}