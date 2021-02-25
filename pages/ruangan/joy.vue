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
    <!-- <div v-if="slide === 0" class="foot-in">
      <img src="/gif/j220.gif" alt="footstep">
    </div> -->
    
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
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide1.png" alt="guide" style="opacity: 0;">
          </div> -->
          <div class="cont sky">
            <img src="/joy/sky 1.png" alt="sky">
          </div>
          <div class="cont pagar1">
            <img src="/joy/pager1 1.png" alt="pagar">
          </div>
          <div class="cont rumput">
            <img src="/joy/rumput 1.png" alt="rumput">
          </div>
          <div class="cont bunga">
            <img src="/joy/bunga 1.png" alt="bunga">
          </div>
          <div class="cont semak1">
            <img src="/joy/semak1 1.png" alt="semak">
          </div>
          <div class="cont semak2">
            <img src="/joy/semak2 1.png" alt="semak">
          </div>
          <div class="cont karpet">
            <img src="/joy/karpet 1.png" alt="karpet">
          </div>
          <div class="tv" @click="popups = 'tv'" />
          <div class="cont pohon">
            <img src="/joy/pohon 1.png" alt="pohon">
          </div>
          <div class="cont lemon">
            <img src="/joy/lemon.png" alt="pohon">
          </div>
          <div class="teddy" />
          <div class="bbq" />
          <div class="playlist" @click="popups = 'playlist'" />
          <div class="ig" @click="popups = 'kine';tipeKarya = 'instagram'" />
          <div class="photobook" @click="popups = 'foto';tipeKarya = 'buku'" />
          <div class="zine" @click="popups = 'kine';tipeKarya = 'buku'" />
          <div v-if="!isInstruksi1" class="instruksi instruksi1">
            <img :src="instruksiImg1" alt="instruksi" @click="fadeInstruksi('instruksi1')">
          </div>
          <div class="tv-popup">
            <TvPopup v-if="popups === 'tv' && slide === 1" @closePopup="popups = ''" />
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 1" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 1" :tipe-karya="tipeKarya" class="foto-popup" />
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
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide2.png" alt="guide" style="opacity: 0;">
          </div> -->
          <div class="cont sky">
            <img src="/joy/sky 1.png" alt="sky">
          </div>
          <div class="cont matahari">
            <img src="/joy/sun 1.png" alt="matahari">
          </div>
          <div class="cont pagar">
            <img src="/joy/pager2 1.png" alt="pagar">
          </div>
          <div class="cont rumput">
            <img src="/joy/rumput 1.png" alt="rumput">
          </div>
          <div class="cont bunga2">
            <img src="/joy/bunga2 1.png" alt="bunga">
          </div>
          <div class="cont tanaman">
            <img src="/joy/taneman 1.png" alt="tanaman">
          </div>
          <div class="cont pasir">
            <img src="/joy/pasir 1.png" alt="pasir">
          </div>
          <div class="bounce single" @click="popups = 'foto';tipeKarya = 'single'" />
          <div class="bounce bola" />
          <div class="bounce teropong" @click="handleRasyid" />
          <div class="bounce keranjang" />
          <div class="bounce artikel" @click="popups = 'kine';tipeKarya = 'artikel'" />
          <div class="bounce kamera" @click="popups = 'foto';tipeKarya = 'series'" />
          <div class="bounce kunci" @click="benda.kunci = true; resetGif(); slide=3" />
          <div v-show="benda.kunci" class="foot" />
          <!-- <div v-show="benda.kunci" class="foot-out">
            <img id="foot-out" src="/gif/f220.gif" alt="footstep">
          </div> -->
          <div v-if="!isInstruksi2" class="instruksi instruksi2">
            <img :src="instruksiImg2" alt="instruksi" @click="fadeInstruksi('instruksi2')">
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
  const NEXT_ROOM = '/ruangan/fear'
  const CLOSING = '/ruangan/closing'
  import gsap from 'gsap'
  import tvPopup from '~/components/tv-popup.vue'
  import kinePopup from "~/components/kine-popup.vue"
  import NewfotoPopup from '~/components/newfoto-popup.vue'
  import PlaylistPopup from '~/components/playlist-popup.vue'
  import rcp from '~/components/rcp.vue'
  export default {
    name: "Joy",
    components: {
      rcp,
      tvPopup,
      kinePopup,
      NewfotoPopup,
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
          masuk: 'Ngobrol bersama teman, kumpul bareng keluarga, atau hanya menghabiskan waktu dengan diri sendiri. Rasa senang bisa muncul dari hal-hal yang tak diduga.',
          keluar: 'Sayangnya tak ada yang abadi. Perlahan timbul pertanyaan, apakah bahagia ini akan berakhir? Kalau iya, kapan? Kalau besok bagaimana? Apa yang terjadi kalau besok aku tak bahagia? Dan tanpa disadari, pertanyaan-pertanyaan ini menjelma menjadi rasa takut.',
          closings: [
            'Akhirnya, saat ini waktunya berbahagia sebentar. Hal-hal dan momen-momen kecil dapat dinikmati dengan tenang.',
            'Ruang-ruang rasa telah dikunjungi. Tiap emosi telah dikenali. Rasa sudah dieksplorasi. Melalui eksplorasi rasa ini tiap perasaan tertuangkan menjadi suatu bentuk karya. Rasa-rasa ini pastinya tidak asing, tapi selalu ada ruang untuk eksplorasi. Rasa dapat berkembang, berubah, dan dibentuk menjadi suatu yang indah.',
            'Akhir kata, semoga melalui ini, perasaan yang biasa kamu lalui dapat menjadi temanmu untuk berkarya. Dan semoga yang kamu takutkan hari ini tak terjadi ya! (Terima kasih.)'
          ],
          closing: ''
        },
        benda: {
          kunci:false
        },
        popups: '',
        tipeKarya: '',
        audio: undefined,
        isAudioPlaying: false,
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
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 10, onComplete: () =>{
              this.msg.closing = this.msg.closings[1]
            }})
            gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 10.5})
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 25, onComplete: () => {
              this.msg.closing = this.msg.closings[2]
            }})
            gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 25.5})
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 35, onComplete: () => {
              this.$router.push({path: CLOSING})
            }})
          } else {
            // animasi keluar
            document.getElementsByClassName('narasi-keluar')[0].style.display = 'block'
            gsap.to('.narasi-keluar', {opacity: 1, duration: 2, delay: 2})
            document.getElementsByClassName('loading')[0].style.display = 'block'
            gsap.to('.loading', {opacity: 1, duration: 1, delay: 12, onComplete: () => {
              this.$router.push({path: NEXT_ROOM})
            }})
          } 
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
      gsap.to(this.audio, {volume: 0, duration: .3, onComplete: () => {
        this.audio.pause()
        this.audio.currentTime = 0
      }})
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
          localStorage.setItem('joy', true)
          this.slide = 1
        }})
      } else {
        document.getElementsByClassName('narasi-masuk')[0].style.display = 'block'
        gsap.to('.narasi-masuk', {opacity: 1,  duration: .5})
        gsap.to('.narasi-masuk', {opacity: 0, delay: 5, duration: .5})
        gsap.to('.loading', {opacity: 0, delay: 5, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          document.getElementsByClassName('narasi-masuk')[0].style.display = 'none'
          // TODO: Add on enter animation here
          localStorage.setItem('joy', true)
          this.slide = 1
        }})
      }
      setTimeout(() => {
        this.preloadImages()
      }, 1000)
      localStorage.setItem('last', this.$route.path)
      this.audio = new Audio('/songs/joy.mp3')
      this.audio.volume = 0.3
      this.audio.loop = true
      this.playAudio()
      this.isInstruksi1 = (localStorage.getItem('instruksi_2') || false)
      if (window.matchMedia("(orientation: portrait)").matches){
        this.instruksiImg1 = '/instruksi/2 hp.png'
      }
      if (!this.isInstruksi1){
        localStorage.setItem('instruksi_2', true)
      }
    },
    methods: {
      // bounceInterval(){
      //   setInterval(()=>{
      //     document.getElementsByClassName('bounce').forEach(el=>{
      //       el.classList.add()
      //     })
      //   }, 4000)
      // },
      resetGif() {
        // var img = document.getElementById("foot-out")
        // var imageUrl = img.getAttribute("src")
        // img.setAttribute("src", "#")
        // img.setAttribute("src", imageUrl)
      },
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
        new Image().src = '/joy/f4.png'
        new Image().src = '/joy/PHOTOSERIES_2 1.png'
        new Image().src = '/joy/ARTIKEL.png'
        new Image().src = '/joy/kranjang2 1.png'
        new Image().src = '/joy/tropong joy.png'
        new Image().src = '/joy/bola1 3.png'
        new Image().src = '/joy/SINGLEPHOTO_2.png'
        new Image().src = '/joy/ZINE.png'
        new Image().src = '/joy/PHOTOBOOK_2.png'
        new Image().src = '/joy/IG_2.png'
        new Image().src = '/joy/bbq2.png'
        new Image().src = '/joy/tedi2.png'
      },
      handleRasyid(){
        localStorage.setItem('before_instalasi', this.$route.path)
        this.$router.push({path: '/karya/instalasi/bandung'})
      },
      isAllRoomVisited(){
        return localStorage.getItem('joy') && localStorage.getItem('fear') && localStorage.getItem('sad') && localStorage.getItem('anger')
      },
      isRoomVisited(){
        return localStorage.getItem('joy')
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
        if (!this.isAudioPlaying) {
          this.playAudio()
        }
      },
      playAudio(){
        let startPlayPromise = this.audio.play()
        this.isAudioPlaying = true
        if (startPlayPromise !== undefined) {
          startPlayPromise.then(() => {
            // Yaudah biarin aja dia ngeplay
          }).catch(() => {
            this.isAudioPlaying = false
            this.audio.muted = true
            document.getElementsByClassName(
              "sound-controller"
            )[0].style.textDecoration = "line-through"
              })
        }
      },
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
  color: #d1bb10;
}

