<template>
  <div class="background">
    <div class="button-container">Loading</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      id: 0
    }
  },
  mounted() {
    this.initSetup()
    let x = setInterval(() => {
      if (this.progress == 100) {
        clearInterval(x)
        this.$router.push({path: '/dots'})
      } else {
        this.progress += 10
        document.getElementsByClassName("button-container")[0].innerHTML =  "Loading " + this.progress + "%"
      }
      
    },500)
  },
  methods: {
    initSetup() {
      new Image().src = "/img/dots_1.png"
      new Image().src = "/img/dots_2.png"
      new Image().src = "/img/dots_3_flower.png"
      new Image().src = "/img/dots_3_grass.png"
    },
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