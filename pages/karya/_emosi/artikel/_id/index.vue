<template>
  <div class="container">
    <div class="content">
      <img :src="'/templatekine/g1 '+emosi+'.png'" class="g1">
      <img :src="'/templatekine/g2 '+emosi+'.png'" class="g2">

      <div class="layer2">
        <div v-if="dataKarya.photos" class="fotoo">
          <fa v-show="dataKarya.photos.length > 1" :icon="['fas', 'caret-left']" :style="'color: '+copal+';'" class="leftarrow arrow" @click="switchPhoto(-1)" />
          <zoom-photo :poster="dataKarya.photoMin" 
                      :full="dataKarya.photo" 
                      :container-class="'poster-container left-side'"
                      :poster-class="'poster-img'"
          />
          <fa v-show="dataKarya.photos.length > 1" :icon="['fas', 'caret-right']" :style="'color: '+copal+';'" class="rightarrow arrow" @click="switchPhoto(1)" />
        </div>
            
        <div class="paper">
          <img src="/templatekine/paper.png" class="paperr">
          <img src="/templatekine/paper.png" class="paperr">
          <img src="/templatekine/paper.png" class="paperrr">
          <img src="/templatekine/paper.png" class="paperrrr">
        
          <div class="papertext">
            <img :src="'/templatekine/'+emosi+'.png'" class="header">
            <div class="judul" :style="'color: '+copal+';'" v-html="computedJudul" />
            <div class="author">
              {{ dataKarya.author }}
            </div>
            <div class="isi">
              <p v-for="(paragraph, idx) in computedParagraphs" :key="idx" class="para" v-html="paragraph" />
            </div>
          </div>

          <div class="printilan">
            <img :src="'/templatekine/orn-'+emosi+'.png'" :style="calculateOrnament" class="tape">
          </div>
        </div>
      </div>
    </div>
    <rcp />
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
  </div>
</template>

<script>
import rcp from '~/components/rcp.vue'
import ZoomPhoto from '~/components/ZoomPhoto.vue'
export default {
  name: 'TemplateArtikel',
  components: {
    rcp,
    ZoomPhoto
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
        author: '',
        photo: '',
        photoMin: '',
        photos: [],
        photoMins: [],
        paragraphs: [],
      },
      dbLoading: true,
      computedParagraphs: [],
      computedJudul: '',
    }
  },
  computed: {
    copal() {
      if (this.emosi === 'joy'){
        return '#d1bb10'
      } else if (this.emosi === 'sad'){
        return '#305fe9'
      } else if (this.emosi === 'fear'){
        return '#009562'
      } else if (this.emosi === 'anger'){
        return '#e14423'
      } else {
        return '#ede5d1'
      }
    },
    calculateOrnament(){
      if (this.emosi === 'sad' || this.emosi === 'joy'){
        return ''
      } else {
        return 'width: 150px;margin-top: -10px;margin-left: 620px;'
      }
    }
  },
  mounted () {
    const karyaRef = this.$fire.firestore.collection('karya').doc('biasa').collection('artikel').doc(this.id)
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          this.dataKarya.judul = data.judul
          this.dataKarya.author = data.author
          this.dataKarya.paragraphs = data.paragraphs
          this.dataKarya.photos = data.photos
          if (data.photos)
            this.handleMins(data.photos)
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
          this.dataKarya.par_space = (data.par_space || '      ') 
          this.dataKarya.par_end = (data.par_end || '<br>') 
          this.dbLoading = false

          this.processParagraphs()
          this.computedJudul = this.handlePipeline(this.dataKarya.judul)
          if (data.photos) {
            this.dataKarya.photo = this.dataKarya.photos[0]
            this.dataKarya.photoMin = this.dataKarya.photoMins[0]
            this.preloadImages()
          } else {
            document.getElementsByClassName('layer2')[0].style.justifyContent = 'center'
          }
        })
        .catch((err) => {
          console.log(err)
          // this.$router.push({path: '/ruangan/' + this.emosi})
        })
  },
  methods: {
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
    },
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
      return text.replaceAll("$\\n", "<br>")
    },
    handleItalicStart(text){
      return text.replaceAll("$\\i", "<i>")
    },
    handleItalicEnd(text){
      return text.replaceAll("$\\I^", "</i>")
    },
    handleBoldStart(text){
      return text.replaceAll("$\\b", "<b>")
    },
    handleBoldEnd(text){
      return text.replaceAll("$\\B^", "</b>")
    },
    handleUrl(text) {
      let urlRegex = /((https|http)?:\/\/[^\s]+)/g
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>'
      })
    },
    handleParagraphStart(text){
      return this.dataKarya.par_space + text
    },
    handleParagraphEnd(text){
      return text + this.dataKarya.par_end
    },
    processParagraphs(){
      this.dataKarya.paragraphs.forEach((par, idx) => {
        let text = this.handleParagraphStart(this.handlePipeline(par))
        if (idx === this.dataKarya.paragraphs.length-1)
          text = this.handleParagraphEnd(text)
        this.computedParagraphs.push(text)
      }) 
    },
    handlePipeline(text) {
      return this.handleNewLines(
        this.handleItalicStart(
          this.handleItalicEnd(
            this.handleBoldStart(
              this.handleBoldEnd(
                this.handleUrl(text)
              )
            )
          )
        )
      )
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
            description: 'Artikel "'+this.dataKarya.judul+'" oleh '+this.dataKarya.author
          }
        ]
      }
    }
}
</script>

