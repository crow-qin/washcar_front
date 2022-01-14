<template>
  <div class="statistic-gold scroll-page-reset">
    <div 
      ref="container"
      class="list-view part-reset" 
      @scroll="handleScroll">
      <div
        class="list-view-phantom"       
        :style="{
          height: contentHeight
        }">
      </div>
      <div
        ref="content"
        class="list-view-content">
        <div
          class="list-view-item"
          :style="{
            height: state.itemHeight + 'px'
          }"
          v-for="item in state.visibleData"
          :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";

const state = reactive({
  list: Array.from(new Array(1000), (v,k)=>k),
  itemHeight: 60,
  visibleData: [],
});
const content = ref(null);
const container = ref(null);
const contentHeight = computed(() => {
  return state.list.length * state.itemHeight + 'px';
});
onMounted(() => {
  updateVisibleData();
});
const updateVisibleData = (scrollTop) => {
  scrollTop = scrollTop || 0;
  const visibleCount = Math.ceil(container.value.clientHeight / state.itemHeight);
  const start = Math.floor(scrollTop / state.itemHeight);
  const end = start + visibleCount;
  state.visibleData = state.list.slice(start, end);
  content.value.style.webkitTransform = `translate3d(0, ${ start * state.itemHeight }px, 0)`;
};

const handleScroll = () => {
  const scrollTop = container.value.scrollTop;
  updateVisibleData(scrollTop);
};
const getItemSize = (item, index) => {
  // content.value
};
const getItemSizeAndOffset = (index) => {
  let total = 0;
  for (let i = 0, j = Math.min(index, state.list.length - 1); i <= j; i++) {
    // const size = 
    if (i === j) {
      return {
        offset: total,
        // size
      };
    }
  }
};
</script>

<style>
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding-left: 20px;
  color: #666;
  box-sizing: border-box;
  vertical-align: middle;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #666;
}
</style>