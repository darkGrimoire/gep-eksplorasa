<template>
  <div class="connect-dots-page">
    <div class="judul">
      <img src="/title.png" class="img-judul" />
    </div>
    <div class="caption">
      <img src="/caption-1.png" class="caption-item cap-1" />
      <img src="/caption-2.png" class="caption-item cap-2" />
      <img src="/caption-3.png" class="caption-item cap-3" />
      <img src="/caption-4.png" class="caption-item cap-4" />
      <img src="/caption-5.png" class="caption-item-2 cap-5" />
      <img src="/caption-6.png" class="caption-item-2 cap-6" />
      <img src="/caption-7.png" class="caption-item-3 cap-6" />
    </div>
    <div class="dots">
      <img src="/dots_1.png" class="dots-1" />
      <img src="/dots_2.png" class="dots-2" />
      <img src="/home-bgbest.gif" class="dots-gif" />
      <img src="/dots_3_grass.png" class="dots-3" />
      <img src="/dots_3_flower.png" class="dots-4" />
      <img src="/dots_3_flower.png" class="dots-5" />
      <div class="button-area">
        <button @click="skipCanvas" class="skip-button">Skip</button>
        <button class="next-button">Next</button>
      </div>
      <canvas
        class="dots-canvas"
        id="dots_canvas"
        @mousemove="handleMouseMove"
      />
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
      additional_grass: 0,
      mouse_in_pos: false
    }
  },
  mounted() {
    this.setUpPic()
    this.addAditionalGrass(false)
    this.setUpCanvas()
    this.setUpButton()
    this.addCoordinate()
    window.addEventListener("resize", this.windowChange)
  },
  destroyed() {
    window.removeEventListener("resize", this.windowChange)
  },
  methods: {
    windowChange() {
      // FUNCTION TO BE CALLED WHEN WINDOWS CHANGE
      this.setUpPic()
      this.addAditionalGrass(true)
      this.setUpCanvas()
      this.setUpButton()
      this.addCoordinate()
      this.retrieveCreatedLine()
    },
    setUpPic() {
      // SET UP THE MARGIN OF ALL THE IMG INSIDE THE DOTS AREA
      let dots3_top = 0
      let dots2_top = 0
      const dotsPic1 = document.getElementsByClassName("dots-1")[0]
      const dotsPic2 = document.getElementsByClassName("dots-2")[0]
      const dotsPic3 = document.getElementsByClassName("dots-3")[0]
      const dotsPic4 = document.getElementsByClassName("dots-4")[0]
      const dotsPic5 = document.getElementsByClassName("dots-5")[0]
      const dotsGif = document.getElementsByClassName("dots-gif")[0]
      if (window.innerWidth < 1024) {
        dots2_top = dotsPic1.clientHeight
        dots3_top = dotsPic1.clientHeight + dotsPic2.clientHeight * 0.5
      } else {
        const windowHeight = window.innerHeight
        const dots3_height = dotsPic3.offsetHeight
        const text_element_height =
          document.getElementsByClassName("judul")[0].clientHeight +
          document.getElementsByClassName("caption")[0].clientHeight
        const dotsHeight = windowHeight - text_element_height
        dots3_top = dotsHeight - dots3_height
        dots2_top = dots3_top + dots3_height * 0.8 - dotsPic2.offsetHeight
      }
      dotsGif.style.width = dotsPic2.style.width
      const bunga_top = parseInt(dots3_top) + dotsPic3.offsetHeight * 0.21
      const gif_top =
        parseInt(dots2_top) +
        dotsPic2.clientHeight -
        dotsGif.clientHeight -
        dotsPic2.clientHeight * 0.14
      // set the top of margin of all img
      dotsGif.style.top = gif_top + "px"
      dotsPic2.style.top = dots2_top + "px"
      dotsPic3.style.top = dots3_top + "px"
      dotsPic4.style.top = bunga_top + "px"
      dotsPic5.style.top = bunga_top + "px"

      dotsPic1.style.visibility = "visible"
      dotsPic2.style.visibility = "visible"
      dotsPic3.style.visibility = "visible"
      dotsPic4.style.visibility = "visible"
      dotsPic5.style.visibility = "visible"
    },
    addAditionalGrass(isResize) {
      if (isResize) {
        for (let i = 0; i < this.additional_grass; i++) {
          const className = "additional-grass-" + i
          document.getElementsByClassName(className)[0].remove()
        }
      }
      const windowHeight = window.innerHeight
      const text_element_height =
        document.getElementsByClassName("judul")[0].clientHeight +
        document.getElementsByClassName("caption")[0].clientHeight
      const dots3Top = parseInt(
        document.getElementsByClassName("dots-3")[0].style.top
      )
      const dots3Height = document.getElementsByClassName("dots-3")[0]
        .offsetHeight
      console.log(windowHeight)
      console.log(text_element_height + dots3Top + dots3Height)
      if (windowHeight > text_element_height + dots3Top + dots3Height) {
        console.log("yellow")
        let img = document.createElement("img")
        img.src = "/dots_3_grass.png"
        const className = "additional-grass-" + this.additional_grass
        img.classList.add(className)
        img.style.position = "absolute"
        img.style.width = "100%"
        img.style.top =
          dots3Top + dots3Height * 0.4 * (this.additional_grass + 1) + "px"
        img.style.zIndex = 1
        let dotsArea = document.getElementsByClassName("dots")[0]
        dotsArea.appendChild(img)
        this.additional_grass += 1
        const temp =
          windowHeight -
          (text_element_height +
            dots3Top +
            dots3Height * 0.5 * (this.additional_grass + 2))
        if (temp > 0) {
          this.addAditionalGrass()
        }
      }
    },
    setUpCanvas() {
      // SET THE SIZE AND MARGIN OF THE CANVAS
      let c = document.getElementById("dots_canvas")
      document.getElementsByClassName(
        "dots-canvas"
      )[0].style.top = document.getElementsByClassName("dots-2")[0].style.top
      c.width = document.body.clientWidth
      c.height = document.getElementsByClassName("dots-2")[0].offsetHeight
    },
    setUpButton() {
      let div_button = document.getElementsByClassName("button-area")[0]
      const dotsPic2 = document.getElementsByClassName("dots-2")[0]
      const skip_top = parseInt(dotsPic2.style.top) + dotsPic2.offsetHeight
      div_button.style.top = skip_top + "px"
      if (this.pos == 0) {
        document.getElementsByClassName("skip-button")[0].style.visibility =
          "visible"
      }
    },
    addCoordinate() {
      // ADD THE COORDINATE OF THE DOTS TO THE coord VARIABLE
      // INITIATE WITH EMPTY ARRAY
      this.coord = []
      const c = document.getElementById("dots_canvas")
      const dots_pic_width = document.getElementsByClassName("dots-2")[0]
        .offsetWidth
      const canvas_width = c.width
      const dots_pic_height = c.height
      const x_start = (canvas_width - dots_pic_width) / 2
      let coord_x = 0
      let coord_y = 0
      // FIRST POINT
      coord_x = x_start + dots_pic_width * 0.25
      coord_y = dots_pic_height * 0.85
      this.coord.push([coord_x, coord_y])
      // SECOND POINT
      coord_x = x_start + dots_pic_width * 0.265
      coord_y = dots_pic_height * 0.44
      this.coord.push([coord_x, coord_y])
      // THIRD POINT
      coord_x = x_start + dots_pic_width * 0.13
      coord_y = dots_pic_height * 0.435
      this.coord.push([coord_x, coord_y])
      // FOURTH POINT
      coord_x = x_start + dots_pic_width * 0.52
      coord_y = dots_pic_height * 0.075
      this.coord.push([coord_x, coord_y])
      // FIFTH POINT
      coord_x = x_start + dots_pic_width * 0.9
      coord_y = dots_pic_height * 0.435
      this.coord.push([coord_x, coord_y])
      // SIXTH POINT
      coord_x = x_start + dots_pic_width * 0.747
      coord_y = dots_pic_height * 0.442
      this.coord.push([coord_x, coord_y])
      // SEVENTH POINT
      coord_x = x_start + dots_pic_width * 0.75
      coord_y = dots_pic_height * 0.86
      this.coord.push([coord_x, coord_y])
      // DEBUGGING SECTION
      // let ctx = c.getContext("2d")
      // for (let i = 0; i < this.coord.length; i ++) {
      //   ctx.fillStyle = "yellow"
      //   ctx.fillRect(this.coord[i][0],this.coord[i][1],30,30)
      // }
      // END OF DEBUGGING SECTION
    },
    getCursorPosition(canvas, event) {
      // GET THE CURSOR COORDINATE FROM THE canvas (0,0) POINT
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return [x, y]
    },
    isPointInRange(point, coord_range) {
      // CHECK IF point IS IN THE VICINITY OF coord_range
      let batasRange = []
      batasRange.push(
        (document.getElementsByClassName("dots-2")[0].offsetWidth * 1.61) / 100
      )
      batasRange.push(
        (document.getElementsByClassName("dots-2")[0].offsetHeight * 1.62) / 100
      )
      for (let i = 0; i < 2; i++) {
        if (
          (coord_range[i] - batasRange[i] > point[i]) |
          (coord_range[i] + batasRange[i] < point[i])
        ) {
          return false
        }
      }
      return true
    },
    createLine(coord_awal, coord_akhir) {
      // CREATE LINE FROM coord_awal TO coord_akhir
      let c = document.getElementById("dots_canvas")
      let ctx = c.getContext("2d")
      ctx.beginPath()
      ctx.moveTo(coord_awal[0], coord_awal[1])
      ctx.lineTo(coord_akhir[0], coord_akhir[1])
      ctx.strokeStyle = "black"
      ctx.lineWidth = 3
      ctx.stroke()
    },
    endSetup() {
      document.getElementsByClassName("dots-gif")[0].style.visibility =
        "visible"
      document.getElementsByClassName("skip-button")[0].style.visibility =
        "hidden"
      document.getElementsByClassName("next-button")[0].style.visibility =
        "visible"
    },
    skipCanvas() {
      while (this.pos < this.coord.length - 1) {
        this.createLine(this.coord[this.pos], this.coord[this.pos + 1])
        this.pos = this.pos + 1
      }
      this.endSetup()
    },
    handleMouseMove(e) {
      // HANDLE MOUSE MOOVEMENT IN THE CANVAS AREA
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
            this.endSetup()
          }
        }
      }
    },
    clearCanvas() {
      // CLEAR THE CANVAS
      let c = document.getElementById("dots_canvas")
      let ctx = c.getContext("2d")
      ctx.clearRect(0, 0, c.width, c.height)
    },
    retrieveCreatedLine() {
      // CREATE THE PREVIOUSLY CREATED LINE
      let i = 0
      while (i < this.pos) {
        this.createLine(this.coord[i], this.coord[i + 1])
        i = i + 1
      }
    },
    showTeks(urutan) {
      // SHOW THE CAPTION TEXT BASED ON THE urutan
      const cap_class = "cap-" + urutan
      let cap_items = document.getElementsByClassName(cap_class)
      for (const cap_item of cap_items) {
        cap_item.style.visibility = "visible"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.connect-dots-page {
  background-image: url("/bg_home.jpg");
  background-size: cover;
  height: 100vh;
}

.judul {
  padding-top: 0.5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.img-judul {
  width: 20%;
}
.caption {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.caption-item {
  width: 10vw;
}
.caption-item-2 {
  width: 6vw;
}
.caption-item-3 {
  width: 3vw;
}
.cap-1,
.cap-2,
.cap-3,
.cap-4,
.cap-5,
.cap-6 {
  visibility: hidden;
}
.dots {
  position: relative;
}
.dots-1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 15vw;
  visibility: hidden;
}
.dots-2 {
  width: 30vw;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  z-index: 3;
}
.dots-gif {
  visibility: hidden;
  width: 24vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.dots-3 {
  position: absolute;
  width: 100%;
  top: 0px;
  z-index: 1;
  visibility: hidden;
}
.dots-4,
.dots-5 {
  position: absolute;
  width: 30%;
  z-index: 2;
  visibility: hidden;
}
.dots-4 {
  left: 7%;
}
.dots-5 {
  left: 60%;
}
.dots-canvas {
  position: absolute;
  top: 10px;
  left: 0px;
  // background-color: yellow;
  z-index: 4;
}
.button-area {
  position: absolute;
  z-index: 3;
  left: 60%;
}
button {
  all: unset;
  font-family: "Mechanical Pencil";
  font-size: 40px;
  z-index: inherit;
}
button:hover {
  cursor: pointer;
}
.skip-button {
  visibility: hidden;
}
.next-button {
  visibility: hidden;
}

@media (max-width: 1024px) {
  .img-judul {
    width: 40%;
  }
  .caption-item {
    width: 15vw;
  }
  .caption-item-2 {
    width: 9vw;
  }
  .caption-item-3 {
    width: 4.5vw;
  }
  .dots-1 {
    height: 20vw;
  }
  .dots-2 {
    width: 40vw;
  }
  .dots-gif {
    width: 32vw;
    top: 18vh;
  }
}
// .dots-3 {
//   width: 90vw;
//   left: 50%;
//   transform: translateX(-50%);
// }

// .judul {
//   font-family: "Mechanical Pencil";
//   font-size: 40px;
//   text-align: center;
//   padding: 10px 0px 0px 0px;
// }
// .main_content {
//   position: relative;
// }
// .pic {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }
// .sky_pic {
//   visibility: hidden;
//   // height: 9vw;
//   z-index: 1;
//   // max-height: 15vh;
// }
// .dots_pic {
//   height: 30vw;
//   z-index: 0;
// }
// .dots_board {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   z-index: 1;
// }
// // canvas {
// //   background-color: yellow;
// // }
// .dots_teks {
//   // visibility: hidden;
//   font-family: "Mechanical Pencil";
//   font-size: 40px;
//   text-align: center;
// }
// button {
//   border: solid 5px #41403e;
//   transition: 0.5s;
//   background: transparent;
//   padding: 0.5rem 0.5rem;
//   margin: 0 0.5rem;
//   font-family: "Mechanical Pencil";
//   font-size: 1rem;

//   border-top-left-radius: 15px 50px;
//   border-top-right-radius: 50px 15px;
//   border-bottom-right-radius: 15px 50px;
//   border-bottom-left-radius: 50px 15px;
// }
// button:hover {
//   background-color: #41403e;
//   color: whitesmoke;
// }
</style>