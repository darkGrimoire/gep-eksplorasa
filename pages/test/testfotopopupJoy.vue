<template>
  <div class="testing-kine-popup">
    <p>Heihihefiep</p>
    <foto-popup :tipe-karya="'single'" />
  </div>
</template>

<script>
import fotoPopup from "~/components/newfoto-popup.vue"
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