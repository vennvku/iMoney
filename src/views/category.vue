<template>
  <div class="row container mb-20" v-if="!isPending">
    <div class="row mx-3 relative">
      <img
        class="absolute top-1.5 left-2 w-6 h-6"
        src="@/assets/images/search.png"
        alt="Icon Search"
      />
      <input
        class="w-full h-9 rounded-2xl bg-gray-200 pl-9 pr-3 outline-none"
        type="text"
        v-model="searchCategory"
        placeholder="Enter Category Name"
      />
    </div>
    <div
      class="row mt-8"
      v-for="typeCategory in data.typeCategorys"
      :key="typeCategory.id"
    >
      <div class="px-8 font-semibold text-primary mb-1">
        {{ typeCategory.name_typeCategory }}
      </div>
      <div
        class="container mx-auto bg-white px-8"
        v-for="category in categoryFillter"
        :key="category.id"
        @click="
          choosedCategory({
            id: category.id,
            icon: category.icon,
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
              <div
                class="inline-block flex justify-center items-center overflow-hidden w-10 h-10 rounded-full border-green border"
              >
                <img
                  class="w-6 h-6"
                  :src="'http://venn.com/images/' + category.icon"
                  :alt="category.name_category"
                />
              </div>
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
import { ref, reactive, computed, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";

import { useEmitter } from "@/composables/useEmitter";
import { useCategory } from "@/composables/useCategory";

export default {
  setup() {
    const router = useRouter();
    const { emitter } = useEmitter();
    const diy = inject("diy");

    const searchCategory = ref("");

    const { error, isPending, data, getAllCategory } = useCategory();

    emitter.on("action-back-category", () => {
      router.push({ name: "NewTransaction", params: {} });
    });

    emitter.on("detail-category", () => {
      router.push({ name: "DetailCategory", params: {} });
    });

    const listCategory = reactive({
      typeCategorys: [],
      categorys: [],
    });

    async function getDataCategory() {
      const allCategory = await getAllCategory();

      if (allCategory) {
        listCategory.typeCategorys = allCategory.typeCategorys;
        listCategory.categorys = allCategory.categorys;
      }
    }
    getDataCategory();

    const categoryFillter = computed(() =>
      listCategory.categorys.filter((category) => {
        const name = category.name_category.toLowerCase();
        return name.includes(searchCategory.value.toLowerCase());
      })
    );

    function choosedCategory(e) {
      diy.updateNameCategory(e.name);
      diy.updateIcon(e.icon);
      diy.updateCategory(e.id);
      router.back();
    }

    onUnmounted(() => {
      emitter.off("action-back-category");
      emitter.off("detail-category");
    });

    return {
      error,
      isPending,
      data,
      searchCategory,
      listCategory,
      categoryFillter,
      choosedCategory,
    };
  },
};
</script>
