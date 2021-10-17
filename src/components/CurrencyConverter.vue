<template>

<div  class="text-caption">{{ getIntlDateTime }}</div>

  <div class="q-pa-md center container">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        dense
        dense-toggle

        switch-toggle-side
        expand-separator
        icon="help_outline"
        :label="$t('Currency_Converter')"
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
              <br/>
              &rArr; {{ $t('app_func') }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
  </q-list>
  </div>
  <div class="center">
    <form @submit.prevent="convert">

      <fieldset class="in">
        <legend>&nbsp;{{ $t('to convert') }}&nbsp;</legend>
        <q-input type="number" outlined :label="$t('Amount')" v-model.number="amount" @focus="converted = false"/>
        <q-select :label="$t('Currency')" outlined :options="currencies" v-model="fromCurrency">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="$t(scope.opt.icon)" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
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
        :label="$t('convert')"
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
      <legend>&nbsp;{{ $t('converted') }}&nbsp;</legend>

      <!-- <q-input outlined :label="'amount in ' + fromCurrency.label" :model-value="amount.toFixed(2)"/> -->
      <q-input outlined :input-style="{ textAlign: 'right' }" :label="$t('exchange rate date')" :model-value="rates['date']"/>

      <br/>
      <div v-for="currency of currencies" :key="currency.label">
        <q-input outlined :input-style="{ textAlign: 'right' }" :label="$t(currency.label)" :model-value="(amount * rates[currency.value]).toFixed(2)"/>
        <p class="text-caption">{{ $t('rate') }}: {{ rates[currency.value] || 1}}</p>
      </div>
    </fieldset>
  </div>

</template>

<script>

import DateTimes from '../services/DateTimes.js';

export default {
  name: "CurrencyConverter",

  i18n: {
    messages:{
      "en": {
        "Currency_Converter": "Currency Converter",
        "offline-capable": "offline-capable",
        "app_desc": "App to calculate the tip based on the total amount, amount of people sharing the bill and tip-rate.",
        "app_func": "the rates are called up when an online query is made and saved locally for future offline use.",
        "to convert": "to convert",
        "Amount": "Amount",
        "Currency": "Currency",
        "convert": "convert",
        "converted": "converted",
        "exchange rate date": "exchange rate date",
        "European EURO": "European EURO",
        "Chinese Yuan": "Chinese Yuan",
        "Chinese Renminbi": "chinesischer Renminbi",
        "Russian Ruble": "Russian Ruble",
        "Japanese Yen": "Japanese Yen",
        "whithout GBP": "whithout GBP",
        "rate": "rate",
      },
      "de": {
        "Currency_Converter": "Währungs-Umrechner",
        "offline-capable": "offline-fähig",
        "app_desc": "Applikation zur Berechnung von Trinkgeldern auf Basis der Personen die sich die Rechnung teilen und auf Basis der Service-Beurteilung.",
        "app_func": "die Währungsrate wird aktualisiert wenn eine Online-Abfrage erfolgt und wird dann lokal gespeichert für künftige Offline-Nutzung.",
        "to convert": "Umrechnung",
        "Amount": "Betrag",
        "Currency": "Währung",
        "convert": "umrechnen",
        "converted": "Umrechnung",
        "exchange rate date": "Währungskurs Datum",
        "European EURO": "europäischer EURO",
        "Chinese Yuan": "chinesischer Yuan",
        "Chinese Renminbi": "chinesischer Renminbi",
        "Russian Ruble": "russischer Rubel",
        "Japanese Yen": "japanischer Yen",
        "whithout GBP": "ohne Pfund",
        "rate": "Kurs",
      }
    }
  },

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
        {index: 0, label: "European EURO", value:"EUR", description: 'whithout GBP', icon: 'img:https://bamboo-net.de/tip-calc/img/de_flag.svg', rate: ''},
        {index: 1, label: "Chinese Yuan", value:"CNY", description: 'Chinese Renminbi', icon: 'img:https://bamboo-net.de/tip-calc/img/cn_flag.svg', rate: ''},
        {index: 2, label: "US Dollar", value:"USD", description: '', icon: 'img:https://bamboo-net.de/tip-calc/img/us_flag.svg', rate: ''},
        {index: 3, label: "Russian Ruble", value:"RUB", description: '', icon: 'img:https://bamboo-net.de/tip-calc/img/ru_flag.svg', rate: ''},
        {index: 4, label: "Japanese Yen", value:"JPY", description: '', icon: 'img:https://bamboo-net.de/tip-calc/img/jp_flag.svg', rate: ''},
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
  width: 300px;
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


