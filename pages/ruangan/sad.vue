<template>
  <div class="main">
    <div class="slide-controls">
      <fa v-show="slide === 2" :icon="['fas', 'chevron-left']" class="left-arrow arrow" @click="switchSlide(-1)" />
      <fa v-show="slide === 1" :icon="['fas', 'chevron-right']" class="right-arrow arrow" @click="switchSlide(1)" />
    </div>
    
    <div class="loading" style="position: absolute; background-color: black; opacity: 1; z-index: 9999; width: 100vw; height: 100vh;" />
    <div class="narasi narasi-masuk" style="display: none;">
      {{ msg.masuk }}
    </div>
    <div class="narasi narasi-keluar" style="display: none;">
      {{ msg.keluar }}
    </div>
    <div class="narasi narasi-closing" style="display: none;">
      {{ msg.closing }}
    </div>    

    <div id="slide0" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide0+'% '+sign+' '+Math.abs(computedDisplacement)+'px), -50%)'}" 
    >
      <div class="canvas">
        <div class="canvas canvas-hover" />
      </div>
    </div>
    
    <!-- SLIDE 1 -->
    <div id="slide1" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide1+'% '+sign+' '+Math.abs(computedDisplacement)+'px), -50%)'}" 
         @mousedown="startDrag($event)" 
         @mousemove="dragContainer($event)" 
         @mouseup="endDrag($event)"
         @mouseleave="endDrag($event)"
         @touchstart="startDrag($event)" 
         @touchmove="dragContainer($event)" 
         @touchend="endDrag($event)"
    >
      <div class="canvas">
        <div class="canvas canvas-hover">
          <div class="cont transitionfade-in" />
          <div v-show="!benda.lampu" class="cont darkness" />
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide-sad1.png" alt="guide" style="opacity: 0;">
          </div> -->
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/sad/bgsad.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/sad/lantaisad.png" alt="floor">
          </div>
          <div class="cont bed">
            <img src="/sad/bed3.png" alt="bed">
          </div>
          <div class="cont window">
            <img src="/sad/jendelagif.gif" alt="window">
          </div>
          <div v-show="!benda.lampu" class="cont meja-belajar">
            <img src="/sad/nightstand.png" alt="meja belajar" @click="benda.lampu = true">
          </div>
          <div v-show="benda.lampu" class="cont meja-belajar">
            <img src="/sad/nightstand3.png" alt="meja belajar" style="width: 96%;" @click="benda.lampu = false">
          </div>
          <div class="cont poster">
            <img src="/sad/psotersad.png" alt="poster">
          </div>
          <div class="book" @click="popups = 'foto';tipeKarya = 'buku'" />
          <div class="podcast" @click="popups = 'podcast'" />
          <div class="playlist" @click="popups = 'playlist'" />
          <div class="single" @click="popups = 'foto';tipeKarya = 'single'" />
          <div v-if="!isInstruksi1" class="instruksi instruksi1">
            <img :src="instruksiImg1" alt="instruksi" @click="fadeInstruksi('instruksi1')">
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 1" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 1" :tipe-karya="tipeKarya" class="foto-popup" />
          <PodcastPopup v-if="popups === 'podcast' && slide === 1" @closePopup="popups = ''" />
          <PlaylistPopup v-if="popups === 'playlist' && slide === 1" @closePopup="popups = ''" />
        </div>
      </div>
    </div>

    <!-- SLIDE 2 -->
    <div id="slide2" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide2+'% '+sign+' '+(Math.abs(computedDisplacement)-1)+'px), -50%)'}" 
         @mousedown="startDrag($event)" 
         @mousemove="dragContainer($event)" 
         @mouseup="endDrag($event)"
         @mouseleave="endDrag($event)"
         @touchstart="startDrag($event)" 
         @touchmove="dragContainer($event)" 
         @touchend="endDrag($event)"
    >
      <div class="canvas">
        <div class="canvas canvas-hover">
          <div class="cont transitionfade-out" />
          <div v-show="!benda.lampu" class="cont darkness" />
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide-sad2.png" alt="guide" style="opacity: 0;">
          </div> -->
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/sad/bgsad.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/sad/lantaisad.png" alt="floor">
          </div>
          <div class="lemari" />
          <div class="cont meja-pot">
            <img src="/sad/mejaa.png" alt="meja">
          </div>
          <div class="cont tv" @click="popups = 'tv'" />
          <div class="zine" @click="popups = 'kine';tipeKarya = 'buku'" />
          <div class="article" @click="popups = 'kine';tipeKarya = 'artikel'" />
          <div v-show="benda.key" class="foot" />
          <div class="key" @click="benda.key = true;slide=3" />
          <div class="teropong" @click="handleRasyid" />
          <div class="series" @click="popups = 'foto';tipeKarya = 'series'" />
          <div v-if="!isInstruksi2" class="instruksi instruksi2">
            <img :src="instruksiImg2" alt="instruksi" @click="fadeInstruksi('instruksi2')">
          </div>
          <div class="tv-popup">
            <TvPopup v-if="popups === 'tv' && slide === 2" @closePopup="popups = ''" />
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 2" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 2" :tipe-karya="tipeKarya" class="foto-popup" />
        </div>
      </div>
    </div>
    <div class="sound-controller" @click="changeMute()">
      SOUND
    </div>
    <rcp />
  </div>