.narasi-closing {
  font-size: 40px;
  z-index: 10000;
  color: #ede5d1;
}

.narasi-keluar {
  font-size: 40px;
  color: #009562;
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
  right: -2px;
  transform: translate(100%, 0);
}

.center-anchor {
  transform: translate(-50%,-50%);
}

.tv {
  background-image:url("/joy/tv 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 40%;
  height: 40%;
  top: 36.5%;
  left: 64.9%;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
  cursor: pointer;
  &:hover {
    background-image:url("/joy/hover tv joy.png");
    cursor: pointer;
    animation:none;
    left: 66.9%;
  }
}

.pohon {
  width: 41.2%;
  top: -31.7%;
  left: -3%;
}
.karpet {
  width: 64.5%;
  top: 56%;
  left: 35.1%;
}
.pagar1 {
  width: 100%;
  top: 29%;
  left: 0;
}
.pagar {
  width: 100%;
  top: 31.3%;
  left: 0;
}
.semak1 {
  width: 31.8%;
  top: 44.2%;
  left: 3.6%;
}
.semak2 {
  width: 26.6%;
  top: 45.2%;
  left: 37.75%;
}
.bunga {
  width: 37.85%;
  top: 27.1%;
  left: 22%;
}

.sky {
  width: 100%;
  top: -37%;
  left: 0;
}

.matahari {
  width: 19.5%;
  top: -2%;
  left: 75%;
}

.pasir {
  width: 45.5%;
  top: 57%;
  left: 54.4%;
}

.bunga2 {
  width: 16.45%;
  top: 45.2%;
  left: 51.3%;
}

.tanaman {
  width: 39%;
  top: 23.8%;
  left: 7.8%;
}

.rumput {
  width: 100%;
  top: 52%;
  left: 0;
}

.lemon{
  width: 14%;
  top: 4%;
  left: 3%;
}

.teddy{
  background-image:url("/joy/tedi1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 8%;
  height:15%;
  top: 70%;
  left: 17%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.teddy:hover{
  background-image:url("/joy/tedi2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 8%;
  height:15%;
  top: 70%;
  left: 17%;
  animation:none;
}

.bbq{
  background-image:url("/joy/bbq1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:30%;
  top: 45%;
  left: 27%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.bbq:hover{
  background-image:url("/joy/bbq2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:30%;
  top: 45%;
  left: 27%;
  cursor:pointer;
  animation:none;
}

.ig{
  background-image:url("/joy/IG_1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 7%;
  height:12%;
  top: 77%;
  left: 80%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.ig:hover{
  background-image:url("/joy/IG_2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 7%;
  height:12%;
  top: 77%;
  left: 80%;
  cursor:pointer;
  animation:none;
}

.photobook{
  background-image:url("/joy/PHOTOBOOK_1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 11%;
  height:11%;
  top: 66%;
  left: 52%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.photobook:hover{
  background-image:url("/joy/PHOTOBOOK_2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 12%;
  height:12%;
  top: 65%;
  left: 52%;
  cursor:pointer;
  animation:none;
}

.zine{
  background-image:url("/joy/ZINE.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 79%;
  left: 55%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.zine:hover{
  background-image:url("/joy/ZINE.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 79%;
  left: 55%;
  cursor:pointer;
  animation:none;
}

.single{
  background-image:url("/joy/SINGLEPHOTO_1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 75%;
  left: 10%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.single:hover{
  background-image:url("/joy/SINGLEPHOTO_2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 75%;
  left: 10%;
  cursor:pointer;
  animation:none;
}

.bola{
  background-image:url("/joy/bola1 3.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:13%;
  top: 65%;
  left: 20.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.bola:hover{
  background-image:url("/joy/bola1 3.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:13%;
  top: 65%;
  left: 20.5%;
  cursor:pointer;
  animation:none;
}

.teropong{
  background-image:url("/joy/tropong joy.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 15%;
  height:15%;
  top: 70%;
  left: 31%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.teropong:hover{
  background-image:url("/joy/tropong joy.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 15%;
  height:15%;
  top: 70%;
  left: 31%;
  cursor:pointer;
  animation:none; 
}

.keranjang{
  background-image:url("/joy/kranjang1 2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:14%;
  top: 59%;
  left: 49.7%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.keranjang:hover{
  background-image:url("/joy/kranjang2 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:16%;
  top: 58%;
  left: 49.7%;
  cursor:pointer;
  animation:none;
}

.artikel{
  background-image:url("/joy/ARTIKEL.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:14%;
  top: 66%;
  left: 68%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.artikel:hover{
  background-image:url("/joy/ARTIKEL.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 13%;
  height:14%;
  top: 66%;
  left: 68%;
  cursor:pointer;
  animation:none;
}

.kamera{
  background-image:url("/joy/PHOTOSERIES_1 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 65%;
  left: 88%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.kamera:hover{
  background-image:url("/joy/PHOTOSERIES_2 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:14%;
  top: 62%;
  left: 88%;
  cursor:pointer;
  animation:none;
}

.playlist{
  background-image:url("/joy/playlist joy.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 15%;
  height:15%;
  top: 73%;
  left: 45%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;  
}

.playlist:hover{
  background-image:url("/joy/playlist joy.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 15%;
  height:15%;
  top: 73%;
  left: 45%;
  cursor:pointer;
  animation:none;
}

.foot{
  background-image:url("/joy/fkg.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:10%;
  height:10%;
  top:79%;
  left:87%;
}

.foot-in {
  position: absolute;
  width: 100vw;
  top: 75%;
  left: 45%;
  z-index: 20000;
}

.foot-out {
  position: absolute;
  width: 100vw;
  top: 75%;
  left: 90%;
  z-index: 20000;
}

.kunci{
  background-image:url("/joy/f4.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 78%;
  left: 83%;
  cursor:pointer;
  z-index: 15001;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;    
}

.kunci:hover{
  background-image:url("/joy/f4.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 78%;
  left: 83%;
  cursor:pointer;
  animation:none;
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

.tv-popup {
  position: absolute;
  top: 4%;
  left: 0;
  height: 150vh;
}
.darkness {
  background-color: black;
  opacity: .8;
  z-index: 70;
  width: 150%;
  height: 200%;
  top: -50%;
}

.foto-popup{
  z-index: 71;
}

.sound-controller {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "KG Happy Solid";
  font-size: 40px;
  color: black;
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
</style>