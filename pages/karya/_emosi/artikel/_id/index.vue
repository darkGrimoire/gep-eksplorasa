<template>
  <div>
    Jadi ini di dalam index. {{ emosi }}/{{ jenis }}/{{ id }}
  </div>
</template>

<script>
  export default {
    name: 'Index',
    async asyncData({ params }) {
      const emosi = params.emosi
      const jenis = params.jenis
      const id = params.id
      return { emosi, jenis, id }
    }
  }
</script>

<style lang="scss" scoped>

</style>