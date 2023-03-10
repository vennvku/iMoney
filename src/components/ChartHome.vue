<template>
  <div class="container">
    <div class="row h-auto flex items-center">
      <div class="w-2/5 h-40">
        <div class="h-40" id="chart-colum-total"></div>
      </div>
      <div class="flex-1 pl-3">
        <div class="row border-b border-gray-300 pb-2">
          <div class="flex justify-between mt-3">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-green mr-2"></div>
              <div class="text-sm">Income</div>
            </div>
            <div class="text-green font-bold">{{ data.incomeString }}</div>
          </div>

          <div class="flex justify-between mt-3">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-red mr-2"></div>
              <div class="text-sm">Expense</div>
            </div>
            <div class="text-red font-bold">{{ data.expenseString }}</div>
          </div>
        </div>
        <div class="flex justify-end pt-1 font-bold">
          {{ data.totalString }}
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="">
        <div class="h-50" id="chart-donut-total"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Highcharts from "highcharts";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartColumnRef = ref(null);
    const chartDonutRef = ref(null);

    onMounted(() => {
      chartColumnRef.value = Highcharts.chart("chart-colum-total", {
        chart: {
          type: "column",
        },
        title: {
          text: null,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          visible: false,
          categories: ["Income", "Expense"],
          crosshair: true,
        },
        yAxis: {
          visible: false,
        },
        plotOptions: {
          column: {
            colorByPoint: true,
            colors: ["rgb( 103 212 202)", "rgb(242 128 128)"],
          },
        },
        series: [
          {
            name: "Total",
            data: [props.data.income, props.data.expense],
            showInLegend: false,
            dataLabels: {
              enabled: true,
              color: "rgb(0 18 255)", // màu chung cho tất cả data label
              formatter: function () {
                return (
                  "<span>" +
                  (
                    (this.y / (props.data.income + props.data.expense)) *
                    100
                  ).toFixed(2) +
                  " % </span>"
                );
              },
            },
          },
        ],
      });

      chartDonutRef.value = Highcharts.chart("chart-donut-total", {
        chart: {
          type: "pie",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        title: {
          text: "Expense Detail",
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              distance: "30%",
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
            showInLegend: true,
            innerSize: "50%",
            size: ["45%", "100%"],
          },
        },
        series: [
          {
            name: "Tỷ lệ",
            colorByPoint: true,
            data: props.data.transactions,
          },
        ],
      });
    });

    return {};
  },
};
</script>