</template>

<script>
// --- keterangan tiap class
// top-cont: tempat perhitungan rasio
// canvas: kalau mau ada tooltip, taro disini
// canvas-hover: kalau mau ada efek hover kaya di moooi, taro sini
  const SCALE = 2
  const NEXT_ROOM = '/ruangan/anger'
  const CLOSING = '/ruangan/closing'
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  import tvPopup from '~/components/tv-popup.vue'
  import kinePopup from "~/components/kine-popup.vue"
  import NewfotoPopup from '~/components/newfoto-popup.vue'
  import PodcastPopup from '~/components/podcast-popup.vue'
  import PlaylistPopup from '~/components/playlist-popup.vue'
  export default {
    name: "Sad",
    components: {
      rcp,
      tvPopup,
      kinePopup,
      NewfotoPopup,
      PodcastPopup,
      PlaylistPopup
    },
    layout: 'ruangan',
    data() {
      return {
        drag: false,
        mouseStart: {
          x: undefined,
          y: undefined // not used for now though
        },
        computedDisplacement: 0,
        transformed: 0,
        xBoundary: undefined,
        slide: 0,
        base: {
          slide0: -50,
          slide1: 50,
          slide2: 150
        },
        msg: {
          masuk: 'Rasa kecewa, serasa tak mampu, atau rasa kesepian mungkin bukan hal yang asing bagi kita. Meski sulit diakui rasa sedih sudah tak lagi menjadi perasaan yang asing.',
          keluar: 'Lelah rasanya bersedih. Apakah semua ini salahku?. Rasanya ini tak adil. Tidak bisa diam saja. Rasa tidak terima memuncak menjadi rasa kesal, perasaan marah muncul.',
          closings: [
            'Tapi hati-hati, jangan sampai sedih ini berlarut. Dunia masih berputar, hari besok masih ada.',
            'Ruang-ruang rasa telah dikunjungi. Tiap emosi telah dikenali. Rasa sudah dieksplorasi.  Melalui eksplorasi rasa ini tiap perasaan tertuangkan menjadi suatu bentuk karya. Rasa-rasa ini pastinya tidak asing, tapi selalu ada ruang untuk eksplorasi. Rasa dapat berkembang, berubah, dan dibentuk menjadi suatu yang indah. ',
            'Akhir kata, semoga melalui ini, perasaan yang biasa kamu lalui dapat menjadi temanmu untuk berkarya. Dan semoga perasaan marah kamu hari ini jangan sampai melukai orang-orang sekitarmu ya! (Terima kasih)'
          ],
          closing: ''
        },
        benda: {
          lampu: true,
          key:false
        },
        popups: '',
        tipeKarya: '',
        audio: undefined,
        isInstruksi1: false,
        isInstruksi2: true,
        instruksiImg1: '/instruksi/2.png',
        instruksiImg2: '/instruksi/3.png'
      }
    },
    computed: {
      sign() {
        return this.computedDisplacement >= 0 ? '+' : '-'
      }
    },
    watch: {
      slide(newVal, oldVal) {
        if (newVal === 2){
          gsap.to(this.base, {slide0: -250, slide1: -150, slide2: -50})
          this.isInstruksi2 = (localStorage.getItem('instruksi_3') || false)
          if (window.matchMedia("(orientation: portrait)").matches){
            this.instruksiImg2 = '/instruksi/3 hp.png'
          }
          if (!this.isInstruksi2){
            localStorage.setItem('instruksi_3', true)
          }
          if (oldVal > 2){
            gsap.to('.transitionfade-out', {x: '100%', duration: .5, delay: .2})
            gsap.to('.narasi', {opacity: 0, duration: .5})
          }
        } else if (newVal === 1){
          gsap.to(this.base, {slide0: -150, slide1: -50, slide2: 50})
          if (oldVal === 0)
            gsap.to('.transitionfade-in', {x: '-100%', duration: .7, delay: .2})
        } else if (newVal === 0){
          gsap.to(this.base, {slide0: -50, slide1: 50, slide2: 150})
          if (oldVal === 1)
            gsap.to('.transitionfade-in', {x: '0', duration: .7, delay: .2})
        } else {
          setTimeout(()=>{
            gsap.to(this.base, {duration: 3, ease: 'none' ,slide0: -350, slide1: -250, slide2: -150})
            gsap.to('.transitionfade-out', {x: '40%', duration: .7})
            gsap.to('.transitionfade-out', {x: '0', duration: 1.3, ease: 'none', delay: .7})
            if (this.isClosingVisited()){
              this.$router.push({path: CLOSING})
            }
            if (this.isAllRoomVisited()){
              // animasi closing
              document.getElementsByClassName('narasi-closing')[0].style.display = 'block'
              this.msg.closing = this.msg.closings[0]
              gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 2})
              gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 7, onComplete: () =>{
                this.msg.closing = this.msg.closings[1]
              }})
              gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 7.5})
              gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 14.5, onComplete: () => {
                this.msg.closing = this.msg.closings[2]
              }})
              gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 15})
              gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 20, onComplete: () => {
                this.$router.push({path: CLOSING})
              }})
            } else {
              // animasi keluar
              document.getElementsByClassName('narasi-keluar')[0].style.display = 'block'
              gsap.to('.narasi-keluar', {opacity: 1, duration: 2, delay: 2})
              document.getElementsByClassName('loading')[0].style.display = 'block'
              gsap.to('.loading', {opacity: 1, duration: 1, delay: 7, onComplete: () => {
                this.$router.push({path: NEXT_ROOM})
              }})
            } 
          },2100)
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
      this.audio.pause()
      this.audio.currentTime = 0
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard

      // wait for loading to finish
      //animasi masuk
      if (this.isAllRoomVisited() || this.isRoomVisited()){
        gsap.to('.loading', {opacity: 0, delay: 1, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          // TODO: Add on enter animation here
          localStorage.setItem('sad', true)
          this.slide = 1
        }})
      } else {
        document.getElementsByClassName('narasi-masuk')[0].style.display = 'block'
        gsap.to('.narasi-masuk', {opacity: 1,  duration: .5})
        gsap.to('.narasi-masuk', {opacity: 0, delay: 3, duration: .5})
        gsap.to('.loading', {opacity: 0, delay: 3, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          document.getElementsByClassName('narasi-masuk')[0].style.display = 'none'
          localStorage.setItem('sad', true)
          // TODO: Add on enter animation here
          this.slide = 1
        }})
      }
      setTimeout(() => {
        this.preloadImages()
      }, 1000)
      localStorage.setItem('last', this.$route.path)
      this.audio = new Audio('/songs/sad.mp3')
      this.audio.volume = 0.7
      try {
        this.audio.play()
      } catch (error) {
        this.changeMute()
      }
      this.isInstruksi1 = (localStorage.getItem('instruksi_2') || false)
      if (window.matchMedia("(orientation: portrait)").matches){
        this.instruksiImg1 = '/instruksi/2 hp.png'
      }
      if (!this.isInstruksi1){
        localStorage.setItem('instruksi_2', true)
      }
    },
    methods: {
      fadeInstruksi(classname){
        gsap.to('.'+classname, {opacity: 0, duration: 1, onComplete: () => {
          document.getElementsByClassName(classname)[0].style.display = 'none'
        }})
      },
      switchSlide(val){
        this.slide += val
        gsap.to(this.$data, {computedDisplacement: 0, transformed: 0})
      },
      preloadImages(){
        new Image().src = '/sad/lemaribfr.png'
        new Image().src = '/sad/tropong sad.png'
        new Image().src = '/sad/keysad.png'
        new Image().src = '/sad/s-artikel-2.png'
        new Image().src = '/sad/s-zine-2.png'
        new Image().src = '/sad/s-single-2.png'
        new Image().src = '/sad/s-photobook-2.png'
        new Image().src = '/sad/s-podcast-2.png'
      },
      handleRasyid(){
        localStorage.setItem('before_instalasi', this.$route.path)
        this.$router.push({path: '/karya/instalasi/bandung'})
      },
      goToEmosi(str){
        this.$router.push({path: "/ruangan/" + str})
      },
      isAllRoomVisited(){
        return localStorage.getItem('joy') && localStorage.getItem('fear') && localStorage.getItem('sad') && localStorage.getItem('anger')
      },
      isRoomVisited(){
        return localStorage.getItem('sad')
      },
      isClosingVisited(){
        return localStorage.getItem('closing')
      },
      startDrag(e) {
        if (window.matchMedia("(orientation: portrait)").matches){
          // enable dragging and keep mouseStart point
          let interaction = this.determineInteraction(e)
          this.drag = true
          this.mouseStart.x = interaction.clientX
          this.mouseStart.y = interaction.clientY
        }
      },
      dragContainer(e){
        // if dragging, calculate target position and tween to that position
        if (this.drag){
          let interaction = this.determineInteraction(e)
          let targetDisplacement = this.clamp(interaction.clientX - this.mouseStart.x + this.transformed, this.xBoundary/(2*SCALE), -this.xBoundary/(2*SCALE))
          gsap.to(this.$data, {computedDisplacement: targetDisplacement})
        }
      },
      endDrag(e){
        // if mouse click released or out of window while dragging, disable dragging,
        // calculate target end position and tween, keep last transformation position, and delete mouseStart (optional)
        if (this.drag){
          let interaction = this.determineInteraction(e)
          this.drag = false
          let targetDisplacement = this.clamp(interaction.clientX - this.mouseStart.x + this.transformed, this.xBoundary/(2*SCALE), -this.xBoundary/(2*SCALE))
          this.transformed = targetDisplacement
          gsap.to(this.$data, {computedDisplacement: targetDisplacement})
          this.mouseStart.x = undefined
          this.mouseStart.y = undefined
        }
      },
      clamp(attribute, max, min){
        return Math.min(max, Math.max(min, attribute))
      },
      determineInteraction(e){
        let interaction = e
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
            interaction = evt.touches[0] || evt.changedTouches[0]
        }
        return interaction
      },
      handleResize(){
        if (document.getElementsByClassName("top-cont")[0]){
          this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
          if (window.matchMedia("(orientation: landscape)").matches){
            this.computedDisplacement = 0
            this.transformed = 0
          }
        }
      },
      handleKeyboard(e){
        // DEBUGGING PURPOSE
        // if (this.slide === 2 && e.key === "ArrowRight"){
        //   this.switchSlide(1)
        // }



        if (this.slide === 2 && e.key === "ArrowLeft"){
          this.switchSlide(-1)
        } else if (this.slide === 1 && e.key === "ArrowRight"){
          this.switchSlide(1)
        }
      },
      changeMute() {
      this.audio.muted = !this.audio.muted
      if (this.audio.muted == true) {
        document.getElementsByClassName(
          "sound-controller"
        )[0].style.textDecoration = "line-through"
      } else {
        document.getElementsByClassName(
          "sound-controller"
        )[0].style.textDecoration = "none"
      }
    }
    },
  }
