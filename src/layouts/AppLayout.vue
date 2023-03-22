<template>
  <v-app>
    <v-container class="pt-0">
      <v-main>
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
