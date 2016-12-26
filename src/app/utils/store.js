import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultState = {
	setup: localStorage.setup ? localStorage.setup : { step: 1 }
}

const storeMutations = {
	setSetup(state, setup) {
		localStorage.setup = setup
	}
}

const storeActions = {
	
}

const storeGetters = {
	setup(state) {
		return state.setup
	}
}

const store = new Vuex.Store({
	state: defaultState,
	mutations: storeMutations,
	actions: storeActions,
	getters: storeGetters
})


export default store