</script>

<style lang="scss" scoped>
.main {
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.top-cont {
  background-color: black;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 56.25%;
  @media only screen and (orientation: portrait) {
    width: 225%;
    padding-bottom: 126.5625%;
  }
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .arrow {
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 100px;
    color: rgba($color: white, $alpha: 0.2);
    transition: color 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      color: rgba($color: white, $alpha: 0.8);
    }
    &:active {
      color: rgba($color: white, $alpha: 1.0);
    }
    @media only screen and (max-width: 600px) {
      font-size: 70px;
    }
    @media only screen and (max-width: 450px) {
      font-size: 50px;
    }
  }
  .right-arrow {
    right: 20px;
  }
  .left-arrow {
    left: 20px;
  }
}

.narasi {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 80vw;
  transform: translate(-50%,0);
  z-index: 99;
  font-family: 'Mechanical Pencil';
  font-size: 50px;
  color: rgba($color: white, $alpha: .9);
  // background-image: linear-gradient(to right, rgba($color: white, $alpha: .1), transparent);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent; 
  // -moz-background-clip: text;
  // -moz-text-fill-color: transparent;
  opacity: 0;
  text-align: center;
}

.narasi-masuk {
  z-index: 10000;
  color: #305fe9;
}

.narasi-closing {
  font-size: 40px;
  z-index: 10000;
  color: #ede5d1;
}

