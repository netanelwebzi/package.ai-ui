export default {
	pusher: {
		appId: '284392',
		key: 'c82effbd726f5d6a1343',
		secret: 'a1a767ee6de1183e1778',
		cluster: 'eu',
		channelTemplate: `private-{clientId}.{envName}.{resourceName}.{resourceId}.{appName}`
	},

	api: {
		//first: 'http://demo.package.ai:9005/v1/',
		//first: 'http://demo2.package.ai:9005/v1/',
		first: 'http://demo2.package.ai:9007/v1/',
		second: 'http://demo2.package.ai:9003/v1/'
	},

	themes: {
		default: {
			primary: 'blue',
			accent: 'grey',
			warn: 'deep-orange',
			background: 'white'
		},
		indigo_yellow: {
			primary: 'blue',
			accent: 'yellow',
			warn: 'deep-orange',
			background: 'grey'
		}
	},

	defaultPhase: 'upload',

	autoRefreshInterval: 20, // seconds
}