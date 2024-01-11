<script setup lang="ts">
import OpLoadingView from '@/components/OpLoadingView.vue'
import { fetchGoodsListData } from '@/api/goods'
import { useRoute } from 'vue-router'
import type { IMenu } from '@/types'
import { ref } from 'vue';
import { useAsync } from '@/use/useAsync';

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(() => fetchGoodsListData(id as string).then((v) => v.data), [] as IMenu[])

const categoryActive = ref(0)

</script>



<template>
<OpLoadingView :loading="pending" type="skeleton">
<div class="shop-goods-list">
  <VanSidebar v-model="categoryActive">
    <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
  </VanSidebar>
  <div class="list">
    <template v-for="v in data" :key="v.label">
    <div class="category-name">{{ v.label }}</div>
    <div v-for="cv in v.goods" :key="cv.id">
    {{ cv.name }}
    </div>
  </template>
  </div>
</div>
</OpLoadingView>
<div class="shop-goods-list">test</div>
</template>