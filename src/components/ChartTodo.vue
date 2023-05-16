<template>
  <div>
    {{ complete }}
  </div>
  <DoughnutChart :chart-data="data" css-classes="chart-container" />
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { ref, computed } from "vue";
import { Chart, DoughnutController, ArcElement } from "chart.js";
Chart.register(DoughnutController, ArcElement);

const props = defineProps(["todoList"]);

const complete = ref(props.todoList.filter((item) => item.isCompleted).length);

const incomplete = ref(
  props.todoList.length -
    props.todoList.filter((item) => item.isCompleted).length
);

const dataValues = ref([complete, incomplete]);

const data = computed(() => ({
  labels: ["완료", "미완료"],

  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ["#6600cc", "pink"],
    },
  ],
}));

// const options = ref([
//   plugins: {
//     title: {
//       text:"Bar"
//     }
//   }
// ])
</script>
