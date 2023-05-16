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
      <v-btn icon="mdi-menu-left" @click="changeMonth(-1)"></v-btn>
      <span>{{ current_month }}월</span>
      <v-btn icon="mdi-menu-right" @click="changeMonth(+1)"></v-btn>
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
  <div v-for="item in sortedMoneyBookList" :key="item.date">
    <p>{{ dayjs(item.date).format("YYYY/MM/DD") }} - {{ item.title }}</p>
  </div>
  <div class="moneyBook-container">
    <MoneyBook
      v-for="item in sortedMoneyBookList"
      :key="item.date"
      :MoneyBookList="MoneyBookList"
      @deleteMoneyBook="deleteMoneyBook"
    >
    </MoneyBook>
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

// 이번달 마지막 일
// const lastDay = new Date(
//   today.getFullYear(),
//   today.getMonth() + 1,
//   0
// ).getDate();

const today = dayjs().date();

// 이전달 다음달
// let current_year = dayjs().year();
let current_month = ref(dayjs().month() + 1);

const changeMonth = (diff) => {
  if (current_month.value + diff > 12) {
    current_month.value = 1;
    return;
  }
  if (current_month.value + diff < 1) {
    current_month.value = 12;
    return;
  }
  current_month.value = current_month.value + diff;
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

const sortedMoneyBookList = MoneyBookList.value.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
sortedMoneyBookList.forEach((item) => {
  console.log(`${dayjs(item.date).format("YYYY/MM/DD")} - ${item.title}`);
});

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
