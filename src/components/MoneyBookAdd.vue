<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="deep-purple-accent-4"
          dark
          v-bind="props"
          icon="mdi-plus"
          size="small"
        ></v-btn>
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
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-cash-multiple"></v-icon>
              <input
                type="text"
                v-model="newInputItem.amount"
                placeholder="금액을 입력해주세요"
              />
            </template>
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-note-edit-outline"></v-icon>
              <v-combobox
                style="min-width: 129px"
                v-model="newInputItem.isIncome"
                clearable
                label="수입/지출 선택"
                item-title="title"
                item-value="value"
                :items="[
                  { title: '수입', value: true },
                  { title: '지출', value: false },
                ]"
                variant="underlined"
              ></v-combobox>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { ref } from "vue";

const emits = defineEmits(["addMoneyBook"]);
const dialog = ref(false);

const newInputItem = ref({
  title: "",
  amount: "",
  isIncome: null,
});

// 저장
const save = () => {
  const input = {
    ...newInputItem.value,
    isIncome: newInputItem.value.isIncome
      ? newInputItem.value.isIncome.value
      : null,
  };
  emits("addMoneyBook", input);
  close();
};

// 닫기
const close = () => {
  dialog.value = false;
  newInputItem.value = {
    title: "",
    amount: "",
    isIncome: null,
  };
};
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
