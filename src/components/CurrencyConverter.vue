<template>

<div>{{ getIntlDateTime }}</div>

  <div class="q-pa-md center container">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle

        switch-toggle-side
        expand-separator
        icon="help_outline"
        :label="name"
        :caption="version"
      >
        <q-card>
          <q-card-section>
            <p class="text-caption text-center">
              &copy; {{ getYear() }} {{ author }}
            </p>
            <p class="text-body2">
              &rArr; converts the given amount and chosen currency to several currencies.
              <br/>
              &rArr; offline-capable
              <br/>
              &rArr; the rates are called up when an online query is made and saved locally for future offline use.
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </q-list>
  </div>
  <div class="center">
    <form @submit.prevent="convert">

      <fieldset class="in">
        <legend>&nbsp;to convert&nbsp;</legend>
        <q-input type="number" outlined label="Amount" v-model.number="amount" @focus="converted = false"/>
        <q-select label="Currency" outlined :options="currencies" v-model="fromCurrency">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </fieldset>

      <q-btn
        type="submit"
        outline
        color="primary"
        label="convert"
      />

    </form>
  </div>

  <q-dialog v-model="alertOfflineDialog" auto-close full-height>
      <q-card
        class="text-white"
        style="background: radial-gradient(circle, #C10015 0%, #9C27B0 100%)"
      >
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>
            There are no offline rates available.
          </p>
          <q-icon
            name="cloud_off"
            size="md"
            color="white"
            class="imgcenter"
          />
          <p>
            Please go online and call this app again so the rates can be stored locally for offline usage.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  <div v-if="converted" class="center">
    <fieldset class="out">
      <legend>&nbsp;converted&nbsp;</legend>

      <!-- <q-input outlined :label="'amount in ' + fromCurrency.label" :model-value="amount.toFixed(2)"/> -->
      <q-input outlined :input-style="{ textAlign: 'right' }" :label="'exchange rate date'" :model-value="rates['date']"/>

      <br/>
      <div v-for="currency of currencies" :key="currency.label">
        <q-input outlined :input-style="{ textAlign: 'right' }" :label="currency.label" :model-value="(amount * rates[currency.value]).toFixed(2)"/>
        <p class="text-caption">rate: {{ rates[currency.value] || 1}}</p>
      </div>
    </fieldset>
  </div>

</template>

<script>

import DateTimes from '../services/DateTimes.js';

export default {
  name: "CurrencyConverter",

  data() {
    return {
      name: "Currency Converter",
      version: "v00.02.00",
      startdate: "2021",
      author: "ZHENG Robert",

      amount: 10,
      fromCurrency: "",
      toCurrency: "",
      currencies: [
        {index: 0, label: "European EURO", value:"EUR", description: 'whithout GBP', icon: 'img:/img/german_flag.svg', rate: ''},
        {index: 1, label: "Chinese Yuan", value:"CNY", description: 'Chinese Renminbi', icon: 'img:/img/china_flag.svg', rate: ''},
        {index: 2, label: "US Dollar", value:"USD", description: '', icon: 'img:/img/usa_flag.svg', rate: ''},
        {index: 3, label: "Russian Ruble", value:"RUB", description: '', icon: 'img:/img/russia_flag.svg', rate: ''},
        {index: 4, label: "Japanese Yen", value:"JPY", description: '', icon: 'img:/img/japan_flag.svg', rate: ''},
      ],
      rated: [
        {index: 0, rated: ''},
        {index: 1, rated: ''},
        {index: 2, rated: ''},
        {index: 3, rated: ''},
        {index: 4, rated: ''},
      ],
      rates: {},
      converted: false,
      isOnline: false,
      alertOfflineDialog: false,
      intlDate: '',
    };
  },
  computed: {
    amountValid() {
      return +this.amount >= 0;
    },
    currencyValid() {

      if(this.fromCurrency.length === 0)
      {
        return false;
      }
      return true;
    },
    getIntlDateTime() {
      const dt = new DateTimes();
      const ystring = dt.getCurrentDateTimeIntl();
      return ystring;
    }
  },
  mounted() {
    this.updateOnlineStatus();
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    getYear() {
      const dt = new DateTimes();
      const ystring = dt.setCopyDate(this.startdate);
      return ystring;
    },
    updateOnlineStatus() {
      navigator.onLine ? this.isOnline = true : this.isOnline = false;
    },
    async convert() {
      this.converted = false;
      const { amountValid, currencyValid } = this;
      if(!amountValid || !currencyValid) {
        return;
      }

      this.rates = {};

      if(this.isOnline) {
      await fetch('https://www.flag-me.info/currency2.json')
      .then(data => data.json())
      .then((json) =>
      {
        this.$q.localStorage.set('rates', json);
        const rates = json.rates;
        this.rates['date'] = json.date;

        for (const key of Object.keys(rates)) {
          if(this.fromCurrency.value === key) {
             this.rates[key] = 1;
            for (const [key2, value] of Object.entries(rates[key])) {
              this.rates[key2] = value;
            }
            break;
          }
        }
      })
      .catch((error) => {console.info('error', error);});
      } else {
        let json = this.$q.localStorage.getItem('rates');
        if(!json) {

          this.alertOfflineDialog = true;
          return;
        }

        const rates = json.rates;
        this.rates['date'] = json.date;

        for (const key of Object.keys(rates)) {
          if(this.fromCurrency.value === key) {
             this.rates[key] = 1;
            for (const [key2, value] of Object.entries(rates[key])) {
              this.rates[key2] = value;
            }
            break;
          }
        }
      }

      this.converted = true;
    }
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
.imgcenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 48%;
}

button {
  margin: 15px 0 15px 0;
  width: 100%;
}

.result {
  font-weight: bold;
}

fieldset {
  width: fit-content;
  border-radius: 5px;
  border-color: $primary;
}

.text-caption {
  padding-left: 5px;
  opacity: 0.8;
}

@media (min-width: $breakpoint-sm-min) {
  .container {
    max-width: 500px;
  }
  fieldset {
    width: 500px;
  }
}

</style>


