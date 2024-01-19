<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import CartLogo from '@assets/imgs/'
const store = useCartStore()
const packageFee = ref(5)

const cartLogo = computed(() => store.total ? CartLogo : EmptyCartLogo)
</script>

<template>
  <div class="shop-cart">
    <VanPopup v-model:show="isCartListShown" round position="bottom">
      <div class="shop-cart__popup"></div>
    </VanPopup>
    <div class="shop-cart__tips">
      pei shong fei<span>man 0.01 jian 7</span>
    </div>
    <div class="shop-cart__content">
      <div class="content-left">
        <div class="cart-logo">
          <img :src="cartLogo" />
          <div v-if="store.total" class="total">{{ store.total }}</div>
        </div>
        <div class="cart-info">
          <div v-if="store.total" class="cart-info__price">
          <template v-if="store.total">
            <span class="cart-info__price-now">
              $<span>{{ store.totalPrice }}</span>
            </span>
            <span class="cart-info__price-old">
              ${{ store.totalOldPrice }}
            </span>
          </template>
            <span class="cart-info__price-empty">wei xuan gou xiang pin</span>
        </div>
          <div v-else class="cart-info__desc">ling xu pei shong fei {{ packageFee }}</div>
        </div>
      </div>
      <div class="content-right">
        <div v-if="store.total" class="order-btn">
          <div class="label">get coupan to checkout</div>
          <div>estimated after coupon ${{ store.totalPrice }}</div>
        </div>
        <div v-else class="order-btn order-btn--empty">$20 min delivery</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>