import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Toaster from '@meforma/vue-toaster';

loadFonts()

createApp(App)
  .use(router)
  .use(Toaster)
  .component('Datepicker', Datepicker)
  .use(vuetify)
  .mount('#app')
