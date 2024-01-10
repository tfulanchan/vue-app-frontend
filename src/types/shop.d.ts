export interface IShop {
  activitys: IActivity[]
  branch: string
  comments: string[]
  deliveryDistance: string
  deliveryStrategy: string
  deliveryStartingPrice: string
  deliveryTags: string[]
  deliveryTime: string
  id: string
  monthlyCount: number
  postUrl: string
  bgUrl: string
  score: number
  service: IService[]
  shopName: string
  tops: string[]
}

export interface IService {
  type: number
  label: string
}

export interface IActivity {
  type: number
  tips?: string
  infos?: string[]
}