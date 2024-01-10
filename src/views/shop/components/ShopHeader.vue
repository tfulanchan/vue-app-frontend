<script setup lang="ts">
import { IShopDetail } from '@/types'
import { computed } from 'vue';

// you hui lei xing
enum DiscountEnum {
  Reduction = 1,
  Dilivery = 2,
  Special = 3,
  Optional = 4,
}

interface IProps {
  data: IShopDetail
}
const props = defineProps<IProps>()

const topThreeServices = computed(() => props.data.service.slice(0, 3))

const reduction = computed(() => {
  const reduction = props.data.discounts.find((v) => v.type === DiscountEnum.Reduction)
  return reduction ? reduction.content: []
})
const reductionLabel = computed(() => {
  return reduction.value.map(v => `man${v.if}jian${v.count}`)
})
</script>


<template>
  <div class="shop-header">
    <div class="shop-header__info">
      <div class="info__left">
        <div class="shop-name op-ellipsis">
          {{ data.shopName }}
          <span v-if="data.branch">{{ data.branch }}</span>
        </div>
        <div class="delivery">
          <div v-if="data.deliveryTags" class="delivery-tag op-thin-border">
            {{ data.deliveryTags[0] }}
          </div>
          <div class="delivery-time">{{ data.deliveryTime }}</div>
          <div class="monthly-count">{{ data.monthlyCount }}</div>
        </div>
      </div>
      <div class="info__right">
        <img :src="data.postUrl" />
      </div>
    </div>
    <div class="shop-header__service">
      <div v-for="v in topThreeServices" :key="v.label" class="service">
        <VanIcon name="passed"></VanIcon>
        {{ v.label }}
      </div>
    </div>
    <div class="shop-header__announcement">
      gong gao: {{ data.announcement }}
    </div>
    <div class="shop-header__redbags">
      <div v-for="v in data.redbags" :key="v.type" class="redbag">
        <span class="redbag-left">
          $<span class="count">{{ v.count }}</span>
          <span>{{ v.if }}</span>
        </span>
        <span class="redbag-right">ling</span>
      </div>
    </div>
    <div class="shop-header__discounts">
      <div class="flex">
        <div v-for="(v, i) in reductionLabel" :key="i" class="activity op-thin-border">
        </div>
      </div>
      <VanIcon name="arrow-down" color="rgb(207, 207, 207)"></VanIcon>
    </div>
  </div>
</template>