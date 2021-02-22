<template>
  <div class="testing-kine-popup">
    <p>Heihihefiep</p>
    <foto-popup />
  </div>
</template>

<script>
import fotoPopup from "~/components/foto-popup.vue"
export default {
  name: "TestPopUp",
  components: { fotoPopup },
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