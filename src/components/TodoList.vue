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
          @input="emits('completeChange', index)"
        />
        <!-- <v-checkbox
            v-model="todo.isCompleted"
            id="todo.id"
            @input="emits('completeChange', index)"
          ></v-checkbox> -->
      </v-col>
      <v-col>
        <!-- 타이틀값 -->
        <label v-if="!todo.isEdit" :for="todo.id">
          <span :class="todo.isCompleted ? 'completed-todo' : ''">
            {{ todo.todo }}</span
          >
        </label>
      </v-col>
      <div class="container">
        <div>
          <todo-list-edit @editTodo="editTodo" />
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
  </v-container>
</template>

<script setup>
import { defineEmits } from "vue";
import TodoListEdit from "./TodoListEdit.vue";

const props = defineProps(["todoList"]);
const emits = defineEmits(["completeChange", "deleteTodo"]);

// 수정
// const editTodo = (index, value) => {
//   props.todoList[index].todo = value;
// };
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
