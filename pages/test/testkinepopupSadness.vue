<template>
  <div class="testing-kine-popup">
    <p>Heihihefiep</p>
    <kine-popup :tipe-karya="'artikel'" />
  </div>
</template>

<script>
import kinePopup from "~/components/kine-popup.vue"
export default {
  name: "TestPopUp",
  components: { kinePopup },
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