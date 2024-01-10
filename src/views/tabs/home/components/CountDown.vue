<script setup lang="ts">
import type { ICountdown } from '@/types';
import { useCountDown } from '@/use/useCountDown'

interface IProps {
  data: ICountdown
}
const props = defineProps<IProps>()

const padStart = (num: number) => {
  return num.toString().padStart(2, '0')
}

const countDown = useCountDown({
  time: props.data.time,
  millisecond: false
})
// start counting
countDown.start()
const { current } = countDown

</script>

<template>
  <div class="home-count-down">
    <div class="home-count-down__info">
      <img src="../../../../assets/imgs/index_page/count-down.png" />
      <span class="number">{{ padStart(current.hours)}}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(current.minutes)}}</span>
      <span class="colon">:</span>
      <span class="number">{{ padStart(current.seconds)}}</span>
    </div>
    <div class="home-count-down__goods">
      <img class="goods-img" :src="data.goods.imgUrl" />
      <div class="goods-name op-ellipsis">{{ data.goods.name }}</div>
      <div class="goods-price">
        <span class="goods-price__now">$
          <span>{{ data.goods.price }}</span>
        </span>
        <span class="goods-price__old">$
        {{ data.goods.oldPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-countdown{

}
</style>