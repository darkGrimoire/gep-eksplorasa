<template>
  <div class="container">
    <div 
      v-swiper:mySwiper="swiperOptions"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <div id="slide1" class="swiper-slide" data-hash="slide1">
          <div class="slide-container">
            <zoom-photo v-if="!dbLoading" :poster="dataKarya.posterMin" 
                        :full="dataKarya.poster" 
                        :container-class="'poster-container'"
                        :poster-class="'poster-img'"
                        @onEnterFull="setButtonLayer(0)"
                        @onExitFull="setButtonLayer(10)"
            />
            <div class="caption-container no-swipe" @mousewheel.stop>
              <div class="title">
                {{ dataKarya.captionTitle }}
              </div>
              <p class="deskripsi">
                {{ dataKarya.caption }}
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
        <!-- <div id="slide3" class="swiper-slide narasi" data-hash="slide3">
          <div>jadi ini slide 3</div>
        </div> -->
      </div>
      <div slot="pagination" class="swiper-pagination" />
    </div>
    <nuxt-link class="back-button" :to="'/ruangan/'+emosi">
      Back
    </nuxt-link>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Youtube } from 'vue-youtube'
import ZoomPhoto from '~/components/ZoomPhoto.vue'
import loading from '~/components/Loading.vue'

  export default {
    name: 'TemplateVideo',
    components: {
      Youtube,
      ZoomPhoto,
      loading
    },
    async asyncData({ params }) {
      const id = params.id
      const emosi = params.emosi
      return { emosi, id }
    },
    data () {
      return {
        dataKarya: {
          judul: '',
          ph: '',
          caption: '',
          captionTitle: '',
          videoId: '',
          posterMin: '',
          poster: '',
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
      const karyaRef = this.$fire.firestore.collection('karya').doc('biasa').collection('video').doc(this.id)
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          this.dataKarya.judul = data.judul
          this.dataKarya.ph = data.ph
          this.dataKarya.caption = this.handleNewLines(data.caption)
          this.dataKarya.captionTitle = data.caption_title ? data.caption_title : ''
          this.dataKarya.videoId = data.videoId
          this.dataKarya.poster = data.poster
          this.dataKarya.posterMin = this.handleMin(data.poster)
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
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
      },
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n\n")
      },
      setButtonLayer(idx){
        document.getElementsByClassName('back-button')[0].style.zIndex = idx
        document.getElementsByClassName('swiper-pagination')[0].style.zIndex = idx
      },
      handleMin(text){
        let pos = text.lastIndexOf('/')+'/'.length
        return text.slice(0, pos) + 'min-' + text.slice(pos)
      }
    },
    head() {
      return {
        title: this.dataKarya.judul,
        meta: [
          {
            hid: 'description',
            name: 'description',
            description: 'Video "'+this.dataKarya.judul+'" oleh '+this.dataKarya.ph
          }
        ]
      }
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

.back-button {
  position: fixed;
  bottom: 2%;
  left: 2%;
  color: white;
  font-size: 50px;
  font-family: 'Mechanical Pencil';
  z-index: 1;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  @media only screen and (max-width: 800px) {
    left: 5%;
    bottom: 5%;
    opacity: 1;
  }
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
  font-family: 'Karla';
  text-align: left;
  color: white;
  margin: 0 5%;
  max-width: 40%;
  overflow-y: auto;
  max-height: 50vh;
  z-index: 100;
  .title {
    font-size: 44px;
  }
  .deskripsi {
    font-size: 16px;
    white-space: pre-line;
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

/* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
</style>