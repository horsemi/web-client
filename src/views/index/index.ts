import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { IndexData } from '@/types/views/index.interface'
import { slider, navTop } from '@/components/index'

@Component({
  components: {
    slider,
    navTop
  },
  computed: {
    openTab() {
      return this.$services.view.getOpenTab();
    },
    activeIndex: {
      get() {
        return this.$services.view.getActiveIndex();
      },
      set(val: any) {
        this.$services.view.set_active_index(val);
      }
    }
  },
  watch: {
    '$route'(to: any, from: any) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false;
      let _openTab = this.$services.view.getOpenTab();
      for (let item of _openTab) {
        console.log("item.name", item.name)
        console.log("t0.name", to.name)

        if (item.name === to.name) {
          console.log('to.path', to.path);
          this.$services.view.set_active_index(to.path);
          flag = true;
          break;
        }
      }

      if (!flag) {
        console.log('to.path', to.path);
        this.$services.view.add_tabs({ route: to.path, name: to.name });
        this.$services.view.set_active_index(to.path);
      }
    }
  }
})
export default class Index extends Vue {

  // data
  data: IndexData = {
    pageName: 'index'
  }

  created() {
    console.info(this);
  }

  activated() {
    //
  }

  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/' && this.$route.path !== '/main') {
      console.log('1');
      this.$services.view.add_tabs({route: '/index/main' , name: 'main'});
      this.$services.view.add_tabs({route: this.$route.path , name: this.$route.name });
      this.$services.view.set_active_index(this.$route.path);
      
    } else {
      console.log('2');
      this.$services.view.add_tabs({route: '/index/main' , name: 'main'});
      this.$services.view.set_active_index('/index/main');
      this.$router.push('/');
    }
  }

  // 初始化函数
  init() {
    //
  }

  // tab标签点击时，切换相应的路由
  tabClick(tab: any) {
    let _activeIndex = this.$services.view.getActiveIndex();
    console.log("tab", tab);
    console.log('active', _activeIndex);
    this.$router.push({ path: _activeIndex });
  }

  // 移除tab标签
  tabRemove(targetName: string) {
    let _openTab = this.$services.view.getOpenTab();
    let _activeIndex = this.$services.view.getActiveIndex();
    console.log("tabRemove", targetName);
    // 首页不删
    if (targetName === '/' || targetName === '/main') {
      return
    }
    this.$store.commit('delete_tabs', targetName);
    if (_activeIndex === targetName) {
      // 设置当前激活的路由
      if (_openTab && _openTab.length >= 1) {
        console.log('=============', _openTab[_openTab.length - 1].route)
        this.$services.view.set_active_index(_openTab[_openTab.length - 1].route);
        this.$router.push({ path: _activeIndex });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }

}
