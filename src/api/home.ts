import axios from "axios"
import type { IHomeInfo } from '@/types'


export const fetchHomePageData = () => {
  return axios.get<IHomeInfo, IHomeInfo>('home_page')
}
