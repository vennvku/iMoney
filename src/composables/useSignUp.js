import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const error = ref(null);
const isPending = ref(false);

async function signup(email, password, fullName) {
  isPending.value = true;
  error.value = null;

  try {
    const response = await AuthServices.register(email, password, fullName);

    console.log(response);

    if (!response) throw new Error("Could not create a new user");
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignUp() {
  return { error, isPending, signup };
}
