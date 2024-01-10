<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '../../search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { ICountdown, IHomeInfo } from '@/types'
import OpLoadingView from '@/components/OpLoadingView.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import CountDown from './components/CountDown.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '../../../config/index'
import { ref } from 'vue'
import { HOME_TABS } from './config'

const recomments = [
  {
    value: 1,
    label: 'beef',
  },
  {
    value: 2,
    label: 'salad',
  }
]
const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
} as IHomeInfo)

const tabBackgroundColor = ref(TRANSPARENT)
const onTabScroll = ({ isFixed }: {isFixed: boolean}) => {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView">
      </SearchView>
    </Transition>
    <div v-show="isSearchViewShown"></div>
    <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
    <!-- <SearchVue v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchVue> -->
    <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
    <OpLoadingView :loading="pending" type="skeleton">
      <!-- <template #template>
        <div>loading</div>
      </template> -->
      <!-- 5-17 -->
      <div class="home-page__banner">
        <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
      </div>
      <TheTransformer :data="data.transformer" />
      <!-- <div>
        {{ data }}
      </div> -->
      <ScrollBar :data="data.scrollBarInfoList" />
      <div class="home-page__activity">
        <CountDown :data="data.countdown" />
        <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
          <OpSwipeItem v-for="v in data.activities" :key="v">
          <img :src="v" />
          </OpSwipeItem>
        </OpSwipe>
      </div>
      <VanTabs sticky offset-top="54px" :color="PRIMARY_COLOR" :background="tabBackgroundColor" @scroll="onTabScroll">
        <!-- bottom scrollable tabs -->
        <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
          <component :is="v.component"></component>
        </VanTab>
      </VanTabs>
    </OpLoadingView>
    {{ pending }}
    {{ data }}
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      // ensure banner fit in center not too big
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }

  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>