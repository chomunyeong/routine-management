<template>
  <v-container fluid>
    <v-row v-for="(todo, index) in props.todoList" :key="todo.id">
      <v-col cols="2" lg="2">
        <!-- 체크박스 -->
        <input
          type="checkbox"
          class="check-box"
          :value="todo.isCompleted"
          :id="todo.id"
          @click="emits('completeChange', index)"
        />
        <!-- <v-checkbox
            v-model="todo.isCompleted"
            id="todo.id"
            @input="emits('completeChange', index)"
          ></v-checkbox> -->
      </v-col>
      <v-col>
        <!-- 타이틀값 -->
        <label :for="todo.id">
          <span :class="todo.isCompleted ? 'completed-todo' : ''">
            {{ todo.todo }}</span
          >
        </label>
      </v-col>
      <div class="container">
        <div>
          <v-btn
            icon="mdi-calendar-edit-outline"
            size="small"
            dark
            @click="changeEditVisible(index)"
          ></v-btn>
        </div>
        <div>
          <v-btn
            icon="mdi-trash-can-outline"
            size="small"
            @click="emits('deleteTodo', index)"
          ></v-btn>
        </div>
      </div>
    </v-row>
    <todo-list-edit
      v-model:isVisible="isVisible"
      ref="todoListEditRef"
      @editTodo="editTodo"
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import TodoListEdit from "./TodoListEdit.vue";

const props = defineProps(["todoList"]);
const emits = defineEmits(["completeChange", "deleteTodo", "editTodo"]);

// 수정
const editTodo = (index) => {
  emits("editTodo", index);
};

const isVisible = ref(false);
const todoListEditRef = ref(null);

const changeEditVisible = (targetIdx) => {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    todoListEditRef.value.setValue(targetIdx, props.todoList[targetIdx].todo);
  }
};
</script>

<style>
.completed-todo {
  text-decoration: line-through;
  text-decoration-color: red;
}

.container {
  display: flex;
}
</style>
