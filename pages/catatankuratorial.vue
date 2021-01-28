<template>
  <div class="container">
    <div class="content">
      <div class="paper">
        <img src="kuro/paper.png" class="top">
        <img src="kuro/paper.png" class="top">
        <img src="kuro/paper.png" class="top2">
        <img src="kuro/paper.png" class="top2">
      
        <div class="papertext">
          <div class="header">
            <img src="kuro/emo.png" class="emo">
            <img src="kuro/date.png" class="date">
          </div>
          <img src="kuro/garis.png" class="garis">
          <img src="kuro/catkur.png" class="catkur">
          <p>What is Lorem Ipsum?
            <br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <span class="br"></span>
          <p>Why do we use it?
            <br>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </div>

        <div class="printilan">
          <img src="kuro/clip.png" class="clip">
          <img src="kuro/tape.png" class="tape">
          <img src="kuro/pensil.png" class="pensil">
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
    font-family: 'Mechanical Pencil';
    font-size: 29px;
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
    width: 980px;
    margin: 20px 0;
    text-align: center;
    transform: scale(1.1);
  }

  .container {
    background-image: url("/IJO.png");
    background-size: 1536px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  a {
    color: #d1bb10;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .br {
    height: 50px;
  }

  .paper {
    transform: scale(0.80);
    margin-top: -50px;
    margin-bottom: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .top {
    margin-bottom: -30px;
  }

  .top2 {
    margin-bottom: -30px;
  }

  .papertext {
      width: 100%;
      top: 20px;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
  }

  .header {
    width: 1240px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .emo {
    height: 65px;
    margin-left: 50px;
    margin-top: 25px;
  }

  .date {
    width: 300px;
  }

  .garis {
    margin-top: -30px;
  }

  .catkur {
    margin-bottom: 30px;
  }

  .printilan {
    width: 100%;
    top: -15px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
  }

  .clip {
    width: 65px;
    margin-left: 400px;
  }

  .tape {
    width: 250px;
    margin-left: 1339px;
    margin-top: 100px;
  }
  
  .pensil {
    margin-right: 1330px;
    margin-top: 60px;
  }

  @media only screen and (min-width: 650px) {
    .top2 {
      display: none;
    }
  }

  @media only screen and (max-width: 1295px) {
    .content {
      transform: scale(0.9);
    }
  }

  @media only screen and (max-width: 1160px) {
    .content {
      transform: scale(0.8);
    }
  }

  @media only screen and (max-width: 1025px) {
    div {
      font-size: 35px;
    }

    .br {
      height: 75px;
    }

    .content {
      transform: scale(0.7);
    }

  @media only screen and (max-width: 920px) {
    div {
      font-size: 40px;
    }

    .content {
      transform: scale(0.6);
    }
    
  }

  @media only screen and (max-width: 775px) {
    div {
      font-size: 40px;
    }

    .content {
      transform: scale(0.5);
    }
  }

  @media only screen and (max-width: 650px) {
    div {
      font-size: 55px;
    }

    .catkur {
      margin-bottom: 100px;
    }

    .content {
      transform: scale(0.4);
    }

    .br {
      margin-bottom: 150px;
    }
  }

  @media only screen and (max-width: 530px) {
    div {
      font-size: 60px;
    }

    .catkur {
      margin-bottom: 150px;
    }

    .content {
      transform: scale(0.35);
    }

    .br {
      margin-bottom: 150px;
    }
  }

  @media only screen and (max-width: 460px) {
    .container {
      margin-top: -1110px;
      margin-bottom: -1110px;
    }

    .content {
      transform: scale(0.28);
    }
  }

  @media only screen and (max-width: 330px) {
    .container {
      margin-top: -1110px;
      margin-bottom: -1110px;
    }

    .content {
      transform: scale(0.21);
    }
  }
}
</style>
