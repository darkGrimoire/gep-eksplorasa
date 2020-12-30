<template>
  <div class="outer-container">
    <div class="slideshow">
      <div class="logo">
        <img src="/logo/EKSPLO2_UTAMA.png" style="width:100%">
      </div>

      <div class="logo"> 
        <img src="/logo/EKSPLO2_ijo.png" style="width:100%">
      </div>

      <div class="logo">
        <img src="/logo/EKSPLO2_kuning.png" style="width:100%">
      </div>

      <div class="logo">
        <img src="/logo/EKSPLO2_merah.png" style="width:100%">
      </div>

      <div class="logo">
        <img src="/logo/EKSPLO2_biru.png" style="width:100%">
      </div>
    </div>

    <div class="start">
      <button type="button">
        start explore!
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
* {box-sizing: border-box;}
img {vertical-align: middle;}

    /* Slideshow container */
    .slideshow {
    max-width: 500px;
    position: relative;
    margin: auto;
    }

.outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.start {
    align-content: center;
    vertical-align: middle;
    padding: 20px;
}

button {
    font-family: Mechanical Pencil;
    font-size: 30px;
    align-content: center;
    vertical-align: middle;
}

</style>