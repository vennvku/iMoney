<template>
  <div class="home">
    <h1>Home Page</h1>
  </div>
  <div class="mt-6" v-if="user">Name: {{ user.name }}</div>
</template>

<script>
import { useUser } from "@/composables/useUser";

export default {
  setup() {
    const { user, getUser } = useUser();

    async function getValue() {
      await getUser();
    }

    getValue();

    return { user };
  },
};
</script>
