import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { IndexData } from '@/types/views/index.interface'
import { slider, navTop } from '@/components/index';
import Sortable from 'sortablejs';

@Component({
  components: {
    slider,
    navTop
  },
  watch: {
      $route(to: any, from: any) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false;
      for (let item of this.$services.view.openTab) {
        if (item.name === to.name) {
          this.$services.view.activeIndex = to.path;
          flag = true;
          break;
        }
      }

      if (!flag) {
        this.$services.view.add_tabs({ route: to.path, name: to.name });
        this.$services.view.activeIndex = to.path;
      }
    }
  }
})
export default class Index extends Vue {

  // data
  data: IndexData = {
    pageName: 'index'
  }

  get openTab() {
    return this.$services.view.openTab;
  }

  set openTab(val: any) {
    this.$services.view.add_tabs(val);
  }

  get activeIndex() {
    return this.$services.view.activeIndex;
  }

  set activeIndex(val: string) {
    this.$services.view.activeIndex = val;
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== '/index/main' && this.$route.path !== '/index/main') {
      this.$services.view.add_tabs({route: this.$route.path , name: this.$route.name });
      this.activeIndex = this.$route.path;
    } else {
      this.activeIndex = '/index/main';
      this.$router.push('/index/main');
    }

    let eltabs = this.$el.querySelectorAll('.el-tabs__nav')[0] as HTMLElement;
    Sortable.create(eltabs, {
        onEnd: (evt) => {
            console.info(evt);
        }
    });
  }

  // 初始化函数
  init() {
    //
  }

  // tab标签点击时，切换相应的路由
  tabClick(tab: any) {
    this.$router.push({ path: this.activeIndex });
  }

  // 移除tab标签
  tabRemove(targetName: string) {
    // 首页不删
    if (targetName === '/' || targetName === '/index/main') {
      return
    }
    this.$services.view.delete_tabs(targetName);
    if (this.activeIndex === targetName) {
      // 设置当前激活的路由
      if (this.openTab && this.openTab.length >= 1) {
        this.activeIndex = this.openTab[this.openTab.length - 1].route;
        this.$router.push({ path: this.activeIndex });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }

}
