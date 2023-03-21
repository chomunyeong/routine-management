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
        <!-- 수정인풋 -->
        <span v-else>
          <input type="text" :placeholder="todo.todo" />
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const props = defineProps(["todoList"]);
const emits = defineEmits(["completeChange"]);

//수정인풋
// const editTodoItem = ref("");
</script>

<style>
.completed-todo {
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>
