<template>
  <div class="container">
    <div 
      v-swiper:mySwiper="swiperOptions"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide opening" data-hash="slide1">
          <img class="opening-logo" src="/instalasi/mybdgjournal/bdg.gif" alt="bdg">
          <iframe class="opening-spotify" src="https://open.spotify.com/embed/track/6qA30oi2e61rbsPgZhTvW8" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" />
          <span class="opening-petunjuk">Putar lagu untuk pengalaman yang lebih baik</span>
        </div>
        <div class="swiper-slide narasi" data-hash="slide2">
          <p class="intro">
            Bandung, kota yang cantik.<br>
            Ga pagi, siang, malam, ada aja yang buat mata dimanja.<br>
            Ada aja hal baru untuk di-explore.<br>
            Ada aja hal yang membuat gue semakin cinta sama kota ini.<br>
            Rasanya kangen banget sama Bandung, setelah berbulan-bulan ga kesana ditengah pandemi ini.<br>
            Dari Dago sampai Braga, tersimpan memori-memori indah bersama keluarga, teman, maupun sendiri.<br>
            Entah kapan bisa bertemu kembali, till next time, Bandung.<br>
            Nice to know you.<br><br>
          </p>
          <p class="sign">
            Salam Sayang, Ahmad Rasyid Alfarabi
          </p>
        </div>
        <div class="swiper-slide narasi" data-hash="slide3">
          <p class="petunjuk">
            Berikut adalah jurnal berisi 14 foto yang diambil di Bandung. Jika anda pernah melihat objek atau pernah berada di tempat pada foto-foto berikut, berilah tanda di halaman jurnal yang memuat foto tersebut.
          </p>
        </div>
        <div class="swiper-slide logo" data-hash="slide4">
          <img src="/instalasi/mybdgjournal/logo.png" alt="logo">
        </div>
        
        <div v-for="(data, count) in dataKarya" :key="data.id" :class="['swiper-slide', {black: data.isBlack}]" :data-hash="`slide${count+5}`">
          <img
            :src="data.srcUrl"
            class="swiper-lazy journal"
          >
          <div class="emosi-container">
            <div class="joy-container">
              <div class="emosi-text">
                {{ data.joy }}
              </div>
              <img :id="`joy${data.id}`" :src="data.isBlack ? '/instalasi/mybdgjournal/jp.png' : '/instalasi/mybdgjournal/j.png'" :class="['joy-button', {isBlack: data.isBlack}]" @click="addEmotion('joy', data.id, $event)" @mouseenter="handleHover($event)" @mouseout="handleHoverEnd($event)">
            </div>
            <div class="sad-container">
              <div class="emosi-text">
                {{ data.sad }}
              </div>
              <img :id="`sad${data.id}`" :src="data.isBlack ? '/instalasi/mybdgjournal/sp.png' : '/instalasi/mybdgjournal/s.png'" :class="['sad-button', {isBlack: data.isBlack}]" @click="addEmotion('sad', data.id, $event)" @mouseenter="handleHover($event)" @mouseout="handleHoverEnd($event)">
            </div>
            <div class="fear-container">
              <div class="emosi-text">
                {{ data.fear }}
              </div>
              <img :id="`fear${data.id}`" :src="data.isBlack ? '/instalasi/mybdgjournal/fp.png' : '/instalasi/mybdgjournal/f.png'" :class="['fear-button', {isBlack: data.isBlack}]" @click="addEmotion('fear', data.id, $event)" @mouseenter="handleHover($event)" @mouseout="handleHoverEnd($event)">
            </div>
            <div class="anger-container">
              <div class="emosi-text">
                {{ data.anger }}
              </div>
              <img :id="`anger${data.id}`" :src="data.isBlack ? '/instalasi/mybdgjournal/ap.png' : '/instalasi/mybdgjournal/a.png'" :class="['anger-button', {isBlack: data.isBlack}]" @click="addEmotion('anger', data.id, $event)" @mouseenter="handleHover($event)" @mouseout="handleHoverEnd($event)">
            </div>
          </div>
          <div class="swiper-lazy-preloader" />
        </div>

        <div class="swiper-slide narasi">
          <p class="intro">
            Bumi Pasundan lahir saat Tuhan sedang tersenyum<br><br>
          </p>
          <p class="sign">
            -M. A. W. Brouwer
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'

  export default {
    name: 'InstalasiRasyid',
    data () {
      return {
        dataKarya: [],
        storage: {},
        swiperOptions: {
          slidesPerView: 1,
          speed: 1500,
          mousewheel: true,
          centeredSlides: true,
          direction: 'vertical',
          preloadImages: false,
          lazy: {
            loadPrevNext: true,
          },
          keyboard: {
            enabled: true,
          },
          hashNavigation: {
            replaceState: true,
            watchState: true
          },
        }
      }
    },
    async mounted () {
      // get and listen to data karya
      await this.initializeDatabase()
      // initialize localStorage reading
      this.initializeLocalStorage()
      
      this.preloadImages()
    },
    methods: {
      initializeLocalStorage(){
        if (localStorage.getItem('instalasi')){
          try{
            this.storage = JSON.parse(localStorage.getItem('instalasi'))
            for ( let i = 1; i <= 14; i++ ){
              if (!(`foto${i}` in this.storage)){
                localStorage.removeItem('instalasi')
                this.initializeLocalStorage()
                break
              }
              if (this.storage[`foto${i}`]){
                // console.log(`#${this.storage[`foto${i}`]}${i}`)
                let img = document.querySelector(`#${this.storage[`foto${i}`]}${i}`)
                if (img.classList.contains('isBlack')){
                  img.setAttribute('src', '/instalasi/mybdgjournal/'+this.storage[`foto${i}`][0]+'p-.png')
                } else {
                  img.setAttribute('src', '/instalasi/mybdgjournal/'+this.storage[`foto${i}`][0]+'-.png')
                }
              }
            }
          } catch (e){
            localStorage.removeItem('instalasi')
            this.initializeLocalStorage()
          }
        } else {
          for ( let i = 1; i <= 14; i++ ){
            this.storage[`foto${i}`] = null
          }
          // console.log(this.storage)
          let parsed = JSON.stringify(this.storage)
          // console.log(parsed)
          localStorage.setItem('instalasi', parsed)
        }
      },
      initializeDatabase(){
        let karyaRef = this.$fire.firestore.collection('karya').doc('instalasi').collection('bandung')
        karyaRef.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === "added"){
              // console.log("Added: ", change.doc.data())
              let data = {id: parseInt(change.doc.id), ...change.doc.data()}
              if (!('joy' in data)) {
                data.joy = 0
                data.sad = 0
                data.fear = 0
                data.anger = 0
                await this.initializeEmosi(change.doc.id)
              }
              data.srcUrl = await this.getFromStorage(data.src)
              this.dataKarya.push(data)
              this.dataKarya.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            }
            if (change.type === "modified"){
              // console.log("Modified: ", change.doc.data())
              let data = {id: parseInt(change.doc.id), ...change.doc.data()}
              if (this.dataKarya[parseInt(change.doc.id)-1].id === data.id){
                this.dataKarya[parseInt(change.doc.id)-1].joy = data.joy
                this.dataKarya[parseInt(change.doc.id)-1].sad = data.sad
                this.dataKarya[parseInt(change.doc.id)-1].fear = data.fear
                this.dataKarya[parseInt(change.doc.id)-1].anger = data.anger
              } else {
                let oldData = this.dataKarya.filter(datum => datum.id === data.id)
                oldData.joy = data.joy
                oldData.sad = data.sad
                oldData.fear = data.fear
                oldData.anger = data.anger
              }
            }
          })
        })
      },
      async addEmotion(emosi, id, e){
        // console.log(`${emosi} | ${id}`)
        if (this.storage[`foto${id}`] && this.storage[`foto${id}`] !== emosi){
          let oldEmosi = this.storage[`foto${id}`]
          this.storage[`foto${id}`] = emosi
          let parsed = JSON.stringify(this.storage)
          // console.log(`${oldEmosi} | ${parsed}`)

          if (e.target.classList.contains('isBlack')){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/'+emosi[0]+'p-.png')
            let oldEmosiEl = document.querySelector(`#${oldEmosi}${id}`)
            oldEmosiEl.setAttribute('src', '/instalasi/mybdgjournal/'+oldEmosi[0]+'p.png')
          } else {
            e.target.setAttribute('src', '/instalasi/mybdgjournal/'+emosi[0]+'-.png')
            let oldEmosiEl = document.querySelector(`#${oldEmosi}${id}`)
            oldEmosiEl.setAttribute('src', '/instalasi/mybdgjournal/'+oldEmosi[0]+'.png')
          }

          localStorage.setItem('instalasi', parsed)
          // console.log(`asdf ${this.dataKarya[id-1][`${emosi}`]}`)
          if (this.dataKarya[id-1][`${oldEmosi}`] > 0){
            await this.updateDatabaseMoveCounter(id, emosi, 1, oldEmosi, -1)
          } else {
            await this.updateDatabase(id, emosi, 1)  
          }
        } else if (!this.storage[`foto${id}`]) {
          this.storage[`foto${id}`] = emosi
          let parsed = JSON.stringify(this.storage)
          // console.log(`2. ${parsed}`)

          if (e.target.classList.contains('isBlack')){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/'+emosi[0]+'p-.png')
          } else {
            e.target.setAttribute('src', '/instalasi/mybdgjournal/'+emosi[0]+'-.png')
          }
          
          localStorage.setItem('instalasi', parsed)
          await this.updateDatabase(id, emosi, 1)
        } else {
          this.initializeLocalStorage()
        }
      },
      updateDatabase(id, emosi, val) {
        let karyaRef = this.$fire.firestore.collection('karya').doc('instalasi').collection('bandung').doc(`${id}`)
        return karyaRef.update({
          [emosi]: this.$fireModule.firestore.FieldValue.increment(val)
        }).then(() => {
          return true
        }).catch(() => {
          return false
        })
      },
      updateDatabaseMoveCounter(id, emosi1, val1, emosi2, val2) {
        let karyaRef = this.$fire.firestore.collection('karya').doc('instalasi').collection('bandung').doc(`${id}`)
        return karyaRef.update({
          [emosi1]: this.$fireModule.firestore.FieldValue.increment(val1),
          [emosi2]: this.$fireModule.firestore.FieldValue.increment(val2)
        }).then(() => {
          return true
        }).catch(() => {
          return false
        })
      },
      initializeEmosi(id){
        let karyaRef = this.$fire.firestore.collection('karya').doc('instalasi').collection('bandung').doc(id)
        return karyaRef.set({
          joy: 0,
          sad: 0,
          fear: 0,
          anger: 0
        }, { merge: true }).then(() => {
          return true
        }).catch(() => {
          return false
        })
      },
      getFromStorage(src){
        return this.$fire.storage.refFromURL(src).getDownloadURL()
          .then(url => {
            return url
          })
          .catch(error => {
            console.log(error)
          })
      },
      preloadImages(){
        setTimeout(() => {
          new Image().src = '/instalasi/mybdgjournal/j-.png'
          new Image().src = '/instalasi/mybdgjournal/s-.png'
          new Image().src = '/instalasi/mybdgjournal/f-.png'
          new Image().src = '/instalasi/mybdgjournal/a-.png'
        }, 1500)

        setTimeout(() => {
          new Image().src = '/instalasi/mybdgjournal/jp-.png'
          new Image().src = '/instalasi/mybdgjournal/sp-.png'
          new Image().src = '/instalasi/mybdgjournal/fp-.png'
          new Image().src = '/instalasi/mybdgjournal/ap-.png'
        }, 3000)
      },
      handleHover(e){
        if (e.target.classList.contains('isBlack')){
          if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/jp.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/jp-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/sp.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/sp-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/fp.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/fp-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/ap.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/ap-.png')
          }
        } else {
          if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/j.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/j-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/s.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/s-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/f.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/f-.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/a.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/a-.png')
          }
        }
      },
      handleHoverEnd(e){
        if (e.target.classList.contains('isBlack')){
          if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/jp-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/jp.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/sp-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/sp.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/fp-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/fp.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/ap-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/ap.png')
          }
        } else {
          if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/j-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/j.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/s-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/s.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/f-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/f.png')
          } else if (e.target.getAttribute('src') === '/instalasi/mybdgjournal/a-.png'){
            e.target.setAttribute('src', '/instalasi/mybdgjournal/a.png')
          }
        }
      }
    },
    head: {
      title: 'Bandung, nice to know you',
      description: 'Instalasi "Bandung, nice to know you" oleh Ahmad Rasyid Alfarabi'
    }
  }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');

