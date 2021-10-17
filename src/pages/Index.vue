<template>

  <q-page class="flex flex-center">
    <q-card
        class="text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6">{{ appProductName }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="text-caption">v{{ appVersion }}</p>
          <p>{{ $t('pwa_desc') }}</p>
          <p>{{ $t('app_desc') }}</p>
          <p class="text-caption">{{ appAuthor }} {{ appStartDate }}</p>
        </q-card-section>

        <q-card-actions>
          <!--
            <q-btn flat color="dark" label="Share" />
            <q-btn flat color="primary" label="Book" />
          -->

          <q-space />

          <q-btn
            color="white"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              <div class="basecontainer">
                <div class="logo1">
                  <img
                    class="img"
                    style="border-radius: 10px 0 0 10px;"
                    alt="Vue logo"
                    src="https://bamboo-net.de/tip-calc/img/vue-logo.png"
                  >
                </div>
                <div class="logo2">
                  <img
                    class="img"
                    style="border-radius: 0 10px 10px 0;"
                    alt="Quasar logo"
                    src="https://bamboo-net.de/tip-calc/img/quasar-logo-vertical.svg"
                  >
                </div>
                <div class="logo_link1">
                  <a href="https://v3.vuejs.org/" alt="Vue Homepage" title="Vue Homepage">Vue v{{ vueVersion }}</a>
                </div>
                <div class="logo_link2">
                  <a href="https://quasar.dev/" alt="Quasar Homepage" title="Quasar Homepage">Quasar v{{ $q.version }}</a>
                </div>
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import appPackage from '../../package.json';
const { version, description, productName, author, startDate } = appPackage;

export default defineComponent({
  name: 'PageIndex',

  i18n: {
    messages:{
      "en": {
        "pwa_desc": "A Progressive Web Application (PWA), running and installable on Win10, Linux, iOS and Android.",
        "app_desc": "Toolset to calculate the tip based on the total amount, people and tip-rate. Includes the Tip-Calc, a calculator and a currency converter.",
      },
      "de": {
        "pwa_desc": "Eine Progressive Web Applikation (PWA) für moderne Web-Browser und installierbar für die Offline-Nutzung auf Win10, Linux, iOS und Android.",
        "app_desc": "Ein Applikations-Set zur Berechnung von Trinkgeldern; inkl. einem simplen Rechner sowie Währungs-Umrechner.",
      }
    },
    sharedMessages:{
      "en": {
        "toggle_mode": "toggle dark/light mode",
      },
      "de": {
        "toggle_mode": "wechsel dunkel/hell Modus",
      }
    }
  },

  data() {

    return {
      appVersion: version,
      appDescription: description,
      appProductName: productName,
      appAuthor: author,
      appStartDate: startDate,
      expanded: false,
      vueVersion: '3.2.20',
    }
  },

  methods: {
  },
})
</script>



<style scoped lang="scss">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.imgcenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

a:link,a:active, a:visited {
	text-decoration: none;
  color: white;
}
a:hover {
  color: $info;
  text-decoration: underline;
}
a[href^="https"] {
  padding-right: 1em;
  background: url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2012%2012%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpolygon%20fill%3D%22blue%22%20points%3D%222%2C2%205%2C2%205%2C3%203%2C3%203%2C9%209%2C9%209%2C7%2010%2C7%2010%2C10%202%2C10%22/%3E%3Cpolygon%20points%3D%226.2%2C2%2010%2C2%2010%2C5.8%208.6%2C4.4%206.5%2C6.5%205.5%2C5.5%207.6%2C3.4%22/%3E%3C/svg%3E") no-repeat right;
  background-size: 12px auto;
  word-wrap: break-word;
}

.img {
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
  padding: 15px;
  background: white;
}
.logo1 {
  grid-area: logo1;
  justify-self: center;
}
.logo2 {
  grid-area: logo2;
  justify-self: center;
}
.logo_link1 {
  grid-area: logo_link1;
  justify-self: center;
}
.logo_link2 {
  grid-area: logo_link2;
  justify-self: center;
}
.basecontainer {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas:
      "logo1 logo2"
      "logo_link1 logo_link2";
}

</style>
