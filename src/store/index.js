require('es6-promise/auto');
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
// import modules from './modules';
Vue.use(Vuex)
export default new Vuex.Store({
	// modules: modules,
	state: {
		_userInfo: null
	},
	mutations,
	actions,
	getters,
})