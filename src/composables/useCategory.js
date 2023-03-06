import { ref, reactive } from "vue";
import AuthServices from "../apis/modules/auth";

const error = ref(null);
const isPending = ref(false);

const data = reactive({
  categorys: [],
  typeCategorys: [],
});

async function getAllCategory() {
  isPending.value = true;
  error.value = null;

  try {
    const response = await AuthServices.getAllCategory();

    data.categorys = response.data.categorys;
    data.typeCategorys = response.data.typeCategorys;

    if (!response) throw new Error("Could not get Category");
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useCategory() {
  return { error, isPending, data, getAllCategory };
}
