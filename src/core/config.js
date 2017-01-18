export default {
	pusher: {
		appId: '284392',
		key: 'c82effbd726f5d6a1343',
		secret: 'a1a767ee6de1183e1778',
		cluster: 'eu',
		channelTemplate: `private-{clientId}.{envName}.{resourceName}.{resourceId}.{appName}`
	},

	api: {
		baseUrl: 'http://demo.package.ai:9005/v1/'
	},

	themes: {
		indigo_pink: {
			primary: 'indigo',
			accent: 'pink',
			warn: 'deep-orange',
			background: 'grey'
		},
		indigo_yellow: {
			primary: 'indigo',
			accent: 'yellow',
			warn: 'deep-orange',
			background: 'grey'
		}
	},

	defaultPhase: 'upload'
}