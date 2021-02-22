<template>
  <div>
    <nav-ruangan />
    <nuxt />
  </div>
</template>

<script>
import NavRuangan from '@/components/NavRuangan.vue'
export default {
  name: 'Layout',
  components: {
    NavRuangan,
  },
}
</script>
