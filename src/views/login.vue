<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
      <!-- Start: Form -->
      <form
        class="flex flex-col justify-start space-y-6"
        @submit.prevent="onSubmit"
      >
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
              class="font-semibold pt-1 text-red text-sm"
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
              class="font-semibold pt-1 text-red text-sm"
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
            Sign In
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
        <span class="font-semibold">I'm a new user.</span>
        <span class="ml-2">
          <router-link
            :to="{ name: 'Register', params: {} }"
            class="text-primary font-bold"
            >Sign Up</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";

import { useSignIn } from "@/composables/useSignIn";

export default {
  setup() {
    const router = useRouter();

    const { error, isPending, user, signin } = useSignIn();
    const email = ref("");
    const password = ref("");

    const inputError = reactive({
      emailError: null,
      passwordError: null,
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
      if (email.value == "") {
        inputError.emailError = "Email không được để trống !!!";
      }

      if (password.value == "") {
        inputError.passwordError = "Mật khẩu không được để trống !!!";
      }

      if (inputError.emailError == null && inputError.passwordError == null) {
        await signin(email.value, password.value);
        if (!error.value) {
          localStorage.setItem("user", JSON.stringify(user.value));
          router.push({ name: "Profile", params: {} });
        }
      }
    }

    return {
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
