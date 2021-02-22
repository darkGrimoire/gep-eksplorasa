<template>
  <div class="main">
    <div class="loading" style="position: absolute; background-color: black; opacity: 1; z-index: 9999; width: 100vw; height: 100vh;" />
    <div v-show="slide === 2" class="narasi">
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
          <!-- <div class="cont guide"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/template-example/closing.png" alt="guide" style="opacity: .0;">
          </div> -->
          <!-- Tambahin Objek lainnya disini -->
          <div class="cont wall">
            <img src="/closing/1-paper.png" alt="wall">
          </div>
          <div class="cont lantai">
            <img src="/closing/lt.png" alt="lantai">
          </div>
          <div class="cont sofa">
            <img src="/closing/sofa.png" alt="sofa">
          </div>
          <div class="cont tripod">
            <img src="/closing/tripod.png" alt="tripod">
          </div>
          <div class="cont vas">
            <img src="/closing/vas.png" alt="vas">
          </div>
          <div class="cont meja">
            <img src="/closing/meja.png" alt="meja">
          </div>
          <div class="figura" />
          <div class="kamera" />
          <div class="balon" />
         
          <div class="cont gantungan">
            <img src="/closing/foto.png" alt="gantungan">
          </div>
         
          <div class="cont e1">
            <img src="/closing/e1.png" alt="e1">
          </div>
          <div class="cont e4">
            <img src="/closing/e4.png" alt="e4">
          </div>
          <div class="cont e2">
            <img src="/closing/e2.png" alt="e2">
          </div>
          <div class="cont e3">
            <img src="/closing/e3.png" alt="e3">
          </div>
          <div class="cont tulisankamera">
            <img src="/closing/cam3.png" alt="tulisankamera">
          </div>
          <!-- <div class="cont tulisanbalon">
            <img src="/closing/balon3.png" alt="tulisanbalon">
          </div>
          <div class="cont tulisanfigura">
            <img src="/closing/katalog3.png" alt="tulisanfigura">
          </div> -->
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
  const NEXT_ROOM = '/ruangan/template'
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  export default {
    name: "Closing",
    components: {
      rcp,
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
        msg: 'Pesan Kurator Here',
        benda: {
          kamera2: 0,
          balon2: 0,
          figura2: 0
        },
        audio: undefined
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
          if (this.isAllRoomVisited()){
            this.$router.push({path: '/closing'})
          } else {
            gsap.to(this.base, {duration: 3, ease: 'none' ,slide0: -350, slide1: -250, slide2: -150})
            gsap.to('.transitionfade-out', {x: '40%', duration: .7})
            gsap.to('.transitionfade-out', {x: '0', duration: 1.3, ease: 'none', delay: .7})
            gsap.to('.narasi', {opacity: 1, duration: 2, delay: 2})
            document.getElementsByClassName('loading')[0].style.display = 'block'
            gsap.to('.loading', {opacity: 1, duration: 2, delay: 5, onComplete: () => {
              if (this.isAllRoomVisited()){
                this.$router.push({path: '/closing'})
                } else {
                this.$router.push({path: NEXT_ROOM})
              }
            }})
          }
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
      gsap.to('.loading', {opacity: 0, duration: .2, onComplete: () => {
        document.getElementsByClassName('loading')[0].style.display = 'none'
        // TODO: Add on enter animation here
        localStorage.setItem('closing', true)
        this.slide = 1
      }})
      localStorage.setItem('last', this.$route.path)
      this.audio = new Audio('/songs/closing.mp3')
      this.audio.volume = 0.3
      this.audio.play()
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

      handleObjChange(e){
        console.log(e)
        if (e.target.getAttribute('src') === "/closing/gantungan-out2.png"){
          e.target.setAttribute('src', "/closing/gantungan-out.png")
        } else if (e.target.getAttribute('src') === "/closing/balon.png"){
          e.target.setAttribute('src', "/closing/balon1-out.png")
        } else if (e.target.getAttribute('src') === "/closing/cam1.png"){
          e.target.setAttribute('src', "/closing/cam-out.png")
        }
      },
      handleObjChangeEnd(e){
        console.log(e)
        if (e.target.getAttribute('src') === "/closing/gantungan-out.png"){
          e.target.setAttribute('src', "/closing/gantungan-out2.png")
        } else if (e.target.getAttribute('src') === "/closing/balon1-out.png"){
          e.target.setAttribute('src', "/closing/balon1.png")
        } else if (e.target.getAttribute('src') === "/closing/cam-out.png"){
          e.target.setAttribute('src', "/closing/cam1.png")
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
  left: -15%;
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
  width: 110%;
  right: -2%;
  top : -40%;
}
.lantai{
  width: 100%;
  top: 79.5%;
}
.sofa{
  width: 51.5%;
  left: 26%;
  top: 40%;
}
.tripod{
  width: 16.5%;
  left: 77.2%;
  top: 51%;
}
.gantungan{
  width: 33.3%;
  left: 47.4%;
  top: 13%;
}
.meja{
  width: 16.5%;
  left: 6.5%;
  top: 54.5%;
}

.figura{
  background-image:url("/closing/1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:45%;
  width: 15%;
  left: 13%;
  top: 6.5%;
  z-index: 71;
  cursor:pointer;
}

.figura:hover{
  background-image:url("/closing/gantungan-out.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:45%;
  width: 15%;
  left: 13%;
  top: 6.5%;
  z-index: 71;
  cursor:pointer;
}

.kamera{
  background-image:url("/closing/cam1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:45%;
  width: 16%;
  left: 79.2%;
  top: 32%;
  z-index: 71;
  cursor:pointer;
}

.kamera:hover{
  background-image:url("/closing/cam-out.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:45%;
  width: 16%;
  left: 79.2%;
  top: 32%;
  z-index: 71;
  cursor:pointer;
}

.balon{
  background-image:url("/closing/balon1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:50%;
  width: 17%;
  left: 26.2%;
  top: 3%;
  z-index: 71;
  cursor:pointer;
}

.balon:hover{
  background-image:url("/closing/balon1-out.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:50%;
  width: 17%;
  left: 26.2%;
  top: 3%;
  z-index: 71;
  cursor:pointer;
}

.vas{
  width: 6.3%;
  left: 6%;
  top: 30.5%;
}
.e1{
  width: 11%;
  left: 32%;
  top: 41.5%;
}
.e2{
  width: 12.3%;
  left: 50%;
  top: 46%;
}
.e3{
  width: 17%;
  left: 37.9%;
  top: 41.4%;
}
.e4{
  width: 16.5%;
  left: 57%;
  top: 39%;
}
.tulisanbalon{
  width: 8%;
  left: 31.5%;
  top: 11.5%;
}
.tulisankamera{
  width: 16.5%;
  left: 82%;
  top: 24%;
}
.tulisanfigura{
  width: 11.5%;
  left: 13.1%;
  top: 31%;
}

</style>