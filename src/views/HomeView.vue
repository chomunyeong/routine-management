<template>
  <!-- header -->
  <HomeHeader @click="iconClicked" />

  <!-- navigation -->
  <AppLayout />
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import HomeHeader from "@/components/HomeHeader.vue";

const iconClicked = (actionType) => {
  console.log(actionType);
};
</script>
