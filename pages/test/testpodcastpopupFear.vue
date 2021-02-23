<template>
  <div class="testing-kine-popup">
    <p>Heihihefiep</p>
    <podcast-popup />
  </div>
</template>

<script>
import podcastPopup from "~/components/podcast-popup.vue"
export default {
  name: "TestPopUp",
  components: { podcastPopup },
  data() {
    return {
      test: true
    }
  }
}
</script>

<style>
.testing-kine-popup {
  background-color: white;
  background-size: 100% auto;
  color: aquamarine;
  z-index: 999;
}
</style>