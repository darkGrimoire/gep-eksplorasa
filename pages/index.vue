<template>
  <div>
    Landing page
  </div>
</template>

<script>

export default {
  name: 'Landing',
   mounted(){
    this.$router.replace({path: "/underconstruction"})
  }
}
</script>

<style lang="scss" scoped>
  div {
    font-family: 'Mechanical Pencil';
    font-size: 40px;
  }
</style>
