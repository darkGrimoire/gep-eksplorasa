<template>
  <div class="container">
    <zoom-photo :poster="dataKarya.photoMin" 
                :full="dataKarya.photo" 
                :container-class="'poster-container left-side'"
                :poster-class="'poster-img'"
    >
      <div slot="photo-controls" class="slide-controls">
        <fa :icon="['fas', 'chevron-left']" class="left-arrow arrow" @click="switchPhoto(-1)" />
        <fa :icon="['fas', 'chevron-right']" class="right-arrow arrow" @click="switchPhoto(1)" />
      </div>
    </zoom-photo>
    
    <div class="title-container left-side">
      <div class="title">
        {{ dataKarya.judul }}
      </div>
      <div class="author">
        {{ dataKarya.author }}
      </div>
    </div>
    <div class="caption-container">
      <div class="title">
        {{ dataKarya.captionTitle }}
      </div>
      <p class="deskripsi">
        {{ computedCaption }}
      </p>
      <div v-if="readMore" class="read-more" @click="triggerReadmore">
        Read more
      </div>
    </div>
    <nuxt-link class="back-button" :to="'/ruangan/'+emosi">
      Back
    </nuxt-link>
    <nuxt-link v-if="dataKarya.prev" class="prev-button" :no-prefetch="true"
               :to="'/karya/'+this.emosi+(this.dataKarya.prev.charAt(0) === '/' ? '' : '/')+this.dataKarya.prev"
    >
      Prev
    </nuxt-link>
    <nuxt-link v-if="dataKarya.next" class="next-button" :no-prefetch="true"
               :to="'/karya/'+this.emosi+(this.dataKarya.next.charAt(0) === '/' ? '' : '/')+this.dataKarya.next"
    >
      Next
    </nuxt-link>
    <rcp />
  </div>
</template>

<script>
import ZoomPhoto from '~/components/ZoomPhoto.vue'
import rcp from '@/components/rcp.vue'

