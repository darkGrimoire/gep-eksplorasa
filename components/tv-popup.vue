<template>
  <div class="tvPopup">
    <div class="popupwindow bordered">
      <div class="x-button bordered">
        <img class="exit-image" @click="close()" />
      </div>
      <div class="main-popup bordered">
        <div class="left-area bordered">
          <div class="now-showing bordered"></div>
          <div class="main-poster bordered">
            <div class="left-arrow bordered" @click="movePos(-1)"></div>
            <div class="poster-area bordered">
              <img class="poster bordered" />
            </div>
            <div class="right-arrow bordered" @click="movePos(1)"></div>
          </div>
          <div class="title-movie bordered"></div>
        </div>
        <div class="right-area bordered"></div>
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
      room: "",
      amount: 0
    }
  },
  mounted() {
    this.getRoom()
    this.getFilmData()
    this.initSetUp()
    window.addEventListener("resize", this.windowChange)
  },
  destroyed() {
    window.removeEventListener("resize", this.windowChange)
  },
  methods: {
    getRoom() {
      // GET THE ROOM NAME USING REGEX FROM THE URL
      const link = window.location.href
      this.room = link.match(/(Joy|Sadness|Anger|Fear)/i)[0]
    },
    async getFilmData() {
      // GET THE FILM DATA FROM THE FIREBASE
      if (this.room == "Fear") {
        return
      }
      this.judul.push("Log Horizon")
      this.poster.push("/testing/test-post-1.jpg")
      this.judul.push("Treasure Planet")
      this.poster.push("/testing/test-post-2.jpg")
      this.judul.push("Godzilla")
      this.poster.push("/testing/test-post-3.jpg")
      
      if (this.room != "Anger") {
        return
      }
      const testing = await this.$fire.firestore
        .collection("karya")
        .doc("routes")
        .collection(this.room.toLowerCase())
        .doc("video").get()
      const temp_path = testing.data().routes
      temp_path.forEach(item => {
        this.judul.push(item.judul)
        this.poster.push(item.poster)
      })
      console.log(temp_path)
      this.amount = this.poster.length
    },
    initSetUp() {
      // SET UP THE COMPONENT BASED ON THE ROOM
      // JOY 1 SADNESS 2 ANGER 3
      
      if (this.room == "Fear") {
        this.initSetUpFear()
        return
      }
      let id_room = 0
      /* Color based on the room */
      let color = ""
      if (this.room == "Joy") {
        color = "#D1BB10"
        id_room = 1
      } else if (this.room == "Sadness") {
        color = "#305FE9"
        id_room = 2
      } else if (this.room == "Anger") {
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
      const ns_path = "/img/tv/ns-" + id_room + ".png"
      let ns_img = document.createElement("img")
      ns_img.src = ns_path
      ns_img.style.width = "60%"
      let temp = document.getElementsByClassName("now-showing")[0]
      temp.appendChild(ns_img)
      /* Choose the arrow and insert it*/
      const leftArrowPath = "/img/tv/LPolygon-" + id_room + ".png"
      const rightArrowPath = "/img/tv/RPolygon-" + id_room + ".png"
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
      const shelf_path = "/img/tv/rak-" + this.room + ".png"
      let shelf_img = document.createElement("img")
      shelf_img.src = shelf_path
      shelf_img.classList.add("shelf")
      if (this.room == "Anger") {
        shelf_img.style.width = "75%"
      } else if (this.room == "Joy" || this.room == "Sadness") {
        shelf_img.style.width = "60%"
      }
      temp = document.getElementsByClassName("right-area")[0]
      temp.appendChild(shelf_img)

      /* Set up poster and title */
      this.pos = 0
      document.getElementsByClassName("poster")[0].src = this.poster[this.pos]
      document.getElementsByClassName("title-movie")[0].innerHTML = this.judul[
        this.pos
      ]
    },
    initSetUpFear() {
      // FEAR IS SEPARATED BECAUSE IT DOESN'T HAVE VIDEO
      // THUS THE LEFT AREA CAN BE NOT DISPLAYED
      let color = "#009562"
      this.setUpBorderColor(color)
      this.insertExitButton(4)
      document.getElementsByClassName("left-area")[0].style.display = "none"
      const shelf_path = "/img/tv/rak-" + this.room + ".png"
      console.log(shelf_path)
      let shelf_img = document.createElement("img")
      console.log(shelf_img)
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
    insertExitButton (id_room) {
      // INSERT THE X BUTTON BASED ON THE id_room
      const exit_path = "/img/tv/exit-"+id_room+".png"
      let temp_x = document.getElementsByClassName("exit-image")[0]
      temp_x.src = exit_path
    },
    movePos(int_pindah) {
      // CHANGE THE MOVIE POSTER SHOWN
      // 0 <= this.pos < this.amount
      console.log("Masuk")
      console.log(this.pos)
      this.pos += int_pindah
      if (this.pos < 0) {
        this.pos = 0
      } else if (this.pos == this.amount) {
        this.pos = this.amount - 1
      }
      console.log(this.pos)
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
      document.getElementsByClassName("tvPopup")[0].style.display = "none"
    }
  }
}
</script>

<style>
.tvPopup {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.8);
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  overflow: auto
}
.popupwindow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0);
  border: 2px solid;
  padding: 1vw 1vh;
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
.poster {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.title-movie {
  font-family: "Mechanical Pencil";
  font-size: 30px;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
}
.right-area {
  display: flex;
  align-items: center;
  justify-content: center;
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
    height: 15%;
  }
  .shelf {
    height: 10%;
  }
}
</style>