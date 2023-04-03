<template>
  <!-- 날짜 -->
  <div class="date-header">
    <span class="date">202.03.24(화)</span>
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
      <span style="margin-right: 15px">₩ {{ item.amount }}</span>
      <v-btn
        icon="mdi-trash-can-outline"
        size="small"
        @click="emits('deleteMoneyBook', index)"
      ></v-btn>
    </div>

    <div></div>
  </div>
</template>
<script setup>
const props = defineProps(["MoneyBookList"]);
const emits = defineEmits(["deleteMoneyBook"]);
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
