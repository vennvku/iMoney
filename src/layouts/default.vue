<template>
  <h1>Default Layout</h1>
  <slot />
  <navigation-bottom />
</template>

<script>
import NavigationBottom from "@/components/NavigationBottom.vue";

export default {
  components: { NavigationBottom },
};
</script>
