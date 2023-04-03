<template>
  <v-row justify="center">
    <v-dialog
      v-model="computedIsVisible"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="deep-purple-accent-4">
          <!-- 닫기버튼 -->
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>수정</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- 저장버튼 -->
          <v-toolbar-items>
            <v-btn variant="text" @click="save(index)"> 저장 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-note-edit-outline"></v-icon>
              <input type="text" v-model="editTodoItem" />
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { ref, computed } from "vue";

const editTodoItem = ref("");
const currentTargetIdx = ref("");

const props = defineProps(["todoItem", "isVisible"]);
const emits = defineEmits(["editTodo", "update:isVisible"]);

const computedIsVisible = computed({
  get() {
    return props.isVisible;
  },
  set(newValue) {
    emits("update:isVisible", newValue);
  },
});

// 저장
const save = () => {
  emits("editTodo", currentTargetIdx.value, editTodoItem.value);
  close();
};

// 닫기
const close = () => {
  editTodoItem.value = "";
  currentTargetIdx.value = null;
  emits("update:isVisible", false);
};

const setValue = (idx, title) => {
  currentTargetIdx.value = idx;
  editTodoItem.value = title;
};

defineExpose({
  setValue,
});
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
