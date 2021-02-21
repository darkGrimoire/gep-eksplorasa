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
          <div class="genteng" />
          <div class="meong" />
          <div class="open" />
          <div class="keset">
            <img src="/teras/keset 1.png">
          </div>
          <div class="jen1">
            <img src="/teras/jki 1.png">
          </div>
          <div class="jen2">
            <img src="/teras/jka 1.png">
          </div>
          <div v-show="white" class="white"/>
          <div v-show="close" @click="close=false;white=true;zoomIn();switchSlide(1)" class="imgpintu"/>
          <div v-show="!close" class="gifpintu"/>
          <div class="bg">
            <img src="/teras/bg 2.png">
          </div>
          <div class="lantai">
            <img src="/teras/lt 2.png">
          </div>
          <!-- Tambahin Objek lainnya disini -->
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
          <p class="text">
            APA RASAMU?
          </p>
          <div class="genteng2"/>
          <div class="joy" @click="goToEmosi('joy')" />
          <div class="fear" @click="goToEmosi('fear')" />
          <div class="sadness" @click="goToEmosi('sad')" />
          <div class="anger" @click="goToEmosi('anger')" />
          <div class="bg">
            <img src="/teras/bg 2.png">
          </div>
          <div class="lantai">
            <img src="/teras/lt 2.png">
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
  const NEXT_ROOM = '/ruangan/template'
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  export default {
    name: "TemplateRuangan",
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
          slide1: -50,
          slide2: 150
        },
        msg: 'Pesan Kurator Here',
        close:true,
        white:false
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
          gsap.to(this.base, {slide0: -250, slide1: -150, slide2: -50,delay:3})
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
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard
      localStorage.setItem('template', true)
      // wait for loading to finish
      gsap.to('.loading', {opacity: 0, delay: 1, duration: .2, onComplete: () => {
        document.getElementsByClassName('loading')[0].style.display = 'none'
        // TODO: Add on enter animation here
        this.slide = 1
      }})
      setTimeout(() => {
        this.preloadImages()
      }, 1000)
    },
    methods: {
      preloadImages(){
        new Image().src = '/teras/h3 1.png'
        new Image().src = '/teras/F3 1.png'
        new Image().src = '/teras/s3 1.png'
        new Image().src = '/teras/A3 1.png'
        new Image().src = '/teras/p2 1.png'
        new Image().src = '/teras/meong1 1.png'
      },
      goToEmosi(str){
        this.$router.push({path: "/ruangan/" + str})
      },
      switchSlide(val){
        this.slide += val
        gsap.to(this.$data, {computedDisplacement: 0, transformed: 0})
      },
      zoomIn(){
        gsap.to("#slide1", {duration:3,scale:2})
      }
      ,
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

.bg{
  width: 100%;
  height:75%;
  z-index:0;
}

.lantai{
    width: 100%;
    height:25%;
    z-index:0;
}

.imgpintu{
  width:20%;
  height:55%;
  top : 20.9%;
  left : 40%;
  background-image:url("/teras/p1 1.png");
  background-size:contain;
  position:absolute;
}

.imgpintu:hover{
    width:20%;
    height:60.9%;
    top : 19%;
    left : 40%;
    background-image:url("/teras/p2 1.png");
    background-repeat:no-repeat;
    cursor:pointer;
    position:absolute;
}

.gifpintu{
  width:30%;
  height:65%;
  top : 17.4%;
  left : 37%;
  background-image:url("/teras/activepintu.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
}


.jen1 img{
    width:20%;
    top:23%;
    left:9%;
    z-index:1;
    position:absolute;
}

.jen2 img{
    top:23%;
    width:20%;
    left:70%;
    z-index:1;
    position:absolute;   
}

.keset{
    width:100%;
    display:flex;
    justify-content:center;
}
.keset img{
    width:25%;
    top:77%;
    position:absolute;
}

.meong{
    background-image:url("/teras/meong2 1.png");
    background-size:contain;
    background-repeat:no-repeat;
    width :20%;
    height:20%;
    top:65%;
    left:70%;
    position:absolute;
}

.meong:hover{
    background-image:url("/teras/meong1 1.png");
    background-size:contain;
    background-repeat:no-repeat;
    width :25%;
    height:22%;
    top:62%;
    left:70%;
    position:absolute;   
}

.genteng{
    background-image:url("/teras/genteng.png");
    background-size:contain;
    background-repeat:no-repeat;
    width:100%;
    height:100%;
    bottom:80%;
    position:absolute;
}

.genteng2{
    background-image:url("/teras/genteng.png");
    background-size:contain;
    background-repeat:no-repeat;
    width:100%;
    height:100%;
    bottom:95%;
    position:absolute;
}


.open{
  background-image:url("/teras/open 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  width:13%;
  height:13%;
  top:41%;
  left:11.5%;
  z-index:3;
  position:absolute;    
}

.open:hover{
  background-image:url("/teras/open me 2.png");
  background-size:contain;
  background-repeat:no-repeat;
  width:9%;
  height:13%;
  top:40.8%;
  left:11.1%;
  z-index:3;
  position:absolute;    
}

.cont-emotion{
  display:flex;
  flex-flow : row;
  width:100%;
  height:75%;
  position:absolute;
  justify-content:center;
  align-content:center;
  justify-items:center;
  align-items:center;
}

.joy{
  background-image:url("/teras/h0.gif");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  padding-left:10%;
  top : 25%;
  left : 11.5%;
  position:absolute; 
}

.fear{
  background-image:url("/teras/f0.gif");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 31.5%;
  padding-left:10%;
  position:absolute;   
}

.sadness{
  background-image:url("/teras/s0.gif");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 51.5%;
  padding-left:10%;
  position:absolute;   
}

.anger{
  background-image:url("/teras/a0.gif");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 71.5%;
  padding-left:10%;
  position:absolute;   
}

.joy:hover{
  background-image:url("/teras/h3 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  padding-left:10%;
  top : 25%;
  left : 11.4%;
  cursor:pointer;
  position:absolute;   
}

.fear:hover{
  background-image:url("/teras/F3 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 31.44%;
  padding-left:10%;
  cursor:pointer;
  position:absolute;  
}

.sadness:hover{
  background-image:url("/teras/s3 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 51.5%;
  padding-left:10%;
  cursor:pointer;
  position:absolute;   
}

.anger:hover{
  background-image:url("/teras/A3 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  width :15.5%;
  height:45%;
  top : 25%;
  left : 71.4%;
  padding-left:10%;
  cursor:pointer;
  position:absolute;   
}

.text{
  position:absolute;
  font-family:'Mechanical Pencil';
  text-align:center;
  top:14%;
  left:40%;
  font-size:42px;
}

.white{
  width:100%;
  height:100%;
  background-color:#ffffff;
  z-index:99;
  position:absolute;
  transition:ease-in 2s;
  transition-delay:1s; 
}
// Add Objects positions here
</style>