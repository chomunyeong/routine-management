<template>
  <BaseHeader />

  <!-- <div class="calender-container">
    <CalenderWeek />
  </div> -->

  <div class="isIncome-container">
    <v-btn>◀</v-btn>
    <p>{{ month }}월 ▶</p>
    <br />
    <p>
      지출 <b>{{ -expense }}원</b>
    </p>
    <p>
      수입 <b style="color: green">{{ income }}원</b>
    </p>
  </div>

  <div class="moneyBook-container">
    <MoneyBook
      :MoneyBookList="MoneyBookList"
      @deleteMoneyBook="deleteMoneyBook"
    />
  </div>
  <MoneyBookAdd
    @addMoneyBook="addMoneyBook"
    style="padding-top: 20px; position: relative"
  />
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import CalenderWeek from "@/components/CalenderWeek.vue";
import MoneyBook from "@/components/MoneyBook.vue";
import MoneyBookAdd from "@/components/MoneyBookAdd.vue";

import { ref, computed } from "vue";

const MoneyBookList = ref([
  { title: "용돈", amount: 50000, isIncome: true },
  { title: "커피", amount: 3000, isIncome: false },
  { title: "점심밥", amount: 8000, isIncome: false },
  { title: "군것질", amount: 5000, isIncome: false },
  { title: "교통비", amount: 10000, isIncome: false },
  { title: "저녁밥", amount: 10000, isIncome: false },
]);

const deleteMoneyBook = (index) => {
  MoneyBookList.value.slice(index, 1);
};

// 수입
const income = computed(() => {
  let totalIncome = 0;
  MoneyBookList.value.forEach((item) => {
    if (item.isIncome) {
      totalIncome += item.amount;
    }
  });
  return totalIncome;
});

// 지출
const expense = computed(() => {
  let totalExpense = 0;
  MoneyBookList.value.forEach((item) => {
    if (!item.isIncome) {
      totalExpense -= item.amount;
    }
  });
  return totalExpense;
});

let today = new Date();
let month = today.getMonth() + 1;
</script>
<style>
.moneyBook-container {
  padding-top: 20px;
}
.isIncome-container {
  padding: 20px;
  font-size: 20px;
}
</style>
