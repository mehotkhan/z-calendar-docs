<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { DateTime, Interval, Info } from "luxon";

const locale = 'fa-IR'
// const locale = 'en-GB'
const inputDate = DateTime.local({ locale }).reconfigure({ outputCalendar: "persian" });
// const inputDate = DateTime.local({ locale })


const weekdaysShort = Info.weekdays('narrow', { locale })

const monthSelector = ref(0)
const days = ref([]);



const currentDate = computed(() => inputDate.plus({ month: monthSelector.value }))
const monthName = computed(() => currentDate.value.toFormat('LLLL'))
const yearName = computed(() => currentDate.value.toFormat('yyyy'))

const start = computed(() => currentDate.value.startOf('month').startOf('week'))
const end = computed(() => currentDate.value.endOf('month').endOf('week'))

const range = computed(() => Interval.fromDateTimes(start.value, end.value).splitBy({ days: 1 }))

const isToday = (date) => {
    return date.toISODate() === DateTime.local().toISODate();
}
const isMonth = (date) => {
    return date.month === currentDate.value.month;
}

const weekGenerator = (rangeDays) => {
    days.value = []
    rangeDays.forEach((day) => {
        days.value.push({
            dayNum: day.start.toFormat('dd'),
            dayName: day.start.toFormat('cccc'),
            dayClass: [isMonth(day.start) ? 'text-gray-500' : 'text-gray-300', isToday(day.start) ? 'bg-blue-400 text-gray-100 p-1' : '']
        });
    })
}
weekGenerator(range.value)

watch(range, async (newRange) => {
    weekGenerator(newRange)
})
</script>
<template>
    <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t ">
        <div class="px-4 flex items-center justify-between">
            <span tabindex="0" class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{{ monthName
            }}
                {{ yearName }}</span>
            <div class="flex items-center">
                <button aria-label="calendar backward" @click="monthSelector++"
                    class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                </button>
                <button aria-label="calendar forward" @click="monthSelector--"
                    class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                    </svg>
                </button>

            </div>
        </div>
        <div class="flex items-center justify-between pt-12 overflow-x-auto">
            <div class="w-full">
                <div class="grid grid-cols-7 gap-0">

                    <span v-for="day in weekdaysShort" class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">{{ day }}</p>
                    </span>
                </div>
                <div class="grid grid-cols-7 gap-0 mt-5 ">

                    <div v-for="day in days" class="w-full flex justify-center">
                        <div class="text-base font-medium rounded-full px-2 m-3" :class="day.dayClass">{{
                            day.dayNum
                        }}</div>

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