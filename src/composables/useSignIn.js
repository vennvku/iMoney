import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const error = ref(null);
const isPending = ref(false);

async function signin(email, password) {
  isPending.value = true;
  error.value = null;

  try {
    const response = await AuthServices.login(email, password);

    console.log(response);

    if (!response) throw new Error("Could not create a new user");
  } catch (err) {
    console.log(err);
    error.value = err.response.data.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return { error, isPending, signin };
}
