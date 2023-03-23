<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="deep-purple-accent-4" dark v-bind="props"> 추가 </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="deep-purple-accent-4">
          <!-- 닫기버튼 -->
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>가계부</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- 저장버튼 -->
          <v-toolbar-items>
            <v-btn variant="text" @click="save"> 저장 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-note-edit-outline"></v-icon>
              <input
                type="text"
                v-model="newInputItem.title"
                placeholder="내용을 입력해주세요"
              />
            </template>
            <!-- <template v-slot:prepend>
              <v-icon icon="mdi-cash-multiple"></v-icon>
              <input
                type="text"
                v-model="newInputItem.amount"
                placeholder="금액을 입력해주세요"
              /> -->
            <!-- </template> -->
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { ref } from "vue";

const newInputItem = ref({
  title: "",
  amount: "",
  isIncome: true,
});
const dialog = ref(false);

const emits = defineEmits(["addMoneyBook"]);
// 저장
const save = () => {
  emits("addMoneyBook", newInputItem.value);
  close();
};

// 닫기
const close = () => {
  dialog.value = false;
  newInputItem.value = "";
};
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
