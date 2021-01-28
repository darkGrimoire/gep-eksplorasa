<template>
  <div class="container">
    <div class="content">
      <img src="boutgep/aboutgep.gif" class="aboutgep">

      <div class="paper">
        <img src="boutgep/top.png" class="top">
        <img src="boutgep/mid.png" class="mid">
        <img src="boutgep/bottom.png" class="bottom">
      
        <div class="papertext">
          <h1>Apa itu GEP?</h1>
          <img src="boutgep/line.png" class="line">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in</p>
          <img src="divider/fear.png" class="divider">

          <h1>Apa itu LFM?</h1>
          <img src="boutgep/line.png" class="line">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in</p>
          <img src="divider/anger.png" class="divider">
        </div>
      </div>

      <h2>Meet The Team</h2>
          <img src="boutgep/line2.png" class="line2">

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
    font-family: 'Mechanical Pencil';
    font-size: 32px;
    color: #1f1f1f;
    text-align: center;
  }

  h1 {
    font-family: 'Quicksand';
    font-style: normal;
    font-size: 60px;
    color: #e14423;
    text-align: center;
  }

  h2 {
    font-family: 'Quicksand';
    font-style: normal;
    font-size: 46px;
    color: #ede5d1;
    text-align: center;
  }

  p {
    width: 1000px;
    margin: 20px 0;
    text-align: center;
    line-height: 97%;
  }

  .container {
    background-image: url("/MERAH.png");
    background-size: contain;
    background-repeat: repeat-y;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .content {
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a {
    color: #d1bb10;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .aboutgep {
    height: 300px;
  }

  .paper {
    transform: scale(0.77);
    margin-top: -90px;
    margin-bottom: -10px;
    position: relative;
  }

  .top {
    margin-bottom: -9px;
    margin-right: 3.5px;
  }

  .mid {
    margin-left: 14px;
    margin-bottom: -9px;
  }

  .papertext {
      width: 100%;
      top: 100px;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
  }

  .line {
    width: 600px;
  }

  .line2 {
    width: 500px;
    margin-top: -35px;
  }

  .divider {
    height: 75px;
    margin-top: 15px;
    margin-bottom: 75px;
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
