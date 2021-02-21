<template>
  <div class="testing-kine-popup">
    <p>Heihihefiep</p>
    <kine-popup></kine-popup>
  </div>
</template>

<script>
import kinePopup from "~/components/kine-popup.vue"
export default {
  components: { kinePopup },
  name: "TestPopUp",
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