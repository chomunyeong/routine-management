<template>
  <v-container fluid>
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
            style="color: aliceblue; background-color: blueviolet"
            outline
            >전체
            <br />
            {{ todoList.length }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-3"
            style="color: aliceblue; background-color: blueviolet"
            outline
            >완료
            <br />
            {{ todoList.filter((item) => item.isCompleted).length }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-3"
            style="color: aliceblue; background-color: blueviolet"
            outline
          >
            미완료
            <br />
            {{
              todoList.length -
              todoList.filter((item) => item.isCompleted).length
            }}
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="pa-3 mt-5">
      <v-row>
        <v-col>
          <v-card>
            <!-- <v-text-field
              label="할일"
              variant="outlined"
              v-model="newInputItem"
            ></v-text-field> -->
            <input type="text" v-model="newTodoItem" />
          </v-card>
        </v-col>
        <v-col>
          <v-btn color="primary" @click="addTodo">추가</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="mt-3" outline>
            <TodoList :todo-list="todoList" @complete-change="completeChange" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import TodoList from "./TodoList.vue";

const newTodoItem = ref("");
const todoList = ref([
  { id: 1, todo: "Study JavaScript", isCompleted: false, isEdit: false },
  { id: 2, todo: "Study JSP", isCompleted: false, isEdit: false },
  { id: 3, todo: "Study Java", isCompleted: false, isEdit: false },
  { id: 4, todo: "Study Spring", isCompleted: false, isEdit: false },
  { id: 5, todo: "Study DB", isCompleted: false, isEdit: false },
]);

//todo 추가
const addTodo = () => {
  let newTodoObj = {
    id: todoList.value[todoList.value.length - 1].id + 1,
    todo: newTodoItem.value,
    isCompleted: false,
    isEdit: false,
  };
  todoList.value.push(newTodoObj);
  newTodoItem.value = "";
};

// 미완료 -> 완료
const completeChange = (index) => {
  // console.log(todoList.value[index].isCompleted);
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted;
};
</script>
