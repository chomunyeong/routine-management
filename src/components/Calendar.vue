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
                expanded
                :initial-page="{
                  month: dayjs().month() + 1,
                  year: dayjs().year(),
                }"
                :attributes="attributes"
                ref="calendar"
              />
            </div>
          </v-list-item>
          <v-list-item>
            <p>리스트 넣기</p>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import * as dayjs from "dayjs";

const calendar = ref(null);

const attributes = ref([
  {
    highlight: {
      color: "purple",
      fillMode: "outline",
    },
    dates: new Date(),
  },
  {
    dot: true,
    dates: [
      new Date(dayjs().year(), dayjs().month(), 7),
      new Date(dayjs().year(), dayjs().month(), 6),
    ],
    // dates수정해야함!!!
  },
]);


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
