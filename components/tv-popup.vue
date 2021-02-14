<template>
  <div class="popupwindow bordered">
    <div class="x-button bordered"></div>
    <div class="main-popup bordered">
      <div class="left-area bordered">
        <div class="now-showing bordered">
        </div>
        <div class="main-poster bordered">
          <div class="left-arrow bordered"></div>
          <div class="poster bordered">aaaaa</div>
          <div class="right-arrow bordered"></div>
        </div>
        <div class="title-movie bordered">
          The Man Who can't be Moved
        </div>
      </div>
      <div class="right-area bordered">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testing: true
    }
  },
  mounted() {
    this.initSetUp()
  },
  methods: {
    initSetUp() {
      // SET UP THE COMPONENT BASED ON THE ROOM
      // JOY 1 SADNESS 2 ANGER 3
      /* Get the room */
      const room = "anger"
      let id_room = 0
      /* Color based on the room */
      let color = ""
      if (room == "joy") {
        color = "#D1BB10"
        id_room = 1
      } else if (room == "sadness") {
        color = "#305FE9"
        id_room = 2
      } else if (room == "anger") {
        color = "#E14423"
        id_room = 3
      } else {
        color = "white"
      }
      console.log(id_room)
      console.log(window.location.href)
      /* give border color to bordered item */
      const itemsNeedBorder = document.getElementsByClassName("bordered")
      itemsNeedBorder.forEach(item => {
        item.style.borderColor = color
      })
      document.getElementsByClassName("popupwindow")[0].style.color = color
      /* Choose the x button and insert it */
      const exit_path = "/img/tv/exit-" + id_room + ".png"
      let exit_img = document.createElement("img")
      exit_img.src = exit_path
      let temp = document.getElementsByClassName("x-button")[0]
      temp.appendChild(exit_img)
      /* Choose the now showing and insert it */
      const ns_path = "/img/tv/ns-" + id_room + ".png"
      let ns_img = document.createElement("img")
      ns_img.src = ns_path
      ns_img.style.width = "40%"
      temp = document.getElementsByClassName("now-showing")[0]
      temp.appendChild(ns_img)
      /* Choose the arrow and insert it*/
      const leftArrowPath = "/img/tv/LPolygon-" + id_room + ".png"
      const rightArrowPath = "/img/tv/RPolygon-" + id_room + ".png"
      let lArrowImg = document.createElement("img")
      let rArrowImg = document.createElement("img")
      lArrowImg.src = leftArrowPath
      rArrowImg.src = rightArrowPath
      temp = document.getElementsByClassName("left-arrow")[0]
      temp.appendChild(lArrowImg)
      temp = document.getElementsByClassName("right-arrow")[0]
      temp.appendChild(rArrowImg)
      /* Choose the bookshelf and insert it*/
      const bookshelf_path = "/img/tv/rak-" + id_room + ".png"
      let bookshelf_img = document.createElement("img")
      bookshelf_img.src = bookshelf_path
      bookshelf_img.style.height = "20%"
      temp = document.getElementsByClassName("right-area")[0]
      temp.appendChild(bookshelf_img)
    }
  }
}
</script>

<style>
.popupwindow {
  background-color: black;
  width: 55%;
  height: 50%;
  border: 5px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1%;
  font-family: "Mechanical Pencil";
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.x-button {
  width: 100%;
  display: flex;
  direction: rtl;
}
.main-popup {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
}
.left-area {
  display: flex;
  flex-direction: column;

}
.now-showing {
  display: flex;
  justify-content: center;
}
.main-poster {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.poster {
  width: 50%;
}
.title-movie {
  text-align: center;
}
.right-area {
  display: flex;
  justify-content: center;
  align-items: center;

  
}
</style>