import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

// 手动添加cookie
const cookiesStorage: Storage = {
  setItem(key, state) {
    console.log('🤩  setItem  state:', state)
    console.log('🤩  setItem  key:', key)
    const res = JSON.parse(state)
    // 设置有效期 3 天，不设置默认同 sessionStorage 有效期一致
    return Cookies.set(key, res.accessToken, { expires: 3 })
  },
  getItem(key) {
    return JSON.stringify({
      accessToken: Cookies.get(key),
    })
  },
}

export const useCookie = defineStore('cookie', {
  state: () => ({
    accessToken: 'xxxxxxxxx',
  }),
  actions: {
    handleChange(val) {
      this.accessToken = val
    },
  },
  persist: {
    storage: cookiesStorage, // 使用手动添加的cookie
    paths: ['accessToken'], // cookie 一般用来保存 token
  },
})
