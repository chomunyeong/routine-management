<!-- header는 자주 바뀌기 때문에 body와 bottom만 묶어놓기 -->
<template>
  <div class="body-container">
    <RouterView></RouterView>
  </div>

  <div class="bottom-container">
    <AppNavigation />
  </div>
</template>

<script setup>
import AppNavigation from '@/components/AppNavigation.vue';
</script>