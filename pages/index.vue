<template>
  <div class="container">
    <img src="about us.png" class="aboutus">
    
    <div class="menu">
      
      <div class="katalog">
        <div class="katpng"></div>
        Katalog<br>Karya
      </div>

      <div class="catkur">
        <div class="kurpng"></div>
        Catatan<br>Kuratorial
      </div>
      
      <div class="gep">
        <div class="gepng"></div>
        About GEP
      </div>

      <div class="merch">
        <div class="merpng"></div>
        Merch
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
  div {
    font-family: 'KG Happy Solid';
    font-size: 20px;
    color: #d1bb10;
    text-align: center;
  }

  .container {
    background-image: url("/MERAH.png");
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .menu {
    display: flex;
    flex-direction: row;
  }

  .menu img {
    height: 250px;
  }

  .aboutus {
    height: 200px;
    margin-bottom: 30px;
  }

  .katalog {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .katpng {
    height: 250px;
    width: 250px;
    background-image: url("/katalog_before.png");
    background-size: cover;
  }

  .katalog:hover .katpng {
    background-image: url("/katalog_after.png");
  }

  .catkur {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .kurpng {
    height: 250px;
    width: 250px;
    background-image: url("/catkur_before.png");
    background-size: cover;
  }

  .catkur:hover .kurpng {
    background-image: url("/catkur_after.png");
  }

  .gep {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .gepng {
    height: 250px;
    width: 250px;
    background-image: url("/gep_before.png");
    background-size: cover;
  }

  .gep:hover .gepng {
    background-image: url("/gep_after.png");
  }

  .merch {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .merpng {
    height: 250px;
    width: 250px;
    background-image: url("/merch_before.png");
    background-size: cover;
  }

  .merch:hover .merpng {
    background-image: url("/merch_after.png");
  }
</style>
