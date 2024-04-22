import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { ref, computed, registerRuntimeCompiler } from 'vue'

// 选项式存储
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'kobe',
    users: [{ name: 'jame', id: 2 }],
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
