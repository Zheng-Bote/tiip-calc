<template>
  <q-page padding: true>
    <CurrencyConv/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import CurrencyConv from '../components/CurrencyConverter.vue'

export default defineComponent({
  name: 'CurrencyConverter',

  components: {
    CurrencyConv,
  },
})
</script>
