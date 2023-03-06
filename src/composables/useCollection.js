import { ref } from "vue";
import AuthServices from "../apis/modules/auth";

const useCollection = () => {
  const error = ref(null);

  async function addRecord(transaction) {
    error.value = null;

    try {
      const response = await AuthServices.transactions({
        total: transaction.total,
        note: transaction.note,
        time: transaction.time,
        location: transaction.location,
        withPerson: transaction.withPerson,
        category_id: transaction.category,
        user_id: transaction.userId,
      });
      return response;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  return { error, addRecord };
};

export default useCollection;
