<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
      <!-- Start: Form -->
      <form
        class="flex flex-col justify-start space-y-6"
        @submit.prevent="onSubmit"
      >
        <div class="row">
          <label class="flex flex-col" for="fullName">
            <span class="font-semibold">Full Name</span>
            <input
              id="fullName"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              type="text"
              placeholder="iMoney..."
              v-model="fullName"
            />
            <span
              class="font-semibold text-sm text-red pt-1"
              v-if="inputError.fullNameError"
              >{{ inputError.fullNameError }}</span
            >
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold">Email Address</span>
            <input
              id="email"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              type="email"
              placeholder="example@gmail.com"
              autocomplete="username"
              v-model="email"
            />
            <span
              class="font-semibold text-sm text-red pt-1"
              v-if="inputError.emailError"
              >{{ inputError.emailError }}</span
            >
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="password">
            <span class="font-semibold">Password</span>
            <input
              id="password"
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              type="password"
              placeholder="Example"
              autocomplete="current-password"
              v-model="password"
            />
            <span
              class="font-semibold text-sm text-red pt-1"
              v-if="inputError.passwordError"
              >{{ inputError.passwordError }}</span
            >
          </label>
        </div>
        <div class="row">
          <button
            v-if="!isPending"
            type="submit"
            class="py-3 text-center w-full bg-primary text-white font-bold rounded-lg"
          >
            Sign up
          </button>
          <button
            v-else
            type="button"
            class="py-3 text-center w-full bg-gray-800 text-white font-bold rounded-lg cursor-not-allowed"
            disabled
          >
            Loading...
          </button>
        </div>
      </form>

      <!-- Start Error -->
      <div v-if="error" class="text-left text-red mt-4">
        <span>{{ error }}</span>
      </div>

      <!-- Start Direction -->
      <div class="w-full text-center mt-6">
        <span class="font-semibold">I'm already a member.</span>
        <span class="ml-2">
          <router-link
            :to="{ name: 'Login', params: {} }"
            class="text-primary font-bold"
            >Sign In</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";

import { useSignUp } from "@/composables/useSignUp";

export default {
  setup() {
    const { error, isPending, signup } = useSignUp();
    const router = useRouter();
    const canRegister = ref(false);

    const inputError = reactive({
      fullNameError: null,
      emailError: null,
      passwordError: null,
    });

    const fullName = ref("");
    const email = ref("");
    const password = ref("");

    watch(fullName, (newValue) => {
      if (newValue == "") {
        inputError.fullNameError = "Tên không được để trống";
      } else {
        inputError.fullNameError = null;
      }
    });

    watch(email, (newValue) => {
      if (newValue !== "") {
        let re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(newValue)) {
          inputError.emailError = "Email không hợp lệ !!!";
        } else {
          inputError.emailError = null;
        }
      } else {
        inputError.emailError = null;
      }
    });

    watch(password, (newValue) => {
      if (newValue == "") {
        inputError.passwordError = "Mật khẩu không được để trống";
      } else {
        inputError.passwordError = null;
      }
    });

    async function onSubmit() {
      if (fullName.value == "") {
        inputError.fullNameError = "Tên không được để trống";
        canRegister.value = false;
      }

      if (email.value == "") {
        inputError.emailError = "Email không được để trống";
        canRegister.value = false;
      }

      if (password.value == "") {
        inputError.passwordError = "Mật khẩu không được để trống";
        canRegister.value = false;
      }

      if (
        inputError.fullNameError == null &&
        inputError.emailError == null &&
        inputError.passwordError == null
      ) {
        console.log("true");
        await signup(email.value, password.value, fullName.value);
        if (!error.value) router.push({ name: "Profile", params: {} });
      } else {
        console.log("false");
      }
    }
    return {
      fullName,
      email,
      password,
      error,
      isPending,
      onSubmit,
      inputError,
    };
  },
};
</script>
