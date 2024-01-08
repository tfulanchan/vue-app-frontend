<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const active = ref(route.name as string)

watch(active, (nv) => {
  router.push({
    name: nv,
  })
})
</script>

<template>
  <RouterView />
  <VanTabbar v-model="active">
    <VanTabbarItem name="home" icon="home-o">Home</VanTabbarItem>
    <VanTabbarItem name="order" icon="bars">Orders</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact">Me</VanTabbarItem>
  </VanTabbar>
</template>

<style>
.center{
  text-align: center;
}
</style>