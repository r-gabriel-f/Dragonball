import './assets/main.css';
import 'primeicons/primeicons.css';
import App from "./App.vue";
import router from './router';
import PrimeVue from "primevue/config";
import Wind from './presets/wind';
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import { PrimeVitals } from './prime.vitals';
import prime from './prime';
const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind,
});
app.use(PrimeVitals);
app.use(prime);
app.mount("#app");
