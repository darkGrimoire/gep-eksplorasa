<template>
  <div class="main">
    <div class="slide-controls">
      <fa
        v-show="slide === 2"
        :icon="['fas', 'chevron-left']"
        class="left-arrow arrow"
        @click="switchSlide(-1)"
      />
      <fa
        v-show="slide === 1"
        :icon="['fas', 'chevron-right']"
        class="right-arrow arrow"
        @click="switchSlide(1)"
      />
    </div>

    <div
      class="loading"
      style="
        position: absolute;
        background-color: black;
        opacity: 1;
        z-index: 9999;
        width: 100vw;
        height: 100vh;
      "
    />
    <div class="narasi narasi-masuk" style="display: none">
      {{ msg.masuk }}
    </div>
    <div class="narasi narasi-keluar" style="display: none">
      {{ msg.keluar }}
    </div>
    <div class="narasi narasi-closing" style="display: none">
      {{ msg.closing }}
    </div>

    <div
      id="slide0"
      class="top-cont"
      :style="{
        transform:
          'translate(calc(' +
          base.slide0 +
          '% ' +
          sign +
          ' ' +
          Math.abs(computedDisplacement) +
          'px), -50%)',
      }"
    >
      <div class="canvas">
        <div class="canvas canvas-hover" />
      </div>
    </div>

    <!-- SLIDE 1 -->
    <div
      id="slide1"
      class="top-cont"
      :style="{
        transform:
          'translate(calc(' +
          base.slide1 +
          '% ' +
          sign +
          ' ' +
          Math.abs(computedDisplacement) +
          'px), -50%)',
      }"
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
          <div
            v-show="popups === 'foto'"
            class="cont darkness"
            @click="popups = ''"
          />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/template-example/kitj1.png" alt="guide" style="opacity: .0;">
          </div> -->
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/anger/wall.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/anger/lt.png" alt="floor">
          </div>
          <div class="kulkas" />
          <div class="cont lemari">
            <img src="/anger/lmari.png" alt="lemari">
          </div>
          <div class="cont piring">
            <img src="/anger/piring.png" alt="piring">
          </div>
          <div class="cont rak1">
            <img src="/anger/rak1.png" alt="rak1">
          </div>
          <div class="cont rak2">
            <img src="/anger/rak2.png" alt="rak2">
          </div>
          <div class="cont rak3">
            <img src="/anger/rak3.png" alt="rak3">
          </div>
          <div class="cont pecah1">
            <img src="/anger/pecah1.png" alt="pecah1">
          </div>
          <div class="cont pecah2">
            <img src="/anger/pecah2.png" alt="pecah2">
          </div>
          <div class="cont trio">
            <img src="/anger/trio.png" alt="trio">
          </div>
          <div class="cont air">
            <img src="/anger/aer.png" alt="air">
          </div>
          <div class="cont tong">
            <img src="/anger/tong.png" alt="tong">
          </div>
          <div class="cont oven">
            <img src="/anger/kgif.gif" alt="oven">
          </div>
          <div
            class="figura"
            @click="
              popups = 'foto';
              tipeKarya = 'single';
            "
          />
          <div
            class="koran"
            @click="
              popups = 'kine';
              tipeKarya = 'artikel';
            "
          />
          <div class="sampah" />
          <div class="garpu"/>
          <div class="garpu1"/>

          
          <div v-if="!isInstruksi1" class="instruksi instruksi1">
            <img :src="instruksiImg1" alt="instruksi" @click="fadeInstruksi('instruksi1')">
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 1" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 1" :tipe-karya="tipeKarya" class="foto-popup" />
        </div>
      </div>
    </div>

    <!-- SLIDE 2 -->
    <div
      id="slide2"
      class="top-cont"
      :style="{
        transform:
          'translate(calc(' +
          base.slide2 +
          '% ' +
          sign +
          ' ' +
          (Math.abs(computedDisplacement) - 1) +
          'px), -50%)',
      }"
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
          <div
            v-show="popups === 'foto'"
            class="cont darkness"
            @click="popups = ''"
          />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/template-example/kitj2.png" alt="guide" style="opacity: .0;">
          </div> -->
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/anger/wall.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/anger/lt.png" alt="floor">
          </div>
          <div class="cont lemari2">
            <img src="/anger/lemari.png" alt="lemari2">
          </div>
          <div class="cont jendela">
            <img src="/anger/jndl.png" alt="jendela">
          </div>
          <div class="cont frame">
            <img src="/anger/frame.png" alt="frame">
          </div>
          <div class="cont meja">
            <img src="/anger/meja.png" alt="meja">
          </div>
          <div class="cont meong">
            <img src="/anger/meong.png" alt="meong" :style="`opacity: ${benda.kucing}`" @mouseenter="benda.kucing = 1" @mouseout="benda.kucing = 0"
            >
          </div>
          <div class="cont rak">
            <img src="/anger/rak.png" alt="rak">
          </div>
          <div class="cont trolley">
            <img src="/anger/trolley.png" alt="trolley">
          </div>
          <div class="tv" @click="popups = 'tv'" />
          <div class="cont kran">
            <img src="/anger/kran.gif" alt="kran">
          </div>
          <div class="cont cakar">
            <img
              src="/anger/gep anger scar.png"
              alt="cakar"
              :style="`opacity: ${benda.cakar}`"
              @mouseenter="benda.cakar = 1"
              @mouseout="benda.cakar = 0"
            >
          </div>
          <div class="cont teropong" @click="handleRasyid" />

          <div class="pisau" />
          <div class="playlist" />
          <div class="buku" @click="popups = 'foto';tipeKarya = 'buku'" />
          <div class="gantungan" @click="popups = 'foto';tipeKarya = 'series'" />
          <div class="bounce kunci" @click="benda.kunci = true;slide=3" />
          <div v-show="benda.kunci" class="foot" />
          <div v-if="!isInstruksi2" class="instruksi instruksi2">
            <img :src="instruksiImg2" alt="instruksi" @click="fadeInstruksi('instruksi2')">
          </div>
          <div class="tv-popup">
            <TvPopup
              v-if="popups === 'tv' && slide === 2"
              @closePopup="popups = ''"
            />
          </div>
          <KinePopup
            v-if="popups === 'kine' && slide === 2"
            :tipe-karya="tipeKarya"
            @closePopup="popups = ''"
          />
          <NewfotoPopup
            v-if="popups === 'foto' && slide === 2"
            :tipe-karya="tipeKarya"
            class="foto-popup"
          />
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
  const NEXT_ROOM = '/ruangan/joy'
  const CLOSING = '/ruangan/closing'
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  import tvPopup from '~/components/tv-popup.vue'
  import kinePopup from "~/components/kine-popup.vue"
  import NewfotoPopup from '~/components/newfoto-popup.vue'
  export default {
    name: "Anger",
    components: {
      rcp,
      tvPopup,
      kinePopup,
      NewfotoPopup,
      
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
          masuk: 'Kesal, jengkel, tidak terima, tak adil rasanya, tidak seharusnya seperti ini. Ingin meledak, ingin marah. ',
          keluar: 'Marah telah diluapkan. Keluh kesah sudah dibuang. Sedikit kelegaan muncul. Semangat yang baru pun timbul. Hal-hal kecil yang menyenangkan kembali terlihat setelah tertutup amarah dan hal pahit lainnya.',
          closings: [
            'Akhirnya amarah pun dilepaskan. Tapi tak apa, setidaknya sekarang sedikit lebih lega.',
            'Ruang-ruang rasa telah dikunjungi. Tiap emosi telah dikenali. Rasa sudah dieksplorasi. Melalui eksplorasi rasa ini tiap perasaan tertuangkan menjadi suatu bentuk karya. Rasa-rasa ini pastinya tidak asing, tapi selalu ada ruang untuk eksplorasi. Rasa dapat berkembang, berubah, dan dibentuk menjadi suatu yang indah. ',
            'Akhir kata, semoga melalui ini, perasaan yang biasa kamu lalui dapat menjadi temanmu untuk berkarya. Dan semoga kesenangan kamu di hari ini bertahan lama ya! (Terima kasih.)'
          ],
          closing: ''
        },
        benda: {
          cakar: 0,
          garpu: 0, 
          kucing: 0
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
            }
          })
          gsap.to(".narasi-closing", { opacity: 1, duration: 1, delay: 7.5 })
          gsap.to(".narasi-closing", {
            opacity: 0,
            duration: 0.5,
            delay: 14.5,
            onComplete: () => {
              this.msg.closing = this.msg.closings[2]
            }
          })
          gsap.to(".narasi-closing", { opacity: 1, duration: 1, delay: 15 })
          gsap.to(".narasi-closing", {
            opacity: 0,
            duration: 0.5,
            delay: 20,
            onComplete: () => {
              this.$router.push({ path: CLOSING })
            }
          })
        } else {
          // animasi keluar
          document.getElementsByClassName("narasi-keluar")[0].style.display =
            "block"
          gsap.to(".narasi-keluar", { opacity: 1, duration: 2, delay: 2 })
          document.getElementsByClassName("loading")[0].style.display = "block"
          gsap.to(".loading", {
            opacity: 1,
            duration: 1,
            delay: 7,
            onComplete: () => {
              this.$router.push({ path: NEXT_ROOM })
            }
          })
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize)
    this.audio.pause()
    this.audio.currentTime = 0
  },
  mounted() {
    this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
    window.addEventListener("resize", this.handleResize)
    document.onkeyup = this.handleKeyboard

    // wait for loading to finish
    //animasi masuk
    if (this.isAllRoomVisited() || this.isRoomVisited()) {
      gsap.to(".loading", {
        opacity: 0,
        delay: 1,
        duration: 0.2,
        onComplete: () => {
          document.getElementsByClassName("loading")[0].style.display = "none"
          // TODO: Add on enter animation here
          localStorage.setItem("anger", true)
          this.slide = 1
        }
      })
    } else {
      document.getElementsByClassName("narasi-masuk")[0].style.display = "block"
      gsap.to(".narasi-masuk", { opacity: 1, duration: 0.5 })
      gsap.to(".narasi-masuk", { opacity: 0, delay: 3, duration: 0.5 })
      gsap.to(".loading", {
        opacity: 0,
        delay: 3,
        duration: 0.2,
        onComplete: () => {
          document.getElementsByClassName("loading")[0].style.display = "none"
          document.getElementsByClassName("narasi-masuk")[0].style.display =
            "none"
          localStorage.setItem("anger", true)
          // TODO: Add on enter animation here
          this.slide = 1
        }
      })
    }
    setTimeout(() => {
      this.preloadImages()
    }, 1000)
    localStorage.setItem("last", this.$route.path)
    this.audio = new Audio("/songs/anger.mp3")
    this.audio.volume = 0.5
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
        new Image().src = '/anger/anger1.png'
        new Image().src = '/anger/a-photo series-2.png'
        new Image().src = '/anger/a-photobook-2.png'
        new Image().src = '/anger/gep pisau.png'
        new Image().src = '/anger/tv2.png'
        new Image().src = '/anger/a-single-2.png'
        new Image().src = '/anger/a-artikel-2.png'
        new Image().src = '/anger/gep anger berserakan.png'
        new Image().src = '/anger/gep anger meledak.png'
        new Image().src = '/anger/kulopen.png'
      },
      handleRasyid(){
        localStorage.setItem('before_instalasi', this.$route.path)
        this.$router.push({path: '/karya/instalasi/bandung'})
      },
      isAllRoomVisited(){
        return localStorage.getItem('joy') && localStorage.getItem('fear') && localStorage.getItem('sad') && localStorage.getItem('anger')
      },
      isRoomVisited(){
        return localStorage.getItem('anger')
      },
      isClosingVisited(){
        return localStorage.getItem('closing')
      },
    startDrag(e) {
      if (window.matchMedia("(orientation: portrait)").matches) {
        // enable dragging and keep mouseStart point
        let interaction = this.determineInteraction(e)
        this.drag = true
        this.mouseStart.x = interaction.clientX
        this.mouseStart.y = interaction.clientY
      }
    },
    dragContainer(e) {
      // if dragging, calculate target position and tween to that position
      if (this.drag) {
        let interaction = this.determineInteraction(e)
        let targetDisplacement = this.clamp(
          interaction.clientX - this.mouseStart.x + this.transformed,
          this.xBoundary / (2 * SCALE),
          -this.xBoundary / (2 * SCALE)
        )
        gsap.to(this.$data, { computedDisplacement: targetDisplacement })
      }
    },
    endDrag(e) {
      // if mouse click released or out of window while dragging, disable dragging,
      // calculate target end position and tween, keep last transformation position, and delete mouseStart (optional)
      if (this.drag) {
        let interaction = this.determineInteraction(e)
        this.drag = false
        let targetDisplacement = this.clamp(
          interaction.clientX - this.mouseStart.x + this.transformed,
          this.xBoundary / (2 * SCALE),
          -this.xBoundary / (2 * SCALE)
        )
        this.transformed = targetDisplacement
        gsap.to(this.$data, { computedDisplacement: targetDisplacement })
        this.mouseStart.x = undefined
        this.mouseStart.y = undefined
      }
    },
    clamp(attribute, max, min) {
      return Math.min(max, Math.max(min, attribute))
    },
    determineInteraction(e) {
      let interaction = e
      if (
        e.type == "touchstart" ||
        e.type == "touchmove" ||
        e.type == "touchend" ||
        e.type == "touchcancel"
      ) {
        let evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent
        interaction = evt.touches[0] || evt.changedTouches[0]
      }
      return interaction
    },
    handleResize() {
      if (document.getElementsByClassName("top-cont")[0]) {
        this.xBoundary = document.getElementsByClassName(
          "top-cont"
        )[0].clientWidth
        if (window.matchMedia("(orientation: landscape)").matches) {
          this.computedDisplacement = 0
          this.transformed = 0
        }
      }
    },
    handleKeyboard(e) {
      // DEBUGGING PURPOSE
      // if (this.slide === 2 && e.key === "ArrowRight"){
      //   this.switchSlide(1)
      // }

      if (this.slide === 2 && e.key === "ArrowLeft") {
        this.switchSlide(-1)
      } else if (this.slide === 1 && e.key === "ArrowRight") {
        this.switchSlide(1)
      }
    },

    handleObjChange(e) {
      // console.log(e)
      if (e.target.getAttribute("src") === "/anger/kulklos.png") {
        e.target.setAttribute("src", "/anger/kulopen.png")
      } else if (e.target.getAttribute("src") === "/anger/meong2.png") {
        e.target.setAttribute("src", "/anger/meong.png")
      } else if (e.target.getAttribute("src") === "/anger/tgif.gif") {
        e.target.setAttribute("src", "/anger/tv2.png")
      } else if (e.target.getAttribute("src") === "/anger/a-artikel-1.png") {
        e.target.setAttribute("src", "/anger/a-artikel-2.png")
      } else if (e.target.getAttribute("src") === "/anger/a-single-1.png") {
        e.target.setAttribute("src", "/anger/a-single-2.png")
      } else if (
        e.target.getAttribute("src") === "/anger/a-photo series-1.png"
      ) {
        e.target.setAttribute("src", "/anger/a-photo series-2.png")
      } else if (e.target.getAttribute("src") === "/anger/a-photobook-1.png") {
        e.target.setAttribute("src", "/anger/a-photobook-2.png")
      } else if (
        e.target.getAttribute("src") === "/anger/gep anger sampah.png"
      ) {
        e.target.setAttribute("src", "/anger/gep anger meledak.png")
      } else if (
        e.target.getAttribute("src") === "/anger/gep anger piso bersih.png"
      ) {
        e.target.setAttribute("src", "/anger/gep pisau.png")
      }
    },
    handleObjChangeEnd(e) {
      // console.log(e)
      if (e.target.getAttribute("src") === "/anger/kulopen.png") {
        e.target.setAttribute("src", "/anger/kulklos.png")
      } else if (e.target.getAttribute("src") === "/anger/meong.png") {
        e.target.setAttribute("src", "/anger/meong2.png")
      } else if (e.target.getAttribute("src") === "/anger/tv2.png") {
        e.target.setAttribute("src", "/anger/tgif.gif")
      } else if (e.target.getAttribute("src") === "/anger/a-artikel-2.png") {
        e.target.setAttribute("src", "/anger/a-artikel-1.png")
      } else if (e.target.getAttribute("src") === "/anger/a-single-2.png") {
        e.target.setAttribute("src", "/anger/a-single-1.png")
      } else if (
        e.target.getAttribute("src") === "/anger/a-photo series-2.png"
      ) {
        e.target.setAttribute("src", "/anger/a-photo series-1.png")
      } else if (e.target.getAttribute("src") === "/anger/a-photobook-2.png") {
        e.target.setAttribute("src", "/anger/a-photobook-1.png")
      } else if (
        e.target.getAttribute("src") === "/anger/gep anger meledak.png"
      ) {
        e.target.setAttribute("src", "/anger/gep anger sampah.png")
      } else if (e.target.getAttribute("src") === "/anger/gep pisau.png") {
        e.target.setAttribute("src", "/anger/gep anger piso bersih.png")
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
  }
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
      color: rgba($color: white, $alpha: 1);
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
  transform: translate(-50%, 0);
  z-index: 99;
  font-family: "Mechanical Pencil";
  font-size: 50px;
  color: rgba($color: white, $alpha: 0.9);
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
  color: #e14423;
}