// const CAPTION_TRESHOLD = 250
  export default {
    name: 'TemplateFoto',
    components: {
      ZoomPhoto,
      rcp
    },
    async asyncData({ params }) {
      const emosi = params.emosi
      const id = params.id
      return { emosi, id }
    },
    data() {
      return {
        dataKarya: {
          juduls: [],
          photos: [],
          photoMins: [],
          captions: [],
          captionTitles: [],
          judul: '',
          photo: '',
          photoMin: '',
          caption: '',
          captionTitle: '',
          author: ''
        },
        dbLoading: true,
        computedCaption: '',
        readMore: false
      }
    },
    computed: {
      watchCaption() {
        return this.dataKarya.caption
      }
    },
    watch: {
      watchCaption(newValue) {
        this.computedCaption = this.computeCaption(newValue)
      }
    },
    mounted () {
      const karyaRef = this.$fire.firestore.collection('karya').doc('biasa').collection('foto').doc(this.id)
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          if (data.type !== "series"){
            this.$router.push({path: '/ruangan/' + this.emosi})
          }
          this.dataKarya.juduls = data.juduls
          this.dataKarya.author = data.author
          this.handleNewLinesMany(data.captions)
          this.dataKarya.captionTitles = data.caption_titles
          this.dataKarya.photos = data.photos
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
          this.dbLoading = false
          
          this.handleMins(data.photos)
          this.dataKarya.caption = this.dataKarya.captions[0]
          this.dataKarya.photo = this.dataKarya.photos[0]
          this.dataKarya.photoMin = this.dataKarya.photoMins[0]
          this.dataKarya.judul = this.dataKarya.juduls[0]
          this.computedCaption = this.computeCaption(this.dataKarya.caption)

          this.preloadImages()
          document.onkeyup = this.handleKeyboard
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({path: '/ruangan/' + this.emosi})
        })
    },
    methods: {
      handleMin(text){
        let pos = text.lastIndexOf('/')+'/'.length
        return text.slice(0, pos) + 'min-' + text.slice(pos)
      },
      handleKeyboard(e){
        if (e.key === "ArrowLeft"){
          this.switchPhoto(-1)
        } else if (e.key === "ArrowRight"){
          this.switchPhoto(1)
        }
      },
      handleMins(photos){
        photos.forEach(photo => {
          let photoMin = this.handleMin(photo)
          this.dataKarya.photoMins.push(photoMin)
        })
      },
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n")
      },
      handleNewLinesMany(texts){
        texts.forEach((text) => {
          let caption = this.handleNewLines(text)
          this.dataKarya.captions.push(caption)
        })
      },
      switchPhoto(n) {
        // Switch photo
        let now_showing = this.dataKarya.photos.findIndex(x => x === this.dataKarya.photo)
        let photolist_len = this.dataKarya.photos.length
        if (now_showing+n === -1) {
          now_showing+=photolist_len
        }
        this.dataKarya.photo = this.dataKarya.photos[(now_showing+n) % photolist_len]

        // switch photoMin
        now_showing = this.dataKarya.photoMins.findIndex(x => x === this.dataKarya.photoMin)
        photolist_len = this.dataKarya.photoMins.length
        if (now_showing+n === -1) {
          now_showing+=photolist_len
        }
        this.dataKarya.photoMin = this.dataKarya.photoMins[(now_showing+n) % photolist_len]

        // switch judul
        now_showing = this.dataKarya.juduls.findIndex(x => x === this.dataKarya.judul)
        photolist_len = this.dataKarya.juduls.length
        if (now_showing+n === -1) {
          now_showing+=photolist_len
        }
        this.dataKarya.judul = this.dataKarya.juduls[(now_showing+n) % photolist_len]

        // switch captions
        now_showing = this.dataKarya.captions.findIndex(x => x === this.dataKarya.caption)
        photolist_len = this.dataKarya.captions.length
        if (now_showing+n === -1) {
          now_showing+=photolist_len
        }
        this.dataKarya.caption = this.dataKarya.captions[(now_showing+n) % photolist_len]
      },
      setButtonLayer(idx){
        document.getElementsByClassName('back-button')[0].style.zIndex = idx
        document.getElementsByClassName('swiper-pagination')[0].style.zIndex = idx
      },
      preloadImages(){
        setTimeout(() => {
          this.dataKarya.photoMins.forEach(async (photoMin) => {
            let src = await this.getLink(photoMin)
            new Image().src = src
          })
        }, 1500)
        setTimeout(() => {
          this.dataKarya.photos.forEach(async (photo) => {
            let src = await this.getLink(photo)
            new Image().src = src
          })
        }, 3000)
      },
      computeCaption(text){
        // if (text.length > CAPTION_TRESHOLD){
        //   this.readMore = true
        //   return text.slice(0, CAPTION_TRESHOLD) + '...' 
        // } 
        return text
      },
      // triggerReadmore(){
      //   gsap.to('left-side', {xPercent: -50, yPercent: -25 , duration: 1})
      //   gsap.to('.left-side', {xPercent: -50, yPercent: -25 , duration: 1})
      // }
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
    head() {
      return {
        title: this.dataKarya.judul,
        meta: [
          {
            hid: 'description',
            name: 'description',
            description: 'Foto "'+this.dataKarya.judul+'" oleh '+this.dataKarya.author
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  background-image: url('/img/uc-bg.png');
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

::v-deep .poster-container {
  margin-top: 5%;
  width: 700px;
  max-width: 80%;
  height: 50%;
  max-height: 50%;
  @media only screen and (max-width: 800px) {
    width: 550px;
    max-width: 70%;
    max-height: 50%;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 10%;
    width: 400px;
  }
  &:hover .slide-controls .arrow {
    color: rgba($color: white, $alpha: 0.2);
  }
  &:hover .slide-controls .arrow:hover {
    cursor: pointer;
    color: rgba($color: white, $alpha: 0.8);
  }
  &:hover .slide-controls .arrow:active {
    cursor: pointer;
    color: rgba($color: #d1bb10, $alpha: 1);
  }
}

.slide-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .arrow {
    pointer-events: all;
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 60px;
    color: rgba($color: white, $alpha: 0);
    transition: color 0.2s ease-in-out;
    &:active {
      color: rgba($color: white, $alpha: 1.0);
    }
    @media only screen and (max-width: 800px) {
      color: rgba($color: white, $alpha: 0.4);
      font-size: 75px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 50px;
    }
    @media only screen and (max-width: 450px) {
      font-size: 40px;
    }
  }
  .right-arrow {
    right: 20px;
    @media only screen and (max-width: 800px) {
      right: -50px;
    }
    @media only screen and (max-width: 600px) {
      right: -40px;
    }
  }
  .left-arrow {
    left: 20px;
    @media only screen and (max-width: 800px) {
      left: -50px;
    }
    @media only screen and (max-width: 600px) {
      left: -40px;
    }
  }
}


.prev-button {
  position: fixed;
  top: 2%;
  left: 2%;
  color: white;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 1;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  @media only screen and (max-width: 800px) {
    left: 5%;
    top: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
}

.next-button {
  position: fixed;
  right: 2%;
  top: 2%;
  color: white;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 1;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  @media only screen and (max-width: 800px) {
    right: 5%;
    top: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
}


.back-button {
  position: fixed;
  bottom: 2%;
  left: 2%;
  color: white;
  font-size: 40px;
  font-family: 'KG Happy Solid';
  z-index: 1;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
    opacity: 1;
  }
  @media only screen and (max-width: 800px) {
    left: 5%;
    bottom: 5%;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    bottom: 3%;
    font-size: 30px;
  }
}

.title-container {
  font-family: 'Karla';
  text-align: center;
  color: white;
  margin: 25px 5% 10px 5%;
  .title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .author {
    font-style: italic;
    font-size: 20px;
  }
  @media only screen and (max-width: 600px) {
    margin: 15px 2% 2px 2%;

    .title {
      font-size: 24px;
    }
    .author {
      font-size: 16px;
    }
  }
}

.read-more {
  color: #d1bb10;
  margin-top: 10px;
  float: right;
  cursor: pointer;
}

.caption-container {
  font-family: 'Karla';
  text-align: left;
  color: white;
  margin: 0 5%;
  margin-bottom: 4%;
  padding-right: 8px;
  max-width: 40%;
  min-width: 20%;
  overflow-y: auto;
  max-height: 40vh;
  z-index: 100;
  line-height: 1.3;
  // firefox
  scrollbar-color: #f1f1f1 rgba($color: #888, $alpha: 0.6); 
  scroll-behavior: smooth;
  scrollbar-width: thin;
  .title {
    font-size: 44px;
  }
  .deskripsi {
    font-size: 16px;
    white-space: pre-line;
  }
  @media only screen and (max-width: 800px) {
    max-height: 30vh;
    max-width: 75vw;
    min-width: 40vw;
    margin-bottom: 14%;

    .title {
      font-size: 30px;
    }
    .deskripsi {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 600px) {
    min-width: 45vw;
    margin-bottom: 16%;
    .title {
      font-size: 18px;
    }
    .deskripsi {
      font-size: 12px;
    }
  }
}

/* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba($color: #888, $alpha: 0.6); 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba($color: #f1f1f1, $alpha: 0.8); 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #fff; 
  }

</style>