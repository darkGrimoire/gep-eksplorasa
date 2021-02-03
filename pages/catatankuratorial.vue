<template>
  <div class="container">
    <div class="content">
      <div class="paper">
        <img src="kuro/paper.png" class="top">
        <img src="kuro/paper.png" class="top">
        <img src="kuro/paper.png" class="top2">
        <img src="kuro/paper.png" class="top2">
        <img src="kuro/paper.png" class="top3">
      
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
    font-size: 25px;
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
    width: 853px;
    margin: 20px 0;
    text-align: center;
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
    padding: 105px;
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

  .paper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top {
    width: 1050px;
    margin-bottom: -30px;
  }

  .top2 {
    width: 1050px;
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
    width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .emo {
    height: 55px;
    margin-left: 30px;
    margin-top: 10px;
  }

  .date {
    width: 235px;
  }

  .garis {
    width: 1000px;
    margin-top: -30px;
  }

  .catkur {
    width: 725px;
    margin-bottom: 30px;
  }

  .printilan {
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
  }

  .clip {
    width: 50px;
    margin-top: -13px;
    margin-left: 400px;
  }

  .tape {
    width: 200px;
    margin-left: 1082px;
    margin-top: 85px;
  }
  
  .pensil {
    width: 180px;
    margin-right: 1100px;
    margin-top: 50px;
  }

  // amount of paper

  @media only screen and (min-width: 800px) {
    .top2 {display: none;}
  }

  @media only screen and (min-width: 500px) {
    .top3 {display: none;}
    .top2 {
      margin-top: -75px;
    }
  }

  // actual different css

  @media only screen and (max-width: 1295px) {
    div {
      font-size: 19px;
    }

    p {
      width: 648px;
      margin: 20px 0;
    }

    .content {
      padding: 80px;
    }

    .top {
      width: 800px;
    }

    .papertext {
        top: 15px;
    }

    .header {
      width: 760px;
    }

    .emo {
      height: 42px;
      margin-left: 22px;
      margin-top: -5px;
    }

    .date {
      width: 178px;
    }

    .garis {
      width: 760px;
      padding-top: 10px;
    }

    .catkur {
      width: 550px;
    }

    .clip {
      width: 38px;
      margin-top: -13px;
      margin-left: 305px;
    }

    .tape {
      width: 152px;
      margin-left: 822px;
      margin-top: 65px;
    }
    
    .pensil {
      width: 136px;
      margin-right: 836px;
      margin-top: 38px;
    }
  }

  @media only screen and (max-width: 1024px) {
    div {
      font-size: 19px;
    }

    p {
      width: 550px;
      margin: 20px 0;
    }

    .content {
      padding: 65px;
    }

    .top {
      width: 650px;
    }

    .papertext {
      top: 12px;
    }

    .header {
      width: 615px;
    }

    .emo {
      height: 34px;
      margin-left: 17px;
      margin-top: -5px;
    }

    .date {
      width: 144px;
    }

    .garis {
      width: 615px;
      padding-top: 10px;
    }

    .catkur {
      width: 500px;
    }

    .clip {
      width: 30px;
      margin-top: -10px;
      margin-left: 247px;
    }

    .tape {
      width: 123px;
      margin-left: 668px;
      margin-top: 52px;
    }
    
    .pensil {
      width: 110px;
      margin-right: 677px;
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: 768px) {
    div {
      font-size: 18px;
    }

    p {
      width: 341px;
      margin: 12px 0;
    }

    .content {
      padding: 40px;
    }

    .top {width: 400px;}

    .top2 {width:400px;}

    .papertext {
      top: 7px;
    }

    .header {
      width: 381px;
    }

    .emo {
      height: 21px;
      margin-left: 10px;
      margin-top: -3px;
    }

    .date {
      width: 89px;
    }

    .garis {
      width: 381px;
      padding-top: 20px;
    }

    .catkur {
      width: 310px;
      margin-bottom: 10px;
    }

    .br {height:10px;}

    .clip {
      width: 18px;
      margin-top: -6px;
      margin-left: 153px;
    }

    .tape {
      width: 76px;
      margin-left: 413px;
      margin-top: 32px;
    }
    
    .pensil {
      width: 68px;
      margin-right: 419px;
      margin-top: 18px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 800px) {
    div {
      font-size: 18px;
    }

    p {
      width: 450px;
      margin: 12px 0;
    }

    .content {
      padding: 40px;
    }

    .top {width: 600px;}

    .top2 {display: none;}

    .papertext {
      top: 7px;
    }

    .header {
      width: 581px;
    }

    .emo {
      height: 35px;
      margin-left: 25px;
      margin-top: 10px;
    }

    .date {
      width: 150px;
    }

    .garis {
      width: 581px;
      padding-top: 20px;
    }

    .catkur {
      width: 450px;
      margin-bottom: 10px;
    }

    .br {height:10px;}

    .clip {
      width: 30px;
      margin-top: -6px;
      margin-left: 153px;
    }

    .tape {
      width: 126px;
      margin-left: 619px;
      margin-top: 60px;
    }
    
    .pensil {
      width: 100px;
      margin-right: 600px;
      margin-top: 70px;
    }
  }

  @media only screen and (max-width: 500px) {
    div {
      font-size: 15px;
    }

    p {
      width: 257px;
      margin: 8px 0;
    }

    .content {
      padding: 28px;
    }

    .top  {width:290px;}

    .top2 {width:290px;}
    .top3 {
      width:290px;
      margin-top: -100px;
    }

    .papertext {
      top: 5px;
    }

    .header {
      width: 276px;
    }

    .emo {
      height: 19px;
      margin-left: 15px;
      margin-top: 5px;
    }

    .date {
      width: 97px;
    }

    .garis {
      width: 276px;
      padding-top: 25px;
    }

    .catkur {
      width: 250px;
      margin-bottom: 5px;
    }

    .br {height:10px;}

    .clip {
      width: 19px;
      margin-top: -5px;
      margin-left: 39px;
    }

    .tape {
      width: 58px;
      margin-left: 298px;
      margin-top: 65px;
    }
    
    .pensil {
      width: 58px;
      margin-right: 304px;
      margin-top: 110px;
    }
  }

  @media only screen and (max-width: 330px) {
    div {
      font-size: 12px;
    }

    p {
      width: 190px;
      margin: 6px 0;
    }

    .content {
      padding: 22px;
    }

    .top  {width:224px;}
    .top2 {width:224px;}

    .top3 {
      width:224px;
      margin-top: 0px;
    }

    .papertext {
      top: 4px;
    }

    .header {
      width: 213px;
    }

    .emo {
      height: 15px;
      margin-left: 15px;
      margin-top: 5px;
    }

    .date {
      width: 75px;
    }

    .garis {
      width: 213px;
      padding-top: 25px;
    }

    .catkur {
      width: 190px;
      margin-bottom: 5px;
    }

    .br {height:10px;}

    .clip {
      width: 15px;
      margin-top: -4px;
      margin-left: 30px;
    }

    .tape {
      width: 45px;
      margin-left: 231px;
      margin-top: 50px;
    }
    
    .pensil {
      width: 45px;
      margin-right: 234px;
      margin-top: 85px;
    }
  }

  @media only screen and (max-width: 280px) {
    .container {
      background-image: url("/IJO.png");
      background-size: 1536px;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
  }

  // "custom" dimensions

  @media only screen and (min-height: 750px) {
    .container {
      background-image: url("/IJO.png");
      background-size: 1536px;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
  }
</style>
