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
          icon="mdi-calendar-edit-outline"
          size="small"
          dark
          v-bind="props"
        ></v-btn>
      </template>
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
              <input
                type="text"
                v-model="editTodoItem"
                :placeholder="todoList.todo"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { ref } from "vue";

const todoList = ref([
  { id: 1, todo: "Study JavaScript", isCompleted: false, isEdit: false },
  { id: 2, todo: "Study JSP", isCompleted: false, isEdit: false },
  { id: 3, todo: "Study Java", isCompleted: false, isEdit: false },
  { id: 4, todo: "Study Spring", isCompleted: false, isEdit: false },
  { id: 5, todo: "Study DB", isCompleted: false, isEdit: false },
]);

const editTodoItem = ref("");
const dialog = ref(false);

const emits = defineEmits(["editTodo"]);
// 저장
const save = (index) => {
  emits("editTodo", index, editTodoItem.value);
  close();
};

// 닫기
const close = () => {
  dialog.value = false;
  editTodoItem.value = "";
};
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
