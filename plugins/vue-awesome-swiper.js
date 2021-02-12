import Vue from 'vue'
// Swiper 6.x
import { Swiper as SwiperClass, Mousewheel, Keyboard, Lazy, HashNavigation } from 'swiper/core'

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// Swiper modules
SwiperClass.use([Mousewheel, Keyboard, Lazy, HashNavigation])

// -------------------------------------------------

// Global use
Vue.use(getAwesomeSwiper(SwiperClass))