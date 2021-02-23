<template>
  <div class="background">
    <div class="button-container">
      <nuxt-link class="button" to="/dots" :no-prefetch="true">
        start exploring
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initSetup()
  },
  methods: {
    initSetup() {
      new Image().src = "/img/dots_1.png"
      new Image().src = "/img/dots_2.png"
      new Image().src = "/img/dots_3_flower.png"
      new Image().src = "/img/dots_3_grass.png"
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
}
.button {
  color: black;
  all: unset;
  font-family: "Mechanical Pencil";
  font-size: 40px;
  z-index: inherit;
}
.button:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>