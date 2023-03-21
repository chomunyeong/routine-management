<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-main>
          <RouterView></RouterView>
        </v-main>
      </v-layout>
    </v-container>
    <AppNavigation />
  </v-app>
</template>

<script setup>
import AppNavigation from "@/components/AppNavigation.vue";
</script>
