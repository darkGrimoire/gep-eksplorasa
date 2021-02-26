<template>
  <div class="container">
    <div class="content">
      <div class="paper">
        <img src="/kuro/paper.png" class="top">
        <img src="/kuro/paper.png" class="top">
        <img src="/kuro/paper.png" class="top2">
        <img src="/kuro/paper.png" class="top3">
        <img src="/kuro/paper.png" class="top4">
        <img src="/kuro/paper.png" class="top5">
        <img src="/kuro/paper.png" class="top6">
        <img src="/kuro/paper.png" class="top7">
      
        <div class="papertext">
          <div class="header">
            <img src="/kuro/emo.png" class="emo">
            <img src="/kuro/date.png" class="date">
          </div>
          <img src="/kuro/garis.png" class="garis">
          <img src="/kuro/catkur.png" class="catkur">
          <p>Perasaan manusia merupakan hal yang unik, sesederhana pencampuran hormon di dalam otak manusia dapat menghasilkan emosi yang menggerakan manusia setiap harinya. Rasa senang, takut, sedih, hingga marah kerap menjadi motivasi manusia terhadap aksinya. Emosi pun menjadi sangat krusial dalam kehidupan manusia.</p>
          <span class="br" />
          <p>Sehingga tanpa terasa emosi manusia menjadi suatu hal yang kompleks. Walaupun ada bersama kita setiap harinya, masih banyak aspek emosi yang bisa dieksplorasi. Apa emosi yang dirasakan, sebesar apa intensitas emosi tersebut, dari mana datangnya emosi itu, hingga bagaimana emosi ini dapat diluapkan, selalu menjadi pertanyaan yang muncul dalam benak saya. Bagaimana bisa sesuatu yang sangat dekat bisa menjadi sangat membingungkan?</p>
          <span class="br" />
          <p>Emosi seharusnya sudah menjadi hal yang kita kenal secara dekat. Emosi seharusnya menjadi rumah dimana, tiap ruangan, tiap perasaan dapat disinggahi dan ditinggali dengan rasa nyaman. Eksplorasi rasa perlu dilakukan untuk mengenali tiap ruang emosi.</p>
          <span class="br" />
          <p>Namun, bagaimana menjelajahi hal tersebut saat emosi adalah hal yang abstrak. Emosi bukanlah hal kuantitatif yang bisa diukur dengan suatu angka atau satuan ukur. Emosi hanya dapat dirasakan, meskipun perasaan dan pelampiasannya beragam.</p>
          <span class="br" />
          <p>Maka untuk menemani penjelajahan emosi itu, Ganesha Exhibition Programme 2021 mengambil tema Eksplorasa yang merupakan gabungan dari dua kata yaitu eksplorasi dan rasa. Eksplorasa menampilkan hasil eksplorasi emosi yang telah dituangkan oleh kru-kru LFM ke dalam bentuk karya. Harapannya, bersama karya-karya ini, tiap ruang emosi senang, takut, sedih, dan amarah, dapat disinggahi. Sehingga akhirnya, tiap ruang rasa dapat dijelajahi sehingga tiap ruang emosinya tidak lagi asing dan dapat diekspresikan dengan indah.</p>
          <span class="br" />
          <p>Akhir kata, selamat melakukan eksplorasi rasa dirimu sendiri! Semoga tetap aman dan dalam penjelajahannya. Selamat Menikmati!</p>
          <span class="br" />
          <p class="penutup">
            -Gilroy Jeremia, Kurator GEP! 2021 : Eksplorasa
          </p>
        </div>

        <div class="printilan">
          <img src="/kuro/clip.png" class="clip">
          <img src="/kuro/tape.png" class="tape">
          <img src="/kuro/pensil.png" class="pensil">
        </div>
      </div>
    </div>
    <nuxt-link class="back-button" :to="'/aboutus'">
      Back
    </nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
.back-button {
  position: fixed;
  bottom: 2%;
  left: 2%;
  color: #1f1f1f;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 1;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    text-decoration: none;
    opacity: 1;
  }
  @media only screen and (max-width: 800px) {
    left: 5%;
    bottom: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    bottom: 3%;
    font-size: 30px;
  }
}

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
    margin-bottom: 15px;
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

  @media only screen and (min-width: 1294px) {
    .top2 {display: none;}
  }

  @media only screen and (min-width: 1024px) {
  }
  
  @media only screen and (min-width: 767px) {
    .top3 {display: none;}
    .top4 {display: none;}
    .top5 {display: none;}
  }

  @media only screen and (min-width: 500px) {
    .top6 {display: none;}
  }

  @media only screen and (min-width: 330px) {
    .top7 {display: none;}
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

    .top2 {
      width: 800px;
      margin-top: -400px;
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
      margin: 15px 0;
    }

    .content {
      padding: 65px;
    }

    .top {
      width: 620px;
    }

    .top2 {
      width: 620px;
      margin-top: -10px;
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
      margin-left: 640px;
      margin-top: 52px;
    }
    
    .pensil {
      width: 110px;
      margin-right: 660px;
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: 767px) {
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

    .top {width:400px;}

    .top2 {width:400px;}

    .top3 {
      width:400px;
      margin-top: -10px;
    }

    .top4 {
      width:400px;
      margin-top: -10px;
    }

    .top5 {
      width:400px;
      margin-top: -150px;
    }

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
    .top3 {width:290px;}
    .top4 {width:290px;}
    
    .top5 {
      width:290px;
      margin-top: -5px;
    }
    
    .top6 {
      width:290px;
      margin-top: -50px;
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
    .top3 {width:224px;}
    .top4 {width:224px;}
    .top5 {width:224px;}
    .top6 {width:224px; margin-top: -5px;}
    .top7 {width:224px; margin-top: -70px;}


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

  // "custom" dimensions

  @media only screen and (min-height: 1350px) {
    .container {
      height: 100vh;
    }
  }
</style>
