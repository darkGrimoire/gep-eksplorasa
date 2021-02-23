<template>
  <div class="main">
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
          <div class="meong" @click="catAudio.currentTime = 0.2;catAudio.play()" />
          <div class="open" @click="toggleTeaser" />
          <div class="keset">
            <img src="/teras/keset 1.png">
          </div>
          <div class="jen1">
            <img src="/teras/jki 1.png">
          </div>
          <div class="jen2">
            <img src="/teras/jka 1.png">
          </div>
          <div v-show="close" class="imgpintu" @click="close=false;white=true;zoomIn();" />
          <!-- <div v-show="close" class="imgpintu" @click="showAlert()" /> -->
          <div v-show="!close" class="gifpintu" />
          <div class="bg">
            <img src="/teras/bg 2.png">
          </div>
          <div class="lantai">
            <img src="/teras/lantai.png">
          </div>
          <!-- Tambahin Objek lainnya disini -->
          <div class="youtube-backdrop" style="display:none;" @click="toggleTeaser" />
          <div class="cont youtube-container" style="display:none;">
            <youtube ref="youtube" :video-id="'U5a4BPXM6ac'" :player-vars="playerVars" @ended="restart" />
          </div>
          <div v-if="!isInstruksi1" class="instruksi1">
            <img :src="instruksiImg" alt="instruksi" @click="fadeInstruksi">
          </div>
          <div class="instruksi2" style="display: none;">
            <img src="/instruksi/transisiy-swipe-hp.gif" alt="instruksi">
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
          <p class="text">
            APA RASAMU?
          </p>
          <div class="genteng2" />
          <div class="joy" @click="goToEmosi('joy')" />
          <div class="fear" @click="goToEmosi('fear')" />
          <div class="sadness" @click="goToEmosi('sad')" />
          <div class="anger" @click="goToEmosi('anger')" />
          <div class="bg">
            <img src="/teras/bg 2.png">
          </div>
          <div class="lantai">
            <img src="/teras/lantai.png">
          </div>
          <div class="back-button back-button-second" @click="reverseAnimation">
            BACK
          </div>
        </div>
      </div>
    </div>
    <div class="sound-controller" @click="changeMute()">
      SOUND
    </div>
    <rcp />
    <nuxt-link class="events-button" tag="div" to="/events" :no-prefetch="true">
      Events
    </nuxt-link>
    <nuxt-link class="back-button" :to="'/'">
      Back
    </nuxt-link>
  </div>
</template>

