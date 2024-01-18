import type { IMenuList } from '@/types'
import axios from "axios"

export const fetchGoodsListData = ( shopId: string ) => {
  return axios.get<IMenuList, IMenuList>('goods_list', {
    params: { shopId }
  })
}