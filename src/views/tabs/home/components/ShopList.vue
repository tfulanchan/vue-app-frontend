<script steup lang="ts">
import { ref } from 'vue'
import type { IShop } from '@/types'
import { fetchShopList } from '@/api/shop'
// import OpList from '@/components/'
import ShopItem from './ShopItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShopList',
  setup() {
    const page = 1
    const shopList = ref([] as IShop[])
    const loading = ref(false)
    const finished = ref(false)

    const onLoad = async () => {
      const { data, total } = await fetchShopList({
        _page: page,
        _limit: 5,
      })
      shopList.value.push(...data)
      loading.value = false

      if (shopList.value.length >= total) {
        finished.value = true
      }
    }
    return {
      page,
      shopList,
      loading,
      finished,
      onLoad
    }
  }

})
</script>

<template>
  <div class="home-shop-list">
    <OpList v-model:loading="loading" :finished="finished" finished-text="no more~" @load="onLoad">
      <!-- <div style="height: 100px" v-for="v in shopList" :key="v.id">{{ v.shopName }}</div> -->
      <ShopItem v-for="v in shopList" :key="v.id" :data="v" />
    </OpList>
  </div>
</template>

<style lang="scss" scoped>
.home-shope-list {
  padding: 8px 10px;
}
</style>