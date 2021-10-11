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
          <p>v{{ appVersion }}</p>
          <p>{{ appDescription }}</p>
          <p>{{ appAuthor }} {{ appStartDate }}</p>
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
               <img
                alt="Quasar logo"
                src="~assets/quasar-logo-vertical.svg"
                style="max-width: 150px; max-height: 150px; background: white;padding:25px; border-radius: 10px;"
                class="imgcenter"
              >
              <p
                style="text-align:center;">
                <a href="https://quasar.dev/" alt="Quasar Homepage" title="Quasar Homepage">Quasar v{{ $q.version }}</a>
              </p>
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
  data() {
    return {
      appVersion: version,
      appDescription: description,
      appProductName: productName,
      appAuthor: author,
      appStartDate: startDate,
      expanded: false,
    }
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
  width: 48%;
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

</style>
