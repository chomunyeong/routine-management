<template>
  <div class="chartBox">
    <div class="chart-container">
      <canvas ref="chartCanvas" width="100px" height="100px"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, DoughnutController, ArcElement } from "chart.js";
Chart.register(DoughnutController, ArcElement);

const props = defineProps(["todoList"]);

const complete = ref(props.todoList.filter((item) => item.isCompleted).length);

const incomplete = ref(
  props.todoList.length -
    props.todoList.filter((item) => item.isCompleted).length
);

const data = ref({
  labels: ["완료", "미완료"],

  datasets: [
    {
      data: [complete.value, incomplete.value],
      backgroundColor: ["#6600cc", "pink"],
    },
  ],
});

let chart;
const chartCanvas = ref(null);

onMounted(() => {
  createChart();
});

watch([complete, incomplete], () => {
  updateChart();
});

function createChart() {
  const ctx = chartCanvas.value.getContext("2d");

  chart = new Chart(ctx, {
    type: "doughnut",
    data: data.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

const updateChart = () => {
  chart.data.datasets[0].data = [complete.value, incomplete.value];
  chart.update();
};
</script>
