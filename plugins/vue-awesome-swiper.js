import Vue from 'vue'
// Swiper 6.x
import { Swiper as SwiperClass, Pagination ,Mousewheel, Keyboard, Lazy, HashNavigation, Scrollbar } from 'swiper/core'

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

// Swiper modules
SwiperClass.use([Pagination, Mousewheel, Keyboard, Lazy, HashNavigation, Scrollbar])

// -------------------------------------------------

// Global use
Vue.use(getAwesomeSwiper(SwiperClass))