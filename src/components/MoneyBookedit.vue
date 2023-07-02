<template>
  <div class="month-list">
    <div v-for="monthItem in sortedMonthList" :key="monthItem.month">
      <h2>{{ monthItem.month }}월</h2>
      <div v-for="item in monthItem.list" :key="item.date">
        <p>{{ dayjs(item.date).format("YYYY/MM/DD") }} - {{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue ";
import * as dayjs from "dayjs";

const props = defineProps(["MoneyBookList"]);

const sortedMonthList = computed(() => {
  const sortedMoneyBookList = props.MoneyBookList.value.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const resultList = [];

  for (let item of sortedMoneyBookList) {
    const itemMonth = dayjs(item.date).month() + 1;
    const monthItem = resultList.find((m) => m.month === itemMonth);

    if (monthItem) {
      monthItem.list.push(item);
    } else {
      resultList.push({
        month: itemMonth,
        list: [
          {
            todo: item.todo,
            isIncome: item.isIncome,
            amount: item.amount,
            date: item.date,
          },
        ],
      });
    }
  }

  return resultList;
});
</script>
