import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const useCollection = () => {
  const error = ref(null);

  async function addRecord(record) {
    error.value = null;

    try {
      const response = await AuthServices.transactions(record);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  return { error, addRecord };
};

export default useCollection;
