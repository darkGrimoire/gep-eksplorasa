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
          <div class="cont video center-anchor">
            <video id="videoElement" autoplay="true" />
            <img id="frame" :src="frame" alt="frame">
            <button id="captureButton" @click="capture">
              Capture
            </button>
            <button id="prev" @click="switchFrame(-1)">
              Previous Frame
            </button>
            <button id="next" @click="switchFrame(1)">
              Next Frame
            </button>
            <a id="link" style="display: none;" />
            <canvas id="snapshotCanvas" style="display: none;" />
            <button v-show="displayBlackScreen" id="downloadButton" @click="download">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
    <rcp />
    <!-- <transition v-if="displayBlackScreen" name="fade" appear>
      <div v-if="displayBlackScreen" class="black-screen" />
    </transition> -->
  </div>
</template>

<script>
// TODO: Buat agar top-cont bisa di drag pake javascript
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
        xBoundary: undefined,
        canvas: undefined,
        ctx: undefined,
        video: undefined,
        frame: "/testing/frame1.png",
        frames: ["/testing/frame1.png", "/testing/frame2.png"],
        displayBlackScreen: false,
        newCanvas: undefined
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
      this.setupScreenshot()
      this.startCamera()
    },
    methods: {
      setupScreenshot(){
        this.canvas = document.querySelector("#snapshotCanvas")
        this.ctx = this.canvas.getContext('2d')
        this.video = document.querySelector("#videoElement")
      },
      switchFrame(n){
        let cur_frame = this.frames.findIndex(x => x === this.frame)
        let frames_len = this.frames.length
        if (cur_frame+n === -1) {
          cur_frame+=frames_len
        }
        this.frame = this.frames[(cur_frame+n) % frames_len]
      },
      capture(){
        var newContext
        var scaleFactor = 1280/this.canvas.width //How much we scale?
        this.newCanvas = document.createElement('canvas')
        newContext = this.newCanvas.getContext('2d')
        this.newCanvas.width = this.canvas.width * scaleFactor
        this.newCanvas.height = this.canvas.height * scaleFactor
        newContext.scale(scaleFactor, scaleFactor)
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
        newContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)

        var frameObj = new Image()
        frameObj.src = this.frame

        frameObj.onload = () => {
          this.ctx.drawImage(frameObj, 0, 0, this.canvas.width, this.canvas.height)
          newContext.drawImage(frameObj, 0, 0, this.canvas.width, this.canvas.height)
        }
        this.canvas.style.display = "block"
        this.displayBlackScreen = true
        setTimeout(() => {
          this.canvas.style.display = "none"
          this.displayBlackScreen = false
        }, 5000)
      },
      download(){
        var link = document.getElementById('link')
        link.setAttribute('download', 'MintyPaper.png')
        link.setAttribute('href', this.newCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"))
        link.click()
      },
      startCamera(){
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: "user"
            }})
            .then(stream => {
              this.video.srcObject = stream
              this.video.addEventListener('loadedmetadata', () => {
                this.canvas.height = this.video.clientHeight
                this.canvas.width = this.video.clientWidth
              })
            })
            .catch(e => {
              console.log("Something went wrong!")
              console.log(e)
            })
        }
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

.cont {
  position: absolute;
  line-height: 0;
  user-select: none;
  img {
    line-height: 0;
    width: 100%;
  }
}

.video {
  left: 50%;
  top: 50%;
  width: 50%;
  border: 10px #333 solid;
  button {
    position: absolute;
  }
  #prev{
    left: 0;
    bottom: -10%;
  }
  #next{
    right: 0;
    bottom: -10%;
  }
  #videoElement {
    width: 100%;
    background-color: #666;
  }
  #captureButton, #downloadButton {
    bottom: 10%;
    right: 10%;
    z-index: 11;
  }
  #snapshotCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  #frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.center-anchor {
  transform: translate(-50%,-50%);
}

.black-screen {
  background-color: black;
  opacity: 0.7;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>