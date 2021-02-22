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
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
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
          <div class="figura" @click="popups = 'foto';tipeKarya = 'single'" />
          <div class="koran" @click="popups = 'kine';tipeKarya = 'artikel'" />
          <div class="sampah" />
          <div class="garpu" />
          <KinePopup v-if="popups === 'kine' && slide === 1" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 1" :tipe-karya="tipeKarya" class="foto-popup" />
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
            <img src="/anger/meong2.png" alt="meong" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
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
            <img src="/anger/gep anger scar.png" alt="cakar" :style="`opacity: ${benda.cakar}`" @mouseenter="benda.cakar = 1" @mouseout="benda.cakar = 0">
          </div>
          <div class="cont teropong">
            <img src="/anger/tropong anger.png" alt="teropong">
          </div>
          <div class="pisau" />
          <div class="buku" />
          <div class="gantungan" />
          <div class="bounce kunci" @click="benda.kunci = true;slide=3" />
          <div v-show="benda.kunci" class="foot" />
          <div class="tv-popup">
            <TvPopup v-if="popups === 'tv' && slide === 2" @closePopup="popups = ''" />
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 2" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 2" :tipe-karya="tipeKarya" class="foto-popup" />
        </div>
      </div>
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
      NewfotoPopup
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
          garpu: 0
        },
        popups: '',
        tipeKarya: ''
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
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
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
          localStorage.setItem('anger', true)
          this.slide = 1
        }})
      } else {
        document.getElementsByClassName('narasi-masuk')[0].style.display = 'block'
        gsap.to('.narasi-masuk', {opacity: 1,  duration: .5})
        gsap.to('.narasi-masuk', {opacity: 0, delay: 3, duration: .5})
        gsap.to('.loading', {opacity: 0, delay: 3, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          document.getElementsByClassName('narasi-masuk')[0].style.display = 'none'
          localStorage.setItem('anger', true)
          // TODO: Add on enter animation here
          this.slide = 1
        }})
      }
    },
    methods: {
      switchSlide(val){
        this.slide += val
        gsap.to(this.$data, {computedDisplacement: 0, transformed: 0})
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

        
      handleObjChange(e){
        // console.log(e)
        if (e.target.getAttribute('src') === "/anger/kulklos.png"){
          e.target.setAttribute('src', "/anger/kulopen.png")
        } else if (e.target.getAttribute('src') === "/anger/meong2.png"){
          e.target.setAttribute('src', "/anger/meong.png")
        } else if (e.target.getAttribute('src') === "/anger/tgif.gif"){
          e.target.setAttribute('src', "/anger/tv2.png")
        } else if (e.target.getAttribute('src') === "/anger/a-artikel-1.png"){
          e.target.setAttribute('src', "/anger/a-artikel-2.png")
        } else if (e.target.getAttribute('src') === "/anger/a-single-1.png"){
          e.target.setAttribute('src', "/anger/a-single-2.png")
        } else if (e.target.getAttribute('src') === "/anger/a-photo series-1.png"){
          e.target.setAttribute('src', "/anger/a-photo series-2.png")
        } else if (e.target.getAttribute('src') === "/anger/a-photobook-1.png"){
          e.target.setAttribute('src', "/anger/a-photobook-2.png")
        } else if (e.target.getAttribute('src') === "/anger/gep anger sampah.png"){
          e.target.setAttribute('src', "/anger/gep anger meledak.png")
        } else if (e.target.getAttribute('src') === "/anger/gep anger piso bersih.png"){
          e.target.setAttribute('src', "/anger/gep pisau.png")
        } 
      },
      handleObjChangeEnd(e){
        // console.log(e)
        if (e.target.getAttribute('src') === "/anger/kulopen.png"){
          e.target.setAttribute('src', "/anger/kulklos.png")
        } else if (e.target.getAttribute('src') === "/anger/meong.png"){
          e.target.setAttribute('src', "/anger/meong2.png")
        } else if (e.target.getAttribute('src') === "/anger/tv2.png"){
          e.target.setAttribute('src', "/anger/tgif.gif")
        } else if (e.target.getAttribute('src') === "/anger/a-artikel-2.png"){
          e.target.setAttribute('src', "/anger/a-artikel-1.png")
        } else if (e.target.getAttribute('src') === "/anger/a-single-2.png"){
          e.target.setAttribute('src', "/anger/a-single-1.png")
        } else if (e.target.getAttribute('src') === "/anger/a-photo series-2.png"){
          e.target.setAttribute('src', "/anger/a-photo series-1.png")
        } else if (e.target.getAttribute('src') === "/anger/a-photobook-2.png"){
          e.target.setAttribute('src', "/anger/a-photobook-1.png")
        }  else if (e.target.getAttribute('src') === "/anger/gep anger meledak.png"){
          e.target.setAttribute('src', "/anger/gep anger sampah.png")
        } else if (e.target.getAttribute('src') === "/anger/gep pisau.png"){
          e.target.setAttribute('src', "/anger/gep anger piso bersih.png")
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
.wall{
  width: 100%;
  top: -90%;
}
.floor{
  width: 100%;
  top: 74.5%;
}

.kulkas{
  background-image:url("/anger/kulklos.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 23.4%;
  top: 16.8%;
  left: 3.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.kulkas:hover{
  background-image:url("/anger/kulopen.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 23.4%;
  top: 16.8%;
  left: 3.5%;
  cursor:pointer;
  animation: none;
}
.lemari{
  width: 22%;
  top: 46%;
  left: 31%;
}
.piring{
  width: 10%;
  top: 36.5%;
  left: 32%;
}
.rak1{
  width: 17.5%;
  top: 18%;
  left: 31%;
}
.rak2{
  width: 16%;
  top: 27.2%;
  left: 37%;
}
.rak3{
  width: 16%;
  top: 23.5%;
  left: 76%;
}
.pecah1{
 width: 13%;
 top: 12%;
 left: 34.5%;
}
.pecah2{
 width: 13.2%;
 top: 24.5%;
 left: 41%;
}
.trio{
 width: 11.2%;
 top: 23.8%;
 left: 75.4%;
}
.air{
 width: 27.5%;
 top: 76%;
 left: 8.5%;
}
.tong{
 width: 15.9%;
 top: 54%;
 left: 83%;
}
.oven{
  width: 26%;
  top: 34%;
  left: 54.5%;
}

.sampah{
  background-image:url("/anger/gep anger sampah.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 12%;
  top: 35.9%;
  left: 83.9%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.sampah:hover{
  background-image:url("/anger/gep anger meledak.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 12%;
  top: 35.9%;
  left: 83.9%;
  cursor:pointer;
  animation: none;
}

.garpu{
  background-image:url("/anger/gep anger garpu.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 8.5%;
  top: 13.5%;
  left: 83.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.garpu:hover{
  background-image:url("/anger/gep anger berserakan.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 17.5%;
  top: 76.5%;
  left: 81%;
  height: 35%;
  cursor:pointer;
  animation: none;
}

.koran{
  background-image:url("/anger/a-artikel-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 17.5%;
  top: 77.5%;
  left: 43%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.koran:hover{
  background-image:url("/anger/a-artikel-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 17.5%;
  top: 77.5%;
  left: 43%;
  cursor:pointer;
  animation: none;
}

.figura{
  background-image:url("/anger/a-single-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 8%;
  top: 14%;
  left: 55.5%; 
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.figura:hover{
  background-image:url("/anger/a-single-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 8%;
  top: 14%;
  left: 55.5%; 
  cursor:pointer;
  animation: none;
}
// Add Objects positions here
.frame{
  width: 10.5%;
  top: 14%;
  left: 9.5%;
}
.jendela{
  width: 24.3%;
  top: 7.5%;
  left: 27.5%;
}
.lemari2{
  width: 27%;
  top: 5.5%;
  left: 68.5%;
}
.meja{
  width: 31%;
  top: 47%;
  left: 63%;
}
.meong{
  width: 11.3%;
  top: 29.5%;
  left: 35.5%;
}
.rak{
  width: 13%;
  top: 34%;
  left: 56.5%;
}
.trolley{
  width: 14%;
  top: 45%;
  left: 6.5%;
}

.tv{
  background-image:url("/anger/tgif.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 12%;
  top: 30.5%;
  left: 77.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.tv:hover{
  background-image:url("/anger/tv2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 15%;
  top: 30.5%;
  left: 76.5%;
  cursor:pointer;
  animation: none;
}

.kran{
  width: 38.5%;
  top: 37%;
  left: 22.5%;
}

.pisau{
  background-image:url("/anger/gep anger piso bersih.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 20%;
  top: 65%;
  left: 53.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.pisau:hover{
  background-image:url("/anger/gep pisau.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 20%;
  top: 65%;
  left: 53.5%;
  cursor:pointer;
  animation: none;
}

.buku{
  background-image:url("/anger/a-photobook-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 17%;
  top: 73%;
  left: 30.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.buku:hover{
  background-image:url("/anger/a-photobook-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 17%;
  top: 73%;
  left: 30.5%;
  cursor:pointer;
  animation: none;
}

.gantungan{
  background-image:url("/anger/a-photo series-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 10.5%;
  top: 9%;
  left: 52.5%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.gantungan:hover{
  background-image:url("/anger/a-photo series-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:65%;
  width: 10.5%;
  top: 9%;
  left: 52.5%;
  cursor:pointer;
  animation: none;
}

.foot{
  background-image:url("/anger/angerf.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:10%;
  height:10%;
  top:79%;
  left:87%;
}

.kunci{
  background-image:url("/anger/anger1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 10%;
  height:10%;
  top: 78%;
  left: 83%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;    
}

.kunci:hover{
  background-image:url("/anger/anger1.png");
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
.cakar{
  width: 11%;
  top: 25.8%;
  left: 2.5%;
}
.teropong{
  width: 13%;
  top: 79%;
  left: 10.5%;
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
.foto-popup {
  z-index: 71;
}
</style>