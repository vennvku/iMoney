import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const userStorage = JSON.parse(localStorage.getItem("user"));

const user = ref(null);

if (userStorage) {
  user.value = userStorage.user;
}

async function getUser() {
  if (!user.value) {
    try {
      const response = await AuthServices.user(userStorage.user.id);

      user.value = response.data.user;

      return response.data.user;
    } catch (err) {
      console.log(err.message);
    }
  } else {
    return user.value;
  }
}

export function useUser() {
  return { getUser, user };
}
