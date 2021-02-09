<template>
  <div class="main">
    <div class="top-cont" 
         :style="{'transform': 'translate(calc(-50% '+sign+' '+Math.abs(computedDisplacement)+'px), -50%)'}" 
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
          <div class="cont cat">
            <img src="/cat.png" alt="cat">
          </div>
          <div class="cont kursi">
            <img src="/kursi.png" alt="kursi">
          </div>
          <div class="cont pintu center-anchor">
            <img src="/door.png" alt="kursi">
          </div>
          <div class="cont sign center-anchor">
            <img src="/sign.png" alt="sign">
          </div>
          <div class="cont sign">
            <img src="/sign.png" alt="sign">
          </div>
        </div>
      </div>
    </div>
    <div class="slide-controls">
      <fa :icon="['fas', 'chevron-left']" class="right-arrow arrow" />
      <fa :icon="['fas', 'chevron-right']" class="left-arrow arrow" />
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
    name: "Test",
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
        xBoundary: undefined
      }
    },
    computed: {
      sign() {
        return this.computedDisplacement >= 0 ? '+' : '-'
      }
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
    },
    methods: {
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
          // console.log(`target: ${targetDisplacement}`)
          // console.log(`transformed: ${this.transformed}`)
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
        // console.log(`resize! ${this.xBoundary} | ${this.computedDisplacement}`)
      }
    },
  }
</script>

<style lang="scss">
html {
  overflow: hidden;
}
.main {
  background-color: white;
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
  padding-bottom: 62.5%;
  @media only screen and (orientation: portrait) {
    width: 200%;
    padding-bottom: 125%;
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
  font-size: 100px;
  color: white;
  z-index: 99;
  .arrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    &:hover {
      color: yellow;
      transition: color 0.5s;
    }
  }
  .right-arrow {
    left: 20px;
  }
  .left-arrow {
    right: 20px;
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

.cat {
  left: 15%;
  bottom: 25%;
  width: 14%;
}

.kursi {
  left: 75%;
  top: 50%;
  width: 18%;
}

.pintu {
  left:50%;
  top: 50%;
  width:18%;
}

.center-anchor {
  transform: translate(-50%,-50%);
}

.sign {
  top: 0;
  left: 0;
  width: 10%;
  border: 1px solid red;
}

.sign.center-anchor {
  filter: grayscale(100%);
}
</style>