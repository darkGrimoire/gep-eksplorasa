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
  </div>
</template>

<script>
// import gsap from 'gsap'
import ZoomPhoto from '~/components/ZoomPhoto.vue'
// import Loading from '~/components/Loading.vue'

// const CAPTION_TRESHOLD = 250
  export default {
    name: 'TemplateFoto',
    components: {
      ZoomPhoto,
      // Loading
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
    mounted () {
      const karyaRef = this.$fire.firestore.collection('karya').doc('biasa').collection('foto').doc(this.id)
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          this.dataKarya.juduls = data.juduls
          this.dataKarya.author = data.author
          this.handleNewLinesMany(data.captions)
          this.dataKarya.captionTitles = data.caption_titles
          this.dataKarya.photos = data.photos
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
          this.dbLoading = false
          
          this.handleMins(data.photos)
          this.computedCaption = this.computeCaption(this.dataKarya.captions[0])
          this.dataKarya.photo = this.dataKarya.photos[0]
          this.dataKarya.photoMin = this.dataKarya.photoMins[0]
          this.dataKarya.judul = this.dataKarya.juduls[0]

          this.preloadImages()
        })
        .catch((err) => {
          console.log(err)
          // this.$router.push({path: '/ruangan/' + this.emosi})
        })
    },
    methods: {
      handleMin(text){
        let pos = text.lastIndexOf('/')+'/'.length
        return text.slice(0, pos) + 'min-' + text.slice(pos)
      },
      handleMins(photos){
        photos.forEach(photo => {
          let photoMin = this.handleMin(photo)
          this.dataKarya.photoMins.push(photoMin)
        })
      },
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n\n")
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
  max-height: 80%;
  @media only screen and (max-width: 800px) {
    width: 550px;
    margin: 2% 0;
    max-width: 70%;
    max-height: 70%;
  }
  @media only screen and (max-width: 600px) {
    width: 400px;
  }
  &:hover .slide-controls .arrow {
    color: rgba($color: white, $alpha: 0.2);
  }
  &:hover .slide-controls .arrow:hover {
    cursor: pointer;
    color: rgba($color: white, $alpha: 0.8);
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

.back-button {
  position: fixed;
  bottom: 2%;
  left: 2%;
  color: white;
  font-size: 50px;
  font-family: 'Mechanical Pencil';
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
    font-size: 35px;
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
  margin-bottom: 2%;
  max-width: 40%;
  overflow-y: auto;
  max-height: 40vh;
  z-index: 100;
  .title {
    font-size: 44px;
  }
  .deskripsi {
    font-size: 16px;
    white-space: pre-line;
  }
  @media only screen and (max-width: 800px) {
    max-height: 35vh;
    min-width: 60vw;

    .title {
      font-size: 30px;
    }
    .deskripsi {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 600px) {
    .title {
      font-size: 24px;
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
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

</style>