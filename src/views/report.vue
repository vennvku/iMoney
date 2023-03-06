<template>
  <h1>This is Page Report</h1>
  <VueDatePicker v-model="date" :is-24="false" show-now-button></VueDatePicker>
</template>

<script>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },

  setup() {
    const date = ref(new Date());
    return { date };
  },
};
</script>
