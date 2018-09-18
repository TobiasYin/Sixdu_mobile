// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import animate from 'animate.css'
// import VueAnimate from 'vue-animate





Vue.use(mavonEditor);
Vue.use(VueAxios, axios);
Vue.use(MintUI);
// Vue.use(animate);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
