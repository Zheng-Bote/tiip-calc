<template>
  <div class="q-pa-md center container">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle

        switch-toggle-side
        expand-separator
        icon="help_outline"
        :label="$t('tipcalc.app_name')"
        :caption="version"
      >
        <q-card>
          <q-card-section>
            <p class="text-caption text-center">
              &copy; {{ getYear() }} {{ author }}
            </p>
            <p class="text-body2">
              &rArr; {{ $t('tipcalc.app_desc') }}
              <br/>
              &rArr; {{ $t('tipcalc.offline_capable') }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </q-list>
  </div>
  <div class="center">
    <form @submit.prevent="calculate">

      <fieldset class="in">
        <legend>&nbsp;{{ $t('tipcalc.Dinner') }}&nbsp;</legend>

        <q-input outlined :label="$t('tipcalc.bill_amount')" v-model="tip.subtotal" @focus="calculated = false"/>
        <q-input outlined :label="$t('tipcalc.number_of_people')" type="number" v-model.number="tip.numDinners" @focus="calculated = false"/>

        <q-select :label="$t('tipcalc.rating_tippercentage')" outlined :options="ratings" emit-value v-model.number="tip.tipPercentage" @focus="calculated = false">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ $t(scope.opt.description) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

      </fieldset>

      <q-btn
        type="submit"
        outline
        color="primary"
        :label="$t('tipcalc.calculate')"
      />

    </form>
  </div>
  <div v-if="calculated" class="center">
    <fieldset class="out">
      <legend>&nbsp;{{ $t('tipcalc.Payment') }}&nbsp;</legend>

      <q-input outlined :input-style="{ textAlign: 'right' }" :label="$t('tipcalc.tip')" :model-value="result.tip"/>
      <q-input outlined :input-style="{ textAlign: 'right', fontWeight: 'bold' }" :label="$t('tipcalc.total_dinner')" :model-value="result.total"/>
      <q-input outlined :input-style="{ textAlign: 'right'}" :label="$t('tipcalc.tip_per_dinner')" :model-value="result.tipPerDiner"/>
      <q-input outlined :input-style="{ textAlign: 'right', fontWeight: 'bold' }" :label="$t('tipcalc.total_per_dinner')" :model-value="result.totalPerDiner"/>

    </fieldset>
  </div>

</template>

<script>

import DateTimes from '../services/DateTimes.js';
import commonMessages from "../i18n/TipCalc_i18n.js";

export default {
  name: "tipCalculator",

  i18n: {
    sharedMessages: commonMessages
  },

  data() {
    return {
      tip: {
        subtotal: '',
        numDinners: '',
        tipPercentage: '',
      },
      result: {total: 0, totalPerDiner: 0, tip: 0, tipPerDiner: 0},
      name: "Tip-Calculator",
      version: "v00.02.00",
      startdate: "2021",
      author: "ZHENG Robert",

      calculated: false,
      ratings: [
        {
          label: '0%',
          description: 'bad',
          value: '0'
        },
        {
          label: '5%',
          description: 'poor',
          value: '5'
        },
        {
          label: '10%',
          description: 'ok',
          value: '10'
        },
        {
          label: '15%',
          description: 'good',
          value: '15'
        },
        {
          label: '20%',
          description: 'very good',
          value: '20'
        },
        {
          label: '25%',
          description: 'excellent',
          value: '25'
        },
      ]
    };
  },
  computed: {
    subtotalValid() {
      return +parseFloat(this.tip.subtotal) >= 0;
    },
    numDinnersValid() {
      return +this.tip.numDinners > 0;
    },
    tipPercentageValid() {
      return +this.tip.tipPercentage >= 0;
    }
  },
  methods: {
    getYear() {
      const dt = new DateTimes();
      const ystring = dt.setCopyDate(this.startdate);
      return ystring;
    },
    calculate() {
      const { subtotalValid, numDinnersValid, tipPercentageValid } = this;
      if(!subtotalValid || !numDinnersValid || !tipPercentageValid) {
        return;
      }

      const subtotal = parseFloat(this.tip.subtotal.replace(/,/, '.'));
      const numDinners = Number(this.tip.numDinners);
      const tipPercentage = Number(this.tip.tipPercentage);
      let tip = (subtotal * tipPercentage) / 100;
      let total = subtotal + tip;
      let tipPerDiner = tip / numDinners;
      let totalPerDiner = total / numDinners;
      tip = tip.toFixed(2);
      total = total.toFixed(2);
      tipPerDiner = tipPerDiner.toFixed(2)
      totalPerDiner = totalPerDiner.toFixed(2);
      this.result = { total, totalPerDiner, tip, tipPerDiner };

      this.calculated=true;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.container {
    max-width: 100%;
  }

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin: 15px 0 15px 0;
  width: 100%;
}

.result {
  font-weight: bold;
}
/*
form {
  width: 100%;
}*/
fieldset {
  width: 300px;
  border-radius: 5px;
  border-color: $primary;
}

.txtright {
  color: red;
}

@media (min-width: $breakpoint-sm-min) {
  .container {
    max-width: 500px;
  }
  /*
  form {
    width: 300px;
  }*/
  fieldset {
    width: 500px;
  }
}

</style>


