<template>
  <div class="main">
    <div class="slide-controls">
      <fa v-show="slide === 2" :icon="['fas', 'chevron-left']" class="left-arrow arrow" @click="switchSlide(-1)" />
      <fa v-show="slide === 1" :icon="['fas', 'chevron-right']" class="right-arrow arrow" @click="switchSlide(1)" />
    </div>

    <div class="loading" style="position: absolute; background-color: black; opacity: 1; z-index: 9999; width: 100vw; height: 100vh;" />
    <div v-show="slide === 3" class="narasi">
      {{ msg }}
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
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/template-example/kitj1.png" alt="guide" style="opacity: .0;">
          </div>
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/anger/wall.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/anger/lt.png" alt="floor">
          </div>
          <div class="cont kulkas">
            <img src="/anger/kulklos.png" alt="kulkas" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)" >
          </div>
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
          <div class="cont figura">
            <img src="/anger/a-single-1.png" alt="figura" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont koran">
            <img src="/anger/a-artikel-1.png" alt="koran" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont sampah">
            <img src="/anger/gep anger sampah.png" alt="sampah" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont garpu">
            <img src="/anger/gep anger garpu.png" alt="garpu">
          </div>
          <div class="cont garpu1">
            <img src="/anger/gep anger berserakan.png" alt="garpu1"  :style="`opacity: ${benda.garpu}`" @mouseenter="benda.garpu = 1" @mouseout="benda.garpu = 0">
          </div>
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
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/template-example/kitj2.png" alt="guide" style="opacity: .0;">
          </div>
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
          <div class="cont tv">
            <img src="/anger/tgif.gif" alt="tv">
          </div>
          <div class="cont kran">
            <img src="/anger/kran.gif" alt="kran">
          </div>
          <div class="cont gantungan">
            <img src="/anger/a-photo series-1.png" alt="gantungan" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont buku">
            <img src="/anger/a-photobook-1.png" alt="buku" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont cakar">
            <img src="/anger/gep anger scar.png" alt="cakar" :style="`opacity: ${benda.cakar}`" @mouseenter="benda.cakar = 1" @mouseout="benda.cakar = 0">
          </div>
          <div class="cont teropong">
            <img src="/anger/tropong anger.png" alt="teropong">
          </div>
          <div class="cont pisau">
            <img src="/anger/gep anger piso bersih.png" alt="pisau" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont kaki">
            <img src="/anger/angerf.gif" alt="kaki">
          </div>
          <div class="cont kunci">
            <img src="/anger/anger1.png" alt="kunci">
          </div>
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
  export default {
    name: "Anger",
    components: {
      rcp,
    },
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
        msg: 'Pesan Kurator Here',
        benda: {
          cakar: 0,
          garpu: 0
        }
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
          // if (this.isAllRoomVisited()){
          //   this.$router.push({path: CLOSING})
          // } else {
            gsap.to(this.base, {duration: 3, ease: 'none' ,slide0: -350, slide1: -250, slide2: -150})
            gsap.to('.transitionfade-out', {x: '40%', duration: .7})
            gsap.to('.transitionfade-out', {x: '0', duration: 1.3, ease: 'none', delay: .7})
            gsap.to('.narasi', {opacity: 1, duration: 2, delay: 2})
            document.getElementsByClassName('loading')[0].style.display = 'block'
            gsap.to('.loading', {opacity: 1, duration: 1, delay: 5, onComplete: () => {
              if (this.isAllRoomVisited()){
                this.$router.push({path: CLOSING})
                } else {
                this.$router.push({path: NEXT_ROOM})
              }
            }})
          // }
        }
      }
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard
      localStorage.setItem('anger', true)

      // wait for loading to finish
      gsap.to('.loading', {opacity: 0, delay: 1, duration: .2, onComplete: () => {
        document.getElementsByClassName('loading')[0].style.display = 'none'
        // TODO: Add on enter animation here
        this.slide = 1
      }})
    },
    methods: {
      switchSlide(val){
        this.slide += val
        gsap.to(this.$data, {computedDisplacement: 0, transformed: 0})
      },
      isAllRoomVisited(){
        return localStorage.getItem('joy') && localStorage.getItem('fear') && localStorage.getItem('sad') && localStorage.getItem('anger')
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
        this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
        if (window.matchMedia("(orientation: landscape)").matches){
          this.computedDisplacement = 0
          this.transformed = 0
        }
      },
      handleKeyboard(e){
        // DEBUGGING PURPOSE
        if (this.slide === 2 && e.key === "ArrowRight"){
          this.switchSlide(1)
        }


        if (this.slide === 2 && e.key === "ArrowLeft"){
          this.switchSlide(-1)
        } else if (this.slide === 1 && e.key === "ArrowRight"){
          this.switchSlide(1)
        }
      },

        
      handleObjChange(e){
        console.log(e)
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
        console.log(e)
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
  transform: translate(-50%,0);
  z-index: 99;
  font-family: 'Mechanical Pencil';
  font-size: 75px;
  color: rgba($color: white, $alpha: .9);
  // background-image: linear-gradient(to right, rgba($color: white, $alpha: .1), transparent);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent; 
  // -moz-background-clip: text;
  // -moz-text-fill-color: transparent;
  opacity: 0;
  text-align: center;
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

.bounce-7 {
  animation-name: bounce-7;
  animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
}
@keyframes bounce-7 {
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0); }
  30%  { transform: scale(.9,1.1)   translateY(-10px); }
  50%  { transform: scale(1.05,.95) translateY(0); }
  57%  { transform: scale(1,1)      translateY(-7px); }
  64%  { transform: scale(1,1)      translateY(0); }
  100% { transform: scale(1,1)      translateY(0); }
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
  width: 23.4%;
  top: 16.8%;
  left: 3.5%;
  animation: bounce-7 1s;
  animation-iteration-count: infinite;
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
.figura{
  width: 8%;
  top: 14%;
  left: 55.5%; 
}
.koran{
  width: 17.5%;
  top: 76.5%;
  left: 43%;
}
.garpu{
  width: 8.5%;
  top: 13.5%;
  left: 83.5%;
}
.garpu1{ 
  width: 17.5%;
  top: 76.5%;
  left: 81%;
}
.sampah{
  width: 12%;
  top: 35.9%;
  left: 83.9%;
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
  width: 12%;
  top: 30.5%;
  left: 77.5%;
}
.kran{
  width: 38.5%;
  top: 37%;
  left: 22.5%;
}
.gantungan{
  width: 10.5%;
  top: 9%;
  left: 52.5%;
}
.buku{  
  width: 17%;
  top: 73%;
  left: 30.5%;
}
.pisau{
  width: 20%;
  top: 65%;
  left: 53.5%;
}
.kaki{
  width: 13%;
  top: 78%;
  left: 85.5%;
}
.kunci{
  width: 7%;
  top: 78%;
  left: 80.5%;
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
</style>