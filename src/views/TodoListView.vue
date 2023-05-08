<template>
  <div class="header-container">
    <BaseHeader>
      <template #left>
        <slot name="left">
          <p @click="moveToday">오늘</p>
        </slot>
      </template>

      <template #center>
        <slot name="center">
          <p>할 일</p>
        </slot>
      </template>
      <template #right>
        <slot name="right">
          <p style="padding-right: 20px">
            <Calendar v-model:target-date="targetDate" ref="calendar" />
          </p>
        </slot>
      </template>
    </BaseHeader>
  </div>
  <div class="calender-container">
    <CalendarWeek v-model:target-date="targetDate" ref="calendar" />
  </div>
  <div class="progressBar">
    <v-progress-linear
      v-model="completed"
      color="deep-purple-accent-4"
      height="25"
    ></v-progress-linear>
    <p>
      <b>
        {{ computedTodoList.length }}개 중
        {{ computedTodoList.filter((item) => item.isCompleted).length }}개 완료!
      </b>
    </p>
  </div>

  <div>
    <!-- list -->
    <TodoList
      :todo-list="computedTodoList"
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
import CalendarWeek from "@/components/CalendarWeek.vue";
import TodoList from "@/components/TodoList.vue";
import TodoListAdd from "@/components/TodoListAdd.vue";
import TodoListEdit from "@/components/TodoListEdit.vue";
import Calendar from "@/components/Calendar.vue";
import * as dayjs from "dayjs";
import { ref, computed } from "vue";

const calendar = ref(null);

// 오늘
const moveToday = () => {
  calendar.value.moveToday();
};

const todoList = ref([
  {
    id: 1,
    todo: "오늘",
    isCompleted: false,
    isEdit: false,
    date: dayjs().toDate(),
  },
  {
    id: 2,
    todo: "1일전",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(1, "day").toDate(),
  },
  {
    id: 3,
    todo: "2일전",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(2, "day").toDate(),
  },
  {
    id: 4,
    todo: "3일전",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(3, "day").toDate(),
  },
  {
    id: 5,
    todo: "4일전",
    isCompleted: false,
    isEdit: false,
    date: dayjs().subtract(4, "day").toDate(),
  },
]);

// 날짜 초기값
const targetDate = ref(new Date());

// 선택날짜 필터로 찾기
const computedTodoList = computed(() => {
  return todoList.value.filter((item) => {
    return dayjs(item.date).isSame(dayjs(targetDate.value), "date");
  });
});
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
    todoListEditRef.value.setValue(targetIdx, todoList.value[targetIdx].todo);
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
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
