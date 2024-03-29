<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png'
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png'
import { useToggle } from '@/use/useToggle';
import GoodsItem from './GoodsItem.vue';
import { showConfirmDialog } from 'vant';
import {useTransition } from '@/use/useTransition'
import {useEventBus} from '@/use/useEventBus'

const store = useCartStore()
const packageFee = ref(5)

const cartLogo = computed(() => store.total ? CartLogo : EmptyCartLogo)
const [isCartListShown, toggleCartListShown] = useToggle(false)

// inter component event
const eventBus = useEventBus()
const { items, start, beforeEnter, enter, afterEnter } = useTransition()
eventBus.on('cart-add', (el) => {
  start(el)
})

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
            <span v-else class="cart-info__price-empty">wei xuan gou xiang pin</span>
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
    <div class="shop-cart__ball-container">
      <div v-for="(v, i) in items" :key="i">
        <Transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
          <div v-show="v.isShown" class="ball">y
            <div class="inner"></div>x
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  --van-checkbox-size: 16px;

  &__popup {
    background: var(--op-gray-bg-color);
    .popup__all {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      background: white;
      .all-label {
        font-size: 14px;
        font-weight: bold;
      }
      .all-total {
        flex: 1;
        color: gray;
        font-size: 12px;
      }
      .all-remove {
        color: gray;
      }
    }

    .popup__goods {
      margin-bottom: 10px;
      padding: 15px 10px 0 10px;
      background: white;
      max-height: 400px;
      overflow: auto;
      .goods-item {
        display: flex;
        margin-bottom: 15px;
        .van-checkbox {
          margin-right: 10px;
        }

        .flex {
          flex: 1;
        }
      }
    }

    .popup__fee {
      padding: 14px;
      font-size: 14px;
      background: rgb(254, 254, 254);
      .label {
        margin-left: 30px;
        font-size: 14px;
        color: gray;
        .fee {
          color: red;
          font-size: 18px;
        }
      }
    }
  }

  &__tips {
    text-align: center;
    background: rgb(253, 245, 222);
    font-size: 12px;
    padding: 8px 0;
    span {
      color: rgb(255, 61, 61);
    }
    .tips-detail {
      color: gray;
    }
  }
  &__content {
    width: 100%;
    padding: 0px 10px;
    height: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content__left {
      display: flex;
      align-items: center;
      .cart-logo {
        position: relative;
        img {
          width: 50px;
          height: 44px;
        }
        .total {
          position: absolute;
          right: 0;
          top: 2px;
          transform: translateX(40%);
          width: 17px;
          height: 17px;
          background: rgb(255, 61, 61);
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 12px;
          line-height: 17px;
        }
      }

      .cart-info {
        color: gray;
        margin-left: 10px;
        font-size: 12px;

        &__price {
          line-height: 18px;

          &--now {
            font-weight: bold;
            color: rgb(20, 16, 16);
            span {
              font-size: 18px;
            }
          }
          &--old {
            text-decoration: line-through;
          }
          &--empty {
            font-weight: bold;
          }
        }
      }
    }

    .content__right {
      .order-btn {
        height: 36px;
        padding: 0 18px;
        text-align: center;
        color: white;
        border-radius: 18px;
        font-size: 12px;
        background: var(--op-primary-color);
        .label {
          font-size: 14px;
          padding-top: 2px;
        }

        &--empty {
          font-size: 16px;
          background: rgb(152, 152, 152);
          line-height: 36px;
        }
      }
    }
  }

  &__ball-container {
    .ball {
      position: fixed;
      bottom: 10px;
      left: 25px;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--op-primary-color);
        transition: all 0.4s linear;
      }
    }
  }
}
</style>