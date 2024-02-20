<script setup lang="ts">
import {
Popover,
PopoverButton,
PopoverOverlay,
PopoverPanel,
} from "@headlessui/vue";
import { DateTime, Settings, WeekdayNumbers } from "luxon";
import type { Ref } from "vue";
import useDom from "./composables/dom";

import { ref } from "vue";
import DatePicker from "./components/DatePicker.vue";
interface Props {
  noInput?: boolean;
  disabled?: boolean;
  asSingle?: boolean;
  placeholder?: string;
  i18n?: string;
  inputClasses?: string;
  overlay?: boolean;
  modelValue:
    | [Date, Date]
    | { start: Date | string; end: Date | string }
    | {
        startDate: Date | string;
        endDate: Date | string;
      }
    | string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
  i18n: "en",
  inputClasses: "",

  formatter: () => ({
    date: "YYYY-MM-DD",
    month: "MMM",
  }),
  modelValue: () => [new Date(), new Date()],
});
const emit = defineEmits<{
  (
    e: "update:modelValue",
    value: Array<string> | Array<any> | string | Record<string, string>
  ): void;
}>();
const VtdRef = ref(null);

const VtdInputRef = ref<HTMLInputElement | null>(null);
const { useVisibleViewport } = useDom();

const pickerValue = ref("");
const givenPlaceholder = ref("");
const applyValue = ref<any[]>([]);
const placement = ref<boolean | null>(null);

const dirMode = ref<string>("ltr");
const locale = ref<string>("");
const weekOffset = ref<WeekdayNumbers>(1);
const inputDate = ref<object>();

// const switchMode = () => {
//   lngMode.value == "fa" ? (lngMode.value = "en") : (lngMode.value = "fa");
//   bootUp();
// };

const bootUp = () => {
  if (props.i18n == "fa") {
    locale.value = "fa-IR";
    dirMode.value = "rtl";
    weekOffset.value = 6;
    Settings.defaultWeekSettings = {
      firstDay: weekOffset.value,
      minimalDays: 1,
      weekend: [4, 5],
    };
    inputDate.value = DateTime.local().reconfigure({
      outputCalendar: "persian",
    });
  } else {
    dirMode.value = "ltr";
    locale.value = "en-GB";
    weekOffset.value = 1;
    Settings.defaultWeekSettings = {
      firstDay: weekOffset.value,
      minimalDays: 1,
      weekend: [6, 7],
    };
    inputDate.value = DateTime.local();
  }
};
bootUp();

function clearPicker() {
  pickerValue.value = "";
  if (Array.isArray(props.modelValue)) {
    emit("update:modelValue", []);
  } else if (typeof props.modelValue === "object") {
    const obj: Record<string, string> = {};
    const [start, end] = Object.keys(props.modelValue);
    obj[start] = "";
    obj[end] = "";
    emit("update:modelValue", obj);
  } else {
    emit("update:modelValue", "");
  }
  applyValue.value = [];
  VtdInputRef.value && VtdInputRef.value.focus();
}
function getAbsoluteParentClass(open: boolean) {
  if (open && placement.value === null)
    placement.value = useVisibleViewport(VtdRef.value);

  if (placement.value) return "left-auto right-0";

  return "left-0 right-auto";
}
function getAbsoluteClass(open: boolean) {
  if (open && placement.value === null)
    placement.value = useVisibleViewport(VtdRef.value);

  if (open && placement.value) return "place-right";

  return "place-left";
}

const daySelected = (day: any) => {
  console.log("day select: ", day);
  console.log(day);
  //   inputDateModel.value = day.dayNum;
};
</script>
<template>
  <Popover
    v-if="!props.noInput"
    id="vtd"
    v-slot="{ open }: { open: boolean }"
    as="div"
    class="relative w-full"
  >
    <PopoverOverlay
      v-if="props.overlay && !props.disabled"
      class="fixed inset-0 bg-black opacity-30"
    />

    <PopoverButton as="label" class="relative block">
      <slot
        :value="pickerValue"
        :placeholder="givenPlaceholder"
        :clear="clearPicker"
      >
        <input
          ref="VtdInputRef"
          v-bind="$attrs"
          v-model="pickerValue"
          type="text"
          class="relative block w-full"
          :disabled="props.disabled"
          :class="[
            props.disabled ? 'cursor-default opacity-50' : 'opacity-100',
            inputClasses ||
              'pl-3 pr-12 py-2.5 rounded overflow-hidden border-solid text-sm text-vtd-secondary-700 placeholder-vtd-secondary-400 transition-colors bg-white border border-vtd-secondary-300 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700 dark:text-vtd-secondary-100 dark:placeholder-vtd-secondary-500 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-20',
          ]"
          autocomplete="off"
          data-lpignore="true"
          data-form-type="other"
          :placeholder="givenPlaceholder"
        />
        <div
          class="absolute inset-y-0 right-0 inline-flex items-center rounded overflow-hidden"
        >
          <button
            type="button"
            :disabled="props.disabled"
            :class="
              props.disabled ? 'cursor-default opacity-50' : 'opacity-100'
            "
            class="px-2 py-1 mr-1 focus:outline-none text-vtd-secondary-400 dark:text-opacity-70 rounded"
            @click="
              props.disabled
                ? false
                : pickerValue
                ? clearPicker()
                : VtdInputRef?.focus()
            "
          >
            <slot name="inputIcon" :value="pickerValue">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  v-if="pickerValue"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </slot>
          </button>
        </div>
      </slot>
    </PopoverButton>

    <transition
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      enter-active-class="transform transition ease-out duration-200"
      leave-active-class="transform transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3"
    >
      <PopoverPanel
        v-if="!props.disabled"
        v-slot="{ close }: { close: (ref?: Ref | HTMLElement) => void }"
        as="div"
        class="relative z-50"
      >
        <div
          class="absolute z-50 top-full sm:mt-2.5"
          :class="getAbsoluteParentClass(open)"
        >
          <div
            ref="VtdRef"
            class="fixed inset-0 z-50 overflow-y-auto sm:overflow-visible sm:static sm:z-auto bg-white dark:bg-vtd-secondary-800 sm:rounded shadow-sm"
          >
            <div
              class="vtd-datepicker static sm:relative w-full bg-white sm:rounded sm:shadow-sm border-0 sm:border border-black/[.1] px-3 py-3 sm:px-4 sm:py-4 dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700/[1]"
              :class="getAbsoluteClass(open)"
            >
              <DatePicker
                :locale="locale"
                :inputDate="inputDate"
                :dir="dirMode"
                :weekOffset="weekOffset"
                @day-select="daySelected"
              />
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
