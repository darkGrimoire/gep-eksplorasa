<template>
  <div class="testing-popup">
      <p>
          Random Judul
      </p>
      <tv-popup></tv-popup>
  </div>
</template>

<script>
import tvPopup from '~/components/tv-popup.vue'
export default {
  components: { tvPopup },
    name:'TestPopUp',
    data() {
        return {
            test: true
        }
    }
}
</script>

<style>
.testing-popup {
    background-color: white;
    background-size: 100% auto;
}
</style>