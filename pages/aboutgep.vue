<template>
  <div class="container">
    <div class="content">
      <img src="boutgep/aboutgep.gif" class="aboutgep">

      <div class="paper">
        <img src="boutgep/top.png" class="top">
        <img src="boutgep/mid.png" class="mid">
        <img src="boutgep/mid.png" class="mid2">
        <img src="boutgep/mid.png" class="mid3">
        <img src="boutgep/mid.png" class="mid3">
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

      <div class="team">
        <h2>Meet The Team</h2>
        <img src="boutgep/line2.png" class="line2">
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
    font-family: 'Mechanical Pencil';
    font-size: 25px;
    color: #1f1f1f;
    text-align: center;
  }

  h1 {
    font-family: 'Quicksand';
    font-style: normal;
    font-size: 45px;
    color: #e14423;
    text-align: center;
  }

  h2 {
    font-family: 'Quicksand';
    font-style: normal;
    font-size: 45px;
    color: #ede5d1;
    text-align: center;
  }

  p {
    width: 800px;
    margin: 15px 0;
    text-align: center;
    line-height: 97%;
  }

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
    top: 35px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top {
    width: 1000px;
    margin-bottom: -1px;
  }

  .mid {
    width: 1015px;
    margin-left: 15px;
    margin-bottom: -1px;
  }

  .bottom {
    width: 1000px;
    margin-left: 3px;
    margin-bottom: -1px;
  }

  .papertext {
      width: 100%;
      top: 74px;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
  }

  .line {
    width: 444px;
  }

  .line2 {
    width: 444px;
    margin-top: -35px;
  }

  .divider {
    height: 60px;
    margin-top: 15px;
    margin-bottom: 75px;
  }

  .team {
    margin-top: 125px;
  }

  @media only screen and (min-width: 1030px) {
    .mid2 {
      display: none;
    }
  }

  @media only screen and (max-width: 1030px) {
    div {
      font-size: 25px;
    }

    h1 {
      font-size: 45px;
    }

    h2 {
      font-size: 45px;
    }

    p {
      width: 584px;
      margin: 15px 0;
    }

    .content {
      padding-top: 70px;
    }

    .aboutgep {
      height: 300px;
    }

    .paper {
      top: 35px;
    }

    .top {
      width: 725px;
    }

    .mid {
      width: 735px;
      margin-left: 11px;
    }

    .mid2 {
      width: 735px;
      margin-left: 11px;
      margin-bottom: -1px;
    }

    .bottom {
      width: 723px;
      margin-left: 2px;
    }

    .papertext {
      top: 100px;
    }

    .line {
      width: 444px;
    }

    .line2 {
      width: 444px;
      margin-top: -35px;
    }

    .divider {
      height: 60px;
      margin-top: 20px;
      margin-bottom: 75px;
    }

    .team {
      margin-top: 125px;
    }
  }

  @media only screen and (max-width: 768px) {
    div {
      font-size: 24px;
    }

    h1 {
      font-size: 35px;
    }

    h2 {
      font-size: 35px;
    }

    p {
      width: 350px;
      margin: 15px 0;
    }

    .content {
      padding-top: 40px;
    }

    .aboutgep {
      height: 200px;
    }

    .paper {
      top: 35px;
    }

    .top {
      width: 440px;
    }

    .mid {
      width: 447px;
      margin-left: 6px;
    }

    .mid2 {
      width: 447px;
      margin-left: 6px;
    }

    .mid3 {
      width: 447px;
      margin-left: 6px;
      margin-bottom: -1px;
    }

    .bottom {
      width: 440px;
      margin-left: 1px;
    }

    .papertext {
      top: 75px;
    }

    .line {
      width: 270px;
    }

    .line2 {
      width: 270px;
      margin-top: -35px;
    }

    .divider {
      height: 50px;
      margin-top: 20px;
      margin-bottom: 70px;
    }

    .team {
      margin-top: 125px;
    }
  }

  @media only screen and (min-width: 770px) {
    .mid3 {display: none;}
  }

  @media only screen and (max-width: 470px) {
    div {
      font-size: 15px;
    }

    h1 {
      font-size: 25px;
    }

    h2 {
      font-size: 25px;
    }

    p {
      width: 200px;
      margin: 15px 0;
    }

    .content {
      padding-top: 40px;
    }

    .aboutgep {
      height: 150px;
    }

    .paper {
      top: 35px;
    }

    .top {
      width: 260px;
    }

    .mid {
      width: 264px;
      margin-left: 4px;
    }

    .mid2 {
      width: 264px;
      margin-left: 4px;
    }

    .mid3 {
      width: 264px;
      margin-left: 4px;
    }

    .bottom {
      width: 260px;
      margin-left: 1px;
    }

    .papertext {
      top: 27px;
    }

    .line {
      width: 200px;
    }

    .line2 {
      width: 200px;
      margin-top: -35px;
    }

    .divider {
      height: 30px;
      margin-top: 5px;
      margin-bottom: 30px;
    }

    .team {
      margin-top: 75px;
    }
  }
</style>
