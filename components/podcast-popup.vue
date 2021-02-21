<template>
  <div class="podcastPopup" @click="bodyClick">
    <div class="podcastpopupwindow">
      <div class="podcast-x-button">
        <img class="podcast-exit-image" @click="close()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        room: ""
    }
  },
  mounted() {

  },
  methods: {
    getRoom() {
      // GET THE ROOM NAME USING REGEX FROM THE URL
      const link = window.location.href
      this.room = link.match(
        /(Joy|Sadness|Anger|Fear|joy|sadness|anger|fear)/i
      )[0]
    },
    close() {
      // CLOSE (UN-DISPLAY) THE POP UP WINDOW
      document.getElementsByClassName("podcastPopup")[0].style.display = "none"
    },
    isInsidePopUpWindow(x, y) {
      // CHECK IF CLICK IS INSIDE THE POPUP
      const x1 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().left
      const x2 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().right
      const y1 = document
        .getElementsByClassName("podcastpopupwindow")[0]
        .getBoundingClientRect().top
      const y2 = document
        .getElementsByClassName("podcastpopupwindow")[0]
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
    }
  }
}
</script>

<style>
.podcastPopup {
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
</style>