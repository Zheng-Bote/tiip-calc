<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img
          alt="Tip-Calc logo"
          src="https://bamboo-net.de/tip-calc/icons/favicon-96x96.png"
          style="width: 30px; height: 30px;"
          title="Hauptseite"
          @click="goTo('https://bamboo-net.de/tip-calc')"
        />
        <q-btn
          class="desktop-only"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Tip-Calc Tool
        </q-toolbar-title>

        <q-icon
          v-if="!isOnline"
          name="cloud_off"
          class="q-px-sm"
          color="red"
          title="offline"
        />
        <q-icon
          v-else
          name="cloud_on"
          class="q-px-sm"
          color="green"
          title="online"
        />

        <q-btn
          v-if="$i18n.locale === 'en'"
          flat
          dense
          round
          icon="img:https://bamboo-net.de/tip-calc/img/de_flag.svg"
          aria-label="lang"
          @click="setLocale()"
          title="zu Deutsch wechseln"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="img:https://bamboo-net.de/tip-calc/img/gb_flag.svg"
          aria-label="lang"
          @click="setLocale()"
          title="change to English"
        />
        &nbsp;

        <q-btn
          v-if="$i18n.locale === 'en'"
          flat
          dense
          round
          icon="settings_brightness"
          aria-label="Mode"
          @click="toggleMode"
          title="toggle dark/light mode"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="settings_brightness"
          aria-label="Mode"
          @click="toggleMode"
          title="wechsel dunkel/hell Modus"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list>
        <!-- <q-item-label v-if="!miniState"
          header
        >
          Essential Links
        </q-item-label> -->

        <p><br/><br/></p>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated height-hint="15">

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-banner
          inline-actions
          class="bg-blue-3 text-white"
          dense
          v-if="showAppInstallBanner"
        >
          <template v-slot:avatar>
            <q-avatar
              color="white"
              text-color="grey-10"
              icon="phonelink_setup"
              font-size="22px"
            />
          </template>
          Install Tip-Calc?
          <template v-slot:action>
            <q-btn
              flat
              label="Yes"
              dense
              class="q-px-sm"
              @click="installApp"
            />
            <q-btn
              flat
              label="Later"
              dense
              class="q-px-sm"
              @click="showAppInstallBanner = false"
            />
            <q-btn
              flat
              label="Never"
              dense
              class="q-px-sm"
              @click="neverShowAppInstallBanner"
            />
          </template>
        </q-banner>
      </transition>

      <q-tabs dense switch-indicator class="mobile-only">
        <q-route-tab
          flat
          dense
          round
          title="Tip-Calculator"
          to="/tipcalc"
        >

        <q-img
          alt="Tip-Calc logo"
          src="https://bamboo-net.de/tip-calc/icons/favicon-96x96.png"
          style="width: 25px; height: 25px;"
        />
        </q-route-tab>

        <q-separator vertical inset />

        <q-route-tab
          flat
          dense
          round
          icon="calculate"
          to="/calc"
        />

        <q-separator vertical inset />

        <q-route-tab
          flat
          dense
          round
          icon="paid"
          to="/currency"
        />

      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import Locales from '../services/Locales.js';

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

const linksList = [
  {
    title: 'Tip-Calc',
    caption: 'Tip-Calculator',
    icon: 'img:https://bamboo-net.de/tip-calc/icons/favicon-96x96.png',
    link: '#/tipcalc'
  },
  {
    title: 'Calc',
    caption: 'Calculator',
    icon: 'calculate',
    link: '#/calc'
  },
  {
    title: 'Currency',
    caption: 'Currency_Converter',
    icon: 'paid',
    link: '#/currency'
  },
  {
    title: 'Imprint',
    caption: 'Imprint_Contact',
    icon: 'local_police',
    link: '#/impressum'
  },
  {
    title: 'Github',
    caption: 'Tip-Calc_Github',
    icon: 'code',
    link: 'https://github.com/Zheng-Bote/tip-calc/'
  },
  {
    title: 'Homepage',
    caption: 'Homebase',
    icon: 'foundation',
    link: 'https://bamboo-net.de/'
  },
];


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  created() {
      const lang = this.getLocale();
      (lang === 'de') ? this.$i18n.locale = 'de' : this.$i18n.locale = 'en';
  },

  methods: {
    goTo(val) {
      window.location.assign(val);
    },
    installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false;
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if(choiceResult.outcome === 'accepted') {
          this.showAppInstallBanner = false;
        } else {
          console.info('User dismiss install');
        }
      });
     },
     neverShowAppInstallBanner() {
       this.showAppInstallBanner = false;
       this.$q.localStorage.set('neverShowAppInstallBanner', true);
     },
     updateOnlineStatus() {
       navigator.onLine ? this.isOnline = true : this.isOnline = false;
     },
    getLocale() {
      const myLocale = new Locales();
      return myLocale.getLocale();
    },
    setLocale() {
      (this.$i18n.locale === 'en') ? this.$i18n.locale = 'de' : this.$i18n.locale = 'en';
    },
  },
  data () {
    const leftDrawerOpen = ref(false)
    const miniState = ref(true)
    const $q = useQuasar()

    return {

      essentialLinks: linksList,
      leftDrawerOpen,miniState,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
        miniState.value =  !miniState.value
      },
      toggleMode() {
        $q.dark.toggle()
      },
      showAppInstallBanner: false,
      isOnline: false,
    }
  },

  mounted() {
    this.updateOnlineStatus();
    let neverShowAppInstallBanner = this.$q.localStorage.getItem('neverShowAppInstallBanner');

    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

    if(!neverShowAppInstallBanner) {
      // https://web.dev/customize-install/
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true;
        }, 3000);
      });
    }
  }
})
</script>

<style scoped>
main {
  padding: 10px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
