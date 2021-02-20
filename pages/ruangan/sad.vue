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
          <div class="book"></div>
          <div class="podcast"></div>
          <div class="single"></div>
          
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
          <div class="lemari">
          </div>
          <div class="cont meja-pot">
            <img src="/sad/mejaa.png" alt="meja">
          </div>
          <div class="cont tv">
            <img src="/sad/tv.png" alt="tv">
          </div>
          <div class="zine"></div>
          <div class="article"></div>
          <div class="foot" v-show="benda.key"></div>
          <div class="key" @click="benda.key = true;slide=3"></div>
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
  const NEXT_ROOM = '/ruangan/anger'
  const CLOSING = '/test/resetruangan'
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
          lampu: true,
          key:false
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
          if (this.isAllRoomVisited()){
            this.$router.push({path: CLOSING})
          } else {
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
          }
        }
      }
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard
      localStorage.setItem('sad', true)

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
      goToEmosi(str){
        this.$router.push({path: "/ruangan/" + str})
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