.narasi-closing {
  font-size: 40px;
  z-index: 10000;
  color: #ede5d1;
}

.narasi-keluar {
  font-size: 40px;
  color: #d1bb10;
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
  transform: translate(-50%, -50%);
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
  transform: translate(-50%, -50%);
}
// Add Objects positions here
.wall {
  width: 100%;
  top: -90%;
}
.floor {
  width: 100%;
  top: 74.5%;
}

.kulkas {
  background-image: url("/anger/kulklos.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 23.4%;
  top: 16.8%;
  left: 3.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.kulkas:hover {
  background-image: url("/anger/kulopen.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 23.4%;
  top: 16.8%;
  left: 3.5%;
  cursor: pointer;
  animation: none;
}
.lemari {
  width: 22%;
  top: 46%;
  left: 31%;
}
.piring {
  width: 10%;
  top: 36.5%;
  left: 32%;
}
.rak1 {
  width: 17.5%;
  top: 18%;
  left: 31%;
}
.rak2 {
  width: 16%;
  top: 27.2%;
  left: 37%;
}
.rak3 {
  width: 16%;
  top: 23.5%;
  left: 76%;
}
.pecah1 {
  width: 13%;
  top: 12%;
  left: 34.5%;
}
.pecah2 {
  width: 13.2%;
  top: 24.5%;
  left: 41%;
}
.trio {
  width: 11.2%;
  top: 23.8%;
  left: 75.4%;
}
.air {
  width: 27.5%;
  top: 76%;
  left: 8.5%;
}
.tong {
  width: 15.9%;
  top: 54%;
  left: 83%;
}
.oven {
  width: 26%;
  top: 34%;
  left: 54.5%;
}

.sampah {
  background-image: url("/anger/gep anger sampah.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 35%;
  width: 12%;
  top: 35.9%;
  left: 83.9%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.sampah:hover {
  background-image: url("/anger/gep anger meledak.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 35%;
  width: 12%;
  top: 35.9%;
  left: 83.9%;
  cursor: pointer;
  animation: none;
}

.garpu {
  background-image: url("/anger/gep anger garpu.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 35%;
  width: 8.5%;
  top: 13.5%;
  left: 83.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.garpu1 {
  background-image: url("/anger/gep anger berserakan.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  width: 17.5%;
  top: 76.5%;
  left: 81%;
  height: 35%;
  opacity: 0;
  animation: none;
}

.garpu:hover + .garpu1{
 opacity: 10;
 animation: none;
}

.garpu:hover{
  opacity: 0;
}


.koran {
  background-image: url("/anger/a-artikel-1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17.5%;
  top: 77.5%;
  left: 43%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.koran:hover {
  background-image: url("/anger/a-artikel-2.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17.5%;
  top: 77.5%;
  left: 43%;
  cursor: pointer;
  animation: none;
}

.figura {
  background-image: url("/anger/a-single-1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 14%;
  left: 55.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.figura:hover {
  background-image: url("/anger/a-single-2.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 14%;
  left: 55.5%;
  cursor: pointer;
  animation: none;
}
// Add Objects positions here
.frame {
  width: 10.5%;
  top: 14%;
  left: 9.5%;
}
.jendela {
  width: 24.3%;
  top: 7.5%;
  left: 27.5%;
}
.lemari2 {
  width: 27%;
  top: 5.5%;
  left: 68.5%;
}
.meja {
  width: 31%;
  top: 47%;
  left: 63%;
}
.meong {
  width: 11.3%;
  top: 29.5%;
  left: 35.5%;
}

.playlist{
  background-image: url("/anger/playlist-anger.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 43%;
  left: 16.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.playlist:hover {
  background-image: url("/anger/playlist-anger.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 43%;
  left: 16.5%;
  cursor: pointer;
  animation: none;
}

.rak {
  width: 13%;
  top: 34%;
  left: 56.5%;
}
.trolley {
  width: 14%;
  top: 45%;
  left: 6.5%;
}

.tv {
  background-image: url("/anger/tgif.gif");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 12%;
  top: 30.5%;
  left: 77.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.tv:hover {
  background-image: url("/anger/tv2.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 15%;
  top: 30.5%;
  left: 76.5%;
  cursor: pointer;
  animation: none;
}

.kran {
  width: 38.5%;
  top: 37%;
  left: 22.5%;
}

.pisau {
  background-image: url("/anger/gep anger piso bersih.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 20%;
  top: 65%;
  left: 53.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.pisau:hover {
  background-image: url("/anger/gep pisau.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 20%;
  top: 65%;
  left: 53.5%;
  cursor: pointer;
  animation: none;
}

.buku {
  background-image: url("/anger/a-photobook-1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17%;
  top: 73%;
  left: 30.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.buku:hover {
  background-image: url("/anger/a-photobook-2.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17%;
  top: 73%;
  left: 30.5%;
  cursor: pointer;
  animation: none;
}

.gantungan {
  background-image: url("/anger/a-photo series-1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 10.5%;
  top: 9%;
  left: 52.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.gantungan:hover {
  background-image: url("/anger/a-photo series-2.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 10.5%;
  top: 9%;
  left: 52.5%;
  cursor: pointer;
  animation: none;
}

.foot {
  background-image: url("/anger/angerf.gif");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  width: 10%;
  height: 10%;
  top: 79%;
  left: 87%;
}

.kunci {
  background-image: url("/anger/anger1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  width: 10%;
  height: 10%;
  top: 78%;
  left: 83%;
  cursor:pointer;
  z-index: 15001;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;    
}

.kunci:hover {
  background-image: url("/anger/anger1.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  width: 10%;
  height: 10%;
  top: 78%;
  left: 83%;
  cursor: pointer;
  animation: none;
}
.cakar {
  width: 11%;
  top: 25.8%;
  left: 2.5%;
}
.teropong{
  background-image:url("/anger/tropong anger.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 13%;
  top: 79%;
  left: 10.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.teropong:hover{
  background-image:url("/anger/tropong anger.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 13%;
  top: 79%;
  left: 10.5%;
  cursor:pointer;
  animation: none;
}
// .teropong {
//   width: 13%;
//   top: 79%;
//   left: 10.5%;
//   &:hover {
//     cursor: pointer;
//   }
// }
.tv-popup {
  position: absolute;
  top: 4%;
  left: 0;
  height: 150vh;
}
.darkness {
  background-color: black;
  opacity: 0.8;
  z-index: 70;
  width: 150%;
  height: 200%;
  top: -50%;
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

.bounce-7 {
  animation-name: bounce-7;
  animation-timing-function: cubic-bezier(0.14, 0.42, 0.21, 0.5, 1);
}
@keyframes bounce-7 {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  5% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  15% {
    transform: scale(0.9, 1.1) translateY(-10px);
  }
  25% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  28.5% {
    transform: scale(1, 1) translateY(-7px);
  }
  32% {
    transform: scale(1, 1) translateY(0);
  }
  50% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
.foto-popup {
  z-index: 71;
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