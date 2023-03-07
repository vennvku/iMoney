<template>
  <form @submit.prevent="onSubmit">
    <!-- Start: Main Form -->
    <div class="row mt-8">
      <div class="bg-white rounded-lg py-4">
        <div class="container mx-auto px-8">
          <div class="row">
            <label for="total" class="flex items-center">
              <div class="w-10 text-right leading-10 mr-4 pb-1">
                <span
                  class="inline-block px-1 pt-1 text-dark border border-dark rounded text-sm font-bold"
                  >USD</span
                >
              </div>

              <div class="flex flex-col border-b border-gray-100 pb-1">
                <span class="font-semibold text-xs text-dark">Total</span>
                <input
                  id="total"
                  class="text-4xl text-dark w-full outline-none mt-1"
                  type="number"
                  placeholder="0"
                  v-model="total"
                />
                <span
                  class="text-sm text-red"
                  v-if="validateError.totalError"
                  >{{ validateError.totalError }}</span
                >
              </div>
            </label>
          </div>

          <div class="row">
            <label for="category" class="flex items-center">
              <div
                class="flex items-center flex-none w-10 text-right leading-10 mr-4"
              >
                <span
                  class="inline-block ml-auto w-8 h-8 rounded-full bg-blue-300"
                >
                </span>
              </div>

              <div
                class="flex flex-1 flex-col border-b border-gray-100 py-3"
                @click="choosedCategory"
              >
                <div class="flex flex-row">
                  <div class="text-dark w-full">{{ categorySelected }}</div>
                  <div class="">
                    <i class="t2ico t2ico-arrow-right"></i>
                  </div>
                </div>
                <span
                  class="text-sm text-red"
                  v-if="validateError.categoryError"
                  >{{ validateError.categoryError }}</span
                >
              </div>
            </label>
          </div>

          <div class="row">
            <label for="note" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-wallet text-2xl"></i>
                </span>
              </div>

              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="note"
                  class="text-dark w-full outline-none"
                  type="text"
                  placeholder="Note"
                  v-model="note"
                />
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

              <div class="flex-1 py-2 border-b border-gray-100">
                <div class="text-dark w-full">
                  <VueDatePicker
                    v-model="time"
                    :is-24="false"
                    show-now-button
                    format="dd/MM/yyyy hh:mm a"
                  ></VueDatePicker>
                </div>
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
    </div>

    <div class="row mt-8" v-if="!isMoreDetails">
      <button
        class="bg-white rounded-lg py-3 w-full text-primary font-semibold"
        @click="isMoreDetails = true"
      >
        More Details
      </button>
    </div>

    <template v-if="isMoreDetails">
      <!-- Start: Advenced Form -->
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="location" class="flex items-center">
                <div
                  class="flex items-center flex-none w-10 text-right leading-10 mr-4"
                >
                  <span class="flex-none w-10 mr-4">
                    <i class="t2ico t2ico-location text-2xl"></i>
                  </span>
                </div>

                <div class="flex-1 border-b border-gray-100 py-3">
                  <input
                    id="location"
                    class="text-dark w-full outline-none"
                    type="text"
                    placeholder="Select a location"
                    v-model="location"
                  />
                </div>
              </label>
            </div>

            <div class="row">
              <label for="withPerson" class="flex items-center">
                <div class="flex-none w-10 mr-4">
                  <span class="flex items-center justify-end text-dark">
                    <i class="t2ico t2ico-users text-2xl"></i>
                  </span>
                </div>

                <div class="flex-1 py-2">
                  <input
                    id="withPerson"
                    class="text-dark w-full outline-none"
                    type="text"
                    placeholder="With person"
                    v-model="withPerson"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Start: Upload Photo -->
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="file" class="flex items-center text-primary">
                <div class="flex-none w-10 mr-4">
                  <span class="flex items-center justify-end">
                    <i class="t2ico t2ico-camera text-2xl"></i>
                  </span>
                </div>

                <div class="flex-1 py-2">
                  <div class="w-full font-semibold">Upload Photos</div>
                  <input
                    type="file"
                    id="file"
                    class="w-0 h-0 overflow-hidden absolute"
                    @change="onChangeFile"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="text-red my-3">
          {{ errorFile }}
        </div>
      </div>

      <div class="row mt-8" v-if="isMoreDetails">
        <button
          class="bg-white rounded-lg py-3 w-full text-primary font-semibold"
          @click="isMoreDetails = false"
        >
          Close Details
        </button>
      </div>
    </template>
  </form>
