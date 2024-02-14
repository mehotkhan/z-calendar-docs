<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { DateTime, Interval, Info } from "luxon";
import Calendar from './Calendar.vue'
// import Events from './Events.vue'

const lngMode = ref<string>('en')
const dirMode = ref<string>('ltr')
const locale = ref<string>('')
const inputDate = ref<object>()

const switchMode = () => {
  lngMode.value == 'fa' ? lngMode.value = 'en' : lngMode.value = 'fa'
  bootUp()
}

const bootUp = () => {
  if (lngMode.value == 'fa') {
    locale.value = 'fa-IR'
    dirMode.value = 'rtl'
    inputDate.value = DateTime.local().reconfigure({ outputCalendar: "persian" });
  } else {
    dirMode.value = 'ltr'
    locale.value = 'en-GB'
    inputDate.value = DateTime.local()
  }
}
bootUp()




</script>
<template>
  <div class="flex items-center justify-center py-8 px-4 flex-col gap-3">
    <div>
      <button @click="switchMode()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded capitalize">
        {{ lngMode }}</button>
    </div>
    <div class="max-w-xl w-full shadow-lg">
      <Calendar :locale="locale" :inputDate="inputDate" :dir="dirMode" />
    </div>
  </div>
</template>