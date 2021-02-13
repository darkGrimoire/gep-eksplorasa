<template>
  <div class="main">
    <div class="slide-controls">
      <fa v-show="slide === 2" :icon="['fas', 'chevron-left']" class="left-arrow arrow" @click="switchSlide(-1)" />
      <fa v-show="slide === 1" :icon="['fas', 'chevron-right']" class="right-arrow arrow" @click="switchSlide(1)" />
    </div>

    <div class="loading" style="position: absolute; background-color: black; opacity: 1; z-index: 9999; width: 100vw; height: 100vh;" />
    
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
          <div v-show="benda.saklar" class="cont darkness" />
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/guide-fear1.png" alt="guide" style="opacity: 0;">
          </div>
          <div class="cont wall">
            <img src="/fear/bg 1.png" alt="wall">
          </div>
          <div class="cont mesin-cuci">
            <img src="/fear/mesin-cuci.gif" alt="mesin cuci">
          </div>
          <div class="cont pel">
            <img src="/fear/pelan 1.png" alt="pel">
          </div>
          <div class="cont pipa">
            <img src="/fear/pipa 1.png" alt="pipa">
          </div>
          <div class="cont floor">
            <img src="/fear/lantai 1.png" alt="floor">
          </div>
          <div class="cont tangga">
            <img src="/fear/tangga 1.png" alt="tangga">
          </div>
          <div class="cont dinding-robek">
            <img src="/fear/crack 1.png" alt="robekan">
          </div>
          <div class="cont rak-broken">
            <img src="/fear/rak 1.png" alt="rak">
          </div>
          <div class="cont lemari">
            <img src="/fear/lemari.gif" alt="lemari">
          </div>
          <div class="cont bochor">
            <img src="/fear/bocor 1.png" alt="bocor">
          </div>
          <div class="cont web">
            <img src="/fear/jaring 1.png" alt="jaring laba-laba">
          </div>
          <div class="cont saklar">
            <img src="/fear/saklar 1.png" alt="saklar" @click="toggleSaklar">
          </div>
          <div class="cont lampu">
            <img src="/fear/lampu 1.png" alt="lampu">
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
          <div v-show="benda.saklar" class="cont darkness" />
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/guide-fear3.png" alt="guide" style="opacity: 0;">
          </div>
          <div class="cont wall">
            <img src="/fear/bg 1.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/fear/lantai 1.png" alt="floor">
          </div>
          <div class="cont pintu">
            <img src="/fear/pintu 1.png" alt="pintu">
          </div>
          <div class="cont trap-door">
            <img src="/fear/monster1 1.png" alt="trap door" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div class="cont tv">
            <img src="/fear/tv.gif" alt="tv">
          </div>
          <div v-show="!benda.saklar" class="cont sadako">
            <img src="/fear/sadako 1.png" alt="sadako" :style="`opacity: ${benda.sadako}`" @mouseenter="benda.sadako = 1" @mouseout="benda.sadako = 0">
          </div>
          <div v-show="benda.saklar" class="cont sadako">
            <img src="/fear/sadako 1.png" alt="sadako">
          </div>
          <div class="cont sofa">
            <img src="/fear/kursi 1.png" alt="sofa">
          </div>
          <div class="cont ventilasi">
            <img src="/fear/vent 1.png" alt="ventilasi">
          </div>
          <div v-show="!benda.saklar" class="cont foto">
            <img src="/fear/fohepi 1.png" alt="foto" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div>
          <div v-show="benda.saklar" class="cont foto">
            <img src="/fear/fokripi 1.png" alt="foto">
          </div>
          <div class="cont tikus1">
            <img src="/fear/rat 1 1.png" alt="tikus">
          </div>
          <div class="cont tikus2">
            <img src="/fear/rat 2 1.png" alt="tikus">
          </div>
          <div v-show="!benda.saklar" class="cont hantu1">
            <img src="/fear/setanmini 1.png" alt="hantu" :style="`opacity: ${benda.setanmini}`" @mouseenter="benda.setanmini = 1" @mouseout="benda.setanmini = 0">
          </div>
          <div v-show="benda.saklar" class="cont hantu1">
            <img src="/fear/setanmini 1.png" alt="hantu">
          </div>
          <div class="cont box">
            <img src="/fear/box 1.png" alt="box">
          </div>
          <div class="cont bat">
            <img src="/fear/bat 1.png" alt="bat">
          </div>
          <div class="cont pipa-l">
            <img src="/fear/pipaHAPE 1.png" alt="pipa">
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
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  export default {
    name: "Fear",
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
          saklar: false,
          sadako: 0,
          setanmini: 0
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
          if (oldVal > 2)
            gsap.to('.transitionfade-out', {x: '100%', duration: .5, delay: .2})
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
        }
      }
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard
      
      // wait for loading to finish
      gsap.to('.loading', {opacity: 0, duration: .2, onComplete: () => {
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
        if (this.slide === 2 && e.key === "ArrowLeft"){
          this.switchSlide(-1)
        } else if (this.slide === 1 && e.key === "ArrowRight"){
          this.switchSlide(1)
        }
      },
      handleObjChange(e){
        console.log(e)
        if (e.target.getAttribute('src') === "/fear/fohepi 1.png"){
          e.target.setAttribute('src', "/fear/fokripi 1.png")
        } else if (e.target.getAttribute('src') === "/fear/monster1 1.png"){
          e.target.setAttribute('src', "/fear/monster2 1.png")
        }
      },
      handleObjChangeEnd(e){
        console.log(e)
        if (e.target.getAttribute('src') === "/fear/fokripi 1.png"){
          e.target.setAttribute('src', "/fear/fohepi 1.png")
        } else if (e.target.getAttribute('src') === "/fear/monster2 1.png"){
          e.target.setAttribute('src', "/fear/monster1 1.png")
        }
      },
      toggleSaklar(){
        this.benda.saklar = !this.benda.saklar
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

.wall {
  width: 100%;
  top: -67%;
  left: 0;
}

.floor {
  width: 100%;
  top: 70.5%;
  left: 0;
}

.pintu {
  width: 27%;
  top: 14.4%;
  left: 3.4%;
}

.trap-door {
  width: 17.4%;
  top: 74.7%;
  left: 9.6%;
  z-index: 71;
}

.tv {
  width: 17.2%;
  top: 32%;
  left: 36.2%;
}

.sadako {
  width: 15.8%;
  top: 43.3%;
  left: 35.5%;
  z-index: 71;
}

.sofa {
  width: 20%;
  top: 35%;
  left: 57.6%;
}

.ventilasi {
  width: 18%;
  top: 5.7%;
  left: 49%;
}

.foto {
  width: 12.2%;
  top: 13%;
  left: 79.5%;
  z-index: 71;
}

.tikus1 {
  width: 14.1%;
  top: 72.3%;
  left: 65.2%;
}

.tikus2 {
  width: 13%;
  top: 70.8%;
  left: 87%;
}

.box {
  width: 20.5%;
  top: 43.7%;
  left: 79%;
}

.bat {
  width: 10.5%;
  top: -7.2%;
  left: 25.8%;
}

.pipa-l {
  width: 55%;
  top: -116%;
  left: -4%;
}

.hantu1 {
  width: 8.7%;
  top: 39%;
  left: 85%;
  z-index: 71;
}

.tangga {
  width: 31.5%;
  top: 1.1%;
  left: 0;
}

.dinding-robek {
  width: 7.8%;
  top: 6%;
  left: 25%;
}

.mesin-cuci {
  width: 18.7%;
  top: 43.5%;
  left: 29.5%;
}

.rak-broken {
  width: 17.8%;
  top: 27.7%;
  left: 48.7%;
}

.lemari {
  width: 17.2%;
  top: 21.3%;
  left: 68.5%;
}

.pel {
  width: 12.4%;
  top: 29.8%;
  left: 87%;
}

.pipa {
  width: 12%;
  top: -71%;
  left: 91.8%;
}

.bochor {
  width: 35.5%;
  top: 67%;
  left: 64.5%;
}

.web {
  width: 10%;
  top: -14.5%;
  left: 86.5%;
}

.saklar {
  width: 4%;
  top: 36%;
  left: 86.5%;
  z-index: 71;
}

.lampu {
  width: 16%;
  top: -36.8%;
  left: 41.2%;
}

.darkness {
  background-color: black;
  opacity: .8;
  z-index: 70;
  width: 150%;
  height: 200%;
  top: -50%;
}
</style>