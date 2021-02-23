<template>
  <div class="nav-container">
    <div class="blackbg-nav" style="display: none;" @click="handleBgClick" />
    <div class="top-left nav-btn" :no-prefetch="true" @click="toggleRuang">
      RUANG
    </div>
    <nuxt-link class="top-right nav-btn" to="/aboutus" tag="div" :no-prefetch="true">
      ABOUT US
    </nuxt-link>
    <div v-if="isRuang" class="ruangfull">
      <nuxt-link to="/teras" class="nav-ruangan" tag="div" @click.native="handleBgClick">
        TERAS
      </nuxt-link>
      <nuxt-link v-if="isClosing" tag="div" class="nav-ruangan" to="/ruangan/joy" @click.native="handleBgClick">
        JOY
      </nuxt-link>
      <nuxt-link v-if="isClosing" tag="div" class="nav-ruangan" to="/ruangan/sad" @click.native="handleBgClick">
        SAD
      </nuxt-link>
      <nuxt-link v-if="isClosing" tag="div" class="nav-ruangan" to="/ruangan/fear" @click.native="handleBgClick">
        FEAR
      </nuxt-link>
      <nuxt-link v-if="isClosing" tag="div" class="nav-ruangan" to="/ruangan/anger" @click.native="handleBgClick">
        ANGER
      </nuxt-link>
      <nuxt-link v-if="isClosing" tag="div" class="nav-ruangan" to="/ruangan/closing" @click.native="handleBgClick">
        CLOSING
      </nuxt-link>
      <div v-if="isClosing" tag="div" class="nav-ruangan reset" @click="resetRuangan">
        reset ruangan
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    name: 'NavRuangan',
    data() {
      return {
        isRuang: false,
        isClosing: false,
      }
    },
    watch: {
      isRuang(newVal) {
        if (newVal){
          document.getElementsByClassName('blackbg-nav')[0].style.display = 'block'
          gsap.to('.blackbg-nav', {opacity: .85, duration: .5})
        } else {
          gsap.to('.blackbg-nav', {opacity: 0, duration: .5, onComplete: () => {
            document.getElementsByClassName('blackbg-nav')[0].style.display = 'none'
          }})
        }
      },
      $route(newVal) {
        if (newVal.path === '/ruangan/fear'){
          document.getElementsByClassName('nav-btn').forEach(nav => {
            nav.style.color = '#ede5d1'
          })
        } else {
          document.getElementsByClassName('nav-btn').forEach(nav => {
            nav.style.color = '#1f1f1f'
          })
        }
      }
    },
    mounted () {
      if (this.$route.path === '/ruangan/fear'){
          document.getElementsByClassName('nav-btn').forEach(nav => {
            nav.style.color = '#ede5d1'
          })
        } else {
          document.getElementsByClassName('nav-btn').forEach(nav => {
            nav.style.color = '#1f1f1f'
          })
        }
      setInterval(() => {
        this.isClosing = localStorage.getItem('closing')
      }, 2000)
    },
    methods: {
      toggleRuang() {
        this.isRuang = !this.isRuang
        this.$emit('onEnterFull')
      },
      handleBgClick() {
        if (this.isRuang){
          this.isRuang = false
          this.$emit('onExitFull')
        }
      },
      resetRuangan() {
        localStorage.removeItem('joy')
        localStorage.removeItem('sad')
        localStorage.removeItem('fear')
        localStorage.removeItem('anger')
        localStorage.removeItem('closing')
        this.isClosing = false
        this.handleBgClick()
      }
    },
  }
</script>

<style lang="scss" scoped>
.nav-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-family: 'KG Happy Solid';
  font-size: 40px;
  text-transform: uppercase;
}

.blackbg-nav {
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  opacity: 0;
}

.nav-btn {
  color: #1f1f1f;
  position: absolute;
  font-size: 45px;
  opacity: .8;
  transition: opacity .2s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    font-size: 25px;
  }
}

.top-left {
  top: 3%;
  left: 2%;
  opacity: 0.4;
  z-index: 1000;
}

.top-right {
  top: 3%;
  right: 2%;
  z-index: 1000;
}

.bottom-right {
  bottom: 3%;
  right: 2%;
  z-index: 1000;
}

.ruangfull {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ede5d1;
}

.nav-ruangan {
  font-size: 50px;
  z-index: 10001;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
}
.reset {
  font-size: 25px;
  z-index: 10001;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
}
</style>