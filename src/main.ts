import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import "@/assets/scss/common.scss";
import 'element-ui/lib/theme-chalk/index.css';
import './core';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  data() {
    return {
    }
  },
  render: (h) => h(App)
}).$mount('#app')

