<template>
  <div class="container">
    <!-- <button @click="turnPrevious">
      Previous
    </button> -->
    <fw-turn id="album" ref="book" :options="option">
      <div ignore="1" class="next-button" @click="turnNext" />
      <div ignore="1" class="previous-button" @click="turnPrevious" />
      <div v-for="i in 6" :key="i">
        <img :src="`/book/${i}.jpg`">
      </div>
    </fw-turn>
    <!-- <button @click="turnNexts">
      Next
    </button> -->
  </div>
</template>

<script>
import $ from "jquery"

  export default {
    name: "TestBuku",
    data() {
      return {
        option: {
          width: 300*2,
          height: 300/(1076/1521),
          autoCenter: true,
        },
        selector: undefined
      }
    },
    mounted () {
      console.log(this.$refs.book.selector)
      this.selector = this.$refs.book.selector
    },
    methods: {
      turnNext() {
        $(this.selector).turn('next')
      },
      turnPrevious() {
        $(this.selector).turn('previous')
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
  }

  .next-button{
    right: -22px;
  }
  .previous-button{
    left: -22px;
  }

</style>