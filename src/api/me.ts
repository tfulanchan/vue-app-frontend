import type { IMeInfo } from '@/types'
// import axios from './base'
import axios from 'axios'

export const fetchMePageData = () => {
  return axios.get<IMeInfo, IMeInfo>('me_page')
}