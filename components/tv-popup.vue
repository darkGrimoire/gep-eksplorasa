<template>
  <div class="popupwindow bordered">
    Hello there
    <div class="poster bordered">heiho</div>
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
    this.addColor()
  },
  methods: {
    addColor() {
      const room = "anger"
      let color = ""
      if (room == "joy") {
        color = "#D1BB10"
      } else if (room == "fear") {
        color = "#009562"
      } else if (room == "sadness") {
        color = "#305FE9"
      } else if (room == "anger") {
        color = "#E14423"
      } else {
        color = "white"
      }
      console.log(color)
      const itemsNeedBorder = document.getElementsByClassName("bordered")
      itemsNeedBorder.forEach(item => {
        item.style.borderColor = color
      })
    }
  }
}
</script>

<style>
.popupwindow {
  background-color: black;
  /* width: 55%;
  height: 51%; */
  color: white;
  border: 5px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1%;
}
.poster {
  width: 20%;
  height: 75%;
  border: 3px solid;
}
</style>