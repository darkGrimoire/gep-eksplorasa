<template>
  <div class="connect_dots_page">
    <div class="title">
      <h3>CONNECT THE DOTS</h3>
    </div>
    <div class="dots_board">
      <canvas id="test_canvas" @mousedown="createDoodle" />
    </div>
    <div class="dots_teks"></div>
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
      pos: 0
    }
  },
  mounted() {
    this.createCanvas()
    this.createCoordinate()
    this.createPoint()
  },
  methods: {
    isPointInRange(point, coord_range) {
      for (let i = 0; i < 2; i++) {
        console.log("Titik harusnya: " + coord_range[i])
        console.log("Titik yang diklik: " + point[i])
        if ((coord_range[i] - 7 > point[i]) | (coord_range[i] + 7 < point[i])) {
          return false
        }
      }
      return true
    },
    getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return [x, y]
    },
    createCanvas() {
      let c = document.getElementById("test_canvas")
      let document_height = 1.90* document.getElementsByClassName("connect_dots_page")[0].scrollHeight
      let document_width = document.getElementsByClassName("dots_board")[0].scrollWidth
      c.width = document_width
      c.height = document_height
    },
    createCoordinate() {
      this.coord.push([500, 500],
        [540, 240],
        [340, 220],
        [700, 20],
        [1100, 220],
        [860,240],
        [900, 500])
    },
    createPoint() {
      let c = document.getElementById("test_canvas")
      let ctx = c.getContext("2d")
      console.log(this.coord.length)
      for (let i = 0; i < this.coord.length; i++) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(this.coord[i][0], this.coord[i][1], 5, 5)
        ctx.font = "25px Mechanical Pencil"
        ctx.fillText(i+1, this.coord[i][0] - 15, this.coord[i][1] + 7)
      }
    },
    createLine(coord_awal, coord_akhir) {
      let c = document.getElementById("test_canvas")
      let ctx = c.getContext("2d")
      // const rc = VueRough.rough.canvas(c)
      // rc.line(coord_awal[0], coord_awal[1],coord_akhir[0], coord_akhir[1])
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
    createDoodle: function(event) {
      if (this.pos >= this.coord.length - 1) {
        return
      }
      let c = document.getElementById("test_canvas")
      let x = this.getCursorPosition(c, event)
      let is_in_position = this.isPointInRange(x, this.coord[this.pos + 1])
      if (is_in_position) {
        this.createLine(this.coord[this.pos], this.coord[this.pos + 1])
        this.pos = this.pos + 1
        if (this.pos == this.coord.length - 1) {
          this.removeSkip()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.connect_dots_page {
  font-family: "Mechanical Pencil";
  font-size: 40px;
}
.title {
  text-align: center;
  margin: 10px 0px 15px 0px;
}
.dots_board {
  width: calc(100% - 30px);
  margin: 0px 15px 0px 15px;
}
canvas {
  border: 3px solid black;
  background-color: yellow;
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