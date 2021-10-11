<template>
  <q-page padding: true>
    <TipCalc/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TipCalc from '../components/TipCalc.vue'

export default defineComponent({
  name: 'TipCalculator',

  components: {
    TipCalc,
  },
})
</script>
