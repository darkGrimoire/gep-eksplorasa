<template>
  <div class="connect-dots-page">
    <div class="judul">
      <img src="/img/title.png" class="img-judul" />
    </div>
    <div class="caption">
      <img src="/img/caption-1.png" class="caption-item cap-1" />
      <img src="/img/caption-2.png" class="caption-item cap-2" />
      <img src="/img/caption-3.png" class="caption-item cap-3" />
      <img src="/img/caption-4.png" class="caption-item cap-4" />
      <img src="/img/caption-5.png" class="caption-item-2 cap-5" />
      <img src="/img/caption-6.png" class="caption-item-2 cap-6" />
      <img src="/img/caption-7.png" class="caption-item-3 cap-6" />
    </div>
    <div class="dots">
      <img src="/img/dots_1.png" class="dots-1" />
      <img src="/img/dots_2.png" class="dots-2" />
      <img src="/gif/home-bgbest.gif" class="dots-gif" />
      <img src="/img/dots_3_grass.png" class="dots-3" />
      <img src="/img/dots_3_flower.png" class="dots-4" />
      <img src="/img/dots_3_flower.png" class="dots-5" />
      <div class="button-area">
        <button class="skip-button" @click="skipCanvas">Skip</button>
        <button class="next-button" @click="goToTeras">Next</button>
      </div>
      <canvas
        id="dots_canvas"
        class="dots-canvas"
        @mousemove="handleMouseMove"
        @mousedown="handleTouch"
      />
    </div>
    <div class="easter">
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <button />
      </a>
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
      mouseHoverInPos: false,
      mouseClickInPos: false,
      placeholder: true
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
      let x = dotsPic1.clientHeight
      if (x == 0) {
        this.$router.push({path: '/eksplor'})
      }
      if (window.innerWidth < 600) {
        /* FOR PHONE */
        dots2_top = dotsPic1.clientHeight * 1.5
        dots3_top = dotsPic1.clientHeight * 1.5 + dotsPic2.clientHeight * 0.5
      } else if (window.innerWidth <= 1024) {
        /* FOR MEDIUM SIZE WINDOWS */
        dots2_top = dotsPic1.clientHeight * 0.2
        dots3_top = dotsPic1.clientHeight * 0.4 + dotsPic2.clientHeight * 0.5
      } else {
        /* FOR COMPUTER */
        const windowHeight = window.innerHeight
        const dots3_height = dotsPic3.offsetHeight
        const dotsHeight = windowHeight - document.getElementsByClassName("dots")[0].getBoundingClientRect().top
        dots3_top = dotsHeight - dots3_height
        dots2_top = dots3_top + dots3_height * 0.8 - dotsPic2.offsetHeight
      }
      dotsGif.style.width = dotsPic2.style.width
      let bunga_top = parseInt(dots3_top) + dotsPic3.offsetHeight * 0.21
      if (window.innerWidth <= 800) {
        bunga_top -= dotsPic3.offsetHeight * 0.61
      }
      const gif_top =
        parseInt(dots2_top) +
        dotsPic2.clientHeight -
        dotsGif.clientHeight -
        dotsPic2.clientHeight * 0.14 +
        3
      /*Designate all top margin */
      dotsGif.style.top = gif_top + "px"
      dotsPic2.style.top = dots2_top + "px"
      dotsPic3.style.top = dots3_top + "px"
      dotsPic4.style.top = bunga_top + "px"
      dotsPic5.style.top = bunga_top + "px"
      /* Show all picture */
      dotsPic1.style.visibility = "visible"
      dotsPic2.style.visibility = "visible"
      dotsPic3.style.visibility = "visible"
      dotsPic4.style.visibility = "visible"
      if (window.innerWidth > 800) {
        dotsPic5.style.visibility = "visible"
      } else {
        dotsPic5.style.visibility = "hidden"
      }
    },
    addAditionalGrass(isResize) {
      // ADD ADITIONAL GRASS WHEN THERE'S EMPTY SPACE BELOW INITIAL GRASS
      if (isResize) {
        /* Create clean state for adding grass after resize */
        for (let i = 0; i < this.additional_grass; i++) {
          const className = "additional-grass-" + i
          document.getElementsByClassName(className)[0].remove()
        }
        this.additional_grass = 0
      }
      /* Calculation */
      const windowHeight = parseFloat(window.innerHeight)
      const text_element_height =
        document.getElementsByClassName("judul")[0].clientHeight +
        document.getElementsByClassName("caption")[0].clientHeight
      const dots3Top = parseFloat(
        document.getElementsByClassName("dots-3")[0].style.top
      )
      const dots3Height = parseFloat(
        document.getElementsByClassName("dots-3")[0].offsetHeight
      )
      let x = 0
      if (this.additional_grass === 0) {
        x = document.getElementsByClassName("dots-3")[0].getBoundingClientRect().bottom
      } else {
        x = document.getElementsByClassName("additional-grass-" + (this.additional_grass - 1))[0].getBoundingClientRect().bottom
      }
      if ((x == document.getElementsByClassName("dots-3")[0].getBoundingClientRect().bottom) && (this.additional_grass != 0)) {
        alert("Please reload the page if the layout is broken")
        return
      }
      if (windowHeight > x) {
        /* Creating the element */
        let img = document.createElement("img")
        img.src = "/img/dots_3_grass.png"
        const className = "additional-grass-" + this.additional_grass
        img.classList.add(className)
        img.style.position = "absolute"
        img.style.width = "100%"
        const imgTop =
          dots3Top + dots3Height * 0.4 * (this.additional_grass + 1)
        img.style.top = imgTop + "px"
        img.style.zIndex = 1
        let dotsArea = document.getElementsByClassName("dots")[0]
        dotsArea.appendChild(img)
        this.additional_grass += 1
        const temp =
          windowHeight - (text_element_height + imgTop + img.offsetHeight)
        if (temp > 0) {
          /* Add more grass if empty space still exist */
          // alert('rekursiv')
          this.addAditionalGrass(false)
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
      // SET THE TOP MARGIN OF THE BUTTON AREA
      let div_button = document.getElementsByClassName("button-area")[0]
      const dotsPic2 = document.getElementsByClassName("dots-2")[0]
      let skip_top = 0

      if (window.innerWidth < 800) {
        skip_top = parseInt(dotsPic2.style.top) + dotsPic2.offsetHeight * 0.85
      } else {
        skip_top = parseInt(dotsPic2.style.top) + dotsPic2.offsetHeight * 0.9
      }
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
      let rangeAreaX = 1.61
      let rangeAreaY = 1.62
      if (window.matchMedia("(orientation: portrait)").matches) {
        rangeAreaX *= 1.5
        rangeAreaY *= 1.5
      }
      batasRange.push(
        (document.getElementsByClassName("dots-2")[0].offsetWidth *
          rangeAreaX) /
          100
      )
      batasRange.push(
        (document.getElementsByClassName("dots-2")[0].offsetHeight *
          rangeAreaY) /
          100
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
      this.resetGif()
      // FUNCTION CALLED AFTER DOTS FINISHED
      document.getElementsByClassName("dots-gif")[0].style.visibility =
        "visible"
      document.getElementsByClassName("skip-button")[0].style.visibility =
        "hidden"
      document.getElementsByClassName("next-button")[0].style.visibility =
        "visible"
    },
    skipCanvas() {
      // SKIP CREATING THE DOTS
      while (this.pos < this.coord.length - 1) {
        this.createLine(this.coord[this.pos], this.coord[this.pos + 1])
        this.pos = this.pos + 1
        this.showTeks(this.pos)
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
        this.mouseHoverInPos = true
      }
      if (this.mouseHoverInPos) {
        this.clearCanvas()
        this.retrieveCreatedLine()
        this.createLine(this.coord[this.pos], mouse_coord)
        if (this.isPointInRange(mouse_coord, this.coord[this.pos + 1])) {
          this.pos = this.pos + 1
          this.showTeks(this.pos)
          if (this.pos == this.coord.length - 1) {
            this.mouseHoverInPos = false
            this.endSetup()
          }
        }
      }
    },
    handleTouch(e) {
      // FOR PHONE, TOUCH THE NEXT DOTS TO CREATE THE LINE
      if (this.mouseHoverInPos) {
        return
      }
      if (this.pos == this.coord.length - 1) {
        return
      }
      let c = document.getElementById("dots_canvas")
      const mouse_coord = this.getCursorPosition(c, e)
      if (this.isPointInRange(mouse_coord, this.coord[this.pos + 1])) {
        this.createLine(this.coord[this.pos], this.coord[this.pos + 1])
        this.pos += 1
        this.showTeks(this.pos)
        if (this.pos == this.coord.length - 1) {
          this.endSetup()
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
    },
    goToTeras() {
      this.$router.push({ path: "/teras" })
    },
    resetGif() {
      var img = document.getElementsByClassName("dots-gif")[0]
      var imageUrl = img.getAttribute("src")
      img.setAttribute("src", "#")
      img.setAttribute("src", imageUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.connect-dots-page {
  background-image: url("/img/bg_beige.png");
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}

.judul {
  padding-top: 0.5vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  top: 2.5%;
}
.img-judul {
  width: 17%;
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
  width: 50vw;
  visibility: hidden;
}
.dots-2 {
  width: 30vw;
  position: absolute;
  top: 0px;
  left: 50.3%;
  transform: translateX(-50%);
  visibility: hidden;
  z-index: 3;
}
.dots-gif {
  visibility: hidden;
  width: 24%;
  position: absolute;
  left: 50.3%;
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
  left: 63%;
}
.dots-canvas {
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 4;
}
.button-area {
  position: absolute;
  z-index: 5;
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
a {
  all: unset;
}
.easter {
  position: fixed;
  bottom: 0;
  z-index: 2;
}
.easter a button {
  background: transparent;
  border: none !important;
  font-size: 0;
  width: 10vw;
  height: 5vh;
}
.easter a button:hover {
  cursor: default;
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
    width: 67vw;
  }
  .dots-2 {
    width: 40vw;
  }
  .dots-gif {
    width: 32vw;
    top: 18vh;
  }
}
@media only screen and (max-width: 800px) {
  .connect-dots-page {
    background-image: url("/img/bg_beige-min.png");
  }
  .dots-1 {
    width: 80vw;
  }
  .dots-2 {
    left: 50.6%;
    width: 70vw;
  }
  .dots-gif {
    left: 50.6%;
    width: 56vw;
  }
  .dots-4 {
    left: 0%;
    width: 100vw;
  }
  .judul {
    top: 1.5%;
  }
  .button-area {
    left: 75%;
  }
}
@media only screen and (max-width: 600px) {
  button {
    font-size: 30px;
  }
}
</style>