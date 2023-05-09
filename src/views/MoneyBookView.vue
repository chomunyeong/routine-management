<template>
  <BaseHeader>
    <template #center>
      <slot name="center">
        <p>가계부</p>
      </slot>
    </template>
  </BaseHeader>
  <div class="isIncome-container">
    <div class="month">
      <v-btn icon="mdi-menu-left" @onclick="changeMonth(-1)"></v-btn>
      <span @onclick="changeMonth()">{{ current_month }}월</span>
      <v-btn icon="mdi-menu-right" @onclick="changeMonth(+1)"></v-btn>
    </div>
    <br />
    <p>
      지출 <b>{{ -expense }}원</b>
    </p>
    <p>
      수입 <b style="color: green">{{ income }}원</b>
      <v-btn style="float: right; margin-right: 10px">분석</v-btn>
    </p>
  </div>

  <div class="moneyBook-container">
    <MoneyBook
      v-for="item in today"
      :key="item"
      :MoneyBookList="MoneyBookList"
      @deleteMoneyBook="deleteMoneyBook"
    />
  </div>
  <div class="addButton-item">
    <MoneyBookAdd @addMoneyBook="addMoneyBook" />
  </div>
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import MoneyBook from "@/components/MoneyBook.vue";
import MoneyBookAdd from "@/components/MoneyBookAdd.vue";
import * as dayjs from "dayjs";
import { ref, computed } from "vue ";

const today = dayjs().date();

// const today = new Date();

// 이번달 마지막 일
// const lastDay = new Date(
//   today.getFullYear(),
//   today.getMonth() + 1,
//   0
// ).getDate();

// 이전달 다음달
let current_year = new Date().getFullYear();
let current_month = new Date().getMonth() + 1;
// dayjs().month() + 1

const changeMonth = (diff) => {
  if (diff == undefined) {
    current_month += 0;
  } else {
    current_month = current_month + diff;

    if (current_month == 0) {
      current_year = current_year - 1;
      current_month = 12;
    } else if (current_month == 13) {
      current_year = current_year + 1;
      current_month = 1;
    }
  }
};

const MoneyBookList = ref([
  { title: "용돈", amount: 50000, isIncome: true, date: dayjs().toDate() },
  {
    title: "커피",
    amount: 3000,
    isIncome: false,
    date: dayjs().subtract(1, "day").toDate(),
  },
  {
    title: "점심밥",
    amount: 8000,
    isIncome: false,
    date: dayjs().subtract(2, "day").toDate(),
  },
  {
    title: "군것질",
    amount: 5000,
    isIncome: false,
    date: dayjs().subtract(3, "day").toDate(),
  },
  {
    title: "교통비",
    amount: 10000,
    isIncome: false,
    date: dayjs().subtract(4, "day").toDate(),
  },
  {
    title: "저녁밥",
    amount: 10000,
    isIncome: false,
    date: dayjs().subtract(5, "day").toDate(),
  },
]);

const addMoneyBook = (inputItem) => {
  MoneyBookList.value.push({ ...inputItem });
  console.log(inputItem);
};

const deleteMoneyBook = (index) => {
  MoneyBookList.value.splice(index, 1);
  console.log(index);
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
</script>
<style>
.moneyBook-container {
  padding-top: 20px;
}
.isIncome-container {
  padding: 20px;
  font-size: 20px;
}
.addButton-item {
  position: relative;
  padding: 20px;
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
