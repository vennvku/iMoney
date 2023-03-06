import { reactive, readonly } from "vue";

const state = reactive({
  categorySelected: null,
  transactionStore: {
    total: 0,
    category: 0,
    note: null,
    time: new Date(),
    location: null,
    withPerson: null,
  },
});

const setCategorySelected = function (category) {
  state.categorySelected = category;
};

const getCategorySelected = function () {
  return state.categorySelected;
};

const setTransactionStore = function (transaction) {
  state.transactionStore = transaction;
};

const getTransactionStore = function () {
  return state.transactionStore;
};

const updateTotal = function (total) {
  state.transactionStore.total = total;
};

const updateCategory = function (category) {
  state.transactionStore.category = category;
};

const updateNote = function (note) {
  state.transactionStore.note = note;
};

const updateTime = function (time) {
  state.transactionStore.time = time;
};

const updateLocation = function (location) {
  state.transactionStore.location = location;
};

const updateWithPerson = function (withPerson) {
  state.transactionStore.withPerson = withPerson;
};

export default {
  state: readonly(state),
  getCategorySelected,
  setCategorySelected,
  getTransactionStore,
  setTransactionStore,
  updateTotal,
  updateCategory,
  updateNote,
  updateTime,
  updateLocation,
  updateWithPerson,
};
