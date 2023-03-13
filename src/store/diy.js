import { reactive, readonly } from "vue";

const state = reactive({
  transactionStore: {
    id_transaction: 0,
    total: null,
    category: 0,
    name_category: null,
    note: null,
    time: new Date(),
    location: null,
    withPerson: null,
    icon: null,
  },
});

const setTransactionStore = function (transaction) {
  state.transactionStore = transaction;
};

const resetTransactionStore = function () {
  state.transactionStore = {
    id_transaction: 0,
    total: null,
    category: 0,
    name_category: null,
    note: null,
    time: new Date(),
    location: null,
    withPerson: null,
    icon: null,
  };
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

const updateNameCategory = function (namecategory) {
  state.transactionStore.name_category = namecategory;
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

const updateIcon = function (icon) {
  state.transactionStore.icon = icon;
};

export default {
  state: readonly(state),
  getTransactionStore,
  setTransactionStore,
  updateTotal,
  updateCategory,
  updateNameCategory,
  updateNote,
  updateTime,
  updateLocation,
  updateWithPerson,
  updateIcon,
  resetTransactionStore,
};
