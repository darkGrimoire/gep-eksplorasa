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
        
        <div v-for="(data, count) in dataKarya" :key="data.id" class="swiper-slide" :data-hash="`slide${count+5}`">
          <img
            :src="data.src"
            class="swiper-lazy"
          >
          <div class="emosi-container">
            <div class="joy-container">
              <div class="emosi-text">
                joy: {{ data.joy }}
              </div>
              <button :id="`joy${data.id}`" class="joy-button" @click="addEmotion('joy', data.id)">
                joy
              </button>
            </div>
            <div class="sad-container">
              <div class="emosi-text">
                sad: {{ data.sad }}
              </div>
              <button :id="`sad${data.id}`" class="sad-button" @click="addEmotion('sad', data.id)">
                sad
              </button>
            </div>
            <div class="fear-container">
              <div class="emosi-text">
                fear: {{ data.fear }}
              </div>
              <button :id="`fear${data.id}`" class="fear-button" @click="addEmotion('fear', data.id)">
                fear
              </button>
            </div>
            <div class="anger-container">
              <div class="emosi-text">
                anger: {{ data.anger }}
              </div>
              <button :id="`anger${data.id}`" class="anger-button" @click="addEmotion('anger', data.id)">
                anger
              </button>
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
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'

  export default {
    name: 'InstalasiRasyid',
    data () {
      return {
        dummy: [
          {src: '/instalasi/mybdgjournal/1.png', joy: 5, sad: 0, fear: 1, anger: 2},
          {src: '/instalasi/mybdgjournal/2.png', joy: 2, sad: 3, fear: 2, anger: 3}
        ],
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
          pagination: {
            el: '.swiper-pagination',
            bulletActiveClass: 'custom-bullet-active'
          }
        }
      }
    },
    async mounted () {
      // get and listen to data karya
      await this.initializeDatabase()
      // initialize localStorage reading
      this.initializeLocalStorage()
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
              this.dataKarya.push(data)
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
      async addEmotion(emosi, id){
        // console.log(`${emosi} | ${id}`)
        if (this.storage[`foto${id}`] !== null && this.storage[`foto${id}`] !== emosi){
          let oldEmosi = this.storage[`foto${id}`]
          this.storage[`foto${id}`] = emosi
          let parsed = JSON.stringify(this.storage)
          // console.log(`${oldEmosi} | ${parsed}`)

          localStorage.setItem('instalasi', parsed)
          // console.log(`asdf ${this.dataKarya[id-1][`${emosi}`]}`)
          if (this.dataKarya[id-1][`${oldEmosi}`] > 0){
            await this.updateDatabaseMoveCounter(id, emosi, 1, oldEmosi, -1)
          } else {
            await this.updateDatabase(id, emosi, 1)  
          }
        } else if (this.storage[`foto${id}`] === null) {
          this.storage[`foto${id}`] = emosi
          let parsed = JSON.stringify(this.storage)
          // console.log(`2. ${parsed}`)
          
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

.opening {
  flex-direction: column;
  .opening-logo {
    margin-bottom: 20px;
  }
  .opening-spotify{
    opacity: .6;
    transition: opacity 0.5s;
    &:hover {
      opacity: 1;
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
  .intro {
    text-align: left;
  }
  .sign {
    text-align: right;
    align-self: flex-end;
  }
  .petunjuk {
    font-size: 1.8rem;
  }
}

.emosi-container {
  position: absolute;
  right: 20px;
  bottom: 50px;
  transform: translate(0, -100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lora', serif;
  font-size: 1rem;
  font-weight: 300;
  .joy-container,
  .sad-container,
  .fear-container,
  .anger-container {
    text-align: center;
    min-width: 75px;
  }
}

.green-btn {
  background-color: greenyellow;
}
.red-btn {
  background-color: crimson;
}
</style>

<style lang="scss">
.custom-bullet-active {
  opacity: 1;
  background: #333;
}
</style>