<template>
  <div class="podcastPopup" @click="bodyClick">
    <div class="podcastpopupwindow">
      <div class="podcast-x-button">
        <img class="podcast-exit-image" @click="close()" />
      </div>
      <div class="main-podcast">
        <div class="list-area">
          <ol>
            <li
              v-for="(item, index) in judul"
              :key="index"
              @click="goToKarya(index)"
            >
              {{ judul[index] }}
            </li>
          </ol>
        </div>
        <div class="pod-area">
          <div class="poster-area" @click="gotoKarya(this.pos)">
            <img class="poster bordered" />
          </div>
          <div class="arrow-area">
            <img class="left-arrow" @click="movePos(-1)" />
            <img class="center-ghost" @click="gotoKarya(this.pos)"/>
            <img class="right-arrow" @click="movePos(1)" />
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
      pos: 0,
      room: "",
      judul: [],
      poster: [],
      alamat: [],
      amount: 0
    }
  },
  mounted() {
    this.getRoom()
    this.getPodcastData()
    this.initSetUpPodcast()
  },
  methods: {
    getRoom() {
      // GET THE ROOM NAME USING REGEX FROM THE URL
      const link = window.location.href
      this.room = link.match(
        /(Joy|Sadness|Anger|Fear|joy|sadness|anger|fear)/i
      )[0]
    },
    async getPodcastData() {
      const testing = await this.$fire.firestore
        .collection("karya")
        .doc("routes")
        .collection(this.room.toLowerCase())
        .doc("podcast")
        .get()
      const temp_path = testing.data().routes
      temp_path.forEach(item => {
        this.judul.push(item.judul)
        this.poster.push(item.poster)
        this.alamat.push(item.route)
      })
      this.amount = this.judul.length
      document.getElementsByClassName("poster")[0].src =
        this.poster[0] || "/loading.svg"
      console.log(this.judul)
      console.log(this.poster)
      console.log(this.alamat)
      console.log(this.amount)
    },
    initSetUpPodcast() {
      document.getElementsByClassName("podcast-exit-image")[0].src =
        "/img/popup/exit-0.png"
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
      document.getElementsByClassName("left-arrow")[0].src =
        "/img/popup/LPolygon-" + id_room + ".png"
      document.getElementsByClassName("center-ghost")[0].src =
        "/img/popup/ghost.png"
      document.getElementsByClassName("right-arrow")[0].src =
        "/img/popup/RPolygon-" + id_room + ".png"
    },
    movePos(id_pindah) {
      // CHANGE THE MOVIE POSTER SHOWN
      // 0 <= this.pos < this.amount
      this.pos += id_pindah
      if (this.pos < 0) {
        this.pos = 0
      } else if (this.pos == this.amount) {
        this.pos = this.amount - 1
      }
      document.getElementsByClassName("poster")[0].src = this.poster[this.pos]
      if (this.pos == 0) {
        document.getElementsByClassName("left-arrow")[0].style.visibility =
          "hidden"
      } else {
        document.getElementsByClassName("left-arrow")[0].style.visibility =
          "visible"
      }
      if (this.pos == this.amount - 1) {
        document.getElementsByClassName("right-arrow")[0].style.visibility =
          "hidden"
      } else {
        document.getElementsByClassName("right-arrow")[0].style.visibility =
          "visible"
      }
      console.log(this.pos)
    },
    close() {
      // CLOSE (UN-DISPLAY) THE POP UP WINDOW
      document.getElementsByClassName("podcastPopup")[0].style.display = "none"
    },
    isInsidePopUpWindow(x, y) {
      // CHECK IF CLICK IS INSIDE THE POPUP
      const x1 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().left
      const x2 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().right
      const y1 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().top
      const y2 = document
        .getElementsByClassName("podcastpopupwindow")[0]
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
    goToKarya(id) {
      const tujuan = "/karya/" + this.room.toLowerCase() + "/" + this.alamat[id]
      this.$router.push({ path: tujuan })
    }
  }
}
</script>

<style>
.podcastPopup {
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
  font-family: "Mechanical Pencil";
  font-size: 2rem;
}
.podcastpopupwindow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("/img/bg_beige-min.png");
  min-width: 30%;
}
.podcast-x-button {
  display: flex;
  flex-direction: row-reverse;
  margin: 1% 1% 1% 0;
}
.main-podcast {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 5%;
}
.list-area {
  max-width: 50%;
}
ol {
  list-style-position: inside;
}
li {
  margin-bottom: 5%;
}
li:hover {
  cursor: pointer;
  text-decoration: underline;
}
.pod-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.poster-area {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
.poster {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.poster:hover {
  cursor: pointer;
}
.arrow-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.left-arrow:hover {
  cursor: pointer;
}
.center-ghost:hover {
  cursor: pointer;
}
.right-arrow:hover {
  cursor: pointer;
}
@media screen and (max-width: 1020px) {
  .podcastPopup {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 700px) {
  .podcastpopupwindow {
    min-width: 75%;
  }
}
@media screen and (max-width: 500px) {
  .poster-area {
    width: 150px;
    height: 150px;
    border: 1px solid black;
  }
}
@media screen and (max-width: 400px) {
  .podcastPopup {
    font-size: 1.25rem;
  }
}
@media screen and (max-width: 300px) {
  .poster-area {
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
}
</style>