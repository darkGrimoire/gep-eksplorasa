<template>
  <div class="background">
    <nuxt-link class="button" to="/dots" :no-prefetch="true">
      start exploring
    </nuxt-link>
  </div>
</template>

<script>
export default {}
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
.button {
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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