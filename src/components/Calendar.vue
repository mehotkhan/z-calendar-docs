<script setup>
import { compareAsc, format, newDate } from "date-fns-jalali";
// import {format} from 'date-fns';
// import { faIR } from 'date-fns/locale';
const dateNow = new Date()

// const formattedDate = format(new Date(), 'LLLL', { locale: faIR }); // июнь
const monthName = format(dateNow, "LLLL"),
    yearName = format(dateNow, "yyyy"),
    weekdays = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
    weekdaysShort = ['شن', 'یک‌', 'دو', 'سه‌', 'چه', 'پن', 'جم',]
// console.log('hi')
console.log(weekdays)
console.log(weekdaysShort)



let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// Get the first day of the month
let dayone = new Date(year, month, 1).getDay();

// Get the last date of the month
let lastdate = new Date(year, month + 1, 0).getDate();

// Get the day of the last date of the month
let dayend = new Date(year, month, lastdate).getDay();

// Get the last date of the previous month
let monthlastdate = new Date(year, month, 0).getDate();

// Variable to store the generated calendar HTML
const days = [];

// // Loop to add the last dates of the previous month
for (let i = dayone; i > 0; i--) {
    days.push({
        dayNum: monthlastdate - i + 1,
        dayClass: 'text-gray-300'
    });
}

// // Loop to add the dates of the current month
for (let i = 1; i <= lastdate; i++) {

    // Check if the current date is today
    let isToday = i === date.getDate()
        && month === new Date().getMonth()
        && year === new Date().getFullYear()
        ? "active"
        : "";
    days.push({
        dayNum: i,
        dayClass: isToday ? 'bg-blue-200 text-gray-50 p-1' : 'text-gray-700'
    });
}

// // Loop to add the first dates of the next month
for (let i = dayend; i < 6; i++) {
    // lit += `<li class="inactive">${i - dayend + 1}</li>`
    days.push({
        dayNum: i - dayend + 1,
        dayClass: 'text-gray-300'
    });
}



</script>
<template>
    <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t ">
        <div class="px-4 flex items-center justify-between">
            <span tabindex="0" class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{{ monthName
            }}
                {{ yearName }}</span>
            <div class="flex items-center">
                <button aria-label="calendar backward"
                    class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                </button>
                <button aria-label="calendar forward"
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
        <div class="flex items-center justify-between pt-12 overflow-x-auto rtl">
            <div class="w-full">
                <div class="grid grid-cols-7 gap-0">

                    <span v-for="day in weekdaysShort" class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">{{ day }}</p>
                    </span>
                </div>
                <div class="grid grid-cols-7 gap-0 mt-5 ">

                    <span v-for="day in days" class="w-full flex justify-center py-3">
                        <p class="text-base font-medium rounded-full" :class="day.dayClass">{{
                            day.dayNum
                        }}</p>
                    </span>

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