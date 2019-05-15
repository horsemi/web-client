import Vue from 'vue'
import Vuex from 'vuex'
import store, { IStoreService } from './store';
import view, { IViewService } from './module/view';

// modules

Vue.prototype.$services = {
  store,
  view
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: {
      store: IStoreService,
      view: IViewService
    }
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: store.getStorer(),
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {

  }
})
