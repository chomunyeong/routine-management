<template>
  <!-- header -->
  <HomeHeader @click="iconClicked" />
  <!-- tabBar -->
  <HomeTab />
  <!-- content -->
  <!-- <div>Home view부분</div> -->
</template>

<script setup>
import HomeHeader from "@/components/HomeHeader.vue";
import HomeTab from "@/components/HomeTab.vue";

const iconClicked = (actionType) => {
  console.log(actionType);
};
</script>
