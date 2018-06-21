import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


export default new vuex.Store({
    state: { 
	 recruitScrollY:0 ,
	
	 }, 
	 getters: { 
	 	recruitScrollY:state => state.recruitScrollY 
	 }, 
	 mutations: { 
		 changeRecruitScrollY(state,recruitScrollY) { 
		 	state.recruitScrollY = recruitScrollY 
		 }
	 }, 
	 actions: { 
	  
	 }, 
	 modules: {} 

	 
})