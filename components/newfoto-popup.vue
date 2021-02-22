<template>
  <div class="foto-popup-container">
    <img class="film" :src="('/img/popup/film-'+room+'.png').toLowerCase()" alt="film">
    <div class="roll-container">
      <img :src="('/img/popup/roll-'+room+'.png').toLowerCase()" alt="roll">
    </div>
    <div 
      v-swiper:mySwiper="swiperOptions"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <div v-for="(judul, idx) in juduls" :key="idx" class="swiper-slide" @mouseenter="enableOverlay($event)" @mouseleave="disableOverlay($event)">
          <div class="minposter-container">
            <img :src="poster_fotos[idx]" :alt="judul" @click="handleClick(judul)">
            <nuxt-link class="mini-overlay" :to="computeUrl(alamats[idx])" tag="div" :style="'background-color:'+color+';'">
              <div class="title">
                {{ judul }}
              </div>
              <div class="author">
                {{ authors[idx] }}
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
  export default {
    name: 'FotoPopUp',
    props: {
      tipeKarya: {
        type: String,
        default: undefined
      },
    },
    data () {
      return {
        room: "",
        color: "#d1bb10",
        juduls: [],
        poster_fotos: [],
        alamats: [],
        authors: [],
        swiperOptions: {
          slidesPerView: 4,
          direction: 'horizontal',
          mousewheel: true,
          freeMode: true,
          grabCursor: true,
          spaceBetween: 5
        }
      }
    },
    async mounted () {
      this.getRoom()
      await this.getData()
    },
    methods: {
      getRoom() {
        // GET THE ROOM NAME USING REGEX FROM THE URL
        const link = window.location.href
        this.room = link.match(
          /(Joy|Sad|Anger|Fear|joy|sad|anger|fear)/i
        )[0]
        if (this.room.toLowerCase() === 'sad'){
          this.room = 'sadness'
        }
      },
      async getData() {
        // GET THE FILM DATA FROM THE FIREBASE
        const testing = await this.$fire.firestore
          .collection("karya")
          .doc("routes")
          .collection(this.room.toLowerCase())
          .doc("foto")
          .get()
        const temp_path = (testing.data().routes || testing.data().route)
        temp_path.forEach(item => {
          if (item.route.includes(this.tipeKarya)){
            this.juduls.push(item.judul)
            this.poster_fotos.push(item.poster)
            this.alamats.push(item.route)
            this.authors.push(item.author)
          }
        })
      },
      computeUrl(alamat){
        if (alamat.charAt(0) === '/'){
          return '/karya/'+this.room+alamat
        } else {
          return '/karya/'+this.room+'/'+alamat
        }
      },
      enableOverlay(e){
        console.log(e)
        e.target.getElementsByClassName('mini-overlay')[0].classList.add('mini-overlay-hover')
      },
      disableOverlay(e){
        console.log(e)
        e.target.getElementsByClassName('mini-overlay')[0].classList.remove('mini-overlay-hover')
      }
    },
  }
</script>

<style lang="scss" scoped>
.blackbg-nav {
  background-color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 400vh;
  z-index: 1000;
  opacity: 0;
}

.foto-popup-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  font-family: 'KG Happy Solid';
}

.film {
  width: 105%;
}

.roll-container {
  position: absolute;
  top: 50%;
  left: -60px;
  transform: translate(-50%, -50%);
  height: 300px;
  z-index: 1005;
  img {
    height: 100%;
  }
}

.swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.swiper-wrapper{
  display: flex;
  align-items: center;
}

.swiper-slide {
  position: relative;

  width: 100px;
  height: 200px;
}

.minposter-container {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.mini-overlay {
  background-size: cover;
  transition: opacity 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1006;
  color: white;
  font-size: 14px;
  opacity: 0;
  .title, .author {
    z-index: 1007;
  }
  .title {
    margin-bottom: 15px;
  }
}
.mini-overlay.mini-overlay-hover {
  cursor: pointer;
  opacity: .9;
}
</style>