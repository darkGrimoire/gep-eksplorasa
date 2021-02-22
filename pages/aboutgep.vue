<template>
  <div class="container">
    <div class="content">
      <img src="/boutgep/aboutgep.gif" class="aboutgep">

      <div class="paper">
        <img src="/boutgep/top.png" class="top">
        <img src="/boutgep/mid.png" class="mid">
        <img src="/boutgep/mid.png" class="mid2">
        <img src="/boutgep/mid.png" class="mid3">
        <img src="/boutgep/mid.png" class="mid4">
        <img src="/boutgep/mid.png" class="mid5">
        <img src="/boutgep/bottom.png" class="bottom">
      
        <div class="papertext">
          <h1>Apa itu GEP?</h1>
          <img src="/boutgep/line.png" class="line">
          <p>Ganesha Exhibition Programme (GEP) merupakan sebuah pameran serta pemutaran karya kru LFM ITB. Karya-karya yang ditampilkan berupa instalasi fotografi, videografi serta kineklub melalui proses submisi serta kurasi. Diadakan sejak tahun 2010, GEP selalu membawa perbedaan di setiap tahunnya. Membawakan pesan mengenai eksplorasi emosi, GEP 2021: Eksplorasa diadakan secara daring untuk pertama kalinya.</p>
          <img src="/divider/fear.png" class="divider">

          <h1>Apa itu LFM?</h1>
          <img src="/boutgep/line.png" class="line">
          <p>Berdiri pada 21 April 1960, Liga Film Mahasiswa ITB (LFM ITB) merupakan Unit Kegiatan Mahasiswa yang bergerak di bidang perfilman dan fotografi. Terdapat 4 bidang yang menjadi pilar kekaryaan di LFM ITB yaitu Fotografi, Videografi, Kineklub serta Pertunjukan LFM ITB yang berusaha untuk terus mewadahi kru LFM ITB agar dapat memberikan karya-karya terbaik kepada khalayak umum. Salah satunya seperti Pertunjukan LFM ITB melalui pamerannya yang bernama Ganesha Exhibition Programme (GEP).</p>
          <img src="/divider/anger.png" class="divider">
        </div>
      </div>

      <div class="team">
        <h2>Meet The Team</h2>
        <img src="/boutgep/line2.png" class="line2">
        <br><br>
        <h3>PIMPINAN PROYEK</h3>
        <br>
        <img src="/team/c.png" class="fotorg">
        <br><br>
        <div class="sekben">
          <div class="sek">
            <h3>SEKRETARIS</h3>
            <br>
            <img src="/team/a.png" class="fotorg">
          </div>
          <div class="ben">
            <h3>BENDAHARA</h3>
            <br>
            <img src="/team/al.png" class="fotorg">
          </div>
        </div>
        <br><br>
        <h3>DANUS</h3>
        <br>
        <img src="/team/da/il.png" class="fotorg">
        <div class="divisi">
          <img src="/team/da/g.png" class="fotorg">
          <img src="/team/da/j.png" class="fotorg">
          <img src="/team/da/m.png" class="fotorg">
          <img src="/team/da/f.png" class="fotorg">
          <img src="/team/da/r.png" class="fotorg">
        </div>
        <br><br>
        <h3>PUBDOK</h3>
        <br>
        <img src="/team/pu/i.png" class="fotorg">
        <div class="divisi">
          <img src="/team/pu/d.png" class="fotorg">
          <img src="/team/pu/dh.png" class="fotorg">
          <img src="/team/pu/s.png" class="fotorg">
          <img src="/team/pu/sa.png" class="fotorg">
          <img src="/team/pu/sh.png" class="fotorg">
        </div>
        <br><br>
        <h3>TEKNIS</h3>
        <br>
        <img src="/team/te/f.png" class="fotorg">
        <div class="divisi">
          <img src="/team/te/c.png" class="fotorg">
          <img src="/team/kr/h.png" class="fotorg">
          <img src="/team/te/t.png" class="fotorg">
          <img src="/team/te/sean.png" class="fotorg">
          <img src="/team/te/r.png" class="fotorg">
        </div>
        <br><br>
        <h3>KREATIF</h3>
        <br>
        <img src="/team/kr/b.png" class="fotorg">
        <div class="divisi">
          <img src="/team/kr/f.png" class="fotorg">
          <img src="/team/kr/h.png" class="fotorg">
          <img src="/team/kr/iz.png" class="fotorg">
          <img src="/team/kr/aq.png" class="fotorg">
          <img src="/team/kr/ar.png" class="fotorg">
          <img src="/team/kr/ij.png" class="fotorg">
          <img src="/team/kr/r.png" class="fotorg">
          <img src="/team/kr/tk.png" class="fotorg">
        </div>
        <br><br>
        <h3>ACARA</h3>
        <br>
        <img src="/team/ac/cl.png" class="fotorg">
        <div class="divisi">
          <img src="/team/ac/g.png" class="fotorg">
          <img src="/team/ac/n.png" class="fotorg">
          <img src="/team/ac/p.png" class="fotorg">
          <img src="/team/ac/sha.png" class="fotorg">
          <img src="/team/ac/sh.png" class="fotorg">
          <img src="/team/ac/va.png" class="fotorg">
          <img src="/team/ac/v.png" class="fotorg">
          <img src="/team/ac/z.png" class="fotorg">
        </div>
        <br><br>
        <h3>KURATORIAL</h3>
        <br>
        <img src="/team/ku/r.png" class="fotorg">
        <div class="divisi">
          <img src="/team/ku/ald.png" class="fotorg">
          <img src="/team/ku/al.png" class="fotorg">
          <img src="/team/ku/dia.png" class="fotorg">
          <img src="/team/ku/ec.png" class="fotorg">
          <img src="/team/ku/shi.png" class="fotorg">
          <img src="/team/ku/hana.png" class="fotorg">
        </div>
        <br>
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
  color: #ede5d1;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 1;
  text-decoration: none;
  opacity: 0.4;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    text-decoration: none;
    opacity: .9;
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
  
  h3 {
    font-family: 'KG Happy Solid';
    font-style: normal;
    font-size: 35px;
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
    margin-bottom: 30px;
  }

  .team {
    margin-top: 125px;
    width: 1050px;
  }

  .fotorg {
    width: 350px;
  }

  .sekben {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .divisi {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media only screen and (min-width: 1070px) {
    .mid2 {
      display: none;
    }
  }

  @media only screen and (max-width: 1070px) {
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
      width: 700px;
    }
  }

  @media only screen and (max-width: 660px) {
    div {
      font-size: 24px;
    }

    h1 {
      font-size: 35px;
    }

    h2 {
      font-size: 35px;
    }

    h3 {
      font-size: 20px;
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

    .mid4 {
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
      width: 500px;
    }

    .fotorg {
      width: 250px;
    }
  }

  @media only screen and (min-width: 660px) and (max-width: 768px) {
    div {
      font-size: 24px;
    }

    h1 {
      font-size: 35px;
    }

    h2 {
      font-size: 35px;
    }

    h3 {
      font-size: 27px;
    }

    p {
      width: 450px;
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
      width: 600px;
    }

    .mid {
      width: 610px;
      margin-left: 8px;
    }

    .mid2 {
      width: 610px;
      margin-left: 8px;
    }

    .mid3 {
      width: 610px;
      margin-left: 8px;
      margin-bottom: -50px;
    }

    .bottom {
      width: 600px;
      margin-left: 1px;
    }

    .papertext {
      top: 125px;
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
      width: 600px;
    }

    .fotorg {
      width: 280px;
    }
  }

  @media only screen and (min-width: 769px) {
    .mid3 {display: none;}
  }

  @media only screen and (min-width: 660px) {
    .mid4 {display: none;}
  }

  @media only screen and (min-width: 470px) {
    .mid5 {display: none;}
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

    h3 {
      font-size: 18px;
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

    .mid4 {
      width: 264px;
      margin-left: 4px;
    }

    .mid5 {
      width: 264px;
      margin-left: 4px;
    }

    .bottom {
      width: 260px;
      margin-left: 1px;
    }

    .papertext {
      top: 60px;
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
      width: 270px;
    }

    .sekben {
      flex-direction: column;
    }
    
    .fotorg {
      width: 200px;
    }
  }
</style>
