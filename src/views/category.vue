<template>
  <div class="row mt-8">
    <div class="px-8 font-bold text-red">Chi tieu</div>
    <div class="container mx-auto bg-white px-8">
      <div class="row rounded-lg">
        <label for="" class="flex items-center">
          <div class="flex items-center flex-none w-10 leading-10 mr-2">
            <span class="inline-block w-8 h-8 rounded-full bg-blue-300"> </span>
          </div>
          <div class="flex-1 py-3 border-b border-gray-100">
            <div class="text-dark w-full">Payment</div>
          </div>
        </label>
      </div>

      <div class="row rounded-lg">
        <label for="" class="flex items-center">
          <div class="flex items-center flex-none w-10 leading-10 mr-2">
            <span class="inline-block w-8 h-8 rounded-full bg-blue-300"> </span>
          </div>
          <div class="flex-1 py-3 border-b border-gray-100">
            <div class="text-dark w-full">Payment</div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from "vue";
import { useEmitter } from "@/composables/useEmitter";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { emitter } = useEmitter();

    emitter.on("cancel-category", () => {
      router.push({ name: "NewTransaction", params: {} });
      console.log("Cliked!!");
    });

    onUnmounted(() => {
      emitter.all.clear();
    });

    return {};
  },
};
</script>
