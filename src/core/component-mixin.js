const PHASE_UPLOAD = 'upload'
const PHASE_ROUTE = 'route'
const PHASE_EXPORT = 'export'
const PHASE_JENNY = 'jenny'
const PHASE_MONITORING = 'monitoring'
export default {
	store: ['phase'],
	methods: {
		onPhaseUpload() {
			return this.phase == PHASE_UPLOAD
		},
		onPhaseRoute() {
			return this.phase == PHASE_ROUTE
		},
		onPhaseExport() {
			return this.phase == PHASE_EXPORT
		},
		onPhaseJenny() {
			return this.phase == PHASE_JENNY
		},
		onPhaseMonitoring() {
			return this.phase == PHASE_MONITORING
		}
	}
}