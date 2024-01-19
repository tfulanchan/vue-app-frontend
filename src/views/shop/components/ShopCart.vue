<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png'
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png'
import { useToggle } from '@/use/useToggle';
import GoodsItem from './GoodsItem.vue';
import { showConfirmDialog } from 'vant';

const store = useCartStore()
const packageFee = ref(5)

const cartLogo = computed(() => store.total ? CartLogo : EmptyCartLogo)
const [isCartListShown, toggleCartListShown] = useToggle(false)
const showCartListPopup = () => {
  if (!store.total) {
    return
  }
  toggleCartListShown()
}
const removeAll = () => {
  showConfirmDialog({
    title: 'confirm empty cart?',
  }).then(() => {
    store.setCartItems([])
    toggleCartListShown()
  }).catch(() => {
    //on cancel
  })
}
</script>

<template>
  <div class="shop-cart">
    <VanPopup v-model:show="isCartListShown" round position="bottom">
      <div class="shop-cart__popup">
        <div class="shop-cart__tips">
          <div>49 minu 3, needs<span>24.2</span>dollars<span>go combine</span></div>
          <div class="tips-detail">already included: </div>
        </div>
        <div class="popup__all">
          <VanCheckbox checked-color="rgb(31, 175, 243)" :model-value="store.isAllChecked"
            @update:model-value="(isAllChecked) => store.toggleAllChecked(isAllChecked)">
            <span class="all-label">quan shuan</span>
          </VanCheckbox>
          <div class="all-total">(selected{{ store.total }}jian)</div>
          <span class="all-remove" @click="removeAll">
            <VanIcon name="delete-o" />qiang kong
          </span>
        </div>
        <div class="popup__goods">
          <VanCheckboxGroup checked-color="rgb(31, 175, 243)" :model-value="store.state.checkedIds"
            @update:model-value="(ids) => store.setCheckedIds(ids)">
            <div v-for="v in store.store.items" :key="v.id" class="goods-item">
              <VanCheckbox :anme="v.id" />
              <GoodsItem class="flex" :data="v"></GoodsItem>
            </div>
          </VanCheckboxGroup>
        </div>
        <div class="popup__fee">
          <span>bou joung fei</span>
          <span class="label">
            ling shua<span class="fee">${{ packageFee }}</span>
          </span>
        </div>
      </div>
    </VanPopup>
    <div class="shop-cart__tips">
      pei shong fei<span>man 0.01 jian 7</span>
    </div>
    <div class="shop-cart__content" @click="showCartListPopup">
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

<style lang="scss" scoped></style>