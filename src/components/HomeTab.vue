<template>
  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">할일</v-tab>
      <v-tab :value="2">가계부</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-window v-model="tab">
      <v-window-item v-for="n in 2" :key="n" :value="n">
        <HomeTodoTab />
        <HomeMoneyBookTab />
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import HomeMoneyBookTab from "./HomeMoneyBookTab.vue";
import HomeTodoTab from "./HomeTodoTab.vue";

const tab = ref("1");
</script>
