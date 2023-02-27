import { ref } from "vue";
//import AuthServices from "../apis/modules/auth";

const user = ref(null);

function getUser() {
  return { user };
}

export function useUser() {
  return { getUser };
}
