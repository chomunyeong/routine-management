<template>
  <div class="my-calendar">
    <VCalendar
      expanded
      transparent
      view="weekly"
      :attributes="attrs"
      ref="calendar"
      @dayclick="onDayClicked"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["targetDate"]);
const emits = defineEmits(["update:targetDate"]);

const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "pink",
    },
    dates: props.targetDate,
  },
]);

const calendar = ref(null);

// 오늘
const moveToday = () => {
  calendar.value.move(new Date());
  attrs.value[0].dates = new Date();
  emits("update:targetDate", new Date());
};

defineExpose({
  moveToday,
});

// async는 현재 사용할 함수를 비동기로 처리하겠다는 선언자
// 클릭 날짜로 옮기기
const onDayClicked = async (calendarDay) => {
  attrs.value[0].dates = calendarDay.date;
  emits("update:targetDate", calendarDay.date);
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
