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
          style="color: aliceblue; background-color: blueviolet"
          outline
          >수입
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="color: aliceblue; background-color: blueviolet"
          outline
          >지출
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="color: aliceblue; background-color: blueviolet"
          outline
        >
          전체
          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-card class="pa-3 mt-5">
    <MoneyBook @addMoneyBook="addMoneyBook" />
    <MoneyBookAdd />
  </v-card>
</template>
<script setup>
import { ref } from "vue";
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

const addMoneyBook = () => {
  MoneyBookList.value.push({
    title: MoneyBookList.value.title,
    amount: Number(MoneyBookList.value.amount),
    isIncome: !MoneyBookList.value.isIncome,
  });
};
</script>
