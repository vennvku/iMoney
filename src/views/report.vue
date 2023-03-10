<template>
  <div class="row">
    <div class="container px-2">
      <div id="chart-container"></div>
    </div>
  </div>
  <div class="row">
    <div class="container p-8">
      <div class="text-primary font-semibold text-xl">Detail Transaction</div>
      <div class="mt-3">
        <Tabs :tabs="tabs">
          <template v-for="(tab, index) in tabs" :key="index" v-slot:[tab.name]>
            <div
              class="row flex bg-white p-3 mt-3 rounded-md"
              v-for="(trans, index2) in tab.data"
              :key="index2"
            >
              <div
                class="flex justify-center items-center overflow-hidden w-11 h-11 rounded border-green border"
              >
                <img
                  class="w-6 h-6"
                  :src="'http://venn.com/images/' + trans.icon"
                  :alt="trans.name_category"
                />
              </div>
              <div class="flex flex-1 justify-between ml-2">
                <div class="">
                  <div class="font-semibold text-base">
                    {{ trans.name_category }}
                  </div>
                  <div class="font-light text-gray-400 text-xs">
                    Sneaker Nike
                  </div>
                </div>
                <div class="text-right">
                  <div
                    class="font-semibold text-lg text-green"
                    v-if="trans.type == 0"
                  >
                    + {{ trans.total }}
                  </div>
                  <div
                    class="font-semibold text-lg text-red"
                    v-if="trans.type == 1"
                  >
                    - {{ trans.total }}
                  </div>
                  <div class="font-light text-gray-400 text-xs">
                    {{ trans.time }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tabs>
      </div>
    </div>
  </div>

  <div class="row pb-40"></div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import Highcharts from "highcharts";

import Tabs from "@/components/Tabs.vue";

import { useCollection } from "@/composables/useCollection";

export default {
  components: {
    Tabs,
  },
  setup() {
    const chartRef = ref(null);
    const { dataReport, getTransactionsReport } = useCollection();

    const tabs = reactive([]);

    console.log(tabs);

    //const tabs = [];

    // dataReport.detailTransaction.forEach((element) => {
    //   console.log(element);
    //   console.log("123");
    // });

    onMounted(async () => {
      await getTransactionsReport();

      //console.log(dataReport.detailTransaction);

      let a = 1;

      for (let key in dataReport.detailTransaction) {
        //console.log(key + ": " + dataReport.detailTransaction[key]);
        const trans = {
          name: "tab" + a,
          label: key,
          data: dataReport.detailTransaction[key],
        };
        tabs.push(trans);
        a++;
      }

      //console.log(tabs);

      chartRef.value = Highcharts.chart("chart-container", {
        chart: {
          type: "spline",
        },
        title: {
          text: null,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        series: [
          {
            name: "Income",
            data: dataReport.totalMonth.incomeTotal,
            dataLabels: {
              enabled: true,
              style: {
                color: "rgb( 103 212 202)",
              },
            },
            color: "rgb( 103 212 202)",
            animation: {
              duration: 3000,
              easing: "easeInQuad",
            },
          },
          {
            name: "Expense",
            data: dataReport.totalMonth.expenseTotal,
            dataLabels: {
              enabled: true,
              style: {
                color: "rgb(242 128 128)",
              },
            },
            color: "rgb(242 128 128)",
            animation: {
              duration: 3000,
              easing: "easeInQuad",
            },
          },
        ],
      });
    });

    return { chartRef, tabs };
  },
};
</script>
