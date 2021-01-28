<template>
  <div class="container" :style="[ fs ? { backgroundImage: `url(/img/uc-bg.png)` } : null ]">
    <!--<pre>  Full screen : {{ fs }}
    <button @click="fulskrin()">Go {{ fs?"back":"fullscreen" }}</button>
    </pre>-->
    <div v-show="fs" ignore="1" class="next-button" @click="turnNext" />
    <div v-show="fs" ignore="1" class="previous-button" @click="turnPrevious" />
    <fw-turn v-show="fs" id="album" ref="book" :options="option">
      <div v-for="i in 6" :key="i">
        <img :src="`/book/${i}.jpg`">
      </div>
    </fw-turn>
  </div>
</template>

<script>
import $ from "jquery"

  export default {
    name: "TestTurn",
    data() {
      return {
        fs: false,
        option: {
          width: 300,
          height: 300/(1076/1521),
          autoCenter: true,
          display: "single"
        },
        selector: undefined
      }
    },
    beforeMount (){
        document.addEventListener('keydown', this.keyfs)
        document.addEventListener("fullscreenchange", this.changefs)
        document.addEventListener("mozfullscreenchange", this.changefs)
        document.addEventListener("webkitfullscreenchange", this.changefs)
        document.addEventListener("msfullscreenchange", this.changefs)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keyfs)
        document.removeEventListener("fullscreenchange", this.changefs)
        document.removeEventListener("mozfullscreenchange", this.changefs)
        document.removeEventListener("webkitfullscreenchange", this.changefs)
        document.removeEventListener("msfullscreenchange", this.changefs)
    },
    mounted () {
      this.selector = this.$refs.book.selector
    },
    methods: {
        keyfs (e) {
            if(e.code=="F11"){
                e.preventDefault()
                this.fulskrin()
            }
        },
        changefs () {
            this.fs = !this.fs
        },
        turnNext() {
            $(this.selector).turn('next')
        },
        turnPrevious() {
            $(this.selector).turn('previous')
        },
        fulskrin () {
                let elem = document.documentElement
                if(!this.fs) {
                    //$("#tes").attr("style", "background-image: url(\"/img/uc-bg.png\");")
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen()
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen()
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                        elem.webkitRequestFullscreen()
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem = window.top.document.body //To break out of frame in IE
                        elem.msRequestFullscreen()
                    }
                } else {
                      if (document.exitFullscreen) {
                            document.exitFullscreen()
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen()
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen()
                        } else if (document.msExitFullscreen) {
                            window.top.document.msExitFullscreen()
                        }
                }
        }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    overflow: hidden;
    /*background-image: url("/img/uc-bg.png");*/
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #album {
    //margin: 5%;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .next-button,
  .previous-button {
    background-color: red;
    height: 100px;
    width: 20px;
    position: absolute;
    z-index: 999;
  }

  .next-button{
    right: 22px;
  }
  .previous-button{
    left: 22px;
  }
</style>