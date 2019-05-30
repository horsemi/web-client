import Vue from 'vue'
import Vuex from 'vuex'
import store, { IStoreService } from './store';
import view, { IViewService } from './module/view';
import user, { IUserService } from './module/user';

// modules

Vue.prototype.$services = {
  store,
  view,
  user
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: {
      store: IStoreService,
      view: IViewService,
      user: IUserService
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
