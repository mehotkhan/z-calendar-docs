<script setup>
  import DemoLayout from './DemoLayout.vue'
  import ZDatePicker from '../src/ZDatePicker.vue'
  import { ref } from 'vue'
  const dateValue = ref({
  startDate: "",
  endDate: "",
  });

const currentLocale = ref("en");

const switchMode = () => {
  currentLocale.value == "fa" ? (currentLocale.value = "en") : (currentLocale.value = "fa");
};
</script>

# Demo

::: tip
Some DEMO :)
:::

<DemoLayout>
    <button  @click="switchMode()"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded capitalize"
    >
    {{ currentLocale }}
    </button>
    <br />
    <br />
    <div class="grid grid-rows-2 gap-4" :key="currentLocale">
    <ZDatePicker :i18n="currentLocale" v-model="dateValue.startDate" />
    </div>
</DemoLayout>
