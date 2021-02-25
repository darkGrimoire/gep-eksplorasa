<template>
  <div class="main">
    <div class="slide-controls">
      <fa v-show="slide === 2" :icon="['fas', 'chevron-left']" class="left-arrow arrow" @click="switchSlide(-1)" />
      <fa v-show="slide === 1" :icon="['fas', 'chevron-right']" class="right-arrow arrow" @click="switchSlide(1)" />
    </div>

    <div class="loading" style="position: absolute; background-color: black; opacity: 1; z-index: 9999; width: 100vw; height: 100vh;" />
    <div class="narasi narasi-masuk" style="display: none;">
      {{ msg.masuk }}
    </div>
    <div class="narasi narasi-keluar" style="display: none;">
      {{ msg.keluar }}
    </div>
    <div class="narasi narasi-closing" style="display: none;">
      {{ msg.closing }}
    </div>    

    <div id="slide0" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide0+'% '+sign+' '+Math.abs(computedDisplacement)+'px), -50%)'}" 
    >
      <div class="canvas">
        <div class="canvas canvas-hover" />
      </div>
    </div>
    <!-- <div v-if="slide === 0" class="foot-in">
      <img src="/gif/f220.gif" alt="footstep">
    </div> -->
    
    <!-- SLIDE 1 -->
    <div id="slide1" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide1+'% '+sign+' '+Math.abs(computedDisplacement)+'px), -50%)'}" 
         @mousedown="startDrag($event)" 
         @mousemove="dragContainer($event)" 
         @mouseup="endDrag($event)"
         @mouseleave="endDrag($event)"
         @touchstart="startDrag($event)" 
         @touchmove="dragContainer($event)" 
         @touchend="endDrag($event)"
    >
      <div class="canvas">
        <div class="canvas canvas-hover">
          <div class="cont transitionfade-in" />
          <div v-show="benda.saklar" class="cont darkness" />
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide-fear1.png" alt="guide" style="opacity: 0;">
          </div> -->
          <div class="cont wall">
            <img src="/fear/bg 1.png" alt="wall">
          </div>
          <div class="cont mesin-cuci">
            <img src="/fear/mesin-cuci.gif" alt="mesin cuci">
          </div>
          <div class="cont pel">
            <img src="/fear/pelan 1.png" alt="pel">
          </div>
          <div class="cont pipa">
            <img src="/fear/pipa 1.png" alt="pipa">
          </div>
          <div class="cont floor">
            <img src="/fear/lantai 1.png" alt="floor">
          </div>
          <div class="cont tangga">
            <img src="/fear/tangga 1.png" alt="tangga">
          </div>
          <div class="cont dinding-robek">
            <img src="/fear/crack 1.png" alt="robekan">
          </div>
          <div class="cont rak-broken">
            <img src="/fear/rak 1.png" alt="rak">
          </div>
          <div class="cont lemari">
            <img src="/fear/lemari.gif" alt="lemari">
          </div>
          <div class="cont bochor">
            <img src="/fear/bocor 1.png" alt="bocor">
          </div>
          <div class="cont web">
            <img src="/fear/jaring 1.png" alt="jaring laba-laba">
          </div>
          <div class="cont saklar">
            <img src="/fear/saklar 1.png" alt="saklar" @click="toggleSaklar">
          </div>
          <div class="cont lampu">
            <img src="/fear/lampu 1.png" alt="lampu">
          </div>
          <div class="photoseries" @click="popups = 'foto';tipeKarya = 'series'" />
          <div class="kamera" @click="popups = 'foto';tipeKarya = 'single'" />
          <div class="radio" @click="popups = 'podcast'" />
          <div class="kucing" />
          <div class="zine" @click="popups = 'kine';tipeKarya = 'buku'" />
          <div v-if="!isInstruksi1" class="instruksi instruksi1">
            <img :src="instruksiImg1" alt="instruksi" @click="fadeInstruksi('instruksi1')">
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 1" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 1" :tipe-karya="tipeKarya" class="foto-popup" />
          <PodcastPopup v-if="popups === 'podcast' && slide === 1" @closePopup="popups = ''" />
          <!-- <div class="cont zine">
            <img src="/fear/f-zine-1.png" alt="zine" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div> -->
        </div>
      </div>
    </div>

    <!-- SLIDE 2 -->
    <div id="slide2" class="top-cont" 
         :style="{'transform': 'translate(calc('+base.slide2+'% '+sign+' '+(Math.abs(computedDisplacement)-1)+'px), -50%)'}" 
         @mousedown="startDrag($event)" 
         @mousemove="dragContainer($event)" 
         @mouseup="endDrag($event)"
         @mouseleave="endDrag($event)"
         @touchstart="startDrag($event)" 
         @touchmove="dragContainer($event)" 
         @touchend="endDrag($event)"
    >
      <div class="canvas">
        <div class="canvas canvas-hover">
          <div class="cont transitionfade-out" />
          <div v-show="benda.saklar" class="cont darkness" />
          <div v-show="popups === 'foto'" class="cont darkness" @click="popups = ''" />
          <!-- <div class="cont guide" style="display: none;"> -->
          <!-- Ubah src jadi guide image yang kamu inginkan, setel opacity sesuai keinginan. -->
          <!-- <img src="/guide-fear3.png" alt="guide" style="opacity: 0;">
          </div> -->
          <div class="cont wall">
            <img src="/fear/bg 1.png" alt="wall">
          </div>
          <div class="cont floor">
            <img src="/fear/lantai 1.png" alt="floor">
          </div>
          <div class="cont pintu">
            <img src="/fear/pintu 1.png" alt="pintu">
          </div>
          <div class="trap-door" />
          <div class="cont tv" @click="popups = 'tv'" />
        
          <div v-show="!benda.saklar" class="cont sadako">
            <img src="/fear/sadako 1.png" alt="sadako" :style="`opacity: ${benda.sadako}`" @mouseenter="benda.sadako = 1" @mouseout="benda.sadako = 0">
          </div>
          <div v-show="benda.saklar" class="cont sadako">
            <img src="/fear/sadako 1.png" alt="sadako">
          </div>
          <div class="cont sofa">
            <img src="/fear/kursi 1.png" alt="sofa">
          </div>
          <div class="cont ventilasi">
            <img src="/fear/vent 1.png" alt="ventilasi">
          </div>
          <div v-show="!benda.saklar" class="foto" />
          <div v-show="benda.saklar" class="cont foto">
            <img src="/fear/fokripi 1.png" alt="foto">
          </div>
          <div class="cont tikus1">
            <img src="/fear/rat 1 1.png" alt="tikus">
          </div>
          <div class="cont tikus2">
            <img src="/fear/rat 2 1.png" alt="tikus">
          </div>
          <div v-show="!benda.saklar" class="cont hantu1">
            <img src="/fear/setanmini 1.png" alt="hantu" :style="`opacity: ${benda.setanmini}`" @mouseenter="benda.setanmini = 1" @mouseout="benda.setanmini = 0">
          </div>
          <div v-show="benda.saklar" class="cont hantu1">
            <img src="/fear/setanmini 1.png" alt="hantu">
          </div>
          <div class="cont box">
            <img src="/fear/box 1.png" alt="box">
          </div>
          <div class="cont bat">
            <img src="/fear/bat 1.png" alt="bat">
          </div>
          <div class="cont pipa-l">
            <img src="/fear/pipaHAPE 1.png" alt="pipa">
          </div>
          <div class="artikel" @click="popups = 'kine';tipeKarya = 'artikel'" />
          <div class="cont photobook" @click="popups = 'foto';tipeKarya = 'buku'" />
   
          <div v-show="!benda.saklar" class="cont photobook1" @click="popups = 'foto';tipeKarya = 'buku'" />

          <div v-show="benda.saklar" class="cont photobook1" @click="popups = 'foto';tipeKarya = 'buku'">
            <img src="/fear/f-photobook-2.png" alt="hantu">
          </div>
          <div class="cont teropong" @click="handleRasyid" />
          <div class="playlist" @click="popups = 'playlist'" />
          <div class="bounce kunci" @click="benda.kunci = true; resetGif(); slide=3" />
          <div v-show="benda.kunci" class="kaki" />
          <!-- <div v-show="benda.kunci" class="foot-out">
            <img id="foot-out" src="/gif/s220.gif" alt="footstep">
          </div> -->
          <div v-if="!isInstruksi2" class="instruksi instruksi2">
            <img :src="instruksiImg2" alt="instruksi" @click="fadeInstruksi('instruksi2')">
          </div>
          <div class="tv-popup">
            <TvPopup v-if="popups === 'tv' && slide === 2" @closePopup="popups = ''" />
          </div>
          <KinePopup v-if="popups === 'kine' && slide === 2" :tipe-karya="tipeKarya" @closePopup="popups = ''" />
          <NewfotoPopup v-if="popups === 'foto' && slide === 2" :tipe-karya="tipeKarya" class="foto-popup" />
          <PlaylistPopup v-if="popups === 'playlist' && slide === 2" @closePopup="popups = ''" />
          <!-- <div class="cont zine">
            <img src="/fear/f-zine-1.png" alt="zine" @mouseenter="handleObjChange($event)" @mouseout="handleObjChangeEnd($event)">
          </div> -->
        </div>
      </div>
    </div>
    <div class="sound-controller" @click="changeMute()">
      SOUND
    </div>
    <rcp />
  </div>
