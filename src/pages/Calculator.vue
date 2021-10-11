<template>
  <q-page padding: true>
    <Calc/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Calc from '../components/Calculator.vue'

export default defineComponent({
  name: 'Calculator',

  components: {
    Calc,
  },
})
</script>
