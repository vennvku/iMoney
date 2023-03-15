<template>
  <!-- Start: Info -->
  <div class="row" v-if="user">
    <div class="container mx-auto p-8">
      <div class="text-center">
        <div
          class="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-orange-200"
        >
          <img
            class="w-full h-auto object-cover"
            src="data:image/jpeg;base64,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"
            size="xs"
            alt="User's Profile Avatar"
          />
        </div>
        <div class="font-bold text-2xl text-primary mt-3">{{ user.name }}</div>
        <p class="font-semibold text-gray-400 mt-1">{{ user.email }}</p>
      </div>
    </div>
  </div>

  <!-- Start: Menu -->
  <div class="row">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <h3 class="font-bold text-xl text-primary mb-2">General</h3>
        </div>
      </div>
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <ul>
            <li
              class="text-dark last:text-red"
              v-for="profileOption in profileOptions"
              :key="profileOption.name"
            >
              <router-link
                :to="profileOption.route"
                class="flex justify-between items-center py-3"
              >
                <div class="flex items-center text-left">
                  <i class="t2ico text-2xl" :class="profileOption.icon"></i>
                  <h5 class="font-semibold ml-3">{{ profileOption.name }}</h5>
                </div>
                <div class="text-right">
                  <i class="t2ico t2ico-arrow-right text-2xl"></i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { PROFILE_OPTIONS } from "@/constants";
import { useUser } from "@/composables/useUser";

export default {
  setup() {
    const profileOptions = reactive(PROFILE_OPTIONS);

    const { user, getUser } = useUser();

    async function getValueUser() {
      await getUser();
    }
    getValueUser();

    return { user, profileOptions };
  },
};
</script>