</template>

<script>
// --- keterangan tiap class
// top-cont: tempat perhitungan rasio
// canvas: kalau mau ada tooltip, taro disini
// canvas-hover: kalau mau ada efek hover kaya di moooi, taro sini
  const SCALE = 2
  const NEXT_ROOM = '/ruangan/sad'
  const CLOSING = '/ruangan/closing'
  import gsap from 'gsap'
  import rcp from '~/components/rcp.vue'
  import tvPopup from '~/components/tv-popup.vue'
  import kinePopup from "~/components/kine-popup.vue"
  import NewfotoPopup from '~/components/newfoto-popup.vue'
  import PodcastPopup from '~/components/podcast-popup.vue'
  import PlaylistPopup from '~/components/playlist-popup.vue'
  export default {
    name: "Fear",
    components: {
      rcp,
      tvPopup,
      kinePopup,
      NewfotoPopup,
      PodcastPopup,
      PlaylistPopup
    },
    layout: 'ruangan',
    data() {
      return {
        drag: false,
        mouseStart: {
          x: undefined,
          y: undefined // not used for now though
        },
        computedDisplacement: 0,
        transformed: 0,
        xBoundary: undefined,
        slide: 0,
        base: {
          slide0: -50,
          slide1: 50,
          slide2: 150
        },
        msg: {
          masuk: 'Apa yang bakal terjadi di hari besok? Bagaimana kalau yang terburuk yang terjadi? Rasa takut akan masa depan, apa yang akan terjadi tak jarang mendatangi kita.',
          keluar: 'Rasa takut, rasa tak yakin akhirnya berakhir dalam keputusasaan. Hilang harapan. Serasa tak punya kendali, tak tahu apa yang harus diperbuat. Rasanya, hanyalah bersedih yang bisa dilakukan. ',
          closings: [
            'Tapi sejujurnya, siapa yang tahu apa yang akan terjadi besok? Tak apa takut sebentar, tenang saja. Aku, kamu, bahkan semua orang merasakan hal yang sama.',
            'Ruang-ruang rasa telah dikunjungi. Tiap emosi telah dikenali. Rasa sudah dieksplorasi. Melalui eksplorasi rasa ini tiap perasaan tertuangkan menjadi suatu bentuk karya. Rasa-rasa ini pastinya tidak asing, tapi selalu ada ruang untuk eksplorasi. Rasa dapat berkembang, berubah, dan dibentuk menjadi suatu yang indah. ',
            'Akhir kata, semoga melalui ini, perasaan yang biasa kamu lalui dapat menjadi temanmu untuk berkarya. Dan semoga rasa sedih kamu di hari ini tidak berlarut-larut ya! (Terima kasih.)'
          ],
          closing: ''
        },
        benda: {
          saklar: false,
          sadako: 0,
          setanmini: 0,
          photobook1: 0,
          kunci: false,
          ouija: 0
        },
        popups: '',
        tipeKarya: '',
        audio: undefined,
        isAudioPlaying: false,
        isInstruksi1: false,
        isInstruksi2: true,
        instruksiImg1: '/instruksi/2.png',
        instruksiImg2: '/instruksi/3.png'
      }
    },
    computed: {
      sign() {
        return this.computedDisplacement >= 0 ? '+' : '-'
      }
    },
    watch: {
      slide(newVal, oldVal) {
        if (newVal === 2){
          gsap.to(this.base, {slide0: -250, slide1: -150, slide2: -50})
          this.isInstruksi2 = (localStorage.getItem('instruksi_3') || false)
          if (window.matchMedia("(orientation: portrait)").matches){
            this.instruksiImg2 = '/instruksi/3 hp.png'
          }
          if (!this.isInstruksi2){
            localStorage.setItem('instruksi_3', true)
          }
          if (oldVal > 2){
            gsap.to('.transitionfade-out', {x: '100%', duration: .5, delay: .2})
            gsap.to('.narasi', {opacity: 0, duration: .5})
          }
        } else if (newVal === 1){
          gsap.to(this.base, {slide0: -150, slide1: -50, slide2: 50})
          if (oldVal === 0)
            gsap.to('.transitionfade-in', {x: '-100%', duration: .7, delay: .2})
        } else if (newVal === 0){
          gsap.to(this.base, {slide0: -50, slide1: 50, slide2: 150})
          if (oldVal === 1)
            gsap.to('.transitionfade-in', {x: '0', duration: .7, delay: .2})
        } else {
          gsap.to(this.base, {duration: 3, ease: 'none' ,slide0: -350, slide1: -250, slide2: -150})
          gsap.to('.transitionfade-out', {x: '40%', duration: .7})
          gsap.to('.transitionfade-out', {x: '0', duration: 1.3, ease: 'none', delay: .7})
          if (this.isClosingVisited()){
            this.$router.push({path: CLOSING})
          }
          if (this.isAllRoomVisited()){
            // animasi closing
            document.getElementsByClassName('narasi-closing')[0].style.display = 'block'
            this.msg.closing = this.msg.closings[0]
            gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 2})
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 10, onComplete: () =>{
              this.msg.closing = this.msg.closings[1]
            }})
            gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 10.5})
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 25, onComplete: () => {
              this.msg.closing = this.msg.closings[2]
            }})
            gsap.to('.narasi-closing', {opacity: 1, duration: 1, delay: 25.5})
            gsap.to('.narasi-closing', {opacity: 0, duration: .5, delay: 35, onComplete: () => {
              this.$router.push({path: CLOSING})
            }})
          } else {
            // animasi keluar
            document.getElementsByClassName('narasi-keluar')[0].style.display = 'block'
            gsap.to('.narasi-keluar', {opacity: 1, duration: 2, delay: 2})
            document.getElementsByClassName('loading')[0].style.display = 'block'
            gsap.to('.loading', {opacity: 1, duration: 1, delay: 12, onComplete: () => {
              this.$router.push({path: NEXT_ROOM})
            }})
          }
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
      gsap.to(this.audio, {volume: 0, duration: .3, onComplete: () => {
        this.audio.pause()
        this.audio.currentTime = 0
      }})
    },
    mounted () {
      this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
      window.addEventListener("resize", this.handleResize)
      document.onkeyup = this.handleKeyboard
      
      // wait for loading to finish
      //animasi masuk
      if (this.isAllRoomVisited() || this.isRoomVisited()){
        gsap.to('.loading', {opacity: 0, delay: 1, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          localStorage.setItem('fear', true)
          // TODO: Add on enter animation here
          this.slide = 1
        }})
      } else {
        document.getElementsByClassName('narasi-masuk')[0].style.display = 'block'
        gsap.to('.narasi-masuk', {opacity: 1,  duration: .5})
        gsap.to('.narasi-masuk', {opacity: 0, delay: 5, duration: .5})
        gsap.to('.loading', {opacity: 0, delay: 5, duration: .2, onComplete: () => {
          document.getElementsByClassName('loading')[0].style.display = 'none'
          document.getElementsByClassName('narasi-masuk')[0].style.display = 'none'
          localStorage.setItem('fear', true)
          // TODO: Add on enter animation here
          this.slide = 1
        }})
      }
      setTimeout(() => {
        this.preloadImages()
      }, 1000)
      localStorage.setItem('last', this.$route.path)
      this.audio = new Audio('/songs/fear.mp3')
      this.audio.volume = 0.4
      this.audio.loop = true
      this.playAudio()
      this.isInstruksi1 = (localStorage.getItem('instruksi_2') || false)
      if (window.matchMedia("(orientation: portrait)").matches){
        this.instruksiImg1 = '/instruksi/2 hp.png'
      }
      if (!this.isInstruksi1){
        localStorage.setItem('instruksi_2', true)
      }
    },
    methods: {
      resetGif() {
        // var img = document.getElementById("foot-out")
        // var imageUrl = img.getAttribute("src")
        // img.setAttribute("src", "#")
        // img.setAttribute("src", imageUrl)
      },
      fadeInstruksi(classname){
        gsap.to('.'+classname, {opacity: 0, duration: 1, onComplete: () => {
          document.getElementsByClassName(classname)[0].style.display = 'none'
        }})
      },
      switchSlide(val){
        this.slide += val
        gsap.to(this.$data, {computedDisplacement: 0, transformed: 0})
      },
      preloadImages(){
        new Image().src = '/fear/fear1.png'
        new Image().src = '/fear/f-artikel-2.png'
        new Image().src = '/fear/kucing 2.png'
        new Image().src = '/fear/fokripi 1.png'
        new Image().src = '/fear/f-radio-2.png'
        new Image().src = '/fear/f-single-2.png'
        new Image().src = '/fear/f-photoseries-2.png'
        new Image().src = '/fear/f-zine-2.png'
        new Image().src = '/fear/monster2 1.png'
      },
      handleRasyid(){
        localStorage.setItem('before_instalasi', this.$route.path)
        this.$router.push({path: '/karya/instalasi/bandung'})
      },
      isAllRoomVisited(){
        return localStorage.getItem('joy') && localStorage.getItem('fear') && localStorage.getItem('sad') && localStorage.getItem('anger')
      },
      isRoomVisited(){
        return localStorage.getItem('fear')
      },
      isClosingVisited(){
        return localStorage.getItem('closing')
      },
      startDrag(e) {
        if (window.matchMedia("(orientation: portrait)").matches){
          // enable dragging and keep mouseStart point
          let interaction = this.determineInteraction(e)
          this.drag = true
          this.mouseStart.x = interaction.clientX
          this.mouseStart.y = interaction.clientY
        }
      },
      dragContainer(e){
        // if dragging, calculate target position and tween to that position
        if (this.drag){
          let interaction = this.determineInteraction(e)
          let targetDisplacement = this.clamp(interaction.clientX - this.mouseStart.x + this.transformed, this.xBoundary/(2*SCALE), -this.xBoundary/(2*SCALE))
          gsap.to(this.$data, {computedDisplacement: targetDisplacement})
        }
      },
      endDrag(e){
        // if mouse click released or out of window while dragging, disable dragging,
        // calculate target end position and tween, keep last transformation position, and delete mouseStart (optional)
        if (this.drag){
          let interaction = this.determineInteraction(e)
          this.drag = false
          let targetDisplacement = this.clamp(interaction.clientX - this.mouseStart.x + this.transformed, this.xBoundary/(2*SCALE), -this.xBoundary/(2*SCALE))
          this.transformed = targetDisplacement
          gsap.to(this.$data, {computedDisplacement: targetDisplacement})
          this.mouseStart.x = undefined
          this.mouseStart.y = undefined
        }
      },
      clamp(attribute, max, min){
        return Math.min(max, Math.max(min, attribute))
      },
      determineInteraction(e){
        let interaction = e
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
            interaction = evt.touches[0] || evt.changedTouches[0]
        }
        return interaction
      },
      handleResize(){
        if (document.getElementsByClassName("top-cont")[0]){
          this.xBoundary = document.getElementsByClassName("top-cont")[0].clientWidth
          if (window.matchMedia("(orientation: landscape)").matches){
            this.computedDisplacement = 0
            this.transformed = 0
          }
        }
      },
      handleKeyboard(e){
        // DEBUGGING PURPOSE
        // if (this.slide === 2 && e.key === "ArrowRight"){
        //   this.switchSlide(1)
        // }



        if (this.slide === 2 && e.key === "ArrowLeft"){
          this.switchSlide(-1)
        } else if (this.slide === 1 && e.key === "ArrowRight"){
          this.switchSlide(1)
        }
      },
      handleObjChange(e){
        // console.log(e)
        if (e.target.getAttribute('src') === "/fear/fohepi 1.png"){
          e.target.setAttribute('src', "/fear/fokripi 1.png")
        } else if (e.target.getAttribute('src') === "/fear/monster1 1.png"){
          e.target.setAttribute('src', "/fear/monster2 1.png")
        } else if (e.target.getAttribute('src') === "/fear/f-radio-1.png"){
          e.target.setAttribute('src', "/fear/f-radio-2.png")
        } else if (e.target.getAttribute('src') === "/fear/f-single-1.png"){
          e.target.setAttribute('src', "/fear/f-single-2.png")
        } else if (e.target.getAttribute('src') === "/fear/f-photoseries-1.png"){
          e.target.setAttribute('src', "/fear/f-photoseries-2.png")
        } else if (e.target.getAttribute('src') === "/fear/f-artikel-1.png"){
          e.target.setAttribute('src', "/fear/f-artikel-2.png")
        }  else if (e.target.getAttribute('src') === "/fear/f-zine-1.png"){
          e.target.setAttribute('src', "/fear/f-zine-2.png")
        } else if (e.target.getAttribute('src') === "/fear/KUCING.png"){
          e.target.setAttribute('src', "/fear/kucing 2.png")
        }
      },
      handleObjChangeEnd(e){
        // console.log(e)
        if (e.target.getAttribute('src') === "/fear/fokripi 1.png"){
          e.target.setAttribute('src', "/fear/fohepi 1.png")
        } else if (e.target.getAttribute('src') === "/fear/monster2 1.png"){
          e.target.setAttribute('src', "/fear/monster1 1.png")
        } else if (e.target.getAttribute('src') === "/fear/f-radio-2.png"){
          e.target.setAttribute('src', "/fear/f-radio-1.png")
        } else if (e.target.getAttribute('src') === "/fear/f-single-2.png"){
          e.target.setAttribute('src', "/fear/f-single-1.png")
        } else if (e.target.getAttribute('src') === "/fear/f-photoseries-2.png"){
          e.target.setAttribute('src', "/fear/f-photoseries-1.png")
        } else if (e.target.getAttribute('src') === "/fear/f-artikel-2.png"){
          e.target.setAttribute('src', "/fear/f-artikel-1.png")
        }  else if (e.target.getAttribute('src') === "/fear/f-zine-2.png"){
          e.target.setAttribute('src', "/fear/f-zine-1.png")
        } else if (e.target.getAttribute('src') === "/fear/kucing 2.png"){
          e.target.setAttribute('src', "/fear/KUCING.png")
        }
      },
      toggleSaklar(){
        this.benda.saklar = !this.benda.saklar
      },
      toggleKunci(){
        this.benda.kunci = !this.benda.kunci
      },
      changeMute() {
        this.audio.muted = !this.audio.muted
        if (this.audio.muted == true) {
          document.getElementsByClassName(
            "sound-controller"
          )[0].style.textDecoration = "line-through"
        } else {
          document.getElementsByClassName(
            "sound-controller"
          )[0].style.textDecoration = "none"
        }
        if (!this.isAudioPlaying) {
          this.playAudio()
        }
      },
      playAudio(){
        let startPlayPromise = this.audio.play()
        this.isAudioPlaying = true
        if (startPlayPromise !== undefined) {
          startPlayPromise.then(() => {
            // Yaudah biarin aja dia ngeplay
          }).catch(() => {
            this.isAudioPlaying = false
            this.audio.muted = true
            document.getElementsByClassName(
              "sound-controller"
            )[0].style.textDecoration = "line-through"
              })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.main {
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.top-cont {
  background-color: black;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 56.25%;
  @media only screen and (orientation: portrait) {
    width: 225%;
    padding-bottom: 126.5625%;
  }
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .arrow {
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 100px;
    color: rgba($color: white, $alpha: 0.2);
    transition: color 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      color: rgba($color: white, $alpha: 0.8);
    }
    &:active {
      color: rgba($color: white, $alpha: 1.0);
    }
    @media only screen and (max-width: 600px) {
      font-size: 70px;
    }
    @media only screen and (max-width: 450px) {
      font-size: 50px;
    }
  }
  .right-arrow {
    right: 20px;
  }
  .left-arrow {
    left: 20px;
  }
}

.narasi {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 80vw;
  transform: translate(-50%,0);
  z-index: 99;
  font-family: 'Mechanical Pencil';
  font-size: 50px;
  color: rgba($color: white, $alpha: .9);
  // background-image: linear-gradient(to right, rgba($color: white, $alpha: .1), transparent);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent; 
  // -moz-background-clip: text;
  // -moz-text-fill-color: transparent;
  opacity: 0;
  text-align: center;
}

.narasi-masuk {
  z-index: 10000;
  color: #009562;
}

.narasi-closing {
  font-size: 40px;
  z-index: 10000;
  color: #ede5d1;
}

.narasi-keluar {
  font-size: 40px;
  color: #305fe9;
}

.cont {
  position: absolute;
  line-height: 0;
  user-select: none;
  img {
    line-height: 0;
    width: 100%;
  }
}

.guide {
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 50;
}

.transitionfade-in {
  background: linear-gradient(to right, black, black, transparent);
  width: 60vw;
  height: 200vh;
  top: -50%;
  left: -5%;
  z-index: 999;
}
.transitionfade-out {
  background: linear-gradient(to left, black, black, transparent);
  width: 60vw;
  height: 200vh;
  z-index: 999;
  top: -50%;
  right: 0;
  transform: translate(100%, 0);
}

.center-anchor {
  transform: translate(-50%,-50%);
}

.wall {
  width: 100%;
  top: -67%;
  left: 0;
}

.floor {
  width: 100%;
  top: 70.5%;
  left: 0;
}

.pintu {
  width: 27%;
  top: 14.4%;
  left: 3.4%;
}

.trap-door{
  background-image:url("/fear/monster1 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 17.4%;
  top: 74.7%;
  left: 9.6%;
  z-index: 71;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.trap-door:hover{
  background-image:url("/fear/monster2 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 17.4%;
  top: 74.7%;
  left: 9.6%;
  z-index: 71;
  cursor:pointer;
  animation: none;
}

.tv{
  background-image: url("/fear/tv.gif");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17.2%;
  top: 32%;
  left: 36.2%; 
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.tv:hover {
  background-image: url("/fear/tv.gif");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 17.2%;
  top: 32%;
  left: 36.2%; 
  cursor: pointer;
  animation: none;
}


.sadako {
  width: 15.8%;
  top: 43.3%;
  left: 35.5%;
  z-index: 71;
}

.sofa {
  width: 20%;
  top: 35%;
  left: 57.6%;
}

.ventilasi {
  width: 18%;
  top: 5.7%;
  left: 49%;
}


.zine{
  background-image:url("/fear/f-zine-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 10%;
  top: 40.7%;
  left: 54%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.zine:hover{
  background-image:url("/fear/f-zine-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 10%;
  top: 40.7%;
  left: 54%;
  cursor:pointer;
  animation: none;
}

.photoseries{
  background-image:url("/fear/f-photoseries-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 14%;
  top: 12.7%;
  left: 32%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.kamera{
  background-image:url("/fear/f-single-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:15%;
  width: 10%;
  top: 24.7%;
  left: 51%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.kamera:hover{
  background-image:url("/fear/f-single-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:15%;
  width: 10%;
  top: 24.7%;
  left: 51%;
  cursor:pointer;
  animation: none;
}


.teropong{
  background-image:url("/fear/tropong fear.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 13.5%;
  top: 51%;
  left: 73.8%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.teropong:hover{
  background-image:url("/fear/tropong fear.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 13.5%;
  top: 51%;
  left: 73.8%;
  cursor:pointer;
  animation: none;
}

.radio{
  background-image:url("/fear/f-radio-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:15%;
  width: 18%;
  top: 9%;
  left: 69%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.radio:hover{
  background-image:url("/fear/f-radio-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:15%;
  width: 18%;
  top: 9%;
  left: 69%;
  cursor:pointer;
  animation: none;
}

.foto {
  background-image:url("/fear/fohepi 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:19%;
  width: 13.2%;
  top: 13%;
  left: 79.5%;
  z-index: 71;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.foto:hover {
  background-image:url("/fear/fokripi 1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:17%;
  width: 12.2%;
  top: 13%;
  left: 79.5%;
  z-index: 71;
  cursor:pointer;
  animation: none;
}

.tikus1 {
  width: 14.1%;
  top: 72.3%;
  left: 65.2%;
}

.tikus2 {
  width: 13%;
  top: 70.8%;
  left: 87%;
}

.box {
  width: 20.5%;
  top: 43.7%;
  left: 79%;
}

.bat {
  width: 10.5%;
  top: -7.2%;
  left: 25.8%;
}

.pipa-l {
  width: 55%;
  top: -116%;
  left: -4%;
}

.hantu1 {
  width: 8.7%;
  top: 39%;
  left: 85%;
  z-index: 71;
}

.tangga {
  width: 31.5%;
  top: 1.1%;
  left: 0;
}

.dinding-robek {
  width: 7.8%;
  top: 6%;
  left: 25%;
}

.mesin-cuci {
  width: 18.7%;
  top: 43.5%;
  left: 29.5%;
}

.rak-broken {
  width: 17.8%;
  top: 27.7%;
  left: 48.7%;
}

.kucing{
  background-image:url("/fear/KUCING.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 8.8%;
  top: 63.7%;
  left: 52.7%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.kucing:hover{
  background-image:url("/fear/kucing 2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 8.8%;
  top: 63.7%;
  left: 52.7%;
  cursor:pointer;
  animation: none;
}

.lemari {
  width: 17.2%;
  top: 21.3%;
  left: 68.5%;
}

.pel {
  width: 12.4%;
  top: 29.8%;
  left: 87%;
}

.pipa {
  width: 12%;
  top: -71%;
  left: 91.8%;
}

.bochor {
  width: 35.5%;
  top: 67%;
  left: 64.5%;
}

.web {
  width: 10%;
  top: -14.5%;
  left: 86.5%;
}

.saklar {
  width: 4%;
  top: 36%;
  left: 86.5%;
  z-index: 71;
  &:hover{
    cursor: pointer;
  }
}

.lampu {
  width: 16%;
  top: -36.8%;
  left: 41.2%;
}

.darkness {
  background-color: black;
  opacity: .8;
  z-index: 70;
  width: 150%;
  height: 200%;
  top: -50%;
}

.artikel{
  background-image:url("/fear/f-artikel-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 7%;
  top: 13.8%;
  left: 38.2%;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.artikel:hover{
  background-image:url("/fear/f-artikel-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 7%;
  top: 13.8%;
  left: 38.2%;
  cursor:pointer;
  animation: none;
}

// .photobook{
//   width: 26%;
//   top: 76.8%;
//   left: 37.2%;
//   z-index: 71;
//   &:hover {
//     cursor: pointer;
//   }
// }

.photobook{
  background-image:url("/fear/f-photobook-1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:25%;
  width: 26%;
  top: 76.8%;
  left: 37.2%;
  z-index: 71;
  cursor:pointer;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;
}

.photobook1{
  background-image:url("/fear/f-photobook-2.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  height:35%;
  width: 13%;
  top: 53.8%;
  left: 47.2%;
  z-index: 71;
  opacity: 0;
}

.photobook:hover + .photobook1{
  opacity : 1;
  animation: none;
}

.photobook:hover{
  animation: none;
}

// .photobook1{
//   width: 13%;
//   top: 53.8%;
//   left: 47.2%;
//   z-index: 71;
// }

// .zine{
//   width: 16%;
//   top: 36.8%;
//   left: 41.2%;
// }

.playlist{
  background-image: url("/fear/playlist-fear.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 45%;
  left: 64.5%;
  cursor: pointer;
  animation: bounce-7 2s;
  animation-iteration-count: infinite;
}

.playlist:hover {
  background-image: url("/fear/playlist-fear.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 65%;
  width: 8%;
  top: 45%;
  left: 64.5%;
  cursor: pointer;
  animation: none;
}

.kaki{
  background-image:url("/fear/fearf.gif");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute; 
  width:10%;
  height:10%;
  top:83%;
  left:89%;
}

.foot-in {
  position: absolute;
  width: 100vw;
  top: 75%;
  left: 45%;
  z-index: 20000;
}

.foot-out {
  position: absolute;
  width: 100vw;
  top: 75%;
  left: 90%;
  z-index: 20000;
}

.kunci{
  background-image:url("/fear/fear1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 8%;
  height: 8%;
  top: 81%;
  left: 83%;
  cursor:pointer;
  z-index: 15001;
  animation:bounce-7 2s;
  animation-iteration-count: infinite;    
}

.kunci:hover{
  background-image:url("/fear/fear1.png");
  background-size:contain;
  background-repeat:no-repeat;
  position:absolute;
  width: 8%;
  height:8%;
  top: 81%;
  left: 83%;
  cursor:pointer;
  animation:none;
}
.bounce-7 {
  animation-name: bounce-7;
  animation-timing-function: cubic-bezier(0.140, 0.420, 0.210, 0.5, 1);
}
@keyframes bounce-7 {
  0%   { transform: scale(1,1)      translateY(0); }
  5%  { transform: scale(1.1,.9)   translateY(0); }
  15%  { transform: scale(.9,1.1)   translateY(-10px); }
  25%  { transform: scale(1.05,.95) translateY(0); }
  28.5%  { transform: scale(1,1)      translateY(-7px); }
  32%  { transform: scale(1,1)      translateY(0); }
  50% { transform: scale(1,1)      translateY(0); }
  100% { transform:scale(1,1) translateY(0);}
}

.tv-popup {
  position: absolute;
  top: 4%;
  left: 0;
  height: 150vh;
}

.foto-popup {
  z-index: 71;
}

.sound-controller {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-family: "KG Happy Solid";
  font-size: 40px;
  color: whitesmoke;
  opacity: 0.2;
  transition: opacity .4s;
}
.sound-controller:hover {
  cursor: pointer;
  opacity: 0.8;
}
.instruksi {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 300vh;
  background-color: rgba($color: black, $alpha: .9);
  z-index: 15000;
  img {
    width: 100%;
    height: 100%;
    transform: scale(0.4);
    object-fit: contain;
  }
}
</style>