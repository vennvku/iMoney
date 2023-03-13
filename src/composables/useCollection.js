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
  reportThisDay: null,
  reportThisWeek: null,
  reportThisMonth: null,
});

const dataReport = reactive({
  totalMonth: {
    incomeTotal: [],
    expenseTotal: [],
  },
  detailTransaction: null,
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

async function updateTransaction(transaction) {
  error.value = null;

  console.log(transaction);

  try {
    const response = await AuthServices.updateTransactions(
      transaction.id_transaction,
      {
        total: transaction.total,
        note: transaction.note,
        time: transaction.time,
        location: transaction.location,
        withPerson: transaction.withPerson,
        category_id: transaction.category,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

async function deleteTransaction(id) {
  error.value = null;

  try {
    const response = await AuthServices.deleteTransactions(id);
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
      const totalBalance = response.data.transactions;

      totalBalance.map((item) => {
        if (item.type == 1) {
          valueTransaction.totalTransaction.expense += item.total;
        }
        if (item.type == 0) {
          valueTransaction.totalTransaction.income += item.total;
        }
      });
      valueTransaction.totalTransaction.balance =
        valueTransaction.totalTransaction.income -
        valueTransaction.totalTransaction.expense;

      const recentTransaction = response.data.transactions.map(
        (transaction) => ({
          ...transaction,
        })
      );

      recentTransaction.map((item) => {
        item.totalString = item.total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        item.timeString = moment(item.time).format("dddd, DD-MM");
        if (item.type == 1) {
          return (item.colorText = "text-red");
        }
        if (item.type == 0) {
          return (item.colorText = "text-green");
        }
      });

      valueTransaction.transactions = recentTransaction;

      const inComeAndExpense = response.data.transactions.map(
        (transaction) => ({
          ...transaction,
        })
      );

      valueTransaction.reportThisDay = getTypeChoosenReport(
        inComeAndExpense,
        "day"
      );

      valueTransaction.reportThisWeek = getTypeChoosenReport(
        inComeAndExpense,
        "week"
      );

      valueTransaction.reportThisMonth = getTypeChoosenReport(
        inComeAndExpense,
        "month"
      );

      return valueTransaction;
    }
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

function getTypeChoosenReport(data, type) {
  const currentDay = moment().format("YYYY-MM-DD");

  const currentWeekStart = moment().startOf("week");
  const currentWeekEnd = moment(currentWeekStart).add(7, "days");

  const currentMonth = moment().month() + 1;

  let transactionsReport = [];

  if (type == "day") {
    transactionsReport.value = data.filter((item) => {
      return moment(item.time).format("YYYY-MM-DD") === currentDay;
    });
  }

  if (type == "week") {
    transactionsReport.value = data.filter((d) => {
      const date = moment(d.time);
      return (
        date.isSameOrAfter(currentWeekStart) && date.isBefore(currentWeekEnd)
      );
    });
  }

  if (type == "month") {
    transactionsReport.value = data.filter((item) => {
      return moment(item.time).month() + 1 === currentMonth;
    });
  }

  const reportData = {
    income: 0,
    incomeString: null,
    expense: 0,
    expenseString: null,
    totalString: null,
    transactions: [],
  };

  transactionsReport.value.map((item) => {
    if (item.type == 0) {
      reportData.income += item.total;
    }

    if (item.type == 1) {
      reportData.expense += item.total;
    }
  });

  const groupedTransaction = transactionsReport.value.reduce(
    (result, transaction) => {
      if (transaction.type == 1) {
        if (!result[transaction.name_category]) {
          result[transaction.name_category] = [];
        }

        result[transaction.name_category].push(transaction);
      }
      return result;
    },
    {}
  );

  let ObjectGroupedTransaction = Object.entries(groupedTransaction);

  ObjectGroupedTransaction.map((item) => {
    item["y"] = 0;
    item[1].map((item2) => {
      item["y"] += item2.total;
    });
  });

  const resultTransactions = [];

  ObjectGroupedTransaction.forEach(function (item) {
    const trans = {
      name: item["0"],
      y: item["y"],
      icon: item[1][0].icon,
      selected: true,
    };
    resultTransactions.push(trans);
  });

  reportData.totalString = (
    reportData.income - reportData.expense
  ).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  reportData.incomeString = reportData.income.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  reportData.expenseString = reportData.expense.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  reportData.transactions = resultTransactions;

  return reportData;
}

async function getTransactionsReport() {
  error.value = null;
  dataReport.totalMonth.incomeTotal = [];
  dataReport.totalMonth.expenseTotal = [];

  try {
    const response = await AuthServices.transaction();

    const months = [
      { month: 1, name: "January", income: null, expense: null },
      { month: 2, name: "February", income: null, expense: null },
      { month: 3, name: "March", income: null, expense: null },
      { month: 4, name: "April", income: null, expense: null },
      { month: 5, name: "May", income: null, expense: null },
      { month: 6, name: "June", income: null, expense: null },
      { month: 7, name: "July", income: null, expense: null },
      { month: 8, name: "August", income: null, expense: null },
      { month: 9, name: "September", income: null, expense: null },
      { month: 10, name: "October", income: null, expense: null },
      { month: 11, name: "November", income: null, expense: null },
      { month: 12, name: "December", income: null, expense: null },
    ];

    const listDetailTransaction = [];

    const currentYear = moment().year();
    const currentMonth = moment().month() + 1;

    for (const transaction of response.data.transactions) {
      const month = moment(transaction.time).month() + 1;
      const year = moment(transaction.time).year();

      if (month == currentMonth) {
        listDetailTransaction.push(transaction);
      }

      const index = months.findIndex((m) => m.month === month);
      if (index !== -1 && year == currentYear) {
        if (transaction.type == 1) {
          months[index].expense += transaction.total;
        }
        if (transaction.type == 0) {
          months[index].income += transaction.total;
        }
      }
    }

    months.map((item) => {
      if (item.income == null) {
        dataReport.totalMonth.incomeTotal.push(0);
      } else {
        dataReport.totalMonth.incomeTotal.push(item.income);
      }

      if (item.expense == null) {
        dataReport.totalMonth.expenseTotal.push(0);
      } else {
        dataReport.totalMonth.expenseTotal.push(item.expense);
      }
    });

    const detailTransaction = response.data.transactions.map((transaction) => ({
      ...transaction,
    }));

    detailTransaction.map((item) => {
      item.total = item.total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      item.time = moment(item.time).format("dddd, DD-MM");
      if (item.type == 1) {
        return (item.colorText = "text-red");
      }
      if (item.type == 0) {
        return (item.colorText = "text-green");
      }
    });

    const groupedDetailTransaction = detailTransaction.reduce(
      (result, transaction) => {
        if (!result["All"]) {
          result["All"] = [];
        }

        if (!result[transaction.name_typeCategory]) {
          result[transaction.name_typeCategory] = [];
        }

        result["All"].push(transaction);
        result[transaction.name_typeCategory].push(transaction);

        return result;
      },
      {}
    );

    console.log(groupedDetailTransaction);

    dataReport.detailTransaction = groupedDetailTransaction;

    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

export function useCollection() {
  return {
    addRecord,
    updateTransaction,
    deleteTransaction,
    getTransactions,
    valueTransaction,
    getTransactionsReport,
    error,
    dataReport,
  };
}
