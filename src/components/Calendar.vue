<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-calendar-multiselect-outline" v-bind="props"></v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="deep-purple-accent-4">
          <!-- 닫기버튼 -->
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>달력</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item>
            <div class="calendar-container">
              <VCalendar
                borderless
                expanded
                :initial-page="{
                  year: dayjs().year(),
                  month: dayjs().month() + 1,
                }"
                :attributes="attributes"
                ref="calendar"
                @dayclick="onDayClicked"
              />
            </div>
            <v-divider style="padding-bottom: 10px" :thickness="2"></v-divider>
          </v-list-item>
          <span style="padding-left: 40px; font-size: 16px; color: black">{{
            dayjs(activeDate).format("DD일")
          }}</span>
          <v-list-item v-for="item in activeDateList" :key="item.id">
            <p
              style="
                padding: 10px;
                font-size: 16px;
                font-weight: bold;
                color: #6600cc;
                border: 1px solid gray;
                margin-left: 20px;
                margin-right: 20px;
                border-radius: 5px;
                background-color: rgb(249, 240, 249);
              "
            >
              ο {{ item.todo }}
            </p>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, computed } from "vue";
import * as dayjs from "dayjs";

const props = defineProps(["dateList"]);

const calendar = ref(null);

// 날짜 초기화
const activeDate = ref(new Date());

// 날짜 클릭한 곳으로 바뀌게
const onDayClicked = (calendarDay) => {
  activeDate.value = calendarDay.date;
};

// 선택날짜에 맞는 List의 todo찾기
const activeDateList = computed(() => {
  const activeDateFilterList = props.dateList.filter((item) => {
    return dayjs(activeDate.value).isSame(dayjs(item.date), "date");
  });
  return activeDateFilterList;
});

const attributes = computed(() => {
  return [
    {
      highlight: {
        color: "purple",
        fillMode: "outline",
      },
      dates: activeDate.value,
    },
    {
      dot: true,
      dates: props.dateList.map((item) => item.date),
    },
  ];
});

const dialog = ref(false);

// 닫기
const close = () => {
  dialog.value = false;
};
</script>
<style scoped>
.calendar-container :deep(.vc-weekday-1) {
  color: #f43151;
}
.calendar-container :deep(.vc-weekday-7) {
  color: #31c0f4;
}
</style>
