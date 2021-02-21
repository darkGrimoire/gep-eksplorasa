<template>
  <div class="tvPopUp" @click="bodyClick">
    <div class="popupwindow bordered">
      <div class="x-button">
        <img class="exit-image" @click="close()" />
      </div>
      <div class="main-popup">
        <div class="left-area">
          <div class="now-showing"></div>
          <div class="main-poster">
            <div class="left-arrow" @click="movePos(-1)"></div>
            <div class="poster-area" @click="gotoKarya()">
              <img class="poster bordered" />
            </div>
            <div class="right-arrow" @click="movePos(1)"></div>
          </div>
          <div class="title-movie" @click="gotoKarya()">
          </div>
        </div>
        <div class="right-area"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testing: true,
      pos: 0,
      poster: [],
      judul: [],
      alamat: [],
      room: "",
      amount: 0
    }
  },
  mounted() {
    this.getRoom()
    this.getData()
    this.initSetUpTV()
  },
  methods: {
    getRoom() {
      // GET THE ROOM NAME USING REGEX FROM THE URL
      const link = window.location.href
      this.room = link.match(/(Joy|Sadness|`Anger`|Fear|joy|sadness|anger|fear)/i)[0]
    },
    async getData() {
      // GET THE FILM DATA FROM THE FIREBASE
      if (this.room.toLowerCase() == "fear") {
        return
      }
      const testing = await this.$fire.firestore
        .collection("karya")
        .doc("routes")
        .collection(this.room.toLowerCase())
        .doc("video")
        .get()
      const temp_path = testing.data().routes
      temp_path.forEach(item => {
        this.judul.push(item.judul)
        this.poster.push(item.poster)
        this.alamat.push(item.route)
      })
      this.amount = this.poster.length
      document.getElementsByClassName("poster")[0].src = (this.poster[0] || "/loading.svg")
      document.getElementsByClassName("title-movie")[0].innerHTML = (this.judul[
        0
      ] || "Loading")
    },
    initSetUpTV() {
      // SET UP THE COMPONENT BASED ON THE ROOM
      // JOY 1 SADNESS 2 ANGER 3

      if (this.room.toLowerCase() == "fear") {
        this.initSetUpFear()
        return
      }
      let id_room = 0
      /* Color based on the room */
      let color = ""
      if (this.room.toLowerCase() == "joy") {
        color = "#D1BB10"
        id_room = 1
      } else if (this.room.toLowerCase() == "sadness") {
        color = "#305FE9"
        id_room = 2
      } else if (this.room.toLowerCase() == "anger") {
        color = "#E14423"
        id_room = 3
      } else {
        color = "white"
      }
      /* give border color to bordered item */
      this.setUpBorderColor(color)
      /* Choose the x button and insert it */
      this.insertExitButton(id_room)
      /* Choose the now showing and insert it */
      const ns_path = "/img/popup/ns-" + id_room + ".png"
      let ns_img = document.createElement("img")
      ns_img.src = ns_path
      ns_img.style.width = "60%"
      let temp = document.getElementsByClassName("now-showing")[0]
      temp.appendChild(ns_img)
      /* Choose the arrow and insert it*/
      const leftArrowPath = "/img/popup/LPolygon-" + id_room + ".png"
      const rightArrowPath = "/img/popup/RPolygon-" + id_room + ".png"
      let lArrowImg = document.createElement("img")
      let rArrowImg = document.createElement("img")
      lArrowImg.src = leftArrowPath
      rArrowImg.src = rightArrowPath
      temp = document.getElementsByClassName("left-arrow")[0]
      temp.style.visibility = "hidden"
      temp.appendChild(lArrowImg)
      temp = document.getElementsByClassName("right-arrow")[0]
      temp.appendChild(rArrowImg)
      /* Choose the bookshelf */
      if (this.room.toLowerCase() == "anger") {
        const shelf_path = "/img/popup/rak-" + this.room.toLowerCase()+ ".png"
        let shelf_img = document.createElement("img")
        shelf_img.src = shelf_path
        shelf_img.classList.add("shelf")
        shelf_img.style.width = "75%"
        temp = document.getElementsByClassName("right-area")[0]
        temp.appendChild(shelf_img)
      } else if (this.room.toLowerCase()== "joy" || this.room.toLowerCase()== "sadness") {
        const shelf_path_1 = "/img/popup/rak-" + this.room.toLowerCase()+ "-1.png"
        let shelf_img_1 = document.createElement("img")
        shelf_img_1.src = shelf_path_1
        shelf_img_1.classList.add("shelf")
        shelf_img_1.style.width = "60%"
        const shelf_path_2 = "/img/popup/rak-" + this.room.toLowerCase()+ "-2.png"
        let shelf_img_2 = document.createElement("img")
        shelf_img_2.src = shelf_path_2
        shelf_img_2.classList.add("shelf")
        shelf_img_2.style.width = "60%"
        temp = document.getElementsByClassName("right-area")[0]
        temp.appendChild(shelf_img_1)
        temp.appendChild(shelf_img_2)
      }
      /* Set up poster and title */
      this.pos = -1
      document.getElementsByClassName("poster")[0].src = (this.poster[this.pos] || "/loading.svg")
      document.getElementsByClassName("title-movie")[0].innerHTML = (this.judul[
        this.pos
      ] || "Loading")
    },
    initSetUpFear() {
      // FEAR IS SEPARATED BECAUSE IT DOESN'T HAVE VIDEO
      // THUS THE LEFT AREA CAN BE NOT DISPLAYED
      let color = "#009562"
      this.setUpBorderColor(color)
      this.insertExitButton(4)
      document.getElementsByClassName("left-area")[0].style.display = "none"
      const shelf_path = "/img/popup/rak-" + this.room.toLowerCase()+ ".png"
      let shelf_img = document.createElement("img")
      shelf_img.src = shelf_path
      shelf_img.classList.add("shelf")
      shelf_img.style.width = "75%"
      shelf_img.style.marginBottom = "5%"
      let temp = document.getElementsByClassName("right-area")[0]
      temp.appendChild(shelf_img)
    },
    setUpBorderColor(color) {
      // SET UP THE COLOR THEME OF THE POP UP WINDOW TO color
      const itemsNeedBorder = document.getElementsByClassName("bordered")
      itemsNeedBorder.forEach(item => {
        item.style.borderColor = color
      })
      document.getElementsByClassName("popupwindow")[0].style.color = color
    },
    insertExitButton(id_room) {
      // INSERT THE X BUTTON BASED ON THE id_room
      const exit_path = "/img/popup/exit-" + id_room + ".png"
      let temp_x = document.getElementsByClassName("exit-image")[0]
      temp_x.src = exit_path
    },
    movePos(int_pindah) {
      // CHANGE THE MOVIE POSTER SHOWN
      // 0 <= this.pos < this.amount
      this.pos += int_pindah
      if (this.pos < 0) {
        this.pos = 0
      } else if (this.pos == this.amount) {
        this.pos = this.amount - 1
      }
      document.getElementsByClassName("poster")[0].src = this.poster[this.pos]
      
      document.getElementsByClassName("title-movie")[0].innerHTML = ""
      document.getElementsByClassName("title-movie")[0].innerHTML = this.judul[
        this.pos
      ]
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
    },
    close() {
      // CLOSE (UN-DISPLAY) THE POP UP WINDOW
      document.getElementsByClassName("tvPopUp")[0].style.display = "none"
    },
    isInsidePopUpWindow(x, y) {
      // CHECK IF CLICK IS INSIDE THE POPUP
      const x1 = document
        .getElementsByClassName("popupwindow")[0]
        .getBoundingClientRect().left
      const x2 = document
        .getElementsByClassName("popupwindow")[0]
        .getBoundingClientRect().right
      const y1 = document
        .getElementsByClassName("popupwindow")[0]
        .getBoundingClientRect().top
      const y2 = document
        .getElementsByClassName("popupwindow")[0]
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
    gotoKarya() {
      const tujuan = "/karya/" + this.room.toLowerCase() +"/" + this.alamat[this.pos]
      this.$router.push({path: tujuan})
    }
  }
}
</script>

<style>
.tvPopUp {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.8);
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  overflow: auto;
  z-index: 1000;
}
.popupwindow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0);
  border: 2px solid;
  padding: 1vw 1vh;
  z-index: 1001
}
.x-button {
  display: flex;
  flex-direction: row-reverse;
}
.main-popup {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.left-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.now-showing {
  display: flex;
  justify-content: center;
}
.main-poster {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.poster-area {
  margin-left: 1vw;
  margin-right: 1vw;
  width: 250px;
  height: 250px;
}
.poster-area:hover {
  cursor: pointer;
}
.poster {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid;
}
.title-movie {
  font-family: "Mechanical Pencil";
  font-size: 30px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  text-align: center;
}
.title-movie {
  cursor: pointer;
}
.right-area {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
}

@media screen and (max-width: 800px) {
  .popupwindow {
    transform: translate(-50%, -45%);
  }
  .main-popup {
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
  }
  .right-area {
    flex-wrap:wrap;
  }
}
</style>