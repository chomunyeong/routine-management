<template>
  <div class="header-container">
    <BaseHeader />
  </div>
  <div class="progressBar">
    <v-progress-linear
      v-model="completed"
      color="deep-purple-accent-4"
      height="25"
    ></v-progress-linear>
    <p>
      {{ todoList.length }}개 중
      {{ todoList.filter((item) => item.isCompleted).length }}개 완료!
    </p>
    <div class="addButton-item">
      <TodoListAdd @addTodo="addTodo" />
    </div>
    <!-- list -->
    <TodoList
      :todoList="todoList"
      @deleteTodo="deleteTodo"
      @complete-change="completeChange"
    />
  </div>
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import TodoList from "@/components/TodoList.vue";
import TodoListAdd from "@/components/TodoListAdd.vue";
import { ref, computed } from "vue";

const todoList = ref([
  { id: 1, todo: "Study JavaScript", isCompleted: false, isEdit: false },
  { id: 2, todo: "Study JSP", isCompleted: false, isEdit: false },
  { id: 3, todo: "Study Java", isCompleted: false, isEdit: false },
  { id: 4, todo: "Study Spring", isCompleted: false, isEdit: false },
  { id: 5, todo: "Study DB", isCompleted: false, isEdit: false },
]);

// todo 추가
const addTodo = (title) => {
  todoList.value.push({
    id: todoList.value[todoList.value.length - 1].id + 1,
    todo: title,
    isCompleted: false,
  });
};

// todo 삭제
const deleteTodo = (index) => {
  todoList.value.splice(index, 1);
};

// 미완료 -> 완료(밑줄)
const completeChange = (index) => {
  // console.log(todoList.value[index].isCompleted);
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
};

// progressBar
const completed = computed(() => {
  return (
    (todoList.value.filter((item) => item.isCompleted).length /
      todoList.value.length) *
    100
  );
});
</script>

<style>
.completed-todo {
  text-decoration: line-through;
  text-decoration-color: red;
}
.progressBar {
  padding: 10px;
}
.progressBar > p {
  padding: 10px;
  text-align: right;
}
.addButton-item {
  padding: 20px;
}
</style>
