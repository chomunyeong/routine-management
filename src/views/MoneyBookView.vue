<template>
  <BaseHeader />
  <MoneyBook :MoneyBookList="MoneyBookList" />
  <MoneyBookAdd @addMoneyBook="addMoneyBook" />
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import MoneyBook from "@/components/MoneyBook.vue";
import MoneyBookAdd from "@/components/MoneyBookAdd.vue";

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
