<template>
  <div class="home">
    <h1>Home Page</h1>
  </div>
  <div class="mt-6" v-if="user">
    {{ user }}
  </div>
</template>

<script>
import { useUser } from "@/composables/useUser";

export default {
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();

    return { user };
  },
};
</script>
