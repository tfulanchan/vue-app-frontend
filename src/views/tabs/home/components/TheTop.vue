<script setup lang="ts">
import { ref } from 'vue'
import type { ISearchRecomment } from '@/types'
interface IProps {
  // recomments: {
  //   value: number
  //   label: string
  // }[]
  recomments: ISearchRecomment[]
}
import OpSearch from '@/components/OpSearch.vue';

defineProps<IProps>()

interface IEmits {
  (e: 'searchClick'): void;
}

const emits = defineEmits<IEmits>()
// const searchValue = ref('test')

// const onSearch = (v?: string | number) => {
//   console.log('====search', v)
// }

// const onCancel = () => {
//   console.log('=====cancel')
// }

// const onClear = () => {
//   console.log('======clear')
// }
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="../../../../assets/img/index_page/location.png" />
      <div class="location">xing fu bei qu</div>
      <img class="shopcart-icon" src="../../../../assets/img/index_page/shopcart.png" />
      <img class="comments-icon" src="../../../../assets/img/index_page/comments.png" />
    </div>
    <!-- <VanSearch shape="round" background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="world tea drink 2989" 
    >
      <tempalte #right-icon>
        <div>Search</div>
      </tempalte>
    </VanSearch> -->
    <!-- 13: 00 5-33 -->
    <VanSticky>
      <OpSearch shape="round" background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="world tea drink 2989" @inputClick="emits('searchClick')">
        <template #right-icon>
          <div @click="emits('searchClick')">Search</div>
        </template>
      </OpSearch>
    </VanSticky>
    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;

  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;

    .location-icon {
      width: 20px;
      height: 20px;
    }

    .location {
      flex: 1;
    }

    .shopcart-icon {
      width: 24px;
      height: 24px;
    }

    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .search-recommend {
    display: flex;
    padding: 0 10px 8px;

    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>