.narasi-keluar {
  font-size: 40px;
  color: #e14423;
}

.cont {
  position: absolute;
  line-height: 0;
  user-select: none;
  img {
    line-height: 0;
    width: 100%;
  }
}

.guide {
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 50;
}

.transitionfade-in {
  background: linear-gradient(to right, black, black, transparent);
  width: 60vw;
  height: 200vh;
  top: -50%;
  left: -5%;
  z-index: 999;
}

.transitionfade-out {
  background: linear-gradient(to left, black, black, transparent);
  width: 60vw;
  height: 200vh;
  z-index: 999;
  top: -50%;
  right: 0;
  transform: translate(100%, 0);
}


.center-anchor {
  transform: translate(-50%,-50%);
}

// Add Objects positions here
.bed {
  width: 42%;
  top: 26.1%;
  left: 29%;
}

.window {
  width: 26%;
  top: 26%;
  left: 3.2%;
}

.meja-belajar {
  width: 30%;
  top: 33.5%;
  left: 69.7%;
  z-index: 71;
  &:hover{
    cursor: pointer;
  }
}

.poster {
  width: 29%;
  top: -2%;
  left: 35.5%;
}

.wall {
  width: 100%;
  top: -61%;
  left: 0;
}

.floor {
  width: 100%;
  top: 77%;
  left: 0;
}

