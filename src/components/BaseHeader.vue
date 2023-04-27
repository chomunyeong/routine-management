<template>
  <v-app-bar
    class="header-container"
    :elevation="0"
    style="background-color: #6600cc; color: white"
  >
    <v-app-bar-title>
      <span
        style="
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <slot name="left"></slot>
        <!-- <b>{{ props.title }}</b> -->
        <slot name="center"></slot>
        <slot name="right"></slot>
      </span>
    </v-app-bar-title>
    <!-- <v-btn icon="mdi-calendar-multiselect-outline"></v-btn> -->
  </v-app-bar>
</template>
<script setup>
const props = defineProps("title");
</script>
