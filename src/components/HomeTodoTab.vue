<template>
  <v-card
    class="pa-3"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px; margin-top: 15px"
  >
    <v-row><ChartTodo :todoList="todoList" /></v-row>
    <v-row>
      <span
        style="
          color: #4c0090;
          display: inline-block;
          width: 95%;
          margin-top: 15px;
          padding-left: 15px;
        "
      >
      </span>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <p>평균 완료 개수</p>
          <p>평균 완료율 58.6 %</p>
          <br />
          <p style="font-size: 19px; color: #4c0090">
            <b>잘 하고 있어요!</b>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-card>

  <v-card
    class="pa-3 mt-5"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px; margin-top: 15px"
  >
    <v-row class="pa-2">
      <span
        style="
          color: #6600cc;
          display: inline-block;
          width: 95%;
          text-align: center;
        "
        ><b>{{ month }}월</b></span
      >
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: aliceblue;
            background-color: #6600cc;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px black;
          "
          outline
          >전체
          <br />
          <p style="margin-top: 10px; font-size: x-large">
            <b> {{ todoList.length }}</b>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: aliceblue;
            background-color: #6600cc;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px black;
          "
          outline
          >완료
          <br />
          <p style="margin-top: 10px; font-size: x-large">
            <b> {{ todoList.filter((item) => item.isCompleted).length }}</b>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="pa-3"
          style="
            height: 110px;
            color: aliceblue;
            background-color: #6600cc;
            text-align: center;
            border-radius: 10px;
            box-shadow: inset 0 2px 1px white, 0 2px 3px black;
          "
          outline
        >
          미완료
          <br />
          <p style="margin-top: 10px; font-size: x-large">
            <b>
              {{
                todoList.length -
                todoList.filter((item) => item.isCompleted).length
              }}</b
            >
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <!-- 할일리스트 -->
  <v-card
    class="pa-3 mt-5"
    style="border: 1.5px solid #e5e5e5; border-radius: 15px"
  >
    <TodoList
      :todo-list="todoList"
      @complete-change="completeChange"
      @deleteTodo="deleteTodo"
      @editTodo="editTodoRequest"
    />
    <!-- <TodoListAdd @addTodo="addTodo" /> -->
    <todo-list-edit
      v-model:isVisible="isVisible"
      ref="todoListEditRef"
      @editTodo="editTodoFinish"
    />
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import TodoList from "./TodoList.vue";
// import TodoListAdd from "./TodoListAdd.vue";
import TodoListEdit from "./TodoListEdit.vue";
import ChartTodo from "./ChartTodo.vue";
import * as dayjs from "dayjs";

const todoList = ref([
  {
    id: 1,
    todo: "과제제출일",
    isCompleted: true,
    isEdit: false,
    date: dayjs().toDate(),
  },
  {
    id: 2,
    todo: "병원예약",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(1, "day").toDate(),
  },
  {
    id: 3,
    todo: "친구만나는 날",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(2, "day").toDate(),
  },
  {
    id: 4,
    todo: "세탁물 받기",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(3, "day").toDate(),
  },
  {
    id: 5,
    todo: "청소하기",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(4, "day").toDate(),
  },
  {
    id: 6,
    todo: "택배받기",
    isCompleted: false,
    isEdit: false,
    date: dayjs().toDate(),
  },
]);

// todo 추가
// const addTodo = (title) => {
//   todoList.value.push({
//     id: todoList.value[todoList.value.length - 1].id + 1,
//     todo: title,
//     isCompleted: false,
//   });
// };

// todo 삭제
const deleteTodo = (index) => {
  todoList.value.splice(index, 1);
};

// 미완료 -> 완료(밑줄)
const completeChange = (index) => {
  // console.log(todoList.value[index].isCompleted);
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
};

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

let today = new Date();
let month = today.getMonth() + 1;
</script>
