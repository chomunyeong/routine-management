<template>
  <v-tabs v-model="tab" color="#6600cc" align-tabs="center">
    <v-tab :value="1">오늘 할일</v-tab>
    <v-tab :value="2">가계부</v-tab>
  </v-tabs>
  <v-divider></v-divider>
  <v-window v-model="tab">
    <v-window-item v-for="n in 2" :key="n" :value="n">
      <HomeTodoTab v-if="n === 1" />
      <HomeMoneyBookTab v-else-if="n === 2" />
    </v-window-item>
  </v-window>
</template>

<script setup>
import { ref } from "vue";
import HomeMoneyBookTab from "./HomeMoneyBookTab.vue";
import HomeTodoTab from "./HomeTodoTab.vue";

const tab = ref();
</script>
