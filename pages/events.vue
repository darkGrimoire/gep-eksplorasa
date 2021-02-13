<template>
  <div class="container">
    <div class="content">
      <img src="/events/events.png" class="judul">

      <div class="box">
        <img src="/events/kain.png" class="kain">

        <div class="kancing">
          <img src="/events/kancing.png" class="kncg">
          <img src="/events/kancing2.png" class="kncg2">
        </div>

        <div class="isibox">
          <!-- nyomot dari w3 hehe ^-^ -->
            <div class="tanggal">
              <button class="tablink" v-on:click="getevent(22)">22</button>
              <button class="tablink" v-on:click="getevent(23)">23</button>
              <button class="tablink" v-on:click="getevent(24)" id="defaultOpen">24</button>
              <button class="tablink" v-on:click="getevent(25)">25</button>
              <button class="tablink" v-on:click="getevent(26)">26</button>
              <button class="tablink" v-on:click="getevent(27)">27</button>
              <button class="tablink" v-on:click="getevent(28)">28</button>
            </div>

            <img src="/events/garis.png" class="garis">

            <!--<div id="22" class="tabcontent">isi 22</div>
            <div id="23" class="tabcontent">isi 23</div>
            <div id="24" class="tabcontent">isi 24</div>
            <div id="25" class="tabcontent">isi 25</div>
            <div id="26" class="tabcontent">isi 26</div>
            <div id="27" class="tabcontent">isi 27</div>
            <div id="28" class="tabcontent">isi 28</div>-->
            <br><br>


            <!-- contoh layout eventnya
            <div id="22" class="tabcontent">
              <div class="jam">17.00</div>
              <div class="acara">
                Workshop
                <br>Bersama Siapa Hayo
                <br><a href="">bit.ly/ape</a>
              </div>
            </div>
            -->

            <div class="tabcontent" style="display:block" v-html="eventout">
              
            </div>

          <!--<br><br>
          <center>
          <span style="color:white">
            <span v-for="(item, key) in events" :key="key">
              {{item.nama}} - {{item.deskripsi}} - {{datetostring( convertToWIB(new Date(1000*item.tanggal.seconds)) )}}<br>
            </span>
            <br><br>
            <input type="text" v-model="date" placeholder="Masukin tanggal (dlm feb 2021)" /> <button class="button" @click.prevent="getevent">Get</button>
            <br><br>
            <span v-html="eventout"></span>
          </span>
          </center>-->

        </div>
      </div>
    </div>
  </div>
</template>

<!-- punten yah aing jadiin comment juga biar masih kepreserve takutnya gue ga sengaja delete sesuatu,,, 
<template>
  <div class="page-container">
    <br><br><br><br>
    <center>
    <span style="color:white">
      <span v-for="(item, key) in events" :key="key">
        {{item.nama}} - {{item.deskripsi}} - {{datetostring( convertToWIB(new Date(1000*item.tanggal.seconds)) )}}<br>
      </span>
      <br><br>
      <input type="text" v-model="date" placeholder="Masukin tanggal (dlm feb 2021)" /> <button class="button" @click.prevent="getevent">Get</button>
      <br><br>
      <span v-html="eventout"></span>
    </span>
    </center>
  </div> 
</template> -->

<script>
export default {
  name: 'Events',
  data () {
    return {
      events: [],
      eventout: ""
    }
  },
  async mounted () {
      this.events = this.sortEventByTimestamp(await this.getDataFromCollection(this.$fire.firestore.collection("events")))
      //this.getevent(this.convertToWIB(new Date()).getDate())
      this.getevent(24)
  },
  methods: {
      getevent(date) {
        if(date>28||date<1){
            return false
        }
        this.eventout = ""
        let out = this.geteventbyday(date)
        for (let i in out){
          let event = out[i]
          this.eventout += event.nama +" - "+ event.deskripsi +" - "+ this.datetostring(this.convertToWIB( new Date(1000*event.tanggal.seconds)) )+"<br>"
        }
        if(this.eventout==""){
          this.eventout = "not found"
        }
      },
      getDataFromCollection(collection){
        return collection.get()
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            return data
          })
      },
      sortEventByTimestamp(arr){
        return arr.sort(function(a,b){return a.tanggal.seconds-b.tanggal.seconds})
      },
      datetodate(d) {
        let tgl = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
        let mon = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
        return tgl + "-" + mon + "-" + d.getFullYear()
      },
      datetojam(d){
        let jam = d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
        let mnt = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
        return jam+"."+mnt+" WIB"
      },
      datetostring(d){
        return this.datetodate(d)+" "+this.datetojam(d)
      },
        // karena cuma februari berarti pake integer tanggal aja hehe
      gettimestampbyday(tgl){
        let start = this.convertToWIB(new Date(2021, 1, parseInt(tgl), 0, 0, 0))
        let end = this.convertToWIB(new Date(2021, 1, parseInt(tgl), 23, 59, 59))

        return {
          start: start.getTime(),
          end: end.getTime()
        }
      },
      geteventbyday(tgl){
        let timestamp = this.gettimestampbyday(tgl)
        let out = []

        for (let i in this.events){
          let eventts = this.events[i].tanggal.seconds*1000
          if (timestamp.start<=eventts && eventts<=timestamp.end) {
            out.push(this.events[i])
          }
        }

        return out
      },
      convertToWIB(date) {
        return new Date(
            (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            })
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
/* ini kode cal yaaa gue ga berani hapus yang di bawah wkwk */
  * {
    font-family: 'KG Happy Solid';
    font-size: 20px;
    color: #1f1f1f;
    text-align: center;
  }

  .container {
    background-image: url("/events/kuning.png");
    background-size: 1536px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
    color: #1f1f1f;
    text-decoration: none;
    font-family: 'Mechanical Pencil';
    font-size: 30px;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    border: none;
    text-decoration: none;
    font-size: 40px;
    background: none;
  }

  button:active {
    background-image: url("/events/circle.png");
    background-size: 95px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .tablink {
    background-color: none;
    padding: 0 30px;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 40px;
  }

  .tabcontent {
    display: flex;
    flex-direction: row;
  }

  .acara {
    padding-left: 50px;
  }

  .judul {
    margin-top: -30px;
    width: 525px;
  }

  .box {
    top: 35px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kain {
    width: 975px;
    margin-top: -25px;
  }

  .kancing {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: -100px;
  }

  .kncg {
    width: 85px;  
    margin-left: -465px;
  }

  .kncg2 {
    width: 95px;
    margin-right: -500px;
    margin-top: 30px;
  }

  .garis {
    width: 850px;
    margin-top: -20px;
  }

  .isibox {
    width: 100%;
    top: 50px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute; 
  }


/* nyomot w3school */
/* 
  .button {
    background-color: #4CAF50; /* Green */
    /* border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  input[type=text] {
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  div {
    font-family: 'Mechanical Pencil';
    font-size: 40px;
  }
  .page-container {
    position: relative;
    background-image: url("/img/uc-bg.png");
    background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center top;
    height: 100vh;
    width: 100vw;

    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      // height: 100vh; prevent distortion
      // width: 100vw;
      z-index: 2;
    }
    .main-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      .text-gif {
        width: 40vw;
      }

      .house-gif {
        margin-top: 30px;
        width: 36vw;
      }

      .countdown-container{
        position: relative;
        margin-top: 40px;
        width: 45vw;

        .count-gif {
          width: 100%;
        }

        .count-text{
          position: absolute;
          width: 70%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          top: 53%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #e14423;

         .number {
            font-family: 'KG HAPPY Solid';
            font-size: 3.5rem;
          }
        }
      }
    }

    .link-container {
      position: absolute;
      bottom: 20px;
      left: 20px;
     

      .link {
        width: 50px;
        margin-left: 25px;
      }
    }
  }
  
  @media (max-width: 1024px) {
    .page-container {
      .canvas {
        display: none;
      }
      .main-container {
        .text-gif {
          width: 80vw;
        }
        .house-gif {
          margin-top: 30px;
          width: 60vw;
        }
        .countdown-container{
          margin-top: 60px;
          width: 80vw;
          .count-text{
            .number {
              font-size: 5rem;
            }
            .text {
              font-size: 3rem;
            }
          }
        }
      }

      .link-container {
        bottom: 30px;
        left: 40px;
      
        .link {
          width: 70px;
          margin-left: 30px;
        }
      }
    }
  }
  @media (min-width: 461px) and (max-width: 540px) {
    .name {
      font-size: 20px;
    }
    .position {
      font-size: 15px;
    }
  }

  @media (max-width: 460px) {
    .page-container {
      .main-container {
        .text-gif {
          width: 80vw;
        }
        .house-gif {
          margin-top: 30px;
          width: 70vw;
        }
        .countdown-container{
          margin-top: 60px;
          width: 90vw;
          .count-text{
            .number {
              font-size: 2rem;
            }
            .text {
              font-size: 1.2rem;
            }
          }
        }
      }

      .link-container {
        bottom: 15px;
        left: 15px;
     
        .link {
          width: 40px;
          margin-left: 20px;
        }
      }
    }
  } */
</style>
