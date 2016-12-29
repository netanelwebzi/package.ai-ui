import LocalStorage from './local-storage'

let $localStorage = new LocalStorage

let phase = ''
let user = false

if($localStorage.has('phase')){
	phase = $localStorage.get('phase')
} else {
	$localStorage.set('phase', 'planning.upload')
	phase = 'planning.upload'
}

if($localStorage.has('user')){
	user = $localStorage.get('user')
} else {
	$localStorage.set('user', false)
}

export default {
	user: {
		id: 0,
		name: 'Netanel Edri'
	},
	displayOverlay: true,
	setup: {
		step: 2,
		items: [
			{
				id: 1,
				title: 'Consumer 1',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			},
			{
				id: 2,
				title: 'Consumer 2',
				description: 'Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... Lorem Ipsum bla bla bla... ',
				address: 'BlaBla 7, Tel Aviv, Israel',
				phoneNumber: '050-1231231',
				status: 'in-progress',
				date: new Date(),
				timeSlot: '14:00 - 14:15'
			}

		]
	},
	phase: phase
	/**
	 * planning.upload
	 * planning.edit
	 * planning.schedule
	 * planning.ready
	 * monitoring
	 */
}