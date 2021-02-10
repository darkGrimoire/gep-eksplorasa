<template>
  <div class="page-container">
    <canvas 
      ref="canvas" 
      class="canvas"
      @click="handleClick"
      @mousemove="handleMouseMove" 
      @resize="handleResize"
    />
    <div ref="mainContainer" class="main-container">
      <img src="/gif/uc-text.gif" class="text-gif">
      <img src="/gif/house.gif" class="house-gif">
      <div class="countdown-container">
        <div class="count-text">
          <div class="number">
            {{ days }}
          </div>
          <div class="text">
            DAYS Test
          </div>
          <div class="number">
            {{ hours }}
          </div>
          <div class="text">
            HOURS
          </div>
        </div>
        <img src="/gif/countdown.gif" class="count-gif">
      </div>
    </div>
    <div class="link-container">
      <a href="https://www.instagram.com/geplfm/" target="_blank">
        <img class="link" src="/img/ig.png">
      </a>
      <a href="https://www.twitter.com/GEPLFMITB" target="_blank">
        <img src="/img/twitter.png" class="link">
      </a>
    </div>
  </div>
</template>

<script>
const gepDate = new Date(2021, 1, 22)
export default {
  name: 'UnderConstruction',
  data () {
      return {
        timerInterval: null,
        days: 0,
        hours: 0,
        radius: 100,
        canvas: null,
        offsetX: null,
        offsetY: null,
        startX: null,
        startY: null,
        isDown: false
      }
    },
    mounted () {
      this.setupCanvas()
      this.updateTimer()
      this.startCountdown()
      setTimeout(() => this.canvasLogger(), 2000)
    },
    methods: {
      updateTimer () {
        const now = new Date().setMinutes(0,0,0)
        const remainingTime = gepDate - now
        if (remainingTime > 0) {
          const remainingHour = Math.floor(remainingTime / 1000 / 60 / 60)
          this.days = Math.floor(remainingHour / 24) 
          this.hours = Math.floor(remainingHour % 24) 
        } else {
          this.days = 0
          this.hours = 0
        }
      },
      startCountdown () {
        this.timerInterval = setInterval(() => this.updateTimer(), 1000 * 60)
      },
      setupCanvas(){
        const canvas = this.$refs.canvas
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "#d1bb10"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "destination-out"
        this.canvas = ctx
      }, 
      handleMouseMove(e) {
        this.erase(this.getXY(e))
        if (document.elementsFromPoint(e.clientX,e.clientY)[1].className === "link"){
          document.elementsFromPoint(e.clientX,e.clientY)[0].style.cursor = "pointer"
        } else if (document.elementsFromPoint(e.clientX,e.clientY)[0].style.cursor === "pointer") {
          document.elementsFromPoint(e.clientX,e.clientY)[0].style.cursor = "default"
        }
      },
      getXY(e){
        // console.log(e)
        const r = this.$refs.canvas.getBoundingClientRect()
        return { 
          x: e.clientX - r.left, 
          y: e.clientY - r.top 
        }
      },
      erase(pos) {
        this.canvas.beginPath()
        // console.log(pos)
        this.canvas.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI)
        this.canvas.closePath()
        this.canvas.fill()
      },
      handleClick(e){
        document.elementsFromPoint(e.clientX,e.clientY)[1].click()
      },
      handleResize(){
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
      },
      async canvasLogger(){
        if (this.isCanvasBlank()){
          try {
            await this.$fire.analytics.logEvent('canvas_cleared')
          } catch (e) {
            setTimeout(() => this.canvasLogger(), 5000)
          }
        } else{
          setTimeout(() => this.canvasLogger(), 2000)
        }
      },
      isCanvasBlank() {
        const pixelBuffer = new Uint32Array(
          this.canvas.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas.height).data.buffer
        )

        return !pixelBuffer.some(color => color !== 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  div {
    font-family: 'Mechanical Pencil';
    font-size: 40px;
  }
  .page-container {
    position: relative;
    background-image: url("/img/uc-bg.png");
    background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center top;
    height: 100vh;
    width: 100vw;

    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      // height: 100vh; prevent distortion
      // width: 100vw;
      z-index: 2;
    }
    .main-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      .text-gif {
        width: 40vw;
      }

      .house-gif {
        margin-top: 30px;
        width: 36vw;
      }

      .countdown-container{
        position: relative;
        margin-top: 40px;
        width: 45vw;

        .count-gif {
          width: 100%;
        }

        .count-text{
          position: absolute;
          width: 70%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          top: 53%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e14423;

         .number {
            font-family: 'KG HAPPY Solid';
            font-size: 3.5rem;
          }
        }
      }
    }

    .link-container {
      position: absolute;
      bottom: 20px;
      left: 20px;
     

      .link {
        width: 50px;
        margin-left: 25px;
      }
    }
  }
  
  @media (max-width: 1024px) {
    .page-container {
      .canvas {
        display: none;
      }
      .main-container {
        .text-gif {
          width: 80vw;
        }
        .house-gif {
          margin-top: 30px;
          width: 60vw;
        }
        .countdown-container{
          margin-top: 60px;
          width: 80vw;
          .count-text{
            .number {
              font-size: 5rem;
            }
            .text {
              font-size: 3rem;
            }
          }
        }
      }

      .link-container {
        bottom: 30px;
        left: 40px;
      
        .link {
          width: 70px;
          margin-left: 30px;
        }
      }
    }
  }
  @media (min-width: 461px) and (max-width: 540px) {
    .name {
      font-size: 20px;
    }
    .position {
      font-size: 15px;
    }
  }

  @media (max-width: 460px) {
    .page-container {
      .main-container {
        .text-gif {
          width: 80vw;
        }
        .house-gif {
          margin-top: 30px;
          width: 70vw;
        }
        .countdown-container{
          margin-top: 60px;
          width: 90vw;
          .count-text{
            .number {
              font-size: 2rem;
            }
            .text {
              font-size: 1.2rem;
            }
          }
        }
      }

      .link-container {
        bottom: 15px;
        left: 15px;
     
        .link {
          width: 40px;
          margin-left: 20px;
        }
      }
    }
  }
</style>
