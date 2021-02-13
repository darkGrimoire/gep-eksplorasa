<template>
  <div class="container">
    <div class="content">
      <img src="/events/events.png" class="judul">

      <div class="box">
        <img src="/events/kain.png" class="kain">

        <div class="isibox">
          <!-- nyomot dari w3 hehe ^-^ -->
            <div class="tanggal">
              <button class="tablink" onclick="openPage('22', this)">22</button>
              <button class="tablink" onclick="openPage('23')">23</button>
              <button class="tablink" onclick="openPage('24', this)" id="defaultOpen">24</button>
              <button class="tablink" onclick="openPage('25')">25</button>
              <button class="tablink" onclick="openPage('26')">26</button>
              <button class="tablink" onclick="openPage('27')">27</button>
              <button class="tablink" onclick="openPage('28')">28</button>
            </div>

            <div id="22" class="tabcontent">isi 22</div>
            <div id="23" class="tabcontent">isi 23</div>
            <div id="24" class="tabcontent">isi 24</div>
            <div id="25" class="tabcontent">isi 25</div>
            <div id="26" class="tabcontent">isi 26</div>
            <div id="27" class="tabcontent">isi 27</div>
            <div id="28" class="tabcontent">isi 28</div>

          <br><br>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnderConstruction',
  data () {
    return {
      events: [],
      date: "",
      eventout: ""
    }
  },
  async mounted () {
      this.events = this.sortEventByTimestamp(await this.getDataFromCollection(this.$fire.firestore.collection("events")))
  },
  methods: {
      getevent() {
        if(this.date>28||this.date<1){
            return false
        }
        this.eventout = ""
        let out = this.geteventbyday(this.date)
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
    color: #d1bb10;
    text-decoration: none;
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
    display: none;
  }

  .judul {
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
</style>
