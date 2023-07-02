<template>
  <v-app>
    <v-container class="pt-0">
      <v-main>
        <!-- 라우터화면이 아래에 출력 -->
        <RouterView></RouterView>
      </v-main>
    </v-container>
    <AppNavigation />
  </v-app>
</template>

<script setup>
import AppNavigation from "@/components/AppNavigation.vue";
</script>

<style></style>
