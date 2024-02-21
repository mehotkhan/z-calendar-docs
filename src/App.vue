<script setup lang="ts">
import { ref } from "vue";
import ZDatePicker from "./ZDatePicker.vue";

const dateValue = ref({
  startDate: "",
  endDate: "",
});

const currentLocale = ref("en");

const switchMode = () => {
  currentLocale.value == "fa" ? (currentLocale.value = "en") : (currentLocale.value = "fa");
};
</script>

<template>
  <div class="p-10 bg-sky-50 min-h-screen">
    <button
      @click="switchMode()"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded capitalize"
    >
      {{ currentLocale }}
    </button>
    <br />
    <br />
    <div class="grid grid-rows-2 gap-4" :key="currentLocale">
      <ZDatePicker :i18n="currentLocale" v-model="dateValue.startDate" />
    </div>
  </div>
</template>
