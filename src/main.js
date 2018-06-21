// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import {post,fetch,patch,put} from '@/assets/js/axios'
//import { setCookie, getCookie, delCookie } from '@/assets/js/cookie.js'
import VueCookie from 'vue-cookie';
import clipper from '@/assets/js/clipper'

Vue.config.productionTip = false

Vue.use(clipper)
// Tell Vue to use the plugin
Vue.use(VueCookie);
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
new Vue({
  el: '#app',
  router,
  components: { App },
  store,//使用store
  template: '<App/>',
  
})



