<template>
  <q-item
    clickable
    tag="a"

    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t(title) }}</q-item-label>
      <q-item-label caption>
        {{ $t(caption) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },

  i18n: {
    messages:{
      "en": {
        "Tip-Calc": "Tip-Calc",
        "Tip-Calculator": "Tip-Calculator",
        "Calc": "Calculator",
        "Calculator": "simple Calculator",
        "Currency": "Currency",
        "Currency_Converter": "Currency Converter",
        "Imprint": "Imprint",
        "Imprint_Contact": "Imprint & Contact",
        "Tip-Calc_Github": "Tip-Calc on Github",
        "Homebase": "Mainpage",
      },
      "de": {
        "Tip-Calc": "Tip-Calc",
        "Tip-Calculator": "Trinkgeld-Rechner",
        "Calc": "Rechner",
        "Calculator": "einfacher Rechner",
        "Currency": "Währung",
        "Currency_Converter": "Währungs-Umrechner",
        "Imprint": "Impressum",
        "Imprint_Contact": "Impressum & Kontakt",
        "Tip-Calc_Github": "Tip-Calc auf Github",
        "Homebase": "Hauptseite",
      }
    }
  },
})
</script>

