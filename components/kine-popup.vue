<template>
  <div class="kinePopup" @click="bodyClick">
    <div class="kinepopupwindow">
      <div class="kine-x-button">
        <img class="kine-exit-image" @click="close()">
      </div>
      <ol class="daftar-kine">
        <li v-for="(item,index) in judul" :key="index" @click="keKarya(index)">
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
export default {
  props: {
    tipeKarya: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      room: "",
      judul: [],
      alamat: []
    }
  },
  async mounted() {
    this.getRoom()
    await this.getData()
    this.initSetUp()
    // this.insertRibbon()
    // window.addEventListener("resize", this.windowChange)
  },
  // destroyed() {
  //   window.removeEventListener("resize", this.windowChange)
  // },
  methods: {
    windowChange() {
      const ribbon1 = document.getElementsByClassName("ribbon1")[0]
      const ribbon1_top =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().top * 0.9
      ribbon1.style.top = ribbon1_top + "px"
      ribbon1.style.left =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().left + "px"
      const ribbon2 = document.getElementsByClassName("ribbon2")[0]
      const ribbon2_top =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().bottom * 0.97
      ribbon2.style.top = ribbon2_top + "px"
      ribbon2.style.left =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().left +
        ((document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().right -
          document
            .getElementsByClassName("kinepopupwindow")[0]
            .getBoundingClientRect().left) *
          3) /
          4 +
        "px"
      if (window.innerWidth < 1024) {
        ribbon1.style.width = "30%"
        ribbon2.style.width = "30%"
        ribbon2.style.left =
          document
            .getElementsByClassName("kinepopupwindow")[0]
            .getBoundingClientRect().left +
          ((document
            .getElementsByClassName("kinepopupwindow")[0]
            .getBoundingClientRect().right -
            document
              .getElementsByClassName("kinepopupwindow")[0]
              .getBoundingClientRect().left) *
            1) /
            2 +
          "px"
      } else {
        ribbon1.style.width = "15%"
        ribbon2.style.width = "15%"
      }
    },
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
        .doc("kine")
        .get()
      const temp_path = testing.data().routes
      temp_path.forEach(item => {
        if (item.route.includes(this.tipeKarya)){
          this.judul.push(item.judul)
          this.alamat.push(item.route)
        }
      })
    },
    initSetUp() {
      document.getElementsByClassName("kine-exit-image")[0].src =
        "/img/popup/exit-0.png"
      const daftar = document.getElementsByClassName("daftar-kine")[0]
      for (let i = 0; i < this.judul.length; i++) {
        let temp = document.createElement("li")
        temp.innerText = this.judul[i]
        daftar.appendChild(temp)
      }
    },
    insertRibbon() {
      const ribbon1 = document.createElement("img")
      const ribbon_path =
        "/img/popup/ribbon-" + this.room.toLowerCase() + ".png"
      ribbon1.src = ribbon_path
      ribbon1.classList.add("ribbon1")
      ribbon1.style.position = "absolute"
      if (window.innerWidth < 1024) {
        ribbon1.style.width = "30%"
      } else {
        ribbon1.style.width = "15%"
      }
      const ribbon1_top =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().top * 0.9
      ribbon1.style.top = ribbon1_top + "px"
      ribbon1.style.left =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().left + "px"

      const ribbon2 = document.createElement("img")
      ribbon2.src = ribbon_path
      ribbon2.classList.add("ribbon2")
      ribbon2.style.position = "absolute"
      if (window.innerWidth < 1024) {
        ribbon2.style.width = "30%"
      } else {
        ribbon2.style.width = "15%"
      }
      const ribbon2_top =
        document
          .getElementsByClassName("kinepopupwindow")[0]
          .getBoundingClientRect().bottom * 0.97
      ribbon2.style.top = ribbon2_top + "px"

      ribbon2.style.left = /*?????*/ +"px"
      document.getElementsByClassName("kinePopup")[0].appendChild(ribbon1)
      document.getElementsByClassName("kinePopup")[0].appendChild(ribbon2)
    },
    close() {
      // CLOSE (UN-DISPLAY) THE POP UP WINDOW
      document.getElementsByClassName("kinePopup")[0].style.display = "none"
    },
    isInsidePopUpWindow(x, y) {
      // CHECK IF CLICK IS INSIDE THE POPUP
      const x1 = document
        .getElementsByClassName("kinepopupwindow")[0]
        .getBoundingClientRect().left
      const x2 = document
        .getElementsByClassName("kinepopupwindow")[0]
        .getBoundingClientRect().right
      const y1 = document
        .getElementsByClassName("kinepopupwindow")[0]
        .getBoundingClientRect().top
      const y2 = document
        .getElementsByClassName("kinepopupwindow")[0]
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
      if (this.alamat[id].includes('instagram')){
        window.open(this.alamat[id], '_blank')
      } else {
        const tujuan = "/karya/" + this.room.toLowerCase() +"/" + this.alamat[id]
        this.$router.push({path: tujuan})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.kinePopup {
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
.kinepopupwindow {
  background-image: url("/img/bg_beige-min.png");
  background-size: 100% auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Mechanical Pencil";
  font-size: 1.5rem;
  text-align: justify;
}
.kine-x-button {
  display: flex;
  flex-direction: row-reverse;
  margin: 1% 1% 1% 0;
}
ol {
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding-left: 5%;
  padding-right: 5%;
}
li {
  margin-bottom: 5%;
}
li:hover {
  cursor: pointer;
  text-decoration: underline;
}
@media (max-width: 1020px) {
  .kinepopupwindow {
    font-size: 1.25rem;
  }
}
@media (max-width: 600px) {
  .kinepopupwindow {
    width: 75%;
  }
}
@media (max-width: 410px) {
  .kinepopupwindow {
    font-size: 1rem;
  }
}
</style>