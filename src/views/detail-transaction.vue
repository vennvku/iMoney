<template>
  <div class="row container">
    <div class="row mt-8">
      <div class="row bg-white rounded-lg py-4">
        <div class="container mx-auto px-8">
          <div class="row">
            <label for="time" class="flex items-center">
              <div
                class="inline-block mr-4 flex justify-center items-center overflow-hidden w-10 h-10 rounded-full border-green border"
              >
                <img
                  class="w-6 h-6"
                  :src="'http://venn.com/images/' + icon"
                  alt="Image"
                />
              </div>

              <div class="flex-1 py-2">
                <div class="text-dark w-full font-semibold text-2xl">
                  {{ name_category }}
                </div>
              </div>
            </label>
          </div>
          <div class="row">
            <label for="total" class="flex items-center">
              <div class="w-10 text-right leading-10 mr-4 pb-1">
                <span
                  class="inline-block px-1 pt-1 text-dark border border-dark rounded text-sm font-bold"
                  >VNĐ</span
                >
              </div>

              <div class="flex-1 border-b border-gray-100 pb-1">
                <div class="text-dark w-full font-semibold text-2xl">
                  {{ total }}
                </div>
              </div>
            </label>
          </div>

          <div class="row">
            <label for="time" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-calendar text-2xl"></i>
                </span>
              </div>

              <div class="flex-1 py-2">
                <div class="text-dark w-full">{{ time }}</div>
              </div>
            </label>
          </div>

          <div class="row">
            <label for="wallet" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-wallet text-2xl"></i>
                </span>
              </div>

              <div class="flex-1 py-2">
                <div class="text-dark w-full">My wallet</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="row bg-white mt-9 text-center">
        <div
          class="py-2 text-red font-semibold"
          @click="actionDeleteTransaction"
        >
          Xóa giao dịch
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onUnmounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import moment from "moment";

import { useEmitter } from "@/composables/useEmitter";
import { useCollection } from "@/composables/useCollection";

export default {
  setup() {
    const router = useRouter();
    const { emitter } = useEmitter();
    const diy = inject("diy");

    const { error, deleteTransaction } = useCollection();

    const id_transaction = ref(diy.getTransactionStore().id_transaction);

    const icon = ref(diy.getTransactionStore().icon);
    const name_category = ref(diy.getTransactionStore().name_category);
    const total = ref(
      diy.getTransactionStore().total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    );
    const time = ref(
      moment(diy.getTransactionStore().time).format("dddd, DD-MM-YYYY")
    );

    async function actionDeleteTransaction() {
      const deleteTrans = await deleteTransaction(id_transaction.value);
      if (deleteTrans) {
        if (deleteTrans.data.status == true) {
          router.back();
        }
      }
    }

    emitter.on("action-back", () => {
      router.back();
      console.log("Back");
    });

    emitter.on("go-to-update", () => {
      router.push({ name: "UpdateTransaction", params: {} });
    });

    onBeforeRouteLeave((to, from, next) => {
      if (to.name !== "UpdateTransaction") {
        diy.resetTransactionStore();
      }
      next();
    });

    onUnmounted(() => {
      emitter.off("action-back");
      emitter.off("go-to-update");
    });

    return { total, icon, name_category, time, actionDeleteTransaction, error };
  },
};
</script>
