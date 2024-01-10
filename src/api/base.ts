import axios from 'axios'
import { Dialog, showDialog } from 'vant'
import { useLocalStorage } from '@/use/useLocalStorage'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use((config) => {
  const { value: token} = useLocalStorage('token', '')
  if (config.headers && token.value){
    config.headers['x-token'] = token.value
  }
  return config
})

instance.interceptors.response.use((response) => {
  const { data:_data } = response
  const { data, code, msg } = _data
  if (code !=0){
    Dialog.alert({
      message: msg
    }).then(() => {
      // logic of closing dialog
    })
    return Promise.reject(msg)
  }
  return data
}, (err) => {
  if (err.response && err.response.status === 401){
    showDialog({
      message: 'qing deng lu',
    }).then(() => {
      // close window login
    })
  }
})

export default instance