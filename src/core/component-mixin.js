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
		},
		buildName(item) {
			let firstName = ''
			let lastName = ''
			if(this.phase == PHASE_MONITORING){
				firstName = item.recipientFirstName
				if (item.recipientLastName != null || item.recipientLastName != undefined && item.recipientLastName.length > 0) {
					lastName = item.recipientLastName
				}
			} else {
				firstName = item.recipient.firstName
				if (item.recipient.lastName != null || item.recipient.lastName != undefined && item.recipient.lastName.length > 0) {
					lastName = item.recipient.lastName
				}
			}

			return `${firstName} ${lastName}`
		}
	}
}