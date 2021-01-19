<template>
  <div class="container">
    <div class="content">
      <img src="about us.png" class="aboutus">
      
      <div class="menu">
        
        <div class="sub1">
          <div class="katalog">
            <div class="katpng"></div>
            Katalog<br>Karya
          </div>

          <div class="catkur">
            <div class="kurpng"></div>
            Catatan<br>Kuratorial
          </div>
        </div>
        
        <div class="sub2">
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

  .sub1 {
    display: flex;
    flex-direction: row;
  }

  .sub2 {
    display: flex;
    flex-direction: row;
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

  @media only screen and (max-width: 1080px) {
    .content {
      transform: scale(0.9);
    }
    
    .menu {
      display: flex;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 460px) {
    .container {
      background-image: url("/MERAH.png");
      background-size: cover;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      overflow: auto;
    }

    .content {
      transform: scale(0.9);
    }
    
    .menu {
      display: flex;
      flex-direction: column;
    }

    .sub1 {
      display: flex;
      flex-direction: column;
    }

    .sub2 {
      display: flex;
      flex-direction: column;
    }

    .aboutus {
      margin-bottom: 0px;
    }

    .katalog {
      margin: 0px;
      align-items: center;
    }

    .catkur {
      margin: 0px;
      align-items: center;
    }

    .gep {
      margin: 0px;
      align-items: center;
    }

    .merch {
      margin: 0px;
      align-items: center;
    }
  }
</style>
