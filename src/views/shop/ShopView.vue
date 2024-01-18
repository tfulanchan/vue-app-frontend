<script setup lang="ts">
import { useAsync } from '@/use/useAsync'
import { fetchShopPageData } from '@/api/shop'
import onLoadingView from '@/components/OpLoadingView.vue'
import { useRoute } from 'vue-router'
import ShopHeader from './components/ShopHeader.vue'

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
  deliveryStratingPrice: '',
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
  <VanNavBar left-text="fan hui" left-arrow @click-left="onClickLeft"></VanNavBar>
  <OpLoadingView :loading="pending" type="skeleton">
    <!-- {{ data.shopName }} -->
    <ShopHeader :data="data"></ShopHeader>
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
