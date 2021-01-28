<template>
  <div class="container">
    <div class="content">
      <img src="bout/about us.png" class="aboutus">
      
      <div class="menu">
        
        <div class="sub1">
          <div class="katalog">
            <div class="katpng"></div>
            <a href="/">Katalog<br>Karya</a>
          </div>

          <div class="catkur">
            <div class="kurpng"></div>
            <a href="/catatankuratorial">Catatan<br>Kuratorial</a>
          </div>
        </div>
        
        <div class="sub2">
          <div class="gep">
            <div class="gepng"></div>
            <a href="/aboutgep">About GEP</a>
          </div>

          <div class="merch">
            <div class="merpng"></div>
            <a href="/">Merch</a>
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
    background-size: 1536px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  a {
    color: #d1bb10;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
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
    background-image: url("/bout/katalog_before.png");
    background-size: cover;
  }

  .katalog:hover .katpng {
    background-image: url("/bout/katalog_after.png");
  }

  .katalog:hover a {
    text-decoration: underline;
  }

  .catkur {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .kurpng {
    height: 250px;
    width: 250px;
    background-image: url("/bout/catkur_before.png");
    background-size: cover;
  }

  .catkur:hover .kurpng {
    background-image: url("/bout/catkur_after.png");
  }

  .catkur:hover a {
    text-decoration: underline;
  }

  .gep {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .gepng {
    height: 250px;
    width: 250px;
    background-image: url("/bout/gep_before.png");
    background-size: cover;
  }

  .gep:hover .gepng {
    background-image: url("/bout/gep_after.png");
  }

  .gep:hover a {
    text-decoration: underline;
  }

  .merch {
    display: flex;
    flex-direction: column;
    margin: 0px 15px;
  }

  .merpng {
    height: 250px;
    width: 250px;
    background-image: url("/bout/merch_before.png");
    background-size: cover;
  }

  .merch:hover .merpng {
    background-image: url("/bout/merch_after.png");
  }

  .merch:hover a {
    text-decoration: underline;
  }

  @media only screen and (max-width: 1080px) {
    .content {
      transform: scale(0.85);
    }
    
    .menu {
      display: flex;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 460px) {
    .container {
      background-image: url("/MERAH.png");
      background-size: 1536px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
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
      height: 150px;
    }

    .katalog {
      margin: 0px;
      align-items: center;
    }

    .katpng {
      height: 200px;
      width: 200px;
    }

    .catkur {
      margin: 0px;
      align-items: center;
    }

    .kurpng {
      height: 200px;
      width: 200px;
    }

    .gep {
      margin: 0px;
      align-items: center;
    }

    .gepng {
      height: 200px;
      width: 200px;
    }

    .merch {
      margin: 0px;
      align-items: center;
    }

    .merpng {
      height: 200px;
      width: 200px;
    }
  }
</style>
