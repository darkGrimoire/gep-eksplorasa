<template>
  <div class="connect-dots_page">
    <div class="judul">
      <h3>CONNECT THE DOTS</h3>
    </div>
    <div class="main_content">
      <div class="pic">
        <img src="/3-2.png" class="sky_pic" />
        <img src="/3-1.png" class="dots_pic" />
      </div>
      <div class="dots_teks">DELAILAHIA</div>
      <div class="dots_board">
        <canvas id="dots_canvas" @mousemove="handleMouseMove" />
      </div>
    </div>
    <div class="footer">
      <button id="back_button">Back</button>
      <button id="skip_button" @click="skipCanvas()">Skip</button>
      <button id="next_button">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dots",
  data() {
    return {
      coord: [],
      pos: 0,
      mouse_in_pos: false
    }
  },
  mounted() {
    this.setUpPic()
    this.setUpCanvas()
    this.addCoordinate()
    window.addEventListener("resize",this.windowChange)
  },
  destroyed() {
    window.removeEventListener("resize",this.windowChange)
  },
  methods: {
    windowChange() {
      this.setUpCanvas()
      this.addCoordinate()
      this.retrieveCreatedLine()
    },
    setUpPic() {
      console.log(document.body.clientHeight)
      document.getElementsByClassName("sky_pic")[0].style.height = document.body.clientHeight
      document.getElementsByClassName("sky_pic")[0].style.visibility = "visible"
    },
    setUpCanvas() {
      let c = document.getElementById("dots_canvas")
      // c.width = document.getElementsByClassName("pic")[0].offsetWidth
      c.width = document.body.clientWidth
      c.height = document.getElementsByClassName("pic")[0].offsetHeight
    },
    addCoordinate() {
      this.coord = []
      const c = document.getElementById("dots_canvas")
      const skyPicHeight = document.getElementsByClassName("sky_pic")[0]
        .offsetHeight
      const dotPicHeight = document.getElementsByClassName("dots_pic")[0]
        .offsetHeight
      const dotPicWidth = document.getElementsByClassName("dots_pic")[0]
        .offsetWidth
      console.log(dotPicWidth)
      console.log(c.width)
      let coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 25.3) / 100
      let coord_y = skyPicHeight + (dotPicHeight * 84.7) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 26.5) / 100
      coord_y = skyPicHeight + (dotPicHeight * 43.9) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 13) / 100
      coord_y = skyPicHeight + (dotPicHeight * 43.4) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 52) / 100
      coord_y = skyPicHeight + (dotPicHeight * 7.5) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 90) / 100
      coord_y = skyPicHeight + (dotPicHeight * 43.4) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 74.7) / 100
      coord_y = skyPicHeight + (dotPicHeight * 43.9) / 100
      this.coord.push([coord_x, coord_y])
      coord_x = (c.width - dotPicWidth) / 2 + (dotPicWidth * 74.9) / 100
      coord_y = skyPicHeight + (dotPicHeight * 85.8) / 100
      this.coord.push([coord_x, coord_y])
      // DEBUGGING SECTION
      let ctx = c.getContext("2d")
      for (let i = 0; i < this.coord.length; i ++) {
        ctx.fillStyle = "yellow"
        ctx.fillRect(this.coord[i][0],this.coord[i][1],5,5)
      }
      // END OF DEBUGGING SECTION
    },
    getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return [x, y]
    },
    isPointInRange(point, coord_range) {
      let batasRange = []
      batasRange.push((document.getElementsByClassName("dots_pic")[0].offsetWidth * 1.61) / 100)
      batasRange.push((document.getElementsByClassName("dots_pic")[0].offsetHeight * 1.62) / 100)
      for (let i = 0; i < 2; i++) {
        if ((coord_range[i] - batasRange[i] > point[i]) | (coord_range[i] + batasRange[i] < point[i])) {
          return false
        }
      }
      return true
    },
    createLine(coord_awal, coord_akhir) {
      let c = document.getElementById("dots_canvas")
      let ctx = c.getContext("2d")
      ctx.beginPath()
      ctx.moveTo(coord_awal[0], coord_awal[1])
      ctx.lineTo(coord_akhir[0], coord_akhir[1])
      ctx.strokeStyle = "black"
      ctx.lineWidth = 3
      ctx.stroke()
    },
    removeSkip() {
      document.getElementById("skip_button").style.visibility = "hidden"
    },
    skipCanvas() {
      while (this.pos < this.coord.length - 1) {
        this.createLine(this.coord[this.pos], this.coord[this.pos + 1])
        this.pos = this.pos + 1
      }
      this.removeSkip()
    },
    handleMouseMove(e) {
      if (this.pos == this.coord.length - 1) {
        return
      }
      let c = document.getElementById("dots_canvas")
      const mouse_coord = this.getCursorPosition(c, e)
      if (this.isPointInRange(mouse_coord, this.coord[this.pos])) {
        this.mouse_in_pos = true
      }
      if (this.mouse_in_pos) {
        this.clearCanvas()
        this.retrieveCreatedLine()
        this.createLine(this.coord[this.pos], mouse_coord)
        if (this.isPointInRange(mouse_coord, this.coord[this.pos + 1])) {
          this.pos = this.pos + 1
          this.showTeks(this.pos)
          if (this.pos == this.coord.length - 1) {
            this.mouse_in_pos = false
          }
        }
      }
    },
    clearCanvas() {
      let c = document.getElementById("dots_canvas")
      let ctx = c.getContext("2d")
      ctx.clearRect(0, 0, c.width, c.height)
      
    },
    retrieveCreatedLine() {
      let i = 0
      while (i < this.pos) {
        this.createLine(this.coord[i], this.coord[i + 1])
        i = i + 1
      }
    },
    showTeks(urutan) {
      // Belum SELESAI
      console.log(urutan)
      document.getElementsByClassName("dots_teks")[0].style.visibility =
        "visible"
    }
  }
}
</script>

<style lang="scss" scoped>
.connect-dots_page {
  background-image: url("/bg_home.jpg");
}
.judul {
  font-family: "Mechanical Pencil";
  font-size: 40px;
  text-align: center;
  padding: 10px 0px 0px 0px;
}
.main_content {
  position: relative;
}
.pic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sky_pic {
  visibility: hidden;
  // height: 9vw;
  z-index: 1;
  // max-height: 15vh;
}
.dots_pic {
  height: 30vw;
  z-index: 0;
}
.dots_board {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
}
// canvas {
//   background-color: yellow;
// }
.dots_teks {
  // visibility: hidden;
  font-family: "Mechanical Pencil";
  font-size: 40px;
  text-align: center;
}
button {
  border: solid 5px #41403e;
  transition: 0.5s;
  background: transparent;
  padding: 0.5rem 0.5rem;
  margin: 0 0.5rem;
  font-family: "Mechanical Pencil";
  font-size: 1rem;

  border-top-left-radius: 15px 50px;
  border-top-right-radius: 50px 15px;
  border-bottom-right-radius: 15px 50px;
  border-bottom-left-radius: 50px 15px;
}
button:hover {
  background-color: #41403e;
  color: whitesmoke;
}
</style>