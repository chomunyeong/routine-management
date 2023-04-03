<template>
  <v-card class="pa-3">
    <v-row>
      <v-col>
        <v-card class="pa-3" outline>차트</v-card>
      </v-col>
      <v-col>
        <div>평균 완료 개수</div>
        <div>평균 완료율 58.6 %</div>
        <div>잘 하고 있어요! 78.2 %</div>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="pa-3 mt-5">
    <v-row class="pa-2">
      <span
        style="
          color: blueviolet;
          display: inline-block;
          width: 95%;
          text-align: center;
        "
        >2월</span
      >
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
          >전체
          <br />
          {{ todoList.length }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
          >완료
          <br />
          {{ todoList.filter((item) => item.isCompleted).length }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            color: aliceblue;
            background-color: blueviolet;
            text-align: center;
          "
          outline
        >
          미완료
          <br />
          {{
            todoList.length - todoList.filter((item) => item.isCompleted).length
          }}
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <!-- 할일리스트 -->
  <v-card class="pa-3 mt-5">
    <TodoList
      :todo-list="todoList"
      @complete-change="completeChange"
      @deleteTodo="deleteTodo"
    />
    <TodoListAdd @addTodo="addTodo" />
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import TodoList from "./TodoList.vue";
import TodoListAdd from "./TodoListAdd.vue";

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

// 미완료 -> 완료
const completeChange = (index) => {
  // console.log(todoList.value[index].isCompleted);
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
};
</script>
