<template>
  <div class="main">
    <div class="top-cont">
      <div class="canvas">
        <div class="canvas canvas-hover">
          <div class="cont cat">
            <img src="/cat.png" alt="cat">
          </div>
          <div class="cont kursi">
            <img src="/kursi.png" alt="kursi">
          </div>
          <div class="cont pintu center-anchor">
            <img src="/door.png" alt="kursi">
          </div>
          <div class="cont sign center-anchor">
            <img src="/sign.png" alt="sign">
          </div>
          <div class="cont sign">
            <img src="/sign.png" alt="sign">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Buat agar top-cont bisa di drag pake javascript
// --- keterangan tiap class
// top-cont: tempat perhitungan rasio
// canvas: kalau mau ada tooltip, taro disini
// canvas-hover: kalau mau ada efek hover kaya di moooi, taro sini
  export default {
    name: "Test"
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
    width: 150%;
    padding-bottom: 93.75%;
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

.cat {
  left: 15%;
  bottom: 25%;
  width: 14%;
}

.kursi {
  left: 75%;
  top: 50%;
  width: 18%;
}

.pintu {
  left:50%;
  top: 50%;
  width:18%;
}

.center-anchor {
  transform: translate(-50%,-50%);
}

.sign {
  top: 0;
  left: 0;
  width: 10%;
  border: 1px solid red;
}

.sign.center-anchor {
  filter: grayscale(100%);
}
</style>