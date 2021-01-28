<template>
  <div class="container">
    <fw-turn id="album" :options="option">
      <div v-for="i in 6" :key="i">
        <img :src="`/book/${i}.jpg`">
      </div>
    </fw-turn>
  </div>
</template>

<script>
  export default {
    name: "TestBuku",
    data() {
      return {
        option: {
          width: 500*2,
          height: 500/(1076/1521),
          autoCenter: true,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    overflow: hidden;
    background-image: url("/img/uc-bg.png");
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #album {
    margin: 5%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>