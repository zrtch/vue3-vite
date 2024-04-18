<script setup lang="ts">
import { ref } from 'vue'
// 需要处理vuex中的数据，就需要从vuex中按需引入useStore
import { useStore } from 'vuex'
const store = useStore()

const handleClick = () => {
  // 同步修改
  store.commit('updateUname', 'Kobe')

  // 异步修改
  store.dispatch('asyncUpdate', 40)
}
</script>

<template>
  <div>同步修改state：{{ $store.state.info.uname }}</div>
  <span>----------------------------</span>
  <div>异步修改state:{{ $store.state.info.age }}</div>
  <span>----------------------------</span>
  <div>getter数据：{{ $store.getters['format'] }}</div>
  <button type="button" @click="handleClick">按钮</button>
</template>

<style scoped></style>
