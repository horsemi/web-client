/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      icon: '',
      keepAlive: true,
      title: '登录'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      icon: '',
      keepAlive: true,
      title: '主页'
    },
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('@/views/pages/main.vue'),
        meta: {
          title: 'main',
          icon: 'main',
        },
        
      },
      {
        path: 'page1',
        name: 'page1',
        component: () => import('@/views/pages/page1.vue'),
        meta: {
          title: 'page1',
          icon: 'page1',
        },
      },
      {
        path: 'page2',
        name: 'page2',
        component: () => import('@/views/pages/page2.vue'),
        meta: {
          title: 'page2',
          icon: 'page2',
        },
      },
      {
        path: 'page3',
        name: 'page3',
        component: () => import('@/views/pages/page3.vue'),
        meta: {
          title: 'page3',
          icon: 'page3',
        },
      },
      {
        path: 'page4',
        name: 'page4',
        component: () => import('@/views/pages/page4.vue'),
        meta: {
          title: 'page4',
          icon: 'page4',
        },
      }
    ]
  },
]
