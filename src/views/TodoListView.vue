<template>
  <div class="header-container">
    <BaseHeader />
  </div>
  <div class="calender-container">
    <CalenderWeek />
  </div>
  <div class="progressBar">
    <v-progress-linear
      v-model="completed"
      color="deep-purple-accent-4"
      height="25"
    ></v-progress-linear>
    <p>
      <b>
        {{ todoList.length }}개 중
        {{ todoList.filter((item) => item.isCompleted).length }}개 완료!</b
      >
    </p>
  </div>

  <div>
    <!-- list -->
    <TodoList
      :todo-list="todoList"
      @complete-change="completeChange"
      @deleteTodo="deleteTodo"
      @editTodo="editTodoRequest"
    />
    <todo-list-edit
      v-model:isVisible="isVisible"
      ref="todoListEditRef"
      @editTodo="editTodoFinish"
    />
  </div>
  <div class="addButton-item">
    <TodoListAdd @addTodo="addTodo" />
  </div>
</template>

<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import CalenderWeek from "@/components/CalenderWeek.vue";
import TodoList from "@/components/TodoList.vue";
import TodoListAdd from "@/components/TodoListAdd.vue";
import TodoListEdit from "@/components/TodoListEdit.vue";
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

// 팝업창 열림(true)
const isVisible = ref(false);

// 수정한 글
const todoListEditRef = ref(null);

// 팝업창 열렸을 때
const editTodoRequest = (targetIdx) => {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    todoListEditRef.value.setValue(targetIdx, todoList[targetIdx].todo);
  }
};

// 수정한 글 바꿔넣기(리스트에 수정한 todo)
const editTodoFinish = (index, value) => {
  todoList.value[index].todo = value;
};
</script>

<style>
.completed-todo {
  text-decoration: line-through;
  text-decoration-color: black;
}
.calender-container {
  padding-top: 20px;
}
.progressBar {
  padding: 20px;
}
.progressBar > p {
  padding: 10px;
  text-align: right;
}
.addButton-item {
  padding: 20px;
}
</style>
