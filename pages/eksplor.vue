<template>
  <div class="background">
    <div class="button-container">Loading {{ Math.floor(progress) }} %</div>
  </div>
</template>

<script>
import gsap from "gsap"
import Bowser from "bowser"
export default {
  data() {
    return {
      progress: 0,
      id: 0
    }
  },
  mounted() {
    this.initSetup()
    gsap.to(this.$data, {
      progress: 100,
      duration: this.randomInteger(4, 6),
      ease: "power3.out",
      delay: 0.3,
      onComplete: () => {
        const browser_name = Bowser.getParser(
              window.navigator.userAgent
            ).getBrowserName()
        if (browser_name == "Safari") {
          this.$router.push({ path: "/teras" })
        } else {
          this.$router.push({
            path: "/dots"
          })
        }
      }
    })
  },
  methods: {
    initSetup() {
      new Image().src = "/img/dots_1.png"
      new Image().src = "/img/dots_2.png"
      new Image().src = "/img/dots_3_flower.png"
      new Image().src = "/img/dots_3_grass.png"
    },
    randomInteger(min, max) {
      return Math.random() * (max - min + 1) + min
    }
  }
}
</script>

<style>
.background {
  background-image: url("/img/bg_beige.png");
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}
.button-container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Mechanical Pencil";
  color: black;
  font-size: 40px;
}
</style>