.container {
  background-color: white;
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}

.swiper {
  height: 100vh;
  width: 100vw;
}

.swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.swiper-slide.swiper-slide-active:not(.logo) {
  opacity: 1;
  transition: opacity 2.5s;
}

.swiper-slide.swiper-slide-active.logo {
  opacity: 1;
  transition: opacity 1s ease-in-out;
  transition-delay: 1.5s;
}

.journal{
  @media only screen and (max-width: 600px) {
    width: 220%;
  }
}

.opening {
  flex-direction: column;
  .opening-logo {
    margin-bottom: 20px;
    @media only screen and (max-width: 800px) {
      max-width: 90%;
    }
  }
  .opening-spotify{
    opacity: .6;
    transition: opacity 0.5s;
    &:hover {
      opacity: 1;
    }
    @media only screen and (max-width: 600px) {
      width: 250px;
    }
  }
  .opening-petunjuk {
    font-family: 'Lora', serif;
    font-size: .7rem;
    font-weight: 300;
    opacity: .8;
  }
}


.narasi {
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.5;
  flex-direction: column;
  padding: 12%;
  @media only screen and (max-width: 800px) {
    font-size: 1.2rem;
  }
  @media only screen and (max-width: 600px) {
    font-size: .85rem;
    line-height: 1.6;
  }
  .intro {
    text-align: left;
  }
  .sign {
    text-align: right;
    align-self: flex-end;
  }
  .petunjuk {
    font-size: 1.8rem;
    @media only screen and (max-width: 800px) {
      font-size: 1.4rem;
    }
    @media only screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }
}

.emosi-container {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'Mechanical Pencil', serif;
  font-size: 1.7rem;
  font-weight: 300;
  @media only screen and (max-width: 800px) {
    bottom: 12%;
    font-size: 3rem;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
  .joy-container,
  .sad-container,
  .fear-container,
  .anger-container {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
    @media only screen and (max-width: 800px) {
      margin: 0 8px;
    }
    img {
      cursor: pointer;
      max-width: 45px;
      @media only screen and (max-width: 800px) {
        max-width: 11vw;
      }
    }
    .anger-button {
      max-width: 60px;
      @media only screen and (max-width: 800px) {
        max-width: 14vw;
      }
    }
    .emosi-text {
      margin-right: 3px;
    }
  }
  .joy-container {
    color: #d1bb10;
  }
  .sad-container {
    color: #305fe9;
  }
  .fear-container {
    color: #009562;
  }
  .anger-container {
    color: #e14423;
  }
}

.black {
  background-color: black;
}
</style>