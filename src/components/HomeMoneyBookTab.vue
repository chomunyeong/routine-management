<template>
  <v-card class="pa-3">
    <v-row>
      <v-col>
        <v-card class="pa-3" outline>차트</v-card>
      </v-col>
      <v-col>
        <div>이번달 목표예산</div>
        <div>오늘 사용 금액</div>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="pa-3 mt-5">
    <v-row class="pa-2">
      <span
        style="
          color: blueviolet;
          display: inline-block;
          width: 95%;
          text-align: center;
        "
        >2월</span
      >
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
          >수입
          <br />
          {{ income }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
          >지출
          <br />
          {{ expense }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
        >
          전체
          <br />
          {{ total }}
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="pa-3 mt-5">
    <MoneyBook
      :MoneyBookList="MoneyBookList"
      @deleteMoneyBook="deleteMoneyBook"
    />
    <MoneyBookAdd @addMoneyBook="addMoneyBook" />
  </v-card>
</template>
<script setup>
import { ref, computed } from "vue";
import MoneyBook from "./MoneyBook.vue";
import MoneyBookAdd from "./MoneyBookAdd.vue";

const MoneyBookList = ref([
  { title: "용돈", amount: 50000, isIncome: true },
  { title: "커피", amount: 3000, isIncome: false },
  { title: "점심밥", amount: 8000, isIncome: false },
  { title: "군것질", amount: 5000, isIncome: false },
  { title: "교통비", amount: 10000, isIncome: false },
  { title: "저녁밥", amount: 10000, isIncome: false },
]);

// 추가
const addMoneyBook = (title) => {
  MoneyBookList.value.push({
    title: title.title,
    amount: title.amount,
    isIncome: title.isIncome,
  });
};

// 삭제
const deleteMoneyBook = (index) => {
  MoneyBookList.value.splice(index, 1);
};

// 합계
const total = computed(() => {
  let totalAmount = 0;
  MoneyBookList.value.forEach((item) => {
    if (item.isIncome) {
      totalAmount += item.amount;
    } else {
      totalAmount -= item.amount;
    }
  });
  return totalAmount;
});

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
