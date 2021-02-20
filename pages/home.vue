<template>
  <div class="container">
    <div class="logo-container">
      <img src="/homepage/homepage.gif" alt="homepage">
    </div>
    <div class="emosi-container">
      <img id="anger" class="emosi" src="/homepage/a0.gif" alt="anger" @mouseenter="handleHover($event, 'enter')" @mouseleave="handleHover($event, 'leave')">
      <img id="fear" class="emosi" src="/homepage/f0.gif" alt="fear" @mouseenter="handleHover($event, 'enter')" @mouseleave="handleHover($event, 'leave')">
      <img id="sad" class="emosi" src="/homepage/s0.gif" alt="sad" @mouseenter="handleHover($event, 'enter')" @mouseleave="handleHover($event, 'leave')">
      <img id="joy" class="emosi" src="/homepage/j0.gif" alt="joy" @mouseenter="handleHover($event, 'enter')" @mouseleave="handleHover($event, 'leave')">
    </div>
    <nuxt-link class="button" to="/buku-tamu">
      start explore
    </nuxt-link>
    <rcp />
  </div>
</template>

<script>
import rcp from '~/components/rcp.vue'
export default {
  name: 'Homepage',
  components: {
    rcp,
  },
  mounted () {
    setTimeout(() =>{
      this.preloadImages()
    }, 500)
  },
  methods: {
    handleHover(e, type) {
      if (type === 'enter'){
        if (e.target.id === 'anger'){
          e.target.setAttribute('src', "/homepage/yuk1-.gif")
        } else if (e.target.id === 'sad'){
          e.target.setAttribute('src', "/homepage/yuk2-.gif")
        } else if (e.target.id === 'fear'){
          e.target.setAttribute('src', "/homepage/yuk3-.gif")
        } else if (e.target.id === 'joy'){
          e.target.setAttribute('src', "/homepage/yuk4-.gif")
        }
      } else {
        if (e.target.id === 'anger'){
          e.target.setAttribute('src', "/homepage/a0.gif")
        } else if (e.target.id === 'sad'){
          e.target.setAttribute('src', "/homepage/s0.gif")
        } else if (e.target.id === 'fear'){
          e.target.setAttribute('src', "/homepage/f0.gif")
        } else if (e.target.id === 'joy'){
          e.target.setAttribute('src', "/homepage/j0.gif")
        }
      }
    },
    preloadImages(){
      new Image().src = '/homepage/yuk1-.gif'
      new Image().src = '/homepage/yuk2-.gif'
      new Image().src = '/homepage/yuk3-.gif'
      new Image().src = '/homepage/yuk4-.gif'
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-image: url('/img/BEIGE-min.png');
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}

img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.logo-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  img {
    width: 100%;
  }
  @media only screen and (max-width: 800px) {
    width: 85%;
  }
}

.emosi {
  position: absolute;
  transform: translate(-50%, -50%);
  height: 17%;
  max-width: 12%;
  @media only screen and (max-width: 850px) {
    height: 22%;
    max-width: 17%;
  }
}
.emosi-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  #anger {
    top: 23%;
    left: 65%;
    height: 19%;
    &:hover {
      height: 23%;
    }
  }
  #sad {
    top: 25%;
    left: 30%;
    &:hover {
      height: 19%;
    }
  }
  #fear {
    top: 72%;
    left: 25%;
    &:hover {
      height: 20%;
    }
  }
  #joy {
    top: 78%;
    left: 70%;
    &:hover {
      max-width: 35%;
    }
  }
  @media only screen and (max-width: 850px) {
    #anger {
      top: 28%;
      &:hover {
        height: 27%;
        max-width: 23%;
      }
    }
    #sad {
      top: 30%;
    }
    #fear {
      top: 78%;
      left: 18%;
    }
    #joy {
      top: 84%;
      left: 78%;
      &:hover {
        max-width: 27%;
      }
    }
  }
  @media only screen and (max-width: 450px) {
    #anger {
      top: 26%;
      max-width: 22%;
      height: 26%;
      &:hover {
        height: 29%;
        max-width: 25%;
      }
    }
  }
}
.button {
  width: 350px;
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Mechanical Pencil';
  font-size: 3rem;
  text-align: center;
  text-decoration: none;
  letter-spacing: 1.6px;
  color: black;
  margin: 0 -30px 0 -20px;
  padding: 15px;
  &:hover {
    background:url("/homepage/z-.gif") no-repeat center center; 
    background-size: 100%;
    cursor: pointer;
  }
  @media only screen and (max-width: 850px) {
    top: 65%;
    background:url("/homepage/z-.gif") no-repeat center center; 
    background-size: 100%;
    margin: 0 0 0 0;
  }
  @media only screen and (max-width: 600px) {
    width: 250px;
    font-size: 1.9rem;
    margin: 0 0 0 0;
  }
}
</style>