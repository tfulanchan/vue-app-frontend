<script setup lang="ts">
import { useAsync } from '@/use/useAsync'
import { fetchShopPageData } from '@/api/shop'
import onLoadingView from '@/components/OpLoadingView.vue'
import { useRoute } from 'vue-router'


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
    <VanNavBar left-text="返回" left-arrow @click-left="onClickLeft"></VanNavBar>
    <OpLoadingView :loading="pending" type="skeleton">
      <ShopHeader :data="data"></ShopHeader>
      <VanTabs v-model:active="active" :color="PRIMARY_COLOR" sticky animated swipeable>
        <VanTab v-for="v in TAB_LIST" :key="v.value" :title="v.label" :name="v.value">
          <component :is="v.component"></component>
        </VanTab>
      </VanTabs>
      <ShopCart v-if="active === 1" />
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
