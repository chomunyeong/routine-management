<template>
  <router-view />
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
  if (location.pathname === "/") {
    router.push({ name: "homeMain" });
  } else {
    router.push(location.pathname);
  }
});
</script>
