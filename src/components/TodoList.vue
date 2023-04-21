<template>
  <v-container fluid>
    <v-row v-for="(todo, index) in props.todoList" :key="todo.id">
      <v-col cols="0" lg="0">
        <!-- 체크박스 -->
        <!-- <input
          type="checkbox"
          class="check-box"
          :value="todo.isCompleted"
          :id="todo.id"
          @click="emits('completeChange', index)"
        /> -->
        <!-- <v-checkbox
          class="check-box"
          :value="todo.isCompleted"
          :id="todo.id"
          @click="emits('completeChange', index)"
        /> -->
        <v-checkbox
          color="#6600cc"
          v-model="todo.isCompleted"
          id="todo.id"
          @input="emits('completeChange', index)"
        ></v-checkbox>
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
            @click="emits('editTodo', index)"
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
  </v-container>
</template>

<script setup>
const props = defineProps(["todoList"]);
const emits = defineEmits(["completeChange", "deleteTodo", "editTodo"]);
</script>

<style>
.completed-todo {
  text-decoration: line-through;
  text-decoration-color: black;
}

.container {
  display: flex;
}
</style>
