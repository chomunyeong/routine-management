<template>
  <AppHeader>
    <template #left>
      <!-- <span>logo</span> -->
    </template>

    <template #center>
      <div></div>
    </template>

    <template #right>
      <div class="icon-container">
        <v-col class="text-right pa-5">
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
            @click="actionClicked(noti)"
          ></v-icon>
        </v-col>
      </div>
    </template>
  </AppHeader>
</template>

<script setup>
import AppHeader from "@/layouts/AppHeader.vue";

const emits = defineEmits(["iconClicked"]);
const actionClicked = (actionType) => {
  emits("iconClicked", actionType);
};
</script>
