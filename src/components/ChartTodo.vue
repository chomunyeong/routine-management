<template>
  <div>
    <h1>hi</h1>
    <canvas id="badCanvas1" width="400" height="100"></canvas>
  </div>
</template>
<script setup>
import Chart from "chart.js/auto";

const config = {
  type: "doughnut",
  data: data,
};

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
</script>
