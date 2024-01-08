<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import OpSearch from '@/components/OpSearch.vue'
import { fetchSearchData } from '@/api/search'
import type { ISearchResult } from '@/types'
import { useToggle } from '@/use/useToggle'

interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const HISTORY_TAGS = [
  'pizza',
  'cheese',
  'rice',
  'noodles',
  'chicken',
  'beef',
  'fruits'
]
const [isHistroyTagShown, toggleHistoryTag] = useToggle(false)
// const historyTags = ref([])
const historyTags = computed(() => (isHistroyTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)))

const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INIT)
// const onSearch = async (v?: string | number) => {
const onSearch = async (v?: any) => {
  console.log('======onSearch', v)
  try {
    searchState.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  } finally {
    searchState.value = DOING
  }
}

const onTagClick = (v: string) => {
  searchValue.value = v
  onSearch(v)
}
watch(searchValue, (nv) => {
  if (!nv) {
    searchResult.value = []
    return
  }
})
</script>

<template>
  <div class="search-view" @click="emits('cancel')">
    <OpSearch show-action v-model="searchValue" shape="round" placeholder="please enter related keywords"
      @search="onSearch" @cancel="emits('cancel')">
    </OpSearch>
    <div v-if="!searchValue" class="search-view_history">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)"></div>
        <div class="history-tag" key="arrow" @click="toggleHistoryTag">
          <VanIcon v-if="isHistroyTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-up"></VanIcon>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view_result">
      <div class="searching" v-if="searchState === DOING">~searching~</div>
      <template v-if="searchState == DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <div class="name">{{ v.label }}</div>
          <div class="count"> {{ v.resultCount }} results</div>
        </div>
        <div class="no-result" v-if="!searchResult">~no result~</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);

    .label {
      margin-bottom: var(--van-padding-xs);
    }

    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);

      .name {
        flex: 1;
        padding-left: 6px;
      }

      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }

    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

// 5-9
.list-enter-active,
list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>