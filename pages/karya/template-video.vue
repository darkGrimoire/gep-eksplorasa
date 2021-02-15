<template>
  <div class="container">
    <div 
      v-swiper:mySwiper="swiperOptions"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <!-- TODO: SLIDE 1 -->
        <div id="slide1" class="swiper-slide" data-hash="slide1">
          <div class="slide-container">
            <zoom-photo v-if="!dbLoading" :poster="dataKarya.posterMin" 
                        :full="dataKarya.poster" 
                        :container-class="'poster-container'"
                        :poster-class="'poster-img'"
            />
            <div class="caption-container no-swipe" @mousewheel.stop>
              <div class="title">
                Sinopsis:
              </div>
              <p class="deskripsi">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt sem non blandit porta. Praesent imperdiet diam at orci mollis lacinia. Aliquam vestibulum est quis mauris auctor pulvinar. Aenean ut est luctus, viverra neque sed, rhoncus purus. Donec sed erat eu ante eleifend venenatis. Integer dapibus finibus est sit amet ultrices. Proin non sem dui. Nullam viverra urna sapien, et tincidunt leo viverra a. Sed vehicula massa non cursus tristique. Morbi sed ultrices velit, ac vestibulum purus. Maecenas id libero ac felis consequat dictum at ut nunc. Quisque sit amet lorem sed urna sagittis condimentum.
                <br><br>
                Aliquam eget justo massa. Integer non risus ultricies, pellentesque quam in, consequat leo. Ut id finibus ipsum, nec laoreet turpis. Suspendisse sed mi dictum, porta risus tempus, tempor massa. Nulla facilisi. Integer tristique eros sed neque dapibus dictum. Fusce ultricies velit nec sollicitudin posuere. Cras mattis tellus at blandit porta. Pellentesque orci leo, semper vitae tincidunt a, gravida eget mi. Maecenas justo neque, aliquet eget nisl ut, dictum tincidunt velit. Praesent a neque ut mi pellentesque imperdiet. Phasellus dapibus justo elementum, porttitor elit eu, gravida nisl. Vestibulum sit amet efficitur dolor. Ut mollis ornare arcu quis pharetra. Quisque neque purus, posuere ut dapibus non, cursus vel lacus.
                <br><br>  
                Nam elementum tempus quam, sed dapibus dolor efficitur sed. Duis tempor hendrerit urna, eu sagittis tortor porttitor nec. Aenean consequat nisi sit amet augue aliquet elementum. Ut et ligula massa. Mauris condimentum dolor quis sem efficitur tincidunt. Sed gravida congue nunc ut efficitur. Etiam quis lacinia magna. Nullam magna nulla, lobortis a eros sed, pulvinar auctor purus. Donec non facilisis velit. Mauris diam lacus, maximus ac magna ut, laoreet semper elit. Proin non enim diam. Sed aliquam ex turpis, ultrices bibendum nisl maximus vel. Integer eu egestas lacus.
              </p>
            </div>
          </div>
        </div>
        <!-- SLIDE 2 -->
        <div id="slide2" class="swiper-slide narasi" data-hash="slide2">
          <div class="video-wrapper">
            <div v-if="videoLoading" class="loading-wrapper">
              <Loading />
            </div>
            <youtube v-if="!dbLoading" ref="youtube" :resize-delay="0" :resize="true" :fit-parent="true" :video-id="dataKarya.videoId" :player-vars="playerVars" @ended="restart" @ready="onPlayerReady" />
          </div>
        </div>
        <!-- TODO: SLIDE 3 -->
        <!-- Kalo ada deskripsi dan still image lain. Kalo gaada hapus aja -->
        <div id="slide3" class="swiper-slide narasi" data-hash="slide3">
          <div>jadi ini slide 3</div>
        </div>
      </div>
      <div slot="pagination" class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Youtube } from 'vue-youtube'
import ZoomPhoto from '~/components/ZoomPhoto.vue'
import loading from '~/components/Loading.vue'

// TODO: Masukin yang sesuai
const JUDUL_KARYA = '---JUDUL KARYA---'
const PH = '---NAMA PH---'
const EMOSI = 'anger'
const JENIS = 'video'
const ID = 'testing'

  export default {
    name: 'TemplateVideo',
    components: {
      Youtube,
      ZoomPhoto,
      loading
    },
    data () {
      return {
        // TODO: Masukin data 
        dataKarya: {
          judul: JUDUL_KARYA,
          videoId: '',
          posterMin: '',
          poster: '',
          ph: PH
        }, 
        swiperOptions: {
          slidesPerView: 1,
          speed: 1500,
          mousewheel: true,
          centeredSlides: true,
          direction: 'vertical',
          keyboard: {
            enabled: true,
          },
          pagination: {
            clickable: true, 
            el: '.swiper-pagination',
            type: 'bullets'
          },
          noSwiping: true,
          noSwipingClass: 'no-swipe'
        },
        playerVars: {
        autoplay: 0,
        rel: 0
        },
        videoLoading: true,
        dbLoading: true
      }
    },
    computed: {
      player() {
        return this.$refs.youtube.player
      }
    },
    mounted () {
      const karyaRef = this.$fire.firestore.collection('karya').doc(EMOSI).collection(JENIS).doc(ID)
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          this.dataKarya.videoId = data.videoId
          this.dataKarya.poster = data.poster
          this.dataKarya.posterMin = data.posterMin
          this.dbLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      restart(){
        this.player.cueVideoById(this.dataKarya.videoId)
      },
      onPlayerReady(){
        this.videoLoading = false
      }
    },
    head: {
      title: JUDUL_KARYA,
      description: 'Video "'+JUDUL_KARYA+'" oleh '+PH
    }
  }
</script>

<style lang="scss" scoped>

.container {
  background-image: url('/img/uc-bg.png');
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}

.swiper {
  height: 100vh;
  width: 100vw;
}

.swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.swiper-slide.swiper-slide-active {
  opacity: 1;
  transition: opacity 1.5s;
}

.swiper-pagination {
  margin-right: 2%;
}

::v-deep .swiper-pagination-bullet {
  background-color: rgba($color: white, $alpha: .6);
  width: 16px;
  height: 16px;
}

::v-deep .swiper-pagination-bullet-active {
  background-color: rgba($color: white, $alpha: .9);
}

.black {
  background-color: black;
}

::v-deep .poster-container {
    width: 30%;
    margin-left: 5%;
    @media only screen and (max-width: 800px) {
      width: 45%;
      margin: 2% 0;
    }
  }

.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
}

.caption-container {
  font-family: 'Alte Haas Grotesk';
  text-align: left;
  color: white;
  margin: 0 5%;
  max-width: 40%;
  overflow-y: scroll;
  max-height: 50vh;
  z-index: 100;
  .title {
    font-size: 44px;
  }
  .deskripsi {
    font-size: 16px;
  }
  @media only screen and (max-width: 800px) {
    max-height: 35vh;
    min-width: 60vw;

    .title {
      font-size: 30px;
    }
    .deskripsi {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 600px) {
    .title {
      font-size: 24px;
    }
    .deskripsi {
      font-size: 12px;
    }
  }
}

.loading-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
}
.video-wrapper {
  width: 852px;
  height: 480px;
  @media only screen and (max-width: 800px) {
    width: 605px;
    height: 340px;
  }
  @media only screen and (max-width: 600px) {
    width: 355px;
    height: 200px;
  }
  @media only screen and (max-width: 450px) {
    width: 285px;
    height: 160px;
  }
}
</style>