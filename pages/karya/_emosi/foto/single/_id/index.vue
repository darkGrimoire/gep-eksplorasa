<template>
  <div class="container">
    <zoom-photo :poster="dataKarya.photoMin" 
                :full="dataKarya.photo" 
                :container-class="'poster-container left-side'"
                :poster-class="'poster-img'"
    />
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
          this.dataKarya.judul = data.judul
          this.dataKarya.author = data.author
          this.dataKarya.caption = this.handleNewLines(data.caption)
          this.dataKarya.captionTitle = data.caption_title ? data.caption_title : ''
          this.dataKarya.photo = data.photo
          this.dataKarya.photoMin = this.handleMin(data.photo)
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
          this.dbLoading = false
          
          this.computedCaption = this.computeCaption(this.dataKarya.caption)
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
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n\n")
      },
      setButtonLayer(idx){
        document.getElementsByClassName('back-button')[0].style.zIndex = idx
        document.getElementsByClassName('swiper-pagination')[0].style.zIndex = idx
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