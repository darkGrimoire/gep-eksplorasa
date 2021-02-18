<template>
  <div class="page-container">
    <div class="main-container">
      <img src="/img/paper-min.png" class="background">
      <div class="form-container">
        <div class="title">
          <img src="/img/emo-joy-min.png" class="smiley-left">
          <img src="/img/bubble-1-min.png" class="image-title">
          <img src="/img/emo-joy-min.png" class="smiley-right">
        </div>
        <div class="form-name">
          <img src="/img/emo-fear-min.png" class="image">
       
          <div class="field">
            <div class="label">
              uhm... your name?
            </div>
            <input v-model="form.nama" type="text" class="input" placeholder="Tell me!" required>
          </div>
        </div>
        <div class="form-from">
          <img src="/img/emo-anger-min.png" class="image">
          <div class="field">
            <div class="label">
              Where are you from !?
            </div>
            <input v-model="form.institusi" type="text" class="input" placeholder="Tell me!" required @keyup.enter.prevent="submit">
          </div>
        </div>
        <div class="form-submit">
          <img src="/img/emo-sad-min.png" class="image">
          <div class="field">
            <div class="label">
              submit please
            </div>
            <div class="btn" @click.prevent="submit">
              submit
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="image-container">
      <img src="/img/things-1-min.png" class="image-1">
      <img src="/img/things-2-min.png" class="image-2">
      <img src="/img/things-3-min.png" class="image-3">
      <img src="/img/things-4-min.png" class="image-4">
      <img src="/img/things-5-min.png" class="image-5">
    </div>
  </div>
</template>

<script>

export default {
  name: 'GuestBook',
  data() {
    return {
      form:{
        nama: "",
        institusi: "",
        visited: false
      }
  }},
  mounted() {
    this.tulishasilcekstorage()
  },
  methods:{
    hapusstorage(){
      if(this.cekstorage()){
        localStorage.removeItem("nama")
        localStorage.removeItem("visited")
        window.location.reload()
      }
    },
    cekstorage(){
      return (localStorage.getItem("nama") && localStorage.getItem("nama")!="" && localStorage.getItem("visited"))
    },
    tulishasilcekstorage(){
      // this.form.nama = localStorage.getItem("nama")
      this.form.visited = localStorage.getItem("visited")
    },
    submit(){
      let now = new Date()
      const data = {
          nama: this.form.nama,
          institusi: this.form.institusi,
          time: now
        }
        if (data.nama==""||data.institusi==""){
          alert('Tolong diisi semua ya :)')
          return false
        }
        return this.$fire.firestore.collection('bukutamu').add({
          ...data
        }).then(async () => 
        {
          if(process.client){
            if (!this.form.visited){
              await this.$fire.analytics.logEvent('first_isi_buku_tamu', {
                nama: this.form.nama,
                institusi: this.form.institusi
              })
            }
            localStorage.setItem("nama", this.form.nama)
            localStorage.setItem("visited", true)
            this.$router.push({
              path: '/dots'
            })
          }
        }).catch(() => {
          alert('Ada kesalahan server. Mohon refresh dan mencoba kembali')
          return false
        })
    }
  },
  head: {
    title: 'Isi buku tamu :)'
  }
}
</script>

<style lang="scss" scoped>
  div {
    font-family: 'Mechanical Pencil';
    font-size: 40px;
  }
  .page-container {
    position: relative;
    background-image: url("/img/BEIGE-min.png");
    background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center top;
    height: 100vh;
    width: 100vw;

    .main-container {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .background {
        width: 40vw;
      }

      .form-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

         .title {
          margin-top: 17%;
          margin-bottom: 7%;
          width: 90%;
          display: flex;
          justify-content: center;
          
          .smiley-left {
            width: 10%;
            margin-right: 20px;
            transform: rotate(-17deg);
          }

          .image-title {
            width: 70%;
          }

          .smiley-right {
            width: 10%;
            margin-left: 20px;
            transform: rotate(3deg);
          }
        }

        .form-name {
          margin-bottom: 7%;
          display: flex;
          justify-content: center;
          width: 90%;
          align-items: flex-end;
          align-self: center;
          
          .image{
            width: 10%;
            margin-right: 25px;
            transform: rotate(30deg);
          }

          .field{
            width: 70%;
            font-size: 3.6vh;
            .label {
              font-size: 1em;
              color: #009562;
              margin-bottom: 4%;
              font-weight: 500;
            }

            .input {
              background:url("/img/bubble-2-min.png") no-repeat center center; 
              background-size: 100%;
              border: none;
              width: 100%;
              font-size: 1em;
              color: white;
              font-family: 'Mechanical Pencil';
              padding: 20px 30px 20px 30px;
              margin:  -20px -30px -10px -20px;

              &:focus{
                outline: none;
              }
              &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: rgba($color: white, $alpha: .7);
                opacity: 1; /* Firefox */
              }

              &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: rgba($color: white, $alpha: .7);
              }

              &::-ms-input-placeholder { /* Microsoft Edge */
                color: rgba($color: white, $alpha: .7);
              }
            }
          }
        }

        .form-from {
          margin-bottom: 10%;
          display: flex;
          justify-content: center;
          width: 90%;
          align-items: flex-end;
          align-self: center;
          
        .image{
            width: 10%;
            margin-right: 25px;
            transform: rotate(-7deg);
          }

          .field{
            width: 70%;
            font-size: 3.6vh;
            .label {
              font-size: 1em;
              color: #E14423;
              margin-bottom: 4%;
              font-weight: 500;
            }

            .input {
              background:url("/img/bubble-3-min.png") no-repeat center center; 
              background-size: 100%;
              border: none;
              width: 100%;
              font-size: 1em;
              color: white;
              font-family: 'Mechanical Pencil';
              padding: 20px 30px 20px 30px;
              margin:  -20px -30px -10px -20px;

              &:focus{
                outline: none;
              }
              &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: rgba($color: white, $alpha: .7);
                opacity: 1; /* Firefox */
              }

              &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: rgba($color: white, $alpha: .7);
              }

              &::-ms-input-placeholder { /* Microsoft Edge */
                color: rgba($color: white, $alpha: .7);
              }
            }
          }
        }

        .form-submit {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          width: 50%;
          align-items: flex-end;
          align-self: center;
          
          .image{
            width: 20%;
            transform: rotate(2deg);
            margin-right: -15px;
          }

          .field{
            width: 70%;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 3.4vh;

            .label {
              font-size: 1em;
              color: #305fe9;
              margin-bottom: 4%;
              font-weight: 500;
            }

            .btn {
              background:url("/img/bubble-5-min.png") no-repeat center center;
              background-size: 80%;
              text-align: center;
              color: #305fe9;
              width: 100%;
              padding-top: 25px;
              padding-bottom: 20px;
              margin-top: -10px;
              margin-bottom: -10px;
              font-size: 1em;

              &:hover{
                cursor: pointer;              
                background:url("/img/bubble-4-min.png") no-repeat center center;
                background-size: 80%;
                color: white;
              }
            }
          }
        }
      }

     
    }
    .image-container {
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .image-1 {
        top: 15%;
        left: -1%;
        position: absolute;
        width: 27%;
      }
      .image-2 {
        top: 38%;
        left: 20%;
        position: absolute;
        width: 5%;
      }

      .image-3 {
        top: 14%;
        right: 17%;
        position: absolute;
        width: 8%;
      }

      .image-4 {
        top: 60%;
        left: 7%;
        position: absolute;
        width: 14%;
      }

      .image-5 {
        top: 21%;
        right: -0.5%;
        position: absolute;
        width: 23%;
      }
    }
  }
  @media (max-width: 1024px) {
    .page-container{
      .main-container {
        .background {
          width: 90vw;
        }
      }
      .image-container{
        display: none;
      }
    }
  }
  @media (max-width: 460px) {
    .page-container{
      .main-container {
        .form-container{
          .title{
            .smiley-left{
              margin-right: 10px;
            }
            .smiley-right{
              margin-left: 10px;
            }
          }
          
          .form-name{
            .field{
              font-size: 5vw;

              .input{
                padding: 10px 20px 10px 20px;
                margin:  -10px -20px -10px -20px;
              }
            }
           
          }

          .form-from{
            .field{
              font-size: 5vw;

              .input{
                padding: 10px 20px 10px 20px;
                margin:  -10px -20px -10px -20px;
              }
            }
          }

          .form-submit{
            .field{
              font-size: 5vw;
            }
          }
        }
      }
    }
  }
</style>
