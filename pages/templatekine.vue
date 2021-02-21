<template>
  <div class="container">
    <div class="content">
        <img src="/templatekine/g1 kuning.png" class="g1">
        <img src="/templatekine/g2 kuning.png" class="g2">

        <div class="layer2">
            <div class="fotoo">
                <fa :icon="['fas', 'caret-left']" class="leftarrow arrow"/>
                <img src="/guide-fear1.png">
                <fa :icon="['fas', 'caret-right']" class="rightarrow arrow"/>
            </div>
            
            <div class="paper">
                <img src="/templatekine/paper.png" class="paperr">
                <img src="/templatekine/paper.png" class="paperr">
                <img src="/templatekine/paper.png" class="paperrr">
                <img src="/templatekine/paper.png" class="paperrrr">
        
                <div class="papertext">
                    <img src="/templatekine/joy.png" class="header">
                    <div class="judul">
                        The Misconceptions of Us
                    </div>
                    <div class="author">
                        Unknown
                    </div>
                    <div class="isi">
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                        <br>
                        <p>You are my word, my sentence, my entire language. I may have other thoughts, I may dream other dreams. But in the end, I’m only speaking of you. Even if I endlessly count the stars and not try to dream, there remain countless reasons of why I think of you all night.</p>
                    </div>
                </div>

                <div class="printilan">
                  <img src="/templatekine/tape kuning.png" class="tape">
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
    font-family: 'Karla';
    font-size: 20px;
    color: #1f1f1f;
    text-align: center;
  }

  .container {
    background-image: url("/img/uc-bg.png");
    background-size: 1536px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  a {
    color: #d1bb10;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .g1 {
    position: absolute;
      width: 300px;
      top: -30px;
      left: 250px;
  }

  .g2 {
    position: absolute;
      width: 300px;
      bottom: -46.5px;
      margin-left: 425px;
  }
  
  .layer2 {
      width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    position: absolute;
      justify-content: space-between;
      padding: 100px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 100px;
    color: #ede5d1;
  }

  .fotoo {
    margin-left: 35px;
    position: relative;

    img {
      width: 450px;
    }
  }

  .leftarrow {
    left: -60px;
  }

  .rightarrow {
    right: -60px;
  }

  .paper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    margin-top: 50px;
  }

  .paperr {
    width: 750px;
    margin-top: -10px;
  }

  .papertext {
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: flex-start;
      text-align: center;
      position: absolute;
      padding: 20px 30px;
  }

  .header {
    width: 175px;
  }

  .judul {
      font-family: 'KG Happy Solid';
      font-size: 28px;
      color: #d1bb10;
      padding: 5px 0;
  }

  .author {
      font-family: 'Mechanical Pencil';
      font-size: 25px;
      padding-top: 5px;
      padding-bottom: 40px;
  }

  .isi {
    text-align: left;
    max-height: 400px;
    overflow-y: scroll;
    padding: 0 30px;
    //firefox
    scrollbar-color: #ede5d1 rgba($color: #19202d, $alpha: 0.6); 
    scroll-behavior: smooth;
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: none;
  }
  ::-webkit-scrollbar {
    width: 7px;
    background-color: none;
  }
  .isi::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #19202d;
  }

  .printilan {
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    position: absolute;
  }

  .tape {
    width: 175px;
    margin-left: 660px;
    margin-top: 75px;
  }

  @media only screen and (min-width: 750px) {
    .paperrr {display: none;}
  }

  @media only screen and (min-width: 400px) {
    .paperrrr {display: none;}
  }

  @media only screen and (max-width: 1530px) {
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
      position: absolute;
        width: 300px;
        top: -30px;
        left: 250px;
    }

    .g2 {
      position: absolute;
        width: 300px;
        bottom: -46.5px;
        margin-left: 425px;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
        justify-content: space-between;
        padding: 100px;
    }

    .arrow {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 100px;
      color: #ede5d1;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;
      position: relative;

      img {
        width: 450px;
      }
    }

    .leftarrow {
      left: -60px;
    }

    .rightarrow {
      right: -60px;
    }

    .paper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 80vh;
      margin-top: 50px;
    }

    .paperr {
      width: 750px;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 20px 30px;
    }

    .header {
      width: 175px;
    }

    .judul {
        font-family: 'KG Happy Solid';
        font-size: 28px;
        color: #d1bb10;
        padding: 5px 0;
    }

    .author {
        font-family: 'Mechanical Pencil';
        font-size: 25px;
        padding-top: 5px;
        padding-bottom: 40px;
    }

    .isi {
      text-align: left;
      max-height: 700px;
      overflow-y: scroll;
      padding: 0 30px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ede5d1;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 175px;
      margin-left: 660px;
      margin-top: 75px;
    }
  }

  @media only screen and (max-width: 749px) {
    div {
      font-size: 15px;
    }
    
    .content {
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
        width: 230px;
        top: -20px;
        left: 50px;
    }

    .g2 {
      display: none;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
        padding: 30px 0;
    }

    .arrow {
      font-size: 70px;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;

      img {
        width: 250px;
      }
    }

    .leftarrow {
      left: -50px;
    }

    .rightarrow {
      right: -50px;
    }

    .paper {
      height: 80vh;
      margin-top: 50px;
    }

    .paperr {
      width: 365px;
      margin-top: -10px;
    }
    .paperrr {
      width: 365px;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 5px 10px;
    }

    .header {
      width: 120px;
    }

    .judul {
        font-size: 22px;
        padding: 5px 0;
    }

    .author {
        font-size: 20px;
        padding-top: 5px;
        padding-bottom: 30px;
    }

    .isi {
      text-align: left;
      max-height: 500px;
      overflow-y: scroll;
      padding: 0 10px;
    }

    ::-webkit-scrollbar {
      width: 3px;
      background-color: none;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 100px;
      margin-left: 300px;
      margin-top: -10px;
    }
  }

  @media only screen and (max-width: 399px) {
    div {
      font-size: 12px;
    }
    
    .content {
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
        width: 200px;
        top: -20px;
        left: 10px;
    }

    .g2 {
      display: none;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
        padding: 30px 0;
    }

    .arrow {
      font-size: 50px;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;

      img {
        width: 200px;
      }
    }

    .leftarrow {
      left: -30px;
    }

    .rightarrow {
      right: -30px;
    }

    .paper {
      height: 80vh;
      margin-top: 50px;
    }

    .paperr {
      width: 250px;
      margin-top: -10px;
    }
    .paperrr {
      width: 250px;
      margin-top: -10px;
    }
    .paperrrr {
      width: 250px;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 5px 10px;
    }

    .header {
      width: 100px;
    }

    .judul {
        font-size: 18px;
        padding: 5px 0;
    }

    .author {
        font-size: 16px;
        padding-top: 5px;
        padding-bottom: 40px;
    }

    .isi {
      text-align: left;
      max-height: 400px;
      overflow-y: scroll;
      padding: 0 10px;
    }

    ::-webkit-scrollbar {
      width: 3px;
      background-color: none;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 80px;
      margin-left: 200px;
      margin-top: -5px;
    }
  }
</style>