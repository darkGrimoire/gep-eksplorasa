<template>
  <div :class="['container-component', containerClass]">
    <div class="bg-component" style="display: none;" @click="handleBgClick" />
    <img v-show="!isFull" :src="computedPoster" alt="Photo" :class="['poster-component', posterClass]"
         @click="isFull = !isFull"
    >
    <fa v-show="!isFull" :icon="['fas', 'search-plus']" class="zoom-icon" @click="isFull = !isFull" />
    <img v-show="isFull" :src="computedSrc" alt="Photo-Full" :class="['full-component', fullClass]">
  </div>
</template>

<script>
import gsap from 'gsap'

  export default {
    name: 'ZoomablePhotos',
    props: {
      full: {
        type: String,
        default: ''
      },
      poster: {
        type: String,
        default: ''
      },
      containerClass: {
        type: String,
        default: ''
      },
      posterClass: {
        type: String,
        default: ''
      },
      fullClass: {
        type: String,
        default: ''
      },
      
    },
    data() {
      return {
        computedSrc: '',
        computedPoster: '',
        isFull: false
      }
    },
    watch: {
      isFull(newVal) {
        if (newVal){
          document.getElementsByClassName('bg-component')[0].style.display = 'block'
          gsap.to('.bg-component', {opacity: .75, duration: .5})
        } else {
          gsap.to('.bg-component', {opacity: 0, duration: .5, onComplete: () => {
            document.getElementsByClassName('bg-component')[0].style.display = 'none'
          }})
        }
      }
    },
    async mounted () {
      this.computedPoster = await this.getLink(this.poster)
      setTimeout(async () => {
        this.computedSrc = await this.getLink(this.full)
      }, 1000)
    },
    methods: {
      handleBgClick() {
        if (this.isFull){
          this.isFull = false
        }
      },
      async getLink(link) {
        if (this.isFirebaseLink(link)){
          let url = await this.getFromStorage(link)
          return url
        } else {
          return link
        }
      },
      isFirebaseLink(link){
        return link.slice(0,5) === "gs://"
      },
      getFromStorage(link){
        return this.$fire.storage.refFromURL(link).getDownloadURL()
          .then(url => {
            return url
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
.container-component {
  position: relative;
}
.bg-component {
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  opacity: 0;
}

.poster-component {
  cursor: pointer;
  width: 100%;
}

.full-component {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 95%;
  max-height: 95%;
  z-index: 10001;
  @media only screen and (max-width: 800px) {
    max-width: 80%;
    max-height: 80%;
  }
}

.zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  color: white;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}

.poster-component:hover + .zoom-icon,
.zoom-icon:hover {
  opacity: .6;
  cursor: pointer;
}
</style>