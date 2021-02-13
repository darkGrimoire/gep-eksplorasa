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
          <div v-show="!benda.lampu" class="cont darkness" />
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/guide-sad1.png" alt="guide" style="opacity: 0;">
          </div>
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
            <img src="/sad/ezgif.png" alt="window">
          </div>
          <div v-show="!benda.lampu" class="cont meja-belajar">
            <img src="/sad/nightstand.png" alt="meja belajar" @click="benda.lampu = true">
          </div>
          <div v-show="benda.lampu" class="cont meja-belajar">
            <img src="/sad/nightstand3.png" alt="meja belajar" @click="benda.lampu = false" style="width: 96%;">
          </div>
          <div class="cont poster">
            <img src="/sad/psotersad.png" alt="poster">
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
          <div v-show="!benda.lampu" class="cont darkness" />
          <div class="cont guide" style="display: none;">
            <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
            <img src="/guide-sad2.png" alt="guide" style="opacity: 0;">
          </div>
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/sad/bgsad.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/sad/lantaisad.png" alt="floor">
          </div>
          <div class="cont lemari">
            <img src="/sad/lemari3.png" alt="lemari">
          </div>
          <div class="cont meja-pot">
            <img src="/sad/mejaa.png" alt="meja">
          </div>
          <div class="cont tv">
            <img src="/sad/tv.png" alt="tv">
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
    name: "Sad",
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
          lampu: true
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

.lemari {
  width: 43%;
  top: 15.5%;
  left: -2.5%;
}

.meja-pot {
  width: 40%;
  top: 22.1%;
  left: 31%;
}

.tv {
  width: 35%;
  top: 28.8%;
  left: 64.9%;
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