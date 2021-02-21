<template>
  <div class="container">
    <div class="content">
      <img src="bout/about us.png" class="aboutus">
      
      <div class="menu">
        <div class="sub">
          <!-- <div class="item">
            <div class="katpng" />
            <a href="/">Katalog<br>Karya</a>
          </div> -->

          <div class="item">
            <div class="kurpng" @click="gotocatkur" />
            <a href="/catatankuratorial">Catatan<br>Kuratorial</a>
          </div>
        </div>
        
        <div class="sub">
          <div class="item">
            <div class="gepng" @click="gotoaboutgep" />
            <a href="/aboutgep">About GEP</a>
          </div>

          <div class="item">
            <div class="merpng" @click="gotomerch" />
            <a href="https://bit.ly/AyoBeliMerchGEP2021">Merch</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutUs',
  methods: {
    gotocatkur() {
      this.$router.push({path: '/catatankuratorial'})
    },
    gotoaboutgep(){
      this.$router.push({path: '/aboutgep'})
    },
    gotomerch() {
      window.open("https://bit.ly/AyoBeliMerchGEP2021", '_blank')
    }
  },
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
    flex-direction: column;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  .sub {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .aboutus {
    height: 200px;
    margin-bottom: 75px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 60px;
  }

  .katpng {
    height: 175px;
    width: 175px;
    background-image: url("/bout/katalog_before.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .item:hover .katpng {
    background-image: url("/bout/katalog_after.png");
  }

  .item:hover a {
    text-decoration: underline;
  }

  .kurpng {
    height: 175px;
    width: 175px;
    background-image: url("/bout/catkur_before.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .item:hover .kurpng {
    background-image: url("/bout/catkur_after.png");
    cursor: pointer;
  }

  .gepng {
    height: 175px;
    width: 175px;
    background-image: url("/bout/gep_before.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .item:hover .gepng {
    background-image: url("/bout/gep_after.png");
    cursor: pointer;
  }

  .merpng {
    height: 175px;
    width: 175px;
    background-image: url("/bout/merch_before.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .item:hover .merpng {
    background-image: url("/bout/merch_after.png");
    cursor: pointer;
  }

  @media only screen and (max-width: 1155px) {
    .menu {
      flex-direction: row;
    }

    .aboutus {
      height: 175px;
      margin-bottom: 60px;
    }

    .item {
      margin: 0px 40px;
    }

    .katpng {
      height: 150px;
      width: 150px;
    }
    
    .kurpng {
      height: 150px;
      width: 150px;
    }
    
    .gepng {
      height: 150px;
      width: 150px;
    }

    .merpng {
      height: 150px;
      width: 150px;
    }
  }

  @media only screen and (max-width: 900px) {
    .menu {
      flex-direction: column;
    }

    .aboutus {
      margin-bottom: 35px;
    }

    .item {
      margin: 20px 60px;
    }
  }

  @media only screen and (max-width: 500px) {
    div {
      font-size: 15px;
    }

    .aboutus {
      height: 150px;
    }

    .item {
      margin: 20px 30px;
    }

    .katpng {
      height: 110px;
      width: 110px;
    }
    
    .kurpng {
      height: 110px;
      width: 110px;
    }
    
    .gepng {
      height: 110px;
      width: 110px;
    }

    .merpng {
      height: 110px;
      width: 110px;
    }
  }

  @media only screen and (max-width: 320px) {
    div {
      font-size: 13px;
    }

    .aboutus {
      height: 125px;
      margin-bottom: 30px;
    }

    .item {
      margin: 20px 25px;
    }

    .katpng {
      height: 90px;
      width: 90px;
    }
    
    .kurpng {
      height: 90px;
      width: 90px;
    }
    
    .gepng {
      height: 90px;
      width: 90px;
    }

    .merpng {
      height: 90px;
      width: 90px;
    }
  }
</style>
