<template>
  <div>
    Jadi ini di dalam index. {{ this.emosi }}/{{ this.jenis }}/{{ this.id }}
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