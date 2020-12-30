<template>
  <div class="page-container">
    <div class="main-container">
      <img src="/gif/uc-text.gif" class="text-gif">
      <img src="/gif/house.gif" class="house-gif">
      <div class="countdown-container">
        <img src="/gif/countdown.gif" class="count-gif">
      </div>
    </div>
    <div class="link-container">
      <a href="https://www.instagram.com/geplfm/">
        <img class="link" src="/img/ig.png">
      </a>
      <a href="https://www.twitter.com/GEPLFMITB">
        <img src="/img/twitter.png" class="link">
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UnderConstruction',
 
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
    background-position: center top;
    height: 100vh;
    width: 100vw;

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
</style>
