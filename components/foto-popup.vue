<template>
  <div class="fotoPopup" @click="bodyClick">
    <div class="fotopopupwindow">
      <div class="foto-x-button">
        <img class="foto-exit-image" @click="close()">
      </div>
      <div class="fotoscroll">
        <div
          v-for="(item, index) in judul"
          :key="index"
          class="foto-area"
          @click="keKarya(index)"
        >
          <img class="foto" :src="poster_foto[index]">
          <div class="layout">
            {{ judul[index] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: "",
      judul: [],
      poster_foto: [],
      alamat: [],
      author: []
    }
  },
  mounted() {
    this.getRoom()
    this.getData()
    this.initSetUpFoto()
  },
  methods: {
    getRoom() {
      // GET THE ROOM NAME USING REGEX FROM THE URL
      const link = window.location.href
      this.room = link.match(
        /(Joy|Sadness|Anger|Fear|joy|sadness|anger|fear)/i
      )[0]
    },
    async getData() {
      // GET THE FILM DATA FROM THE FIREBASE
      const testing = await this.$fire.firestore
        .collection("karya")
        .doc("routes")
        .collection(this.room.toLowerCase())
        .doc("foto")
        .get()
      const temp_path = (testing.data().routes || testing.data().route)
      temp_path.forEach(item => {
        this.judul.push(item.judul)
        this.poster_foto.push(item.poster)
        this.alamat.push(item.route)
        this.author.push(item.author)
      })
    },
    initSetUpFoto() {
      let id_room = 0
      if (this.room.toLowerCase() == "joy") {
        id_room = 1
      } else if (this.room.toLowerCase() == "sadness") {
        id_room = 2
      } else if (this.room.toLowerCase() == "anger") {
        id_room = 3
      } else if (this.room.toLowerCase() == "fear") {
        id_room = 4
      }
      document.getElementsByClassName("foto-exit-image")[0].src =
        "/img/popup/exit-" + id_room + ".png"
      const windowpop = document.getElementsByClassName("fotopopupwindow")[0]
      windowpop.style.backgroundImage =
        "url(/img/popup/film-" + this.room.toLowerCase() + ".png)"
    },
    close() {
      // CLOSE (UN-DISPLAY) THE POP UP WINDOW
      document.getElementsByClassName("fotoPopup")[0].style.display = "none"
    },
    isInsidePopUpWindow(x, y) {
      // CHECK IF CLICK IS INSIDE THE POPUP
      const x1 = document
        .getElementsByClassName("fotopopupwindow")[0]
        .getBoundingClientRect().left
      const x2 = document
        .getElementsByClassName("fotopopupwindow")[0]
        .getBoundingClientRect().right
      const y1 = document
        .getElementsByClassName("fotopopupwindow")[0]
        .getBoundingClientRect().top
      const y2 = document
        .getElementsByClassName("fotopopupwindow")[0]
        .getBoundingClientRect().bottom
      if (x > x1 && x < x2 && y > y1 && y < y2) {
        return true
      }
      return false
    },
    bodyClick(event) {
      // CHECK THE LOCATION OF THE CLICK
      // IF INSIDE POPUP, DO NOTHING
      // IF OUTSIDE POPUP, CLOSE POPUP
      if (this.isInsidePopUpWindow(event.clientX, event.clientY)) {
        return
      }
      this.close()
    },
    keKarya(id) {
      const tujuan = "/karya/" + this.room.toLowerCase() + "/" + this.alamat[id]
      this.$router.push({ path: tujuan })
    }
  }
}
</script>

<style>
.fotoPopup {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.8);
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  overflow: auto;
  z-index: 1000;
  color: black;
}
.fotopopupwindow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  height: 50%;
  background-attachment:scroll;
  /* background-color:white; */
}
.foto-x-button {
  display: flex;
  flex-direction: row-reverse;
}
.fotoscroll {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
}
.foto-area {
    position: relative;
    width: 200px;
    height: 200px;
}
.foto {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.layout {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
}
</style>