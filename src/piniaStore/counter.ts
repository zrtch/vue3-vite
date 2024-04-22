import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { ref, computed, registerRuntimeCompiler } from 'vue'

// 选项式存储
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'kobe',
    users: [{ name: 'jame', id: 2 }],
    obj: { id: 3 },
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
    getName: (state) => {
      const activeUsers = state.users.filter((user) => user.name)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
  actions: {
    increment() {
      this.count++
    },
    randomize() {
      // action 也可通过 this 访问整个 store 实例
      this.count = Math.round(Math.random() * 100)
    },
    // action 可以是异步的，你可以在它们里面 await 调用任何 API，
    async registerUser(login, password) {
      try {
        ElNotification({
          title: '信息',
          message: `账号：${login}, 密码：${password}`,
          duration: 0,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  // 表示开启持久化保存
  persist: [
    {
      // 设置 key 、指定保存内容
      key: 'counter',
      paths: ['count', 'obj.id'],
      storage: localStorage,
    },
    {
      paths: ['obj'],
      // 设置不同的本地存储方式
      storage: sessionStorage,
    },
  ],
})

// 组合式存储
// export const useCounterStore = defineStore('defineStore', () => {
//   const count = ref(0)
//   const dobule = computed(() => count.value * 2)
//   const name = ref('kobe')

//   function increment() {
//     count.value++
//   }

//   return { count, name, dobule, increment }
// })
