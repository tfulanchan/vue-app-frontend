<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IShop } from '@/types';
import { useToggle } from '@/use/useToggle';
import { computed } from 'vue';

interface IProps {
  data: IShop
}
const props = defineProps<IProps>()

const router = useRouter()
const [isMoreShown, showMore] = useToggle(false)
const shopName = computed(() => `${props.data.shopName}(${props.data.branch})`)
const reduction = computed(() => {
  return props.data.activitys.find((v) => v.type === 2)?.infos || []
})
const gotoShop = (id: number | string) => {
  router.push({
    name: 'shop',
    params: {
      id,
    },
  })
}
</script>

<template>
  <div class="home-shop-item" @click="gotoShop(data.id)">
    <img class="home-shop-item__poster" :src="data.postUrl" />
    <div class="home-shop-item__info">
      <div class="info_top">
        <div class="info__name op-ellipsis">{{ shopName }}</div>
        <VanIcon name="weapp-nav" color="rgb(207, 207, 207)" style="margin-left: 10px"></VanIcon>
      </div>
      <div class="info_desc">
        <span class="score">{{ data.score }}</span>
        <span class="monthly-count">Month sold{{ data.monthlyCount }}</span>
        <span class="delivery-time">{{ data.deliveryTime }}</span>
        <span class="delivery-distance">Month sold{{ data.deliveryDistance }}</span>
      </div>
      <div class="info_desc">

        <span class="delivery-starting-price">starting price{{ data.deliveryStartingPrice }}</span>
        <span class="delivery-strategy">{{ data.deliveryStrategy }}</span>
        <span v-for="v in data.deliveryTags" :key="v" class="delivery-tag op-thin-border">{{ v }}</span>
      </div>
      <div class="info_comment">{{ data.comments[0] }}</div>
      <div class="info_more" @click.stop="showMore">
        <div v-if="!isMoreShown" class="label">Activity</div>
        <div class="activities">
          <div v-if="!isMoreShown" class="activity op-thin-border">
            {{ reduction[0] }} | {{  reduction[1] }}
          </div>
          <template v-else>
            <div v-for="v in reduction" :key="v" class="activity op-thin-border"></div>
          </template>
        </div>
        <VanIcon :name="`arrow-${isMoreShown ? 'up' : 'down'}`" color="rgb(207, 207, 207)"></VanIcon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>