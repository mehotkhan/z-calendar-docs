<script setup lang="ts">
import { DateTime, Settings, WeekdayNumbers } from "luxon";
import { ref } from 'vue';
import DatePicker from "./components/DatePicker.vue";

const lngMode = ref<string>('en')
const dirMode = ref<string>('ltr')
const locale = ref<string>('')
const weekOffset = ref<WeekdayNumbers>(1)
const inputDate = ref<object>()
const inputDateModel = ref<string>('')

const switchMode = () => {
  lngMode.value == 'fa' ? lngMode.value = 'en' : lngMode.value = 'fa'
  bootUp()
}

const bootUp = () => {
  if (lngMode.value == 'fa') {
    locale.value = 'fa-IR'
    dirMode.value = 'rtl'
    weekOffset.value = 6
    Settings.defaultWeekSettings = { firstDay: weekOffset.value, minimalDays: 1, weekend: [4, 5] }
    inputDate.value = DateTime.local().reconfigure({ outputCalendar: "persian" })
  } else {
    dirMode.value = 'ltr'
    locale.value = 'en-GB'
    weekOffset.value = 1
    Settings.defaultWeekSettings = { firstDay: weekOffset.value, minimalDays: 1, weekend: [6, 7] }
    inputDate.value = DateTime.local()
  }
}
bootUp()

const daySelected = (day: any) => {
  console.log('day select: ', day)
  inputDateModel.value = day.dayNum
}


</script>
<template>
  <div class="bg-gray-300 h-screen">

    <div class="flex items-center justify-center py-8 px-4 flex-col gap-3 min-h-20">
      <div>
        <button @click="switchMode()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded capitalize">
          {{ lngMode }}</button>
      </div>
      <div class="max-w-xl w-full shadow-lg min-h-96 bg-white p-3">
        <div class="grid gap-2 grid-cols-2">

          <div>
            <DatePicker :locale="locale" :inputDate="inputDate" :dir="dirMode" :weekOffset="weekOffset"
              @day-select="daySelected" />
          </div>
          <div>
            <div>output</div>
            <div>{{ inputDateModel }}</div>
          </div>
        </div>
        <!-- <Calendar :locale="locale" :inputDate="inputDate" :dir="dirMode" :weekOffset="weekOffset" /> -->
      </div>
    </div>
  </div>
</template>