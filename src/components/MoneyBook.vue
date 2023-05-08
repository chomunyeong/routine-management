<template>
  <!-- 날짜 -->
  <div class="date-header">
    <span class="date" :v-model="MoneyBookList.date">
      <!-- {{ dayjs().Year() }}. -->
      {{ dayjs().month() + 1 }}.{{ dayjs().date() }}({{ days }})
    </span>
    <div class="divider"></div>
  </div>
  <!-- 리스트 -->
  <div class="item-list">
    <div
      v-for="(item, index) in props.MoneyBookList"
      :class="[item.isIncome ? 'income-item' : 'expense-item']"
      :key="index"
    >
      <span>{{ item.title }}</span>
      <span style="float: right"
        >₩ {{ item.amount }}
        <v-btn
          icon="mdi-trash-can-outline"
          size="small"
          style="margin-left: 10px"
          @click="emits('deleteMoneyBook', index)"
        ></v-btn>
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import * as dayjs from "dayjs";

const props = defineProps(["MoneyBookList"]);
const emits = defineEmits(["deleteMoneyBook"]);

let today = new Date();

const week = ["일", "월", "화", "수", "목", "금", "토"];
let days = week[today.getDay()];

// 날짜 초기값
const targetDate = ref(new Date());

const computedMoneyBook = computed(() => {
  return props.MoneyBookList.value.filter((item) => {
    return dayjs(item.date).isSame(dayjs(targetDate.value), "date");
  });
});
</script>

<style>
.item-container {
  padding: 20px;
}
.date-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.date-header .date {
  font-size: 13px;
  font-weight: bold;
  color: #868686;
}
.divider {
  width: 100%;
  height: 1px;
  border-bottom: 1px dotted #868686;
}
.item-list {
  padding-left: 15px;
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
}
.income-item {
  color: blue;
}
.expense-item {
  color: #cb1c1c;
}
</style>
