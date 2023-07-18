<template>
  <BaseHeader>
    <template #center>
      <slot name="center">
        <p>가계부</p>
      </slot>
    </template>
  </BaseHeader>
  <div class="isIncome-container">
    <div class="month-list">
      <v-btn
        icon="mdi-menu-left"
        @click="changeMonth(-1)"
        style="margin-left: 20px"
      ></v-btn>
      <span style="margin-left: 15px; margin-right: 15px; color: white"
        >{{ current_month }}월</span
      >
      <v-btn icon="mdi-menu-right" @click="changeMonth(+1)"></v-btn>
    </div>
    <br />
    <p style="color: white; margin-left: 20px">
      지출 <b style="color: white; margin-left: 15px">{{ -expense }}원</b>
    </p>
    <p style="color: white; margin-left: 20px; margin-top: 5px">
      수입
      <b style="color: rgb(255, 143, 162); margin-left: 15px"
        >{{ -income }}원</b
      >
    </p>
    <!-- <p style="color: white; margin-left: 20px">
      총계
      <b style="color: rgb(255, 143, 162); margin-left: 15px"
        >{{ -income + expense }}원</b
      >
    </p> -->
  </div>
  <!-- <v-divider
    thickness="20px"
    style="color: violet; margin-left: -50px"
  ></v-divider> -->
  <!-- MoneyBook.vue -->
  <!-- <div v-for="item in sortedMoneyBookList" :key="item.date">
    <p>{{ dayjs(item.date).format("YYYY/MM/DD") }} - {{ item.title }}</p>
  </div> -->
  <!-- <div class="moneyBook-container">
    <MoneyBookedit
      v-for="item in sortedMoneyBookList"
      :key="item.date"
      :MoneyBookList="MoneyBookList"
    /> -->
  <!-- <MoneyBook
    v-for="item in sortDayList"
    :key="item.date"
    :MoneyBookList="MoneyBookList"
    @deleteMoneyBook="deleteMoneyBook(index)"
  >
  </MoneyBook> -->
  <!-- </div> -->
  <!-- 날짜 -->
  <div class="all-list">
    <div
      class="money-list"
      v-for="item in filteredSortDayList"
      :key="item.date"
    >
      <div class="date-header">
        <span class="date">
          {{ dayjs(item.date).format("D일") }} {{ getDayOfWeek(item.date) }}요일
        </span>
        <div class="divider"></div>
      </div>
      <!-- 리스트 -->
      <div class="item-list">
        <div
          v-for="(subItem, index) in item.list"
          :class="[subItem.isIncome ? 'income-item' : 'expense-item']"
          :key="index"
        >
          <span>{{ subItem.title }}</span>
          <span style="float: right"
            >₩ {{ subItem.amount }}
            <v-btn
              icon="mdi-trash-can-outline"
              size="small"
              style="margin-left: 10px"
              @click="deleteMoneyBook(index)"
            ></v-btn>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="addButton-item">
    <MoneyBookAdd @addMoneyBook="addMoneyBook" />
  </div>
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import MoneyBookAdd from "@/components/MoneyBookAdd.vue";
import * as dayjs from "dayjs";
import { ref, computed } from "vue ";

let today = ref(new Date());

// 요일반환
const getDayOfWeek = (date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayIndex = dayjs(date).day();
  return week[dayIndex];
};

// 이전달 다음달
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
    title: "약국",
    amount: 8000,
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
    title: "카페",
    amount: 6000,
    isIncome: false,
    date: dayjs().subtract(12, "day").toDate(),
  },
  {
    title: "저녁밥",
    amount: 10000,
    isIncome: false,
    date: dayjs().subtract(15, "day").toDate(),
  },
  {
    title: "쇼핑",
    amount: 10000,
    isIncome: false,
    date: dayjs().subtract(16, "day").toDate(),
  },
]);

// 날짜별 가계부 항목 정렬 및 반환
const sortDayList = computed(() => {
  const sortedMoneyBookList = MoneyBookList.value.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const resultList = [];

  for (let item of sortedMoneyBookList) {
    if (resultList.length === 0) {
      resultList.push({
        date: dayjs(item.date).startOf("date"),
        list: [
          {
            title: item.title,
            isIncome: item.isIncome,
            amount: item.amount,
            date: item.date,
          },
        ],
      });
    } else {
      const beforeItem = resultList[resultList.length - 1];

      if (
        dayjs(beforeItem.date).isSame(dayjs(item.date).startOf("date"), "date")
      ) {
        resultList[resultList.length - 1].list.push({
          title: item.title,
          isIncome: item.isIncome,
          amount: item.amount,
          date: item.date,
        });
      } else {
        resultList.push({
          date: dayjs(item.date).startOf("date"),
          list: [
            {
              title: item.title,
              isIncome: item.isIncome,
              amount: item.amount,
              date: item.date,
            },
          ],
        });
      }
    }
  }
  return resultList;
});

// 현재월에 해당하는 가계부항목 필터링
const filteredSortDayList = computed(() => {
  const filteredList = sortDayList.value.filter((item) =>
    dayjs(item.date).isSame(
      dayjs(today.value).month(current_month.value - 1),
      "month"
    )
  );
  return filteredList;
});

// sortedMoneyBookList.forEach((item) => {
//   console.log(`${dayjs(item.date).format("YYYY/MM/DD")} - ${item.title}`);
// });

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
    if (dayjs(item.date).month() + 1 === current_month.value && item.isIncome) {
      totalIncome -= item.amount;
    }
  });
  return totalIncome;
});

// 지출
const expense = computed(() => {
  let totalExpense = 0;
  MoneyBookList.value.forEach((item) => {
    if (
      dayjs(item.date).month() + 1 === current_month.value &&
      !item.isIncome
    ) {
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
  font-size: 19px;
  background-color: #6600cc;
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 40px;
  padding-bottom: 40px;
}
.addButton-item {
  position: relative;
  padding: 20px;
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
}
.money-list {
  padding: 10px 5px 10px 5px;
}
.all-list {
  padding-top: 30px;
  padding-bottom: 50px;
}
</style>
