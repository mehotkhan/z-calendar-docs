<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { DateTime, Interval, Info } from "luxon";

const props = defineProps({
  locale: String,
  dir: String,
  inputDate: Object,
  weekOffset: Number,
});

const monthSelector = ref(0);
const dayOffset = ref(0);
const days = ref([]);

onMounted(() => {
  const localParts = props.inputDate.toLocaleParts();
  dayOffset.value = localParts[2].value;

  console.log(Info.months("narrow", { locale: props.locale, useLocaleWeeks: true, outputCalendar: "persian" }));
});

watch(props, async (newProps) => {
  const localParts = newProps.inputDate.toLocaleParts();
  dayOffset.value = localParts[2].value;
});

const weekdaysShort = computed(() => {
  return weekDayShift(Info.weekdays("short", { locale: props.locale, useLocaleWeeks: false }), props.weekOffset);
});
const currentDate = computed(() => props.inputDate.plus({ month: monthSelector.value }));
const monthName = computed(() => currentDate.value.toFormat("LLLL", { locale: props.locale }));
const yearName = computed(() => currentDate.value.toFormat("yyyy", { locale: props.locale }));

// find start of month + 31 day :)
const start = computed(() =>
  currentDate.value.minus({ day: dayOffset.value - 1 }).startOf("week", { useLocaleWeeks: true }),
);
const end = computed(() => start.value.plus({ day: 32 }).endOf("week", { useLocaleWeeks: true }));

const range = computed(() => Interval.fromDateTimes(start.value, end.value).splitBy({ days: 1 }));

const isToday = (date) => {
  return date.toISODate() === DateTime.local().toISODate();
};
const isMonth = (date) => {
  return date.toLocaleParts()[0].value === currentDate.value.toLocaleParts()[0].value;
};

const weekGenerator = (rangeDays) => {
  days.value = [];
  rangeDays.forEach((day) => {
    days.value.push({
      dayNum: day.start.toFormat("dd", { locale: props.locale }),
      dayName: day.start.toFormat("cccc", { locale: props.locale }),
      monthName: day.start.toFormat("MMM", { locale: props.locale }),
      dayClass: [
        isMonth(day.start) ? "text-gray-600" : "text-gray-300",
        isToday(day.start) ? "bg-blue-400 text-white p-1" : "",
      ],
    });
  });
};
const weekDayShift = (weekArray, shiftNum) => [...weekArray.slice(shiftNum - 1), ...weekArray.slice(0, shiftNum - 1)];
weekGenerator(range.value);

watch(range, async (newRange) => {
  weekGenerator(newRange);
  console.log(props.inputDate);
});
</script>
<template>
  <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t" :class="dir == 'rtl' && 'rtl'">
    <div class="px-4 flex items-center justify-between" :class="dir == 'rtl' && 'flex-row-reverse'">
      <span tabindex="0" class="focus:outline-none text-3xl font-normal dark:text-gray-100 text-gray-800"
        >{{ monthName }} {{ yearName }}</span
      >
      <div class="flex items-center" :class="dir == 'rtl' && 'flex-row-reverse'">
        <button
          aria-label="calendar backward"
          class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
          @click="monthSelector--"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-left"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <button
          aria-label="calendar forward"
          class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
          @click="monthSelector++"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between pt-12">
      <div class="w-full">
        <div class="grid grid-cols-7 gap-0">
          <span v-for="day in weekdaysShort" class="w-full flex justify-center">
            <p class="text-center text-gray-800 dark:text-gray-100">{{ day }}</p>
          </span>
        </div>
        <div class="grid grid-cols-7 gap-0 mt-5">
          <div
            v-for="day in days"
            class="w-full flex justify-center flex-col items-center rounded-full m-3"
            :class="day.dayClass"
          >
            <span class="text-[10px] font-normal">
              {{ day.monthName }}
            </span>

            <div class="text-2xl">{{ day.dayNum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.rtl {
  direction: rtl;
}
</style>
