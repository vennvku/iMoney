import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const error = ref(null);

async function logout() {
  error.value = null;

  try {
    const response = await AuthServices.signOut();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

export function useLogout() {
  return { error, logout };
}
