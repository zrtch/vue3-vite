import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

//2. 路由配置
const routes = [
  //redirect 重定向也是通过 routes 配置来完成，下面就是从 / 重定向到 /index
  {
    path: '/',
    meta: { title: '状态管理', icon: 'DataAnalysis', menuType: 3 },
    redirect: '/vuex',
    children: [
      {
        path: 'vuex',
        component: () => import('../components/State/Vuex.vue'),
        meta: { title: 'Vuex', cache: true },
      },
      {
        path: 'pinia',
        component: () => import('../components/State/Pinia.vue'),
        meta: { title: 'Pinia', cache: true },
      },
    ],
  },
]

// 3. 创建路由实例
const router = createRouter({
  // （1）采用hash 模式
  history: createWebHashHistory(),
  // （2）采用 history 模式
  // history: createWebHistory(),
  routes, //使用上方定义的路由配置
})

// 4. 导出router
export default router
