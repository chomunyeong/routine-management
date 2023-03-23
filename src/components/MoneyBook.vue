<template>
  <!-- 날짜 -->
  <div class="date-header">
    <span class="date">202.03.24(화)</span>
    <div class="divider"></div>
  </div>
  <!-- 리스트 -->
  <div class="item-list">
    <div v-for="(item, index) in MoneyBookList" :key="index">
      <span>{{ item.title }}</span>
    </div>
    <div>
      <!-- <span style="margin-right: 15px">₩ {{ item.amount }}</span> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const MoneyBookList = ref([
  { title: "용돈", amount: 50000, isIncome: true },
  { title: "커피", amount: 3000, isIncome: false },
  { title: "점심밥", amount: 8000, isIncome: false },
  { title: "군것질", amount: 5000, isIncome: false },
  { title: "교통비", amount: 10000, isIncome: false },
  { title: "저녁밥", amount: 10000, isIncome: false },
]);
</script>
