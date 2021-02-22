<template>
  <div />
</template>

<script>
  export default {
    name: 'Reset',
    mounted () {
      alert('!DEVELOPMENT PURPOSES!\nsemua ruangan telah dikunjungi! ruangan akan direset dan kamu akan balik ke ruangan joy...')
      localStorage.removeItem('joy')
      localStorage.removeItem('sad')
      localStorage.removeItem('fear')
      localStorage.removeItem('anger')
      localStorage.removeItem('closing')

      localStorage.removeItem('nama')
      localStorage.removeItem('institusi')
      localStorage.removeItem('visited')

      this.$router.push({path: '/ruangan/joy'})
    },
  }
</script>

<style lang="scss" scoped>

</style>