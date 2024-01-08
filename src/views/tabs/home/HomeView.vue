<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '../../search/SearchView.vue'
import { useToggle } from '@/use/useToggle'

const recomments = [
  {
    value:1,
    label: 'beef',
  },
  {
    value: 2,
    label: 'salad',
  }
]
const [isSearchViewShown, toggleSearchView] = useToggle(false)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView">
      </SearchView>
    </Transition>
    <SearchVue v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchVue>
    <TheTop :recomments="recomments" 
    @searchClick="toggleSearchView" 
  />
  </div>
</template>

<style lang="scss" scoped>
.test {
  font-size: 39px;
}
.fade-enter-active,
.fade-leave-acitve {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>