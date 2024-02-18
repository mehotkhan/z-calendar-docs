---
outline: deep
---

<script setup lang="ts">
import { DateTime, Settings, WeekdayNumbers } from "luxon";
import { ref } from 'vue';
import DatePicker from "../../src/components/DatePicker.vue";

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

# Datepicker

<button @click="switchMode()"
class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded capitalize">
{{ lngMode }}</button>

<DatePicker :locale="locale" :inputDate="inputDate" :dir="dirMode" :weekOffset="weekOffset"
@day-select="daySelected" />

<br />
<hr />
<div>output</div>
<div>{{ inputDateModel }}</div>
