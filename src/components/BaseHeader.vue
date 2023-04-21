<template>
  <v-app-bar :elevation="0" style="background-color: #6600cc; color: white">
    <v-app-bar-title>
      <span style="display: inline-block; width: 110%; text-align: center">
        <b>할 일</b>
      </span>
    </v-app-bar-title>
    <v-btn icon="mdi-calendar-multiselect-outline"></v-btn>
  </v-app-bar>
</template>
<script setup>
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
</script>
