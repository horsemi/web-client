import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { IndexData } from '@/types/views/index.interface'
import { slider, navTop } from '@/components/index'

@Component({
  components: {
    slider,
    navTop
  },
  watch: {
    '$route'(to: any, from: any) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false;
      for (let item of this.$services.view.openTab) {
        console.log("item.name", item.name)
        console.log("t0.name", to.name)

        if (item.name === to.name) {
          console.log('to.path', to.path);
          this.$services.view.activeIndex = to.path;
          flag = true;
          break;
        }
      }

      if (!flag) {
        console.log('to.path', to.path);
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
      this.activeIndex = this.$route.path;
      console.log(this.openTab);
    } else {
      console.log('2');
      this.$services.view.add_tabs({route: '/index/main' , name: 'main'});
      this.activeIndex = '/index/main';
      this.$router.push('/');
      console.log(this.openTab);
    }
  }

  // 初始化函数
  init() {
    //
  }

  // tab标签点击时，切换相应的路由
  tabClick(tab: any) {
    console.log("tab", tab);
    console.log('active', this.activeIndex);
    this.$router.push({ path: this.activeIndex });
  }

  // 移除tab标签
  tabRemove(targetName: string) {
    console.log("tabRemove", targetName);
    // 首页不删
    if (targetName === '/' || targetName === '/index/main') {
      return
    }
    this.$services.view.delete_tabs(targetName);
    if (this.activeIndex === targetName) {
      // 设置当前激活的路由
      if (this.openTab && this.openTab.length >= 1) {
        console.log('=============', this.openTab[this.openTab.length - 1].route)
        this.activeIndex = this.openTab[this.openTab.length - 1].route;
        this.$router.push({ path: this.activeIndex });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }

}
