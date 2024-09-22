import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlay,
  faPause,
  faStop,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons'

const vuetify = createVuetify({
  components,
  directives,
})

library.add(
  faPlay,
  faPause,
  faStop,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
  faBackwardStep,
  faForwardStep
)

const app = createApp(App)

app.use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
