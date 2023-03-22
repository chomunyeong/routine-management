<template>
  <v-bottom-navigation color="deep-purple" grow>
    <v-btn v-for="item in items" :key="item.value" :to="item.to" link>
      <v-icon>{{ item.icon }}</v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
const items = [
  {
    title: "홈",
    value: 0,
    icon: "mdi-home-outline",
    to: { name: "homeMain" },
  },
  {
    title: "할일",
    value: 1,
    icon: "mdi-note-edit-outline",
    to: { name: "todoMain" },
  },
  {
    title: "가계부",
    value: 2,
    icon: "mdi-piggy-bank-outline",
    to: { name: "moneyBookMain" },
  },
  {
    title: "설정",
    value: 3,
    icon: "mdi-cog-outline",
    to: { name: "settingMain" },
  },
];
</script>
