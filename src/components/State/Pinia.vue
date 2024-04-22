<template>
  <div class="pinia">
    <p>
      State 被定义为一个返回初始状态的函数，state
      被定义为一个返回初始状态的函数。
    </p>
    <span>{{ count }} - {{ doubleCount }}</span>
    <span>{{ name }} {{ count }}</span>
    <el-button type="primary" @click="increment">添加</el-button>
    <el-divider />
    <p>
      Getter 完全等同于 store 的 state
      的计算值，Getter只是幕后的计算属性，所以不可以向它们传递任何参数
    </p>
    <span>getter属性：{{ store.doubleCountPlusOne }}</span>
    <span>UserId:{{ getName(2) }}</span>
    <el-button type="primary" @click="patch">变更 state</el-button>
    <el-button @click="handleRest">重置</el-button>

    <el-divider />
    <p>Action 相当于组件中的 methos。定义业务逻辑的完美选择</p>
    <el-button type="primary" @click="handleLogin">登录</el-button>

    <el-divider />
    <p>数据持久化：pinia-plugin-persistedstate</p>
    <span> cookie: {{ cookie.accessToken }} </span>
    <el-button type="primary" @click="cookie.handleChange('857857857')"
      >Cookie</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useCounterStore } from '@/piniaStore/counter'
import { useCookie } from '@/piniaStore/cookie'
import { storeToRefs } from 'pinia'
const store = useCounterStore()
const { count, name, doubleCount, getName } = storeToRefs(store)
const { increment } = store

const cookie = useCookie()

// 变更state & 替换state。它允许你用一个 state 的补丁对象在同一时间更改多个属性。
const patch = () => {
  store.$patch({
    count: 24,
    name: 'lebron',
  })
}

// 通过调用 store 的 $reset() 方法将 state 重置为初始值。
const handleRest = () => {
  store.$reset()
}

// 订阅 state
store.$subscribe((mutation, state) => {
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 store.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 store.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  // localStorage.setItem('counter', JSON.stringify(state))
})

// 使用 setup() 时的用法,直接访问任何 getter(与 state 属性完全一样)
console.log(store.doubleCountPlusOne) // 1

// actions
const handleLogin = () => {
  // 将 action 作为 store 的方法进行调用
  store.registerUser('admin', 123456)
}
</script>

<style lang="scss" scoped>
.pinia {
  span {
    display: block;
  }
}
</style>