.podcast{
  background-image:url("/sad/s-podcast-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:10%;
  height:10%;
  top:67.5%;
  left:40%;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
  cursor:pointer;  
}

.podcast:hover{
  background-image:url("/sad/s-podcast-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:9.1%;
  height:13%;
  top:65.9%;
  left:40.3%;
  animation:none;  
}

.book{
  background-image:url("/sad/s-photobook-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:18%;
  height:10%;
  top:80%;
  left:7%;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
  cursor:pointer;  
}


.book:hover{
  background-image:url("/sad/s-photobook-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:18%;
  height:18%;
  top:73.7%;
  left:6.9%;
  animation:none;
}

.single{
  background-image:url("/sad/s-single-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:5%;
  height:9%;
  top:51%;
  left:76%;
  z-index:71;
  cursor:pointer;  
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.single:hover{
  background-image:url("/sad/s-single-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:5%;
  height:9%;
  top:51.2%;
  left:76%;
  z-index:71;
  cursor:pointer;  
  animation:none;
}

.zine{
  background-image:url("/sad/s-zine-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:15%;
  height:15%;
  top:38.7%;
  left:39%;
  cursor:pointer;  
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.zine:hover{
  background-image:url("/sad/s-zine-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:15%;
  height:20%;
  top:34%;
  left:38.8%;
  animation:none;
}

.article{
  background-image:url("/sad/s-artikel-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:14%;
  height:14%;
  top:78%;
  left:39%;
  cursor:pointer;  
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.article:hover{
  background-image:url("/sad/s-artikel-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:14%;
  height:18%;
  top:73%;
  left:38.8%;
  animation:none;
}


.foot{
  background-image:url("/sad/sadf.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:10%;
  height:10%;
  top:81%;
  left:87%;  
}

.key{
  background-image:url("/sad/keysad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:7%;
  height:10%;
  top:81%;
  left:80%;    
  cursor:pointer;
  z-index: 15001;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.key:hover{
  background-image:url("/sad/keysad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:7%;
  height:10%;
  top:81%;
  left:80%;    
  cursor:pointer;
  animation:none;
}

.teropong{
  background-image:url("/sad/tropong sad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:15%;
  height:10%;
  top:81%;
  left:60%;    
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.teropong:hover{
  background-image:url("/sad/tropong sad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:15%;
  height:10%;
  top:81%;
  left:60%;    
  cursor:pointer;
  animation:none;
}

.lemari {
  background-image:url("/sad/lemari3.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 31.2%;
  height:81.2%;
  top: 12.7%;
  left: 2.9%;
}

.lemari:hover{
  background-image:url("/sad/lemaribfr.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 30%;
  height:80%;
  top: 13%;
  left: 3%;  
}

.tv {
  background-image:url("/sad/tv.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 60%;
  height: 60%;
  top: 30.5%;
  left: 67.9%;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
  cursor: pointer;
  &:hover {
    background-image:url("/sad/hover tv s.png");
    cursor: pointer;
    animation:none;
    left: 70.9%;
    width: 56%;
  }
}

.meja-pot {
  width: 40%;
  top: 22.1%;
  left: 31%;
}

.darkness {
  background-color: black;
  opacity: .8;
  z-index: 70;
  width: 150%;
  height: 200%;
  top: -50%;
}

.bounce-7 {
  animation-name: bounce-7;
  animation-timing-function: cubic-bezier(0.140, 0.420, 0.210, 0.5, 1);
}
@keyframes bounce-7 {
  0%   { transform: scale(1,1)      translateY(0); }
  5%  { transform: scale(1.1,.9)   translateY(0); }
  15%  { transform: scale(.9,1.1)   translateY(-10px); }
  25%  { transform: scale(1.05,.95) translateY(0); }
  28.5%  { transform: scale(1,1)      translateY(-7px); }
  32%  { transform: scale(1,1)      translateY(0); }
  50% { transform: scale(1,1)      translateY(0); }
  100% { transform:scale(1,1) translateY(0);}
}


.longfoot{
  background-image:url("/sad/a220.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 100%;
  height:15%;
  top: 70%;
}
.tv-popup {
  position: absolute;
  top: 4%;
  left: 0;
  height: 150vh;
}
.foto-popup {
  z-index: 71;
}

.sound-controller {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "KG Happy Solid";
  font-size: 40px;
  color: whitesmoke;
  opacity: 0.2;
  transition: opacity .4s;
}
.sound-controller:hover {
  cursor: pointer;
  opacity: 0.8;
}
.instruksi {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 300vh;
  background-color: rgba($color: black, $alpha: .9);
  z-index: 15000;
  img {
    width: 100%;
    height: 100%;
    transform: scale(0.4);
    object-fit: contain;
  }
}

.series{
  background-image:url("/sad/series-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:75%;
  height:22%;
  top:15%;
  left:67%;
  z-index:71;
  cursor:pointer;  
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.series:hover{
  background-image:url("/sad/series-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:75%;
  height:22%;
  top:15%;
  left:67%;
  z-index:71;
  cursor:pointer;  
  animation:none;
}

.playlist{
  background-image:url("/sad/playlist-sad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:75%;
  height:17%;
  top:58%;
  left:57%;
  cursor:pointer;  
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.playlist:hover{
  background-image:url("/sad/playlist-sad.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:75%;
  height:17%;
  top:58%;
  left:57%;
  z-index:71;
  cursor:pointer;  
  animation:none;
}
</style>