<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation v-model="items.value" color="deep-purple" grow>
      <v-btn v-for="item in items" :key="item.title" :to="item.to" link>
        <v-icon>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup>
const items = [
  {
    title: "홈",
    value: 0,
    icon: "mdi-home-outline",
    to: "/",
  },
  { title: "할일", value: 1, icon: "mdi-note-edit-outline", to: "/todo-main" },
  {
    title: "가계부",
    value: 2,
    icon: "mdi-piggy-bank-outline",
    to: "/moneyBook-main",
  },
  { title: "설정", value: 3, icon: "mdi-cog-outline", to: "/setting-main" },
];
</script>
