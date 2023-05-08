<template>
  <v-card
    class="pa-3"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px; margin-top: 15px"
  >
    <v-row>
      <span
        style="
          color: #397cb0;
          display: inline-block;
          width: 95%;
          margin-top: 15px;
          padding-left: 15px;
        "
        ><b>{{ month }}월</b></span
      >
    </v-row>
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

  <v-card
    class="pa-3 mt-5"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px; margin-top: 15px"
  >
    <v-row class="pa-2">
      <span
        style="
          color: #397cb0;
          display: inline-block;
          width: 95%;
          text-align: center;
        "
        ><b>{{ month }}월</b></span
      >
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: white;
            background-color: #397cb0;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px rgb(0, 0, 0, 0.3);
          "
          outline
          >수입
          <br />
          <p style="margin-top: 10px; font-size: large">
            <b> {{ income }}</b>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: white;
            background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px rgb(0, 0, 0, 0.3);
          "
          outline
          >지출
          <br />
          <p style="margin-top: 10px; font-size: large">
            <b> {{ expense }}</b>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: white;
            background-color: #397cb0;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px rgb(0, 0, 0, 0.3);
          "
          outline
        >
          전체
          <br />
          <p style="margin-top: 10px; font-size: large">
            <b> {{ total }}</b>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <div class="pa-3 mt-5">
    <MoneyBook
      :MoneyBookList="MoneyBookList"
      @deleteMoneyBook="deleteMoneyBook"
    />
    <!-- <MoneyBookAdd @addMoneyBook="addMoneyBook" /> -->
  </div>
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

let today = new Date();
let month = today.getMonth() + 1;
</script>
