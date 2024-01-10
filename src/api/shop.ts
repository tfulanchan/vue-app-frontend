import type { IShop, IList, IPaginate } from '@/types/shop'
import axios from 'axios'

export const fetchShopList = ({ _page, _limit }) => {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: {
      _page,
      _limit
    }
  })
}
