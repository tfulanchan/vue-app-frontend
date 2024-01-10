import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUserInfo } from '@/types'

interface IUserState {
  userInfo: IUserInfo
  token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: '',
  nickname: 'qing deng lu'
})

export const useUserStore = defineStore('user', () => {
  const state = ref({
    userInfo: getDefaultUserInfo() ,
    token: ''
  })

  const getUserInfo = computed (() => {
    return state.value.userInfo
  })

  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token
  }
  const removeInfo = () => {
    state.value.userInfo
    state.value.token = ''
  }

  return {
    state,
    getUserInfo,
    setInfo,
    removeInfo
  }
})