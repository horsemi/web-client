import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
import userService from '@/store/module/user';
import getPageTitle from '@/utils/get-page-title';

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'login'

// 跳转之前
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  
  const token = userService.token;
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    // 判断是否有权限
    if (userService.roles && userService.roles.length > 0) {
      // 跳转到 index 页
      next({ name: 'index' })
    } else {
      // 没有权限, 需要重新获取用户信息
      try {
        // 根据Token获取用户信息
        userService.getInfo();
        next();
      } catch (error) {
        // 获取失败, 重置token，并返回登录页面
        userService.removeToken();
        next({ name: LOGIN_PAGE_NAME })
      }
    }
  } else {
    // 正常跳转
    if (token && userService.roles && userService.roles.length > 0) {
      next(); // 跳转
    } else {
      // 根据Token获取用户信息
      userService.getInfo();
      next();
    }
  }
})


// 跳转之后
router.afterEach(to => {
  //
})

export default router