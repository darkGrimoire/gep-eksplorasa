<template>
  <div />
</template>

<script>
  export default {
    name: 'Reset',
    mounted () {
      localStorage.removeItem('joy')
      localStorage.removeItem('sad')
      localStorage.removeItem('fear')
      localStorage.removeItem('anger')

      localStorage.removeItem('nama')
      localStorage.removeItem('institusi')
      localStorage.removeItem('visited')
      alert('!DEVELOPMENT PURPOSES!\nsemua ruangan telah dikunjungi! ruangan telah direset dan kamu akan balik ke ruangan joy...')

      this.$router.push({path: '/ruangan/joy'})
    },
  }
</script>

<style lang="scss" scoped>

</style>