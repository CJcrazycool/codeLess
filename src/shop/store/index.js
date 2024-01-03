import Vue from 'vue'
import Vuex from 'vuex'
import publicStore from '@public/store'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
	},
	mutations: {
	},
	modules:{
		public:publicStore
	}
})

export default store