</template>

<script>
import { ref, watch, inject, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

import { useCollection } from "@/composables/useCollection";
import { useUser } from "@/composables/useUser";
import { useEmitter } from "@/composables/useEmitter";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  setup() {
    const diy = inject("diy");
    const router = useRouter();
    const { emitter } = useEmitter();
    const { error, addRecord } = useCollection();
    const isMoreDetails = ref(false);
    const categorySelected = ref("Select a Category");
    const validateError = reactive({
      totalError: null,
      categoryError: null,
    });
    const canAdd = ref(false);

    const total = ref(diy.getTransactionStore().total);
    const category = ref(diy.getTransactionStore().category);
    const note = ref(diy.getTransactionStore().note);
    const time = ref(diy.getTransactionStore().time);
    const location = ref(diy.getTransactionStore().location);
    const withPerson = ref(diy.getTransactionStore().withPerson);
    const file = ref(null);
    const errorFile = ref(null);

    const { user, getUser } = useUser();
    async function getValueUser() {
      await getUser();
    }
    getValueUser();

    function choosedCategory() {
      router.push({ name: "Category", params: {} });
    }

    onMounted(() => {
      if (diy.getCategorySelected() !== null) {
        categorySelected.value = diy.getCategorySelected();
      }
    });

    watch(category, (newValue, oldValue) => {
      // Điều khiển logic tại đây
      console.log(`myVariable đã thay đổi từ ${oldValue} thành ${newValue}`);
    });

    watch(total, (newValue) => {
      if (newValue < 0) {
        validateError.totalError = "Số tiền bị âm";
        canAdd.value = false;
      } else {
        validateError.totalError = null;
        canAdd.value = true;
      }
      diy.updateTotal(newValue);
    });

    watch(note, (newValue) => {
      diy.updateNote(newValue);
    });

    watch(time, (newValue) => {
      diy.updateTime(newValue);
    });

    watch(location, (newValue) => {
      diy.updateLocation(newValue);
    });

    watch(withPerson, (newValue) => {
      diy.updateWithPerson(newValue);
    });

    function onChangeFile(event) {
      const selected = event.target.files[0];
      const typesFile = ["image/png", "img/jpg"];

      if (selected && typesFile.includes(selected.type)) {
        file.value = selected;

        console.log(file.value);
      } else {
        file.value = null;
        errorFile.value = "Please select a file type PNG or JPG";
        console.log(errorFile.value);
      }
    }

    async function onSubmit() {
      const transaction = {
        total: parseInt(total.value),
        category: category.value,
        note: note.value,
        time: moment(time.value).format("YYYY-MM-DD HH:mm:ss"),
        location: location.value,
        withPerson: withPerson.value,
        userId: user.value.id,
      };

      if (total.value == 0) {
        validateError.totalError = "Bạn phải nhập số tiền";
        canAdd.value = false;
      }

      if (!category.value) {
        validateError.categoryError = "Category is null";
        canAdd.value = false;
      }

      if (total.value > 0 && category.value) {
        canAdd.value = true;
      }

      if (canAdd.value) {
        console.log("True");
        console.log(transaction);
        await addRecord(transaction);
        if (!error.value) {
          diy.setTransactionStore({
            total: 0,
            category: 0,
            note: null,
            time: new Date(),
            location: null,
            withPerson: null,
          });
          diy.setCategorySelected(null);
          router.push({ name: "Home", params: {} });
        }
      } else {
        console.log("False");
        console.log(transaction);
      }
    }

    emitter.on("add-transaction", () => {
      onSubmit();
    });

    onUnmounted(() => {
      emitter.off("add-transaction");
    });

    return {
      isMoreDetails,
      total,
      category,
      choosedCategory,
      note,
      time,
      location,
      withPerson,
      onChangeFile,
      errorFile,
      categorySelected,
      validateError,
      onSubmit,
      error,
    };
  },
};
</script>