<style lang="scss" scoped>
  div {
    font-family: 'Karla';
    font-size: 20px;
    color: #1f1f1f;
    text-align: center;
  }

  .container {
    background-image: url("/img/uc-bg.png");
    background-size: 1536px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
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

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .para {
    margin-bottom: 10px;
    line-height: 1.4;
  }

  ::v-deep .poster-container {
  width: 350px;
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

  a {
    color: #d1bb10;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .g1 {
    position: absolute;
      width: 300px;
      top: -30px;
      left: 250px;
  }

  .g2 {
    position: absolute;
      width: 300px;
      bottom: -46.5px;
      margin-left: 425px;
  }
  
  .layer2 {
      width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    position: absolute;
      justify-content: space-between;
      padding: 100px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 100px;
    color: #ede5d1;
    &:hover {
      cursor: pointer;
    }
  }

  .fotoo {
    margin-left: 35px;
    position: relative;

    img {
      width: 450px;
    }
  }

  .leftarrow {
    left: -60px;
  }

  .rightarrow {
    right: -60px;
  }

  .paper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
  }

  .paperr {
    width: 750px;
    margin-top: -10px;
  }

  .papertext {
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: flex-start;
      text-align: center;
      position: absolute;
      padding: 20px 30px;
  }

  .header {
    width: 175px;
  }

  .judul {
      font-family: 'KG Happy Solid';
      font-size: 28px;
      color: #d1bb10;
      padding: 5px 0;
  }

  .author {
      font-family: 'Mechanical Pencil';
      font-size: 25px;
      padding-top: 5px;
      padding-bottom: 40px;
  }

  .isi {
    text-align: left;
    max-height: 350px;
    overflow-y: scroll;
    padding: 0 30px;
    //firefox
    scrollbar-color: #ede5d1 rgba($color: #19202d, $alpha: 0.6); 
    scroll-behavior: smooth;
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: none;
  }
  ::-webkit-scrollbar {
    width: 7px;
    background-color: none;
  }
  .isi::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #19202d;
  }

  .printilan {
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    position: absolute;
  }

  .tape {
    width: 175px;
    margin-left: 677px;
    margin-top: 75px;
  }

  @media only screen and (min-width: 750px) {
    .paperrr {display: none;}
  }

  @media only screen and (min-width: 400px) {
    .paperrrr {display: none;}
  }

  @media only screen and (max-width: 1400px) {
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
      position: absolute;
        width: 300px;
        top: -30px;
        left: 250px;
    }

    .g2 {
      position: absolute;
        width: 300px;
        bottom: -46.5px;
        margin-left: 425px;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: absolute;
        justify-content: space-between;
        padding: 100px;
    }

    .arrow {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 100px;
      color: #ede5d1;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;
      position: relative;

      img {
        width: 450px;
      }
    }

    .leftarrow {
      left: -60px;
    }

    .rightarrow {
      right: -60px;
    }

    .paper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 80vh;
      margin-top: 50px;
    }

    .paperr {
      width: 750px;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 20px 30px;
    }

    .header {
      width: 175px;
    }

    .judul {
        font-family: 'KG Happy Solid';
        font-size: 28px;
        color: #d1bb10;
        padding: 5px 0;
        max-width: 80%;
    }

    .author {
        font-family: 'Mechanical Pencil';
        font-size: 25px;
        padding-top: 5px;
        padding-bottom: 40px;
    }

    .isi {
      text-align: left;
      max-height: 550px;
      overflow-y: scroll;
      padding: 0 30px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ede5d1;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 175px;
      margin-left: 660px;
      margin-top: 75px;
    }
  }

  @media only screen and (max-width: 768px) {
    .fotoo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .paper {
      max-width: 90vw;
    }
  }

  @media only screen and (max-width: 749px) {
    div {
      font-size: 15px;
    }
    
    .content {
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
        width: 230px;
        top: -20px;
        left: 50px;
    }

    .g2 {
      display: none;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
        padding: 30px 0;
    }

    .arrow {
      font-size: 70px;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;

      img {
        width: 250px;
      }
    }

    .leftarrow {
      left: -50px;
    }

    .rightarrow {
      right: -50px;
    }

    .paper {
      height: 80vh;
      margin-top: 50px;
    }

    .paperr {
      width: 365px;
      margin-top: -10px;
    }
    .paperrr {
      width: 365px;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 5px 10px;
    }

    .header {
      width: 120px;
    }

    .judul {
        font-size: 22px;
        padding: 5px 0;
    }

    .author {
        font-size: 20px;
        padding-top: 5px;
        padding-bottom: 30px;
    }

    .isi {
      text-align: left;
      max-height: 500px;
      overflow-y: scroll;
      padding: 0 10px;
    }

    ::-webkit-scrollbar {
      width: 3px;
      background-color: none;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 100px;
      margin-left: 300px;
      margin-top: -10px;
    }
  }

  @media only screen and (max-width: 399px) {
    div {
      font-size: 12px;
    }
    
    .content {
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .g1 {
        width: 200px;
        top: -20px;
        left: 10px;
    }

    .g2 {
      display: none;
    }
    
    .layer2 {
        width: 100%;
      top: 0;
      left: 0;
        padding: 30px 0;
    }

    .arrow {
      font-size: 80px;
    }

    .fotoo {
      margin-left: 0px;
      margin-top: 50px;

      img {
        width: 200px;
      }
    }
    ::v-deep .poster-container {
      width: 320px;
    }

    .leftarrow {
      left: 5px;
    }

    .rightarrow {
      right: 5px;
    }

    .paper {
      height: 80vh;
      width: 90vw;
      margin-top: 50px;
    }

    .paperr {
      width: 90vw;
      margin-top: -10px;
    }
    .paperrr {
      width: 90vw;
      margin-top: -10px;
    }
    .paperrrr {
      width: 90vw;
      margin-top: -10px;
    }

    .papertext {
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;
        text-align: center;
        position: absolute;
        padding: 5px 10px;
    }

    .header {
      width: 100px;
    }

    .judul {
        font-size: 18px;
        padding: 5px 0;
    }

    .author {
        font-size: 16px;
        padding-top: 5px;
        padding-bottom: 40px;
    }

    .isi {
      text-align: left;
      max-height: 500px;
      overflow-y: scroll;
      padding: 0 10px;
    }

    ::-webkit-scrollbar {
      width: 3px;
      background-color: none;
    }

    .printilan {
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      position: absolute;
    }

    .tape {
      width: 80px;
      margin-left: 200px;
      margin-top: -5px;
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
    text-decoration: none;
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
</style>