<script setup lang="ts">
import { useAsync } from '@/use/useAsync'
import { fetchShopPageData } from '@/api/shop'
import onLoadingView from '@/components/OpLoadingView.vue'
import { useRoute } from 'vue-router'
import ShopHeader from './components/ShopHeader.vue'
import { PRIMARY_COLOR } from '@/config'
import GoodsList from './components/GoodsList.vue'
import OpTodo from '../tabs/home/components/OpTodo.vue'
import { ref } from 'vue'

const TAB_LIST = [
{
    value: 1,
    label: 'all goods',
    component: GoodsList,
  },
  {
    value: 2,
    label: 'reviews',
    component: OpTodo,
  },
  {
    value: 3,
    label: 'sellers',
    component: OpTodo,
  },
]
const active = ref(TAB_LIST[0].value)

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(() => fetchShopPageData(id as string), {
  announcement: '',
  discounts: [],
  redbags: [],
  activitys: [],
  branch: '',
  comments: [],
  deliveryDistance: '',
  deliveryStrategy: '',
  deliveryStartingPrice: '',
  deliveryTags: [],
  deliveryTime: '',
  id: '',
  monthlyCount: 0,
  postUrl: '',
  bgUrl: '',
  score: 0,
  services: [],
  shopName: '',
  tops: [],
})
useLockScroll(() => active.value === 1)

const onClickLeft = () => history.back()
</script>

<template>
<div class="shop-page">
  <VanNavBar left-text=" return back" left-arrow @click-left="onClickLeft"></VanNavBar>
  <OpLoadingView :loading="pending" type="skeleton">
    <ShopHeader :data="data"></ShopHeader>
    <VanTabs v-moel="active" :color="PRIMARY_COLOR" sticky animated swipeable>
      <VanTab v-for="v in TAB_LIST" :key="v.value" :title="v.label" :name="v.value">
        <component :is="v.component"></component>
      </VanTab>
    </VanTabs>
  </OpLoadingView>
</div>
</template>

<style lang="scss">
.shop-page {
  .van-tabs__line,
  .van-nav-bar {
    z-index: 0;
  }
}
</style>
