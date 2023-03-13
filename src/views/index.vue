<template>
  <!-- Start Total Balance -->
  <div class="row mx-auto text-center p-8">
    <div class="text-3xl font-semibold text-primary">
      {{ totalBalance }}
    </div>
    <div class="text-sm font-light text-gray-800 mt-3">Total Balance</div>
  </div>

  <!-- Start Total Income and Expense -->
  <div class="row">
    <div class="container mx-auto px-8 flex justify-between text-white">
      <div class="w-1/2 flex justify-between bg-green rounded-md mr-2 p-2">
        <div class="">
          <div class="text-xs">Income</div>
          <div class="text-lg font-bold pt-1">{{ totalIncome }}</div>
        </div>
        <div class="flex items-center">
          <i class="t2ico t2ico-trending-up text-2xl"></i>
        </div>
      </div>

      <div class="w-1/2 flex justify-between bg-red rounded-md ml-2 p-2">
        <div class="">
          <div class="text-xs">Expense</div>
          <div class="text-lg font-bold pt-1">{{ totalExpense }}</div>
        </div>
        <div class="flex items-center">
          <i class="t2ico t2ico-trending-down text-2xl"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- Start Detail Income and Expense -->
  <div class="row">
    <div class="container mx-auto p-8">
      <div class="mb-3 font-semibold text-xl text-primary">
        Income and Expense
      </div>
      <Tabs :tabs="tabs">
        <template v-for="(tab, index) in tabs" :key="index" v-slot:[tab.name]>
          <chart-home :data="tab.data" v-if="tab.data"></chart-home>
        </template>
      </Tabs>
    </div>
  </div>

  <!-- Start Recent Transaction -->
  <div class="row">
    <div class="container mx-auto p-8">
      <h2 class="font-semibold text-xl text-primary">Recent Transaction</h2>

      <div class="row pt-4" v-if="recentTransaction.today">
        <p class="font-normal text-gray-400">Today</p>

        <div
          class="row flex bg-white p-3 mt-3 rounded-md"
          v-for="transactionToday in recentTransaction.today"
          :key="transactionToday.time"
          @click="goToDetailTransaction(transactionToday)"
        >
          <div
            class="flex justify-center items-center overflow-hidden w-11 h-11 rounded border-green border"
          >
            <img
              class="w-6 h-6"
              :src="'http://venn.com/images/' + transactionToday.icon"
              :alt="transactionToday.name_category"
            />
          </div>
          <div class="flex flex-1 justify-between ml-2">
            <div class="">
              <div class="font-semibold text-base">
                {{ transactionToday.name_category }}
              </div>
              <div class="font-light text-gray-400 text-xs">Sneaker Nike</div>
            </div>
            <div class="text-right">
              <div
                class="font-semibold text-lg text-green"
                v-if="transactionToday.type == 0"
              >
                + {{ transactionToday.totalString }}
              </div>
              <div
                class="font-semibold text-lg text-red"
                v-if="transactionToday.type == 1"
              >
                - {{ transactionToday.totalString }}
              </div>
              <div class="font-light text-gray-400 text-xs">
                {{ transactionToday.timeString }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-4" v-if="recentTransaction.yesterday">
        <p class="font-normal text-gray-400">Yesterday</p>

        <div
          class="row flex bg-white p-3 mt-3 rounded-md"
          v-for="transactionToday in recentTransaction.yesterday"
          :key="transactionToday.time"
          @click="goToDetailTransaction(transactionToday)"
        >
          <div
            class="flex justify-center items-center overflow-hidden w-11 h-11 rounded border-green border"
          >
            <img
              class="w-6 h-6"
              :src="'http://venn.com/images/' + transactionToday.icon"
              :alt="transactionToday.name_category"
            />
          </div>
          <div class="flex flex-1 justify-between ml-2">
            <div class="">
              <div class="font-semibold text-base">
                {{ transactionToday.name_category }}
              </div>
              <div class="font-light text-gray-400 text-xs">Sneaker Nike</div>
            </div>
            <div class="text-right">
              <div
                class="font-semibold text-lg text-green"
                v-if="transactionToday.type == 0"
              >
                + {{ transactionToday.totalString }}
              </div>
              <div
                class="font-semibold text-lg text-red"
                v-if="transactionToday.type == 1"
              >
                - {{ transactionToday.totalString }}
              </div>
              <div class="font-light text-gray-400 text-xs">
                {{ transactionToday.timeString }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pb-40"></div>
</template>

<script>
import { reactive, computed, inject } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";

import Tabs from "@/components/Tabs.vue";
import ChartHome from "@/components/ChartHome.vue";

import { useCollection } from "@/composables/useCollection";

export default {
  components: {
    Tabs,
    ChartHome,
  },
  setup() {
    const router = useRouter();
    const { getTransactions, valueTransaction } = useCollection();

    const diy = inject("diy");

    function goToDetailTransaction(transaction) {
      const currentTransaction = {
        id_transaction: transaction.id_transaction,
        total: transaction.total,
        category: transaction.id_category,
        name_category: transaction.name_category,
        note: transaction.note,
        time: transaction.time,
        location: transaction.location,
        withPerson: transaction.withPerson,
        icon: transaction.icon,
      };

      diy.setTransactionStore(currentTransaction);

      router.push({
        name: "DetailTransaction",
        params: {},
      });
    }

    const tabs = reactive([
      {
        name: "tab1",
        label: "This Month",
      },
      {
        name: "tab2",
        label: "This Week",
      },
      {
        name: "tab3",
        label: "Today",
      },
    ]);

    async function loadValueTransaction() {
      const getTransaction = await getTransactions();
      if (getTransaction) {
        tabs.map((item) => {
          if (item.label == "Today") {
            item.data = getTransaction.reportThisDay;
          }

          if (item.label == "This Week") {
            item.data = getTransaction.reportThisWeek;
          }

          if (item.label == "This Month") {
            item.data = getTransaction.reportThisMonth;
          }
        });
      }
    }
    loadValueTransaction();

    const totalBalance = computed(() => {
      return valueTransaction.totalTransaction.balance.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    });

    const totalIncome = computed(() => {
      return valueTransaction.totalTransaction.income.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    });

    const totalExpense = computed(() => {
      return valueTransaction.totalTransaction.expense.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    });

    const recentTransaction = reactive({
      today: computed(() => {
        const listTodayExists = valueTransaction.transactions != null;
        const listToday = listTodayExists
          ? valueTransaction.transactions.filter(
              (item) => item.timeString == moment().format("dddd, DD-MM")
            )
          : [];
        return listToday;
      }),
      yesterday: computed(() => {
        const listYesterdayExists = valueTransaction.transactions != null;
        const listYesterday = listYesterdayExists
          ? valueTransaction.transactions.filter(
              (item) =>
                item.timeString ==
                moment().subtract(1, "days").format("dddd, DD-MM")
            )
          : [];
        return listYesterday;
      }),
    });

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      recentTransaction,
      tabs,
      goToDetailTransaction,
    };
  },
};
</script>
