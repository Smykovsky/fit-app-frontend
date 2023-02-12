import Vue from 'vue'
import {library, config} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(fas, faEnvelope)

Vue.component('font-awesome-icon', FontAwesomeIcon)
