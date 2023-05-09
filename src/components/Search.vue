<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-text-box-search-outline" v-bind="props"></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h7">검색</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field>
                  <input
                    class="form-control"
                    type="text"
                    v-model="search"
                    placeholder="검색"
                  />
                </v-text-field>
                <v-btn color="blue-darken-1">search</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                {{ filterList }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <!-- <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Save
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { ref, computed } from "vue";

const dialog = ref(false);

const props = defineProps(["todoList"]);

let search = ref("");
let filterList = computed(() => {
  if (search.value) {
    return props.todolist.value.filter((item) => {
      return item.includes(search.value);
    });
  } else {
    return null;
  }
});
</script>
