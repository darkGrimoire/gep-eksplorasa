<template>
  <div class="container">
    <div class="ornament-container">
      <img :class="`${emosi}-1`" :src="'/img/'+emosi+'.png'" alt="ornamen1">
      <img :class="`${emosi}-2`" :src="'/img/'+emosi+'2.png'" alt="ornamen2">
      <img v-if="emosi === 'joy'" :class="`${emosi}-3`" :src="'/img/'+emosi+'3.png'" alt="ornamen3">
    </div>
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
import rcp from '~/components/rcp.vue'

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
          if (data.type !== "single"){
            this.$router.push({path: '/ruangan/' + this.emosi})
          }
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
          this.$router.push({path: '/ruangan/' + this.emosi})
        })
    },
    methods: {
      handleMin(text){
        let pos = text.lastIndexOf('/')+'/'.length
        return text.slice(0, pos) + 'min-' + text.slice(pos)
      },
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n")
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
    font-size: 35px;
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

.ornament-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  img {
    position: absolute;
  }
  .joy-1 {
    width: 12%;
    top: 15%;
  }
  .joy-2 {
    width: 8%;
    right: 0;
    top: 12%;
  }
  .joy-3 {
    width: 18%;
    bottom: 5%;
    right: 0;
  }
  .sad-1 {
    width: 15%;
    bottom: 0;
    right: 0;
  }
  .sad-2 {
    width: 14%;
    left: 0;
    top: 22%;
  }
  .fear-1 {
    width: 14%;
    top: 30%;
  }
  .fear-2 {
    width: 12%;
    top: 50%;
    right: 0;
  }
  .anger-1 {
    width: 14%;
    top: 30%;
  }
  .anger-2 {
    width: 18%;
    bottom: 0;
    right: 0;
  }
}

</style>