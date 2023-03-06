<template>
  <div class="row" v-if="!isPending">
    <div
      class="row mt-8"
      v-for="typeCategory in data.typeCategorys"
      :key="typeCategory.id"
    >
      <div class="px-8 font-thin text-red mb-1">
        {{ typeCategory.name_typeCategory }}
      </div>
      <div
        class="container mx-auto bg-white px-8"
        v-for="category in data.categorys"
        :key="category.id"
        @click="
          choosedCategory({
            id: category.id,
            name: category.name_category,
          })
        "
      >
        <div
          class="row rounded-lg"
          v-if="category.typeCategory_id == typeCategory.id"
        >
          <label for="" class="flex items-center">
            <div class="flex items-center flex-none w-10 leading-10 mr-2">
              <span class="inline-block w-8 h-8 rounded-full bg-blue-300">
              </span>
            </div>
            <div class="flex-1 py-3 border-b border-gray-100">
              <div class="text-dark w-full">{{ category.name_category }}</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="" v-else>Loading...</div>
</template>

<script>
import { onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";

import { useEmitter } from "@/composables/useEmitter";
import { useCategory } from "@/composables/useCategory";

export default {
  setup() {
    const router = useRouter();
    const { emitter } = useEmitter();
    const diy = inject("diy");

    const { error, isPending, data, getAllCategory } = useCategory();

    emitter.on("cancel-category", () => {
      router.push({ name: "NewTransaction", params: {} });
      console.log("Cliked!!");
    });

    async function getDataCategory() {
      await getAllCategory();
    }
    getDataCategory();

    function choosedCategory(e) {
      diy.setCategorySelected(e.name);
      diy.updateCategory(e.id);
      router.back();
    }

    onUnmounted(() => {
      emitter.off("cancel-category");
    });

    return { error, isPending, data, choosedCategory };
  },
};
</script>
