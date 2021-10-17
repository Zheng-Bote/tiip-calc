import { createI18n } from "vue-i18n";
import messages from "src/i18n/i18n_global";

const i18n = createI18n({
  locale: "en",
  messages
});


export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
};

export { i18n };
