<template>
  <div class="my-calendar">
    <button class="px-3 py-1" @click="moveToday">오늘</button>
    <VCalendar
      expanded
      transparent
      view="weekly"
      :attributes="attrs"
      ref="calendar"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "pink",
    },
    dates: new Date(),
  },
]);

const calendar = ref(null);

const moveToday = () => {
  calendar.value.move(new Date());
};
</script>
<style scoped>
.my-calendar :deep(.vc-weekday-1) {
  color: #f43151;
}
.my-calendar :deep(.vc-weekday-7) {
  color: #31c0f4;
}
</style>
