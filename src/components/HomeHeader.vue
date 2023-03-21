<template>
  <v-app-bar :elevation="0">
    <v-app-bar-title>
      <img src="@/assets/routineLogo.svg" />
    </v-app-bar-title>

    <div class="icon-container">
      <v-icon
        icon="mdi-checkbox-marked-circle-plus-outline"
        @click="actionClicked('addTodo')"
      ></v-icon>
      <v-icon
        icon="mdi-text-box-search-outline"
        @click="actionClicked('search')"
      ></v-icon>
      <v-icon
        icon="mdi-bell-badge-outline"
        @click="actionClicked('noti')"
      ></v-icon>
    </div>
  </v-app-bar>
</template>

<script setup>
const emits = defineEmits(["iconClicked"]);
const actionClicked = (actionType) => {
  emits("iconClicked", actionType);
};
</script>
