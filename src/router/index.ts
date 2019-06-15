import Vue from 'vue';
import Router from 'vue-router';
import * as routes from './router';
import userService from '@/store/module/user';
import permissionService from '@/store/module/permission';
import getPageTitle from '@/utils/get-page-title';

// 白名单, 不需要token校验
const whiteList = ['/login'] 

Vue.use(Router)

const createRouter = () => new Router({
  routes: routes.constantRoutes,
  // mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0};
    }
  },
})

const router = createRouter() as any;

// 登陆页面路由 path
const LOGIN_PAGE_PATH = '/login'

// 跳转之前
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)

  const token = userService.token;

  if (token) {
    // 判断是否有token
    
    if (userService.permissions && userService.permissions.length > 0) {
      // 判断是否有权限

      if (to.path === LOGIN_PAGE_PATH) {
        // 判断是否前往登录页面

        next({ path: '/'});
      } else {
        // 前往页面不是登录页面

        next();
      }
    } else {
      // 没有权限, 需要重新获取用户信息
      // TODO: 获取权限
      try {
        // 根据Token获取用户信息
        userService.getInfo().then((resolve => {
          console.info(resolve);
          
          permissionService.generateRoutes(resolve.permissions, resolve.roles);
          router.addRoutes(permissionService.routes as any);
          next();
        }))
        .catch(error => {
          // 获取失败, 重置token，并返回登录页面
          userService.removeToken();
          next({ path: LOGIN_PAGE_PATH })
        }) 
        
      } catch (error) {
        // 获取失败, 重置token，并返回登录页面
        userService.removeToken();
        next({ path: LOGIN_PAGE_PATH })
      }
    }

  } else {
    // 没有token

    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单

      next();
    } else {
      next({ path: LOGIN_PAGE_PATH });
    }
    
  }
})


// 跳转之后
router.afterEach(to => {
  //
})

export function resertRouter () {
  const newRouter = createRouter()  as any ;
  router.matcher = newRouter.matcher; // reset router
}

export default router