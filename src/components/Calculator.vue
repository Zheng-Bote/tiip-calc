<template>

  <div class="q-pa-md center" style="max-width: 350px">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle

        switch-toggle-side
        expand-separator
        icon="help_outline"
        :label="$t('Calculator')"
        :caption="version"
      >
        <q-card>
          <q-card-section>
            <p class="text-caption text-center">
              &copy; {{ getYear() }} {{ author }}
            </p>
            <p class="text-body2">
              {{ $t('app_desc') }}
            </p>
            <p class="text-body2">
              &rArr; {{ $t('offline-capable') }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </q-list>
  </div>

  <div class="container">
    <input class="readout" v-model="expression">
    <form submit.prevent>
      <div class="button-grid">
        <button
          :title="$t('Clear everything')"
          class="calc-button two-span"
          @click.stop="expression = ''"
        >
          C
        </button>
        <button
          :title="$t('Clear entry')"
          class="calc-button"
          @click.stop="expression = expression.substring(0, expression.length -1)"
        >
          CE
        </button>
        <button title="Operator divide" class="calc-button" @click.stop="expression += '/'">/</button>
        <button title="Number seven" class="calc-button" @click.stop="expression += '7'">7</button>
        <button title="Number eight" class="calc-button" @click.stop="expression += '8'">8</button>
        <button title="Number nine" class="calc-button" @click.stop="expression += '9'">9</button>
        <button title="Operator x" class="calc-button" @click.stop="expression += '*'">x</button>
        <button title="Number four" class="calc-button" @click.stop="expression += '4'">4</button>
        <button title="Number five" class="calc-button" @click.stop="expression += '5'">5</button>
        <button title="Number six" class="calc-button" @click.stop="expression += '6'">6</button>
        <button title="Operator minus" class="calc-button" @click.stop="expression += '-'">-</button>
        <button title="Number one" class="calc-button" @click.stop="expression += '1'">1</button>
        <button title="Number two" class="calc-button" @click.stop="expression += '2'">2</button>
        <button title="Number three" class="calc-button" @click.stop="expression += '3'">3</button>
        <button title="Operator plus" class="calc-button" @click.stop="expression += '+'">+</button>
        <button title="Number zero" class="calc-button" @click.stop="expression += '0'">0</button>
        <button title="Decimal Point" class="calc-button" @click.stop="expression += '.'">.</button>
        <button title="Percentage" class="calc-button" @click.stop="expression += '%'">%</button>
        <button :title="$t('Calculate')" class="calc-button" type="submit" @click="calculate">=</button>
      </div>
    </form>
  </div>

</template>

<script>
import { evaluate } from "mathjs";
import DateTimes from '../services/DateTimes.js';

export default {
  name: "Calculator",

    i18n: {
    messages:{
      "en": {
        "Calculator": "Calculator",
        "offline-capable": "offline-capable",
        "app_desc": "simple calculator, far away to be perfect.",
        "Clear everything": "Clear everything",
        "Clear entry": "Clear entry",
        "Calculate": "calculate",
      },
      "de": {
        "Calculator": "Rechner",
        "offline-capable": "offline-fähig",
        "app_desc": "einfacher Rechner.",
        "Clear everything": "alles löschen",
        "Clear entry": "Eingabe löschen",
        "Calculate": "berechne",
      }
    }
  },

  data() {
    return {
      name: "Calculator",
      version: "v00.01.00",
      startdate: "2021",
      author: "ZHENG Robert",

      expression: " ",
      state: {value: '', context: ''},
    };
  },
  computed: {

  },
  methods: {
    getYear() {
      const dt = new DateTimes();
      const ystring = dt.setCopyDate(this.startdate);
      return ystring;
    },
    calculate() {
      if(this.expression === '' || this.expression === '0/0')
      {return;}
      this.expression = evaluate(this.expression);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}


/* ##### */
.container {
  max-width: 100%;
  margin: 0 auto;
  border: 2px solid $primary;
  border-radius: 5px;
  box-sizing: border-box;
}

.readout {
  font-size: 32px;
  color: #333;
  text-align: right;
  padding: 5px 13px;
  width: 100%;
  border: none;
  border-bottom: 1px solid $primary;
  box-sizing: border-box;
}

.button-grid {
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
}

.calc-button {
  padding: 10px;
  font-size: 22px;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border-radius: 2px;
  border: 0;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.calc-button:hover {
  opacity: 1;
}

.calc-button:active {
  background: #999;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
}

.body--light {
  .calc-button {
    color: black;
    background: $blue-3;
  }
  .two-span {
    grid-column: span 2;
    background-color: $primary;
    color: white;
  }
}
.body--dark {
  input {
    background: $blue-3;
  }
  .calc-button {
    background: $info;
  }
  .two-span {
    grid-column: span 2;
    background-color: $primary;
    color: white;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .container {
    max-width: 500px;
  }
}

</style>