<script>
import { Youtube } from 'vue-youtube'
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
      Youtube
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
        close:true,
        white:false,
        playerVars: {
          autoplay: 0,
          rel: 0
        },
        showTeaser: false,
        catAudio: undefined,
        audio: undefined,
        isInstruksi1: false,
        instruksiImg: '/instruksi/1.png'
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
      },
      showTeaser(newVal) {
        if (newVal){
          document.getElementsByClassName('youtube-backdrop')[0].style.display = 'block'
          document.getElementsByClassName('youtube-container')[0].style.display = 'block'
          gsap.to('.youtube-backdrop', {opacity: .85, duration: .5})
        } else {
          gsap.to('.youtube-backdrop', {opacity: 0, duration: .5, onComplete: () => {
            document.getElementsByClassName('youtube-backdrop')[0].style.display = 'none'
            document.getElementsByClassName('youtube-container')[0].style.display = 'none'
          }})
        }
      },
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
      this.audio.pause()
      this.audio.currentTime = 0
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      // wait for loading to finish
      gsap.to('.loading', {opacity: 0, delay: 1, duration: .2, onComplete: () => {
        document.getElementsByClassName('loading')[0].style.display = 'none'
        // TODO: Add on enter animation here
        this.slide = 1
        this.catAudio = new Audio('/cat.mp3')
      }})
      setTimeout(() => {
        this.preloadImages()
      }, 1000)

      localStorage.setItem('last', this.$route.path)
      this.audio = new Audio('/songs/teras.mp3')
      this.audio.volume = 0.4
      this.audio.play()
      this.isInstruksi1 = (localStorage.getItem('instruksi_1') || false)
      if (window.matchMedia("(orientation: portrait)").matches){
        this.instruksiImg = '/instruksi/1 hp.png'
      }
      if (!this.isInstruksi1){
        localStorage.setItem('instruksi_1', true)
      }
    },
    methods: {
      fadeInstruksi(){
        gsap.to('.instruksi1', {opacity: 0, duration: 1, onComplete: () => {
          document.getElementsByClassName('instruksi1')[0].style.display = 'none'
          if (window.matchMedia("(orientation: portrait)").matches){
            document.getElementsByClassName('instruksi2')[0].style.display = 'block'
            gsap.to('.instruksi2', {opacity: 1, duration: 1})
            gsap.to('.instruksi2', {opacity: 0, duration: 1, delay: 3.5, onComplete: () => {
              document.getElementsByClassName('instruksi2')[0].style.display = 'none'
            }})
          }
        }})
      },
      reverseAnimation(){
        document.getElementById('slide1').style.display = 'block'
        gsap.to('#slide1', {opacity: 1, duration: .5, delay: .3})
        gsap.to('#slide2', {opacity: 0, duration: 1, delay: .3})
        gsap.to(this.base, {slide0: -150, slide1: -50, slide2: 50, duration: .1, delay: 1.1})
        gsap.to("#slide1", {duration:3,scale:1, ease: 'power4.out', onComplete: () => {
          this.close = !this.close
          this.switchSlide(-1)
        }})
      },
      toggleTeaser(){
        this.showTeaser = !this.showTeaser
      },
      restart(){
        this.player.cueVideoById(this.dataKarya.videoId)
      },
      showAlert(){
        alert("Sayangnya, pintu masih belum bisa dibuka :(\nCoba lagi ya tanggal 22 Februari 2021!")
      },
      preloadImages(){
        new Image().src = '/teras/h3 1.png'
        new Image().src = '/teras/F3 1.png'
        new Image().src = '/teras/s3 1.png'
        new Image().src = '/teras/A3 1.png'
        new Image().src = '/teras/p2 1.png'
        new Image().src = '/teras/meong1 1.png'
        new Image().src = '/teras/open me 2.png'
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
        gsap.to("#slide1", {duration:1,scale:25,delay:3, ease: 'power4.in', onComplete: () => {
          this.switchSlide(1)
        }})
        gsap.to(this.base, {slide0: -150, slide1: -50, slide2: -50, duration: .1, delay: 3.6})
        gsap.to('#slide2', {opacity: 1, duration: .5, delay: 3.9})
        gsap.to('#slide1', {opacity: 0, duration: 1, delay: 3.9, onComplete: () => {
          document.getElementById('slide1').style.display = 'none'
        }})
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
    },
  }
</script>

<style lang="scss" scoped>
.back-button {
  position: fixed;
  left: 5%;
  bottom: 7%;
  color: #ede5d1;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 5;
  text-decoration: none;
  opacity: 0.4;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    text-decoration: none;
    opacity: .9;
  }
  @media only screen and (max-width: 800px) {
    position: fixed;
    left: 5%;
    bottom: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    bottom: 3%;
    font-size: 30px;
  }
}
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
  cursor: pointer;
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

#slide2 {
  opacity: 0;
}

.youtube-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.youtube-backdrop{
  position: absolute;
  top: 0;
  left: 0;
  width: 200vw;
  height: 400vh;
  transform: translate(-50%, -50%);
  z-index: 99;
  background-color: black;
  opacity: 0;
}

.events-button {
  position: fixed;
  font-family: 'KG Happy Solid';
  right: 5%;
  bottom: 7%;
  font-size: 40px;
  z-index: 5;
  color: #ede5d1;
  opacity: .4;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: .9;
    cursor: pointer;
  }
  @media only screen and (max-width: 800px) {
    position: fixed;
    right: 5%;
    bottom: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    bottom: 3%;
    font-size: 30px;
  }
}

.sound-controller {
  position: absolute;
  top: 20px;
  left: 50vw;
  transform: translate(-50%);
  font-family: "KG Happy Solid";
  font-size: 40px;
  color: black;
  opacity: 0.5;
  transition: opacity .4s;
}
.sound-controller:hover {
  cursor: pointer;
  opacity: 0.8;
}

.instruksi1 {
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
    transform: scale(.5);
    object-fit: contain;
  }
}
.instruksi2 {
  position: absolute;
  top: 97%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 15000;
  opacity: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>