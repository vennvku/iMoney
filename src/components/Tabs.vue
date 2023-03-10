<template>
  <div class="container" v-if="tabs.length > 0">
    <div class="tabs flex overflow-x-auto">
      <div
        class="flex-none bg-white px-3 py-1 mr-4 mb-3 rounded-xl text-sm text-gray-400"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'is-active': activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content mt-4">
      <slot :name="tabs[activeTab].name"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const activeTab = ref(0);
    return { activeTab };
  },
};
</script>

<style scoped>
.tabs > div.is-active {
  color: rgb(0 18 255);
  font-weight: 700;
}
</style>
