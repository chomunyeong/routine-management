<template>
  <v-app-bar :elevation="0">
    <v-app-bar-title>
      <img src="@/assets/routineLogo.svg" />
    </v-app-bar-title>

    <div class="icon-container mr-5">
      <v-icon
        icon="mdi-checkbox-marked-circle-plus-outline"
        @click="actionClicked('addTodo')"
      ></v-icon>
      <!-- <v-icon
        icon="mdi-text-box-search-outline"
        @click="actionClicked('search')"
      ></v-icon> -->
      <Search />
      <v-icon
        icon="mdi-bell-badge-outline"
        @click="actionClicked('noti')"
      ></v-icon>
    </div>
  </v-app-bar>
</template>

<script setup>
import Search from "./Search.vue";

const emits = defineEmits(["iconClicked"]);

const actionClicked = (actionType) => {
  emits("iconClicked", actionType);
};
</script>

<style>
.icon-container {
  display: flex;
  gap: 5px;
}
</style>
