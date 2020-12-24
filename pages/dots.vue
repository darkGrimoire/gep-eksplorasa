<template>
  <div class="connect-dots_page">
    <div class="title">
      <h3>CONNECT THE DOTS</h3>
    </div>
    <canvas id="test_canvas" @mousedown="createDoodle" />
    <div class="footer">
      <button id="back_button">
        Back
      </button>
      <button id="skip_button">
        Skip
      </button>
      <button id="next_button">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dots",
  data() {
    return {
      coord: [
        [10, 10],
        [200, 10],
        [200, 100],
        [50, 100]
      ],
      pos: 0
    }
  },
  beforeMount() {
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
    createPoint() {
      let c = document.getElementById("test_canvas")
      let ctx = c.getContext("2d")
      for (let i = 0; i < this.coord.length; i++) {
        ctx.fillRect(this.coord[i][0], this.coord[i][1], 5, 5)
      }
    },
    removeSkip() {
      document.getElementById("skip_button").style.visibility = "hidden"
    },
    createDoodle: function(event) {
      if (this.pos >= this.coord.length - 1) {
        return
      }
      let c = document.getElementById("test_canvas")
      let ctx = c.getContext("2d")
      let x = this.getCursorPosition(c, event)
      let is_in_position = this.isPointInRange(x, this.coord[this.pos + 1])
      if (is_in_position) {
        ctx.beginPath()
        ctx.moveTo(this.coord[this.pos][0], this.coord[this.pos][1])
        ctx.lineTo(this.coord[this.pos + 1][0], this.coord[this.pos + 1][1])
        ctx.strokeStyle = "black"
        ctx.stroke()
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
.title {
  text-align: center;
  margin: 10px 0px 15px 0px;
}
canvas {
  border: 3px solid black;
}
button {
  background: transparent;
  padding: 0.5rem 0.5rem;
  margin: 0 0.5rem;
  font-size: 1rem;

  border-top-left-radius: 15px 50px;
  border-top-right-radius: 50px 15px;
  border-bottom-right-radius: 15px 50px;
  border-bottom-left-radius: 50px 15px;
}
#next_button {
  border: solid 5px #41403e;
  transition: 0.5s;
}
#next_button:hover {
  background-color: #41403e;
  color: whitesmoke;
}
</style>