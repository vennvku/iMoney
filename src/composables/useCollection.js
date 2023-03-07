import { reactive, ref } from "vue";
import AuthServices from "../apis/modules/auth";
import moment from "moment";

const error = ref(null);

const valueTransaction = reactive({
  transactions: null,
  totalTransaction: {
    income: 0,
    expense: 0,
    balance: 0,
  },
});

async function addRecord(transaction) {
  error.value = null;

  try {
    const response = await AuthServices.createTransactions({
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

async function getTransactions() {
  error.value = null;
  valueTransaction.totalTransaction.income = 0;
  valueTransaction.totalTransaction.expense = 0;
  valueTransaction.totalTransaction.balance = 0;

  try {
    const response = await AuthServices.transaction();

    if (response) {
      response.data.transactions.map((item) => {
        if (item.type == 1) {
          valueTransaction.totalTransaction.expense += item.total;
        }
        if (item.type == 0) {
          valueTransaction.totalTransaction.income += item.total;
        }
      });

      const newListTransactions = response.data.transactions.map((item) => {
        item.total = item.total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });

        item.time = moment(item.time).format("dddd, DD-MM");

        if (item.type == 1) {
          return { ...item, colorText: "text-red" };
        }

        if (item.type == 0) {
          return { ...item, colorText: "text-green" };
        }
        return item;
      });

      valueTransaction.transactions = newListTransactions;
    }

    valueTransaction.totalTransaction.balance =
      valueTransaction.totalTransaction.income -
      valueTransaction.totalTransaction.expense;

    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

export function useCollection() {
  return {
    addRecord,
    getTransactions,
    valueTransaction,
    error,
  };
}
