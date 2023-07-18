<template>
  <v-card
    class="pa-3"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px; margin-top: 15px"
  >
    <v-row>
      <v-col>
        <div class="text-center">
          <v-progress-circular
            v-model="chart"
            :size="100"
            :width="18"
            color="#4c0090"
          >
            {{ chart }}%</v-progress-circular
          >
        </div>
      </v-col>
      <v-col>
        <p style="margin-top: 15px; text-align: center">
          현재 예산율은<br />
          <b style="color: #6600cc; font-size: large">{{ chart }}%</b> 입니다
        </p>
        <br />
        <p style="text-align: center; color: #6600cc; font-weight: bold">
          {{ message }}
        </p>
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
          color: #6600cc;
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
            color: #6600cc;
            background-color: #ece7f6;
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
            color: #6600cc;
            background: #ece7f6;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px rgb(0, 0, 0, 0.3);
          "
          outline
          >지출
          <br />
          <p style="margin-top: 10px; font-size: large">
            <b> {{ -expense }}</b>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: #6600cc;
            background-color: #ece7f6;
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
import { ref, computed, onMounted } from "vue";
import MoneyBook from "./MoneyBook.vue";
// import MoneyBookAdd from "./MoneyBookAdd.vue";
import * as dayjs from "dayjs";

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
  {
    title: "쇼핑",
    amount: 10000,
    isIncome: false,
    date: dayjs().subtract(6, "day").toDate(),
  },
]);

const message = computed(() => {
  let msg = ref("");
  let exp = Math.abs(expense.value);
  if (income.value > exp) {
    msg.value = " 수입이 더 많아요 : - D";
    console.log(income.value, exp);
  } else {
    msg.value = " 지출이 더 많아요 : - ( ";
    console.log(income.value, exp);
  }
  msg.value = msg.value.replace(/"/g, "");
  return msg.value;
});

// onMounted(() => {
//   if (income.value > expense.value) {
//     message.value = "잘 하고 있어요!";
//     console.log(expense.value, income.value);
//   } else {
//     message.value = "지출이 수입보다 커요! 조금만 절약해볼까요 :)";
//   }
// });

// 추가
// const addMoneyBook = (title) => {
//   MoneyBookList.value.push({
//     title: title.title,
//     amount: title.amount,
//     isIncome: title.isIncome,
//   });
// };

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

const chart = computed(() => {
  let cha = 0;
  if (income.value > cha) {
    cha = Math.round((total.value / income.value) * 100);
  }
  return cha;
});
let today = new Date();
let month = today.getMonth() + 1;
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
