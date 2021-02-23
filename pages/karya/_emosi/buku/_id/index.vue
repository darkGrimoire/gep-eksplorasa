<template>
  <div class="container">
    <div v-if="!isPhone" class="zoom-icon zoom-icon-in" />

    <div v-if="isPhone" v-show="fs" class="reader-bg" />
    <div v-show="!isPhone" class="blackbg" />

    <div class="book-viewport">
      <div class="book-container">
        <div id="album" class="book">
          <div v-if="!isPhone" ignore="1" class="next-button" @click="turnNext" />
          <div v-if="!isPhone" ignore="1" class="previous-button" @click="turnPrevious" />
        </div>
      </div>
      <Loading v-show="isLoading" ignore="1" class="loading" />
    </div>

    <div v-if="isPhone" v-show="fs" ignore="1" class="next-button-mobile button" @click="turnNext">
      <fa :icon="['fas', 'chevron-right']" />
    </div>
    <div v-if="isPhone" v-show="fs" ignore="1" class="previous-button-mobile button" @click="turnPrevious">
      <fa :icon="['fas', 'chevron-left']" />
    </div>
    <div v-if="isPhone" v-show="fs" ignore="1" class="exit-button-mobile button" @click="triggerfs">
      <fa :icon="['fas', 'times']" /> Close
    </div>

    <div v-if="isPhone" v-show="!fs" class="read-button-mobile button" @click="triggerfs">
      <fa :icon="['fas', 'book-open']" /> Read
    </div>
    <div v-if="!isPhone" class="bottom">
      <div id="slider-bar" class="turnjs-slider">
        <div id="slider" />
      </div>
    </div>
    <div class="title-container">
      <div class="title">
        {{ dataKarya.judul }}
      </div>
      <div class="author">
        {{ dataKarya.author }}
      </div>
    </div>
    <div v-show="dataKarya.caption !== ''" class="caption-container">
      <div class="title">
        {{ dataKarya.captionTitle }}
      </div>
      <p class="deskripsi">
        {{ dataKarya.caption }}
      </p>
    </div>
    <nuxt-link v-show="!fs" class="back-button" :to="'/ruangan/'+emosi">
      Back
    </nuxt-link>
    <rcp />
  </div>
</template>

<script>
// import gsap from 'gsap'
import rcp from '~/components/rcp.vue'
import Loading from '~/components/Loading.vue'
if (process.client){
  require('~/assets/turnjs4/lib/turn')
  require('~/assets/turnjs4/lib/zoom')
  require('~/assets/turnjs4/lib/hash')
}
/* eslint no-undef: 0 */
const PAGE_WIDTH = 500
const PAGE_HEIGHT = 650
const TARGET_ZOOM_WIDTH = 3000

  export default {
    name: "TemplateBuku",
    components: {
      rcp,
      Loading
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
          photos: [],
          caption: '',
          author: '',
          metadata: {},
          preview: {},
          is_scissor: false,
          display: {}
        },
        isLoading: true,
        options: {
          width: 500*2,
          height: 500/(PAGE_WIDTH/PAGE_HEIGHT),
          duration: 500,
          gradients: true,
          autoCenter: true,
          elevation: 50,
          pages: 12,
        },
        selector: "#album",
        currentPage: undefined,
        isPhone: false,
        fs: false,
        isjQueryLoaded: false,
        isUiLoaded: false
      }
    },
    beforeDestroy () {
      if (this.isPhone){
        this.destroyPhoneHandler()
      }
      Hash.stop()
    },
    mounted () {
      const karyaRef = this.$fire.firestore.collection('katalog').doc('metadata')
      karyaRef.get()
        .then(doc => {
          let data = {id: doc.id, ...doc.data()}
          this.dataKarya.judul = data.judul
          this.dataKarya.author = data.author
          this.dataKarya.caption = this.handleNewLines(data.caption)
          this.dataKarya.photos = (data.photos || data.photo)
          this.dataKarya.metadata = data.metadata
          this.dataKarya.preview = data.preview
          this.dataKarya.is_scissor = data.is_scissor
          this.dataKarya.disable_min = data.disable_min
          this.dataKarya.display = data.display
          this.dataKarya.next = data.next
          this.dataKarya.prev = data.prev
          this.isLoading = false
          
          // if (this.dataKarya.caption !== ""){
          //   this.options.autoCenter = false
          // }
          this.options.display = (this.dataKarya.display.page || "double")
          this.defaultWidth = this.dataKarya.display.orientation === 'portrait' ? 500 : 700
          this.options.pages = this.dataKarya.photos.length
          this.dataKarya.metadata.zoomed_width = (this.dataKarya.metadata.zoomed_width || TARGET_ZOOM_WIDTH)
          this.defaultScale = this.dataKarya.display.orientation === 'portrait' ? 3 : 2.5
          if (this.options.display === "double"){
            this.options.width = (this.dataKarya.metadata.target_width || this.defaultWidth)*2
            this.options.height = (this.options.width/2)/(this.dataKarya.metadata.ori_width/this.dataKarya.metadata.ori_height)
          } else {
            // pasti ini karya rasyid .-.
            this.defaultScale = 1.5
            this.defaultWidth = 1000
            this.options.width = (this.dataKarya.metadata.target_width || this.defaultWidth)
            this.options.height = (this.options.width)/(this.dataKarya.metadata.ori_width/this.dataKarya.metadata.ori_height)
          }

          this.fs = document.fullscreenElement
          setTimeout(() => {
            this.initjQuery()
          }, 20)
        })
        .catch((err) => {
          console.log(err)
          this.$router.push({path: '/ruangan/' + this.emosi})
        })
    },
    methods: {
      initjQuery(){
        if (window.$){
            this.initialization()
        } else{
          setTimeout(() => {
            this.initjQuery()
          }, 50)
        }
      },
      initialization(){
        this.options.when = {
          turning: (event, page) => {
            var book = $(this.selector)
            this.currentPage = book.turn('page')
            book.turn('pages')
            Hash.go('page/' + page).update()
            this.disableControls(page)
          },
          turned: (event, page) => {
            this.disableControls(page)
            $(this.selector).turn('center')
            if (!this.isPhone && $('#slider').slider('instance')){
              $('#slider').slider('value', this.getViewNumber($(this.selector), page))
            }
            if (page==1) { 
              $(this.selector).turn('peel', 'br')
            }
          },
          missing: (event, pages) => {
            this.isLoading = true
            for (var i = 0; i < pages.length; i++)
              this.addPage(pages[i], $(this.selector))
            this.isLoading = false
          },
        }
        if (window.matchMedia("(orientation: portrait)").matches){
          this.isPhone = true
          this.defaultScale = this.dataKarya.display.orientation === 'portrait' ? 3 : 4
          this.defaultWidth = this.dataKarya.display.orientation === 'portrait' ? screen.width * 0.8 : screen.width * 0.9
          this.options.width = this.defaultWidth
          this.options.height = (this.options.width)/(this.dataKarya.metadata.ori_width/this.dataKarya.metadata.ori_height)
          this.options.display = "single"

          this.initializePhoneHandler()
        }
        let flipbook = $(this.selector)
        flipbook.turn(this.options)
        
        this.initializeZoom()
        if (!this.isPhone){
          this.initializeBinding()
          this.initializeSlider()
        }
        this.initializeHash()

        if (this.isPhone && !this.fs){
          $('.previous-button-mobile').hide()
          $('.next-button-mobile').hide()
        }

        this.resizeViewport()
        $(this.selector).addClass('animated')
        $('.blackbg').fadeOut()
        if (this.dataKarya.display.orientation === "landscape"){
          if (this.isPhone){
            if (screen.width > 600){
              document.getElementsByClassName('title-container')[0].style.marginTop = '-30%'
            }else{
              document.getElementsByClassName('title-container')[0].style.marginTop = '-40%'
            }
          }else{
            document.getElementsByClassName('bottom')[0].style.bottom = '13%'
            document.getElementsByClassName('title-container')[0].style.marginTop = '-7%'
          }
        }
        if (this.dataKarya.caption === ""){
          document.getElementsByClassName('title-container')[0].style.marginBottom = '5%'
        }
      },
      initializePhoneHandler(){
        document.addEventListener("fullscreenchange", this.changefs)
        document.addEventListener("mozfullscreenchange", this.changefs)
        document.addEventListener("webkitfullscreenchange", this.changefs)
        document.addEventListener("msfullscreenchange", this.changefs)
      },
      destroyPhoneHandler(){
        document.removeEventListener("fullscreenchange", this.changefs)
        document.removeEventListener("mozfullscreenchange", this.changefs)
        document.removeEventListener("webkitfullscreenchange", this.changefs)
        document.removeEventListener("msfullscreenchange", this.changefs)
      },
      changefs() {
        this.fs = !this.fs
      },
      triggerfs(){
        let elem = document.documentElement
          if(!this.fs) {
            //$("#tes").attr("style", "background-image: url(\"/img/uc-bg.png\");")
            if (elem.requestFullscreen) {
                elem.requestFullscreen()
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen()
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen()
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem = window.top.document.body //To break out of frame in IE
                elem.msRequestFullscreen()
            }
            $('.title-container').fadeOut()
            $('.caption-container').fadeOut()
            document.getElementsByClassName('container')[0].style.overflowY = 'hidden'
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen()
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
              window.top.document.msExitFullscreen()
            }
            $('.title-container').fadeIn()
            $('.caption-container').fadeIn()
            document.getElementsByClassName('container')[0].style.overflowY = 'auto'
          }
      },
      initializeZoom(){
        $('.book-viewport').zoom({
        flipbook: $(this.selector),
        max: () => { 
          return this.largeMagazineWidth()/$(this.selector).width()
        }, 
        when: {
          swipeLeft: () => {
            $(this.selector).turn('next')
          },
          swipeRight: () => {
            $(this.selector).turn('previous')
          },
          resize: (event, scale, page, pageElement) => {
            if (scale==1)
              this.loadSmallPage(page, pageElement)
            else
              this.loadLargePage(page, pageElement)
          },
          zoomIn: () => {
            this.toggleControls(false)
            $('#slider-bar').fadeOut()
            $('.back-button').fadeOut()
            $('.blackbg').fadeIn()
            $('.made').hide()
            $(this.selector).removeClass('animated').addClass('zoom-in')
            $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out')
            if (!$.isTouch) {
              $('<div />', {'class': 'exit-message'}).
                html('<div>Press ESC to exit</div>').
                  appendTo($('body')).
                  delay(2000).
                  animate({opacity:0}, 500, function() {
                    $(this).remove()
                  })
            }
          },
          zoomOut: () => {
            this.toggleControls(true)
            $('#slider-bar').fadeIn()
            $('.back-button').fadeIn()
            $('.blackbg').fadeOut()
            $('.exit-message').hide()
            $('.made').fadeIn()
            $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in')
            setTimeout(() => {
              $(this.selector).addClass('animated').removeClass('zoom-in')
              this.resizeViewport()
            }, 0)
          }
        }
      })
      if ($.isTouch)
        $('.book-viewport').bind('zoom.doubleTap', this.zoomTo)
      else
        $('.book-viewport').bind('zoom.tap', this.zoomTo)
      $(document).keydown(e =>{
        var previous = 37, next = 39, esc = 27
        switch (e.keyCode) {
          case previous:
            $(this.selector).turn('previous')
            e.preventDefault()
          break
          case next:
            $(this.selector).turn('next')
            e.preventDefault()
          break
          case esc:
            $('.book-viewport').zoom('zoomOut')	
            e.preventDefault()
          break
        }
      })
      },
      initializeHash(){
        Hash.on('^page\\/([0-9]*)$', {
        yep: (path, parts) => {
          var page = parts[1]
          if (page!==undefined) {
            if ($(this.selector).turn('is')){
              $(this.selector).turn('page', page)
              this.currentPage = page
            }
          }
        },
        nop: () => {
          if ($(this.selector).turn('is')){
            $(this.selector).turn('page', 1)
            this.currentPage = 1
          }
        }
      })
      },
      initializeBinding(){
      // events for resizing and responsiveness
        $(window).resize(() => {
          this.resizeViewport()
        }).bind('orientationchange', () => {
          this.resizeViewport()
        })
        // events for zoom icon
        $('.zoom-icon').bind('mouseover', function() { 
          if ($(this).hasClass('zoom-icon-in'))
            $(this).addClass('zoom-icon-in-hover')
          if ($(this).hasClass('zoom-icon-out'))
            $(this).addClass('zoom-icon-out-hover')
        }).bind('mouseout', function() { 
          if ($(this).hasClass('zoom-icon-in'))
            $(this).removeClass('zoom-icon-in-hover')
          if ($(this).hasClass('zoom-icon-out'))
            $(this).removeClass('zoom-icon-out-hover')
        }).bind('click', function() {
          if ($(this).hasClass('zoom-icon-in'))
            $('.book-viewport').zoom('zoomIn')
          else if ($(this).hasClass('zoom-icon-out'))	
            $('.book-viewport').zoom('zoomOut')
        })
        // Events for the next button
        $('.next-button').bind($.mouseEvents.over, function() {
          $(this).addClass('next-button-hover')
        }).bind($.mouseEvents.out, function() {
          $(this).removeClass('next-button-hover')
        }).bind($.mouseEvents.down, function() {
          $(this).addClass('next-button-down')
        }).bind($.mouseEvents.up, function() {
          $(this).removeClass('next-button-down')
        })
        // Events for the previous button
        $('.previous-button').bind($.mouseEvents.over, function() {
          $(this).addClass('previous-button-hover')
        }).bind($.mouseEvents.out, function() {
          $(this).removeClass('previous-button-hover')
        }).bind($.mouseEvents.down, function() {
          $(this).addClass('previous-button-down')
        }).bind($.mouseEvents.up, function() {
          $(this).removeClass('previous-button-down')
        })
      },
      initializeSlider(){
        let vm = this
        $( "#slider" ).slider({
          min: 1,
          max: this.numberOfViews($(this.selector)),
          start: (event, ui) => {
            // console.log(window._thumbPreview)
            if (!window._thumbPreview) {
              window._thumbPreview = $('<div />', {'class': 'thumbnail'}).html('<div></div>')
              this.setPreview(ui.value)
              window._thumbPreview.appendTo($(ui.handle))
            } else
              this.setPreview(ui.value)
            this.moveBar(false)
          },
          slide: (event, ui) => {
            this.setPreview(ui.value)
          },
          stop: function() {
            // console.log(window._thumbPreview)
            if (window._thumbPreview)
              window._thumbPreview.removeClass('show')
            if ($(vm.selector).turn('display') === "double"){
              $(vm.selector).turn('page', Math.max(1, $(this).slider('value')*2 - 2))
            } else {
              $(vm.selector).turn('page', Math.max(1, $(this).slider('value')))
            }
          }
        })
      },
      addPage(page, book) {
        // console.log(`width: ${this.options.width}px; height: ${this.options.height}`)
        var element = $('<div />', {})
        if (book.turn('addPage', element, page)) {
          element.html('<div class="gradient"></div><div class="loader"></div>')
          this.loadPage(page, element)
        }
      },
      loadPage(page, pageElement) {
        var img = $('<img />')
        img.mousedown(e => {
          e.preventDefault()
        })
        img.on('load', function() {
          $(this).css({width: '100%', height: '100%'})
          $(this).appendTo(pageElement)
          pageElement.find('.loader').remove()
        })
        // src = this.getFirebaseURL(page)
        if (this.dataKarya.disable_min){
          img.attr('src', this.dataKarya.photos[page-1]) // img.attr('src', src)
        }else {
          img.attr('src', this.getMin(this.dataKarya.photos[page-1])) // img.attr('src', src)
        }
      },
      zoomTo(event) {
        setTimeout(() => {
          if ($('.book-viewport').zoom('value')==1) {
            $('.book-viewport').zoom('zoomIn', event)
          } else {
            $('.book-viewport').zoom('zoomOut')
          }
        }, 1)
      },
      disableControls(page) {
        if (page==1){
          $('.previous-button').hide()
          $('.previous-button-mobile').hide()
        }
        else{
          $('.previous-button').show()
          $('.previous-button-mobile').show()
        }
        if (page==$(this.selector).turn('pages')){
          $('.next-button').hide()
          $('.next-button-mobile').hide()
        }
        else{
          $('.next-button').show()
          $('.next-button-mobile').show()
        }
      },
      toggleControls(val){
        if (val){
          $('.previous-button').show()
          $('.previous-button-mobile').show()
          $('.next-button').show()
          $('.next-button-mobile').show()
          $('.exit-button-mobile').show()
        } else{
          $('.previous-button').hide()
          $('.previous-button-mobile').hide()
          $('.next-button').hide()
          $('.next-button-mobile').hide()
          $('.exit-button-mobile').hide()
        }
      },
      resizeViewport() {
        var width = $(window).width(),
          height = $(window).height(),
          options = $(this.selector).turn('options')
        $(this.selector).removeClass('animated')
        $('.book-viewport').css({
          width: width,
          height: height
        }).
        zoom('resize')
        if ($(this.selector).turn('zoom')==1) {
          var bound = this.calculateBound({
            width: options.width,
            height: options.height,
            boundWidth: Math.min(options.width, width),
            boundHeight: Math.min(options.height, height)
          })
          if (bound.width%2!==0)
            bound.width-=1
          if (bound.width!=$(this.selector).width() || bound.height!=$(this.selector).height()) {
            $(this.selector).turn('size', bound.width, bound.height)
            if ($(this.selector).turn('page')==1)
              $(this.selector).turn('peel', 'br')
            $('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'})
            $('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'})
          }
          $(this.selector).css({top: -bound.height/2, left: -bound.width/2})
        }
        var magazineOffset = $(this.selector).offset(),
          boundH = height - magazineOffset.top - $(this.selector).height(),
          marginTop = (boundH - $('.thumbnails > div').height()) / 2
        if (marginTop<0) {
          $('.thumbnails').css({height:1})
        } else {
          $('.thumbnails').css({height: boundH})
          $('.thumbnails > div').css({marginTop: marginTop})
        }
        if (magazineOffset.top<$('.made').height())
          $('.made').hide()
        else
          $('.made').show()
        $(this.selector).addClass('animated')
      },
      largeMagazineWidth() {
        return this.isPhone ?  this.dataKarya.metadata.zoomed_width/this.defaultScale : this.dataKarya.metadata.zoomed_width
      },
      numberOfViews(book) {
        return book.turn('display') === "double" ? book.turn('pages') / 2 + 1 : book.turn('pages')
      },
      getViewNumber(book, page) {
        return book.turn('display') === "double" ? parseInt((page || book.turn('page'))/2 + 1, 10) : parseInt((page || book.turn('page')), 10)
      },
      getPreview(text){
        let pos = text.lastIndexOf('/')+'/'.length
        return text.slice(0, pos) + 'preview.png'
      },
      getMin(text){
        let pos = text.lastIndexOf('/')+'/'.length
        let posDot = text.lastIndexOf('.')+'.'.length
        return text.slice(0, pos) + 'min-' + text.slice(pos, posDot) + 'png'
      },
      handleNewLines(text){
        return text.replaceAll("$\\n", "\n")
      },
      setPreview(view) {
        var previewWidth = (this.dataKarya.preview.width || 112),
          previewHeight = (this.dataKarya.preview.height || 73),
          previewSrc = this.getPreview(this.dataKarya.photos[0]), //'/book/pages/preview.jpg'
          preview = $(window._thumbPreview.children(':first')),
          numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
          width = (numPages==1 && this.options.display === "double") ? previewWidth/2 : previewWidth
        window._thumbPreview.
          addClass('no-transition').
          css({width: width + 15,
            height: previewHeight + 15,
            top: -previewHeight - 30,
            left: ($($('#slider').children(':first')).width() - width - 15)/2
          })
        preview.css({
          width: width,
          height: previewHeight
        })
        if (preview.css('background-image')==='' ||
          preview.css('background-image')=='none') {
          preview.css({backgroundImage: 'url(' + previewSrc + ')'})
          setTimeout(function(){
            window._thumbPreview.removeClass('no-transition')
          }, 0)
        }
        preview.css({backgroundPosition:
          '0px -'+((view-1)*previewHeight)+'px'
        })
      },
      moveBar(yes) {
        if (Modernizr && Modernizr.csstransforms) {
          $('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000})
        }
      },
      decodeParams(data) {
        var parts = data.split('&'), d, obj = {}
        for (var i =0; i<parts.length; i++) {
          d = parts[i].split('=')
          obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1])
        }
        return obj
      },
      calculateBound(d) {
        var bound = {width: d.width, height: d.height}
        if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
          var rel = bound.width/bound.height
          if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
            bound.width = Math.round(d.boundHeight*rel)
            bound.height = d.boundHeight
          } else {
            bound.width = d.boundWidth
            bound.height = Math.round(d.boundWidth/rel)
          }
        }
        return bound
      },
      loadLargePage(page, pageElement) {
        var img = $('<img />')
        img.on('load', function() {
          var prevImg = pageElement.find('img')
          $(this).css({width: '100%', height: '100%'})
          $(this).appendTo(pageElement)
          prevImg.remove()
        })
        img.attr('src', this.dataKarya.photos[page-1]) // img.attr('src', src)
      },
      loadSmallPage(page, pageElement) {
        var img = pageElement.find('img')
        img.css({width: '100%', height: '100%'})
        img.unbind('load')
        // src = this.getFirebaseURL(page)
        if (this.dataKarya.disable_min){
          img.attr('src', this.dataKarya.photos[page-1]) // img.attr('src', src)
        }else {
          img.attr('src', this.getMin(this.dataKarya.photos[page-1])) // img.attr('src', src)
        }
      },
      isChrome() {
        return navigator.userAgent.indexOf('Chrome')!=-1
      },
      turnNext() {
        $(this.selector).turn('next')
      },
      turnPrevious() {
        $(this.selector).turn('previous')
      },
      // showCaption(){
      //   gsap.to('.book')
      // }
    },
    head() {
      return {
        title: this.dataKarya.judul,
        meta: [
          {
            hid: 'description',
            name: 'description',
            description: 'Karya "'+this.dataKarya.judul+'" oleh '+this.dataKarya.author
          }
        ],
        // script: [
        //   { 
        //     vmid: 'extscript',
        //     src: '/extras/jquery.min.1.7.js',
        //     defer: true,
        //     callback: () => (this.isjQueryLoaded = true)
        //   },
        //   {
        //     skip: !this.isjQueryLoaded,
        //     src: '/extras/jquery-ui-1.8.20.custom.min.js',
        //     defer: true,
        //     callback: () => (this.isUiLoaded = true)
        //   },
        //   { src: '/extras/modernizr.2.5.3.min.js' },
        // ],
        link: [
          { rel: 'stylesheet',  href: '/extras/jquery.ui.css' }
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '~/assets/css/book.css';

.container {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #f1f1f1 rgba($color: #888, $alpha: 0.6); 
  scroll-behavior: smooth;
  scrollbar-width: thin;
  background-image: url("/img/uc-bg.png");
  background-size: 100% auto;
  background-repeat: repeat-y;
  background-position: center top;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.reader-bg{
  //backgroundImage: `url(/img/uc-bg.png)`
  background-color: rgba(0,0,0,0.7);
  position: absolute;
  width: 100vw; /* Full width (cover the whole page) */
  height: 200vh; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  z-index: 0;
}

.blackbg {
  position: absolute;
  background-color: black;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;
  z-index: 1;
  opacity: .9;
}

.book-viewport {
  z-index: 1;
}

.button {
  //background-color: DodgerBlue;
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  cursor: pointer; /* Mouse pointer on hover */
  position: absolute;
  font-family: cursive;
  user-select: none;
  z-index: 99;
}

.next-button-mobile{
  top: 80%;
  transform: translate(0, -50%);
  right: 0;
  font-size: 30px;
  @media only screen and (max-width: 800px) {
    font-size: 90px;
    right: 5%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 50px;
    right: 0;
  }
}
.previous-button-mobile{
  top: 80%;
  left: 0;
  transform: translate(0, -50%);
  font-size: 30px;
  @media only screen and (max-width: 800px) {
    font-size: 90px;
    left: 5%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 50px;
    left: 0;
  }
}
.exit-button-mobile{
  left: 5%;
  bottom: 2%;
  font-size: 20px; /* Set a font size */
  @media only screen and (max-width: 800px) {
    font-size: 35px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 25px;
  }
}
.read-button-mobile{
  position: absolute;
  bottom: -2%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px; /* Set a font size */

  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 800px) {
    font-size: 50px;
  }
  @media only screen and (max-width: 600px) {
    bottom: -3%;
    font-size: 25px;
  }
}

.blurred {
  filter: blur(5px);
  -webkit-filter: blur(5px);
}

.bottom {
  z-index: 2;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 25%;
  opacity: .7;
}

.title-container {
  font-family: 'Karla';
  text-align: center;
  color: white;
  margin: 0 5%;
  // position: absolute;
  // top: 2%;
  // left: 50%;
  // transform: translate(-50%,0);
  .title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .author {
    font-style: italic;
    font-size: 20px;
  }
  @media only screen and (max-width: 800px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 600px) {
    margin-top: -30%;
    margin-bottom: 10%;

    .title {
      font-size: 24px;
    }
    .author {
      font-size: 16px;
    }
  }
}

.caption-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Karla';
  text-align: center;
  color: white;
  margin: 0 5%;
  margin-bottom: 5%;
  overflow-y: auto;
  z-index: 100;
  line-height: 1.3;
  // firefox
  scrollbar-color: #f1f1f1 rgba($color: #888, $alpha: 0.6); 
  scroll-behavior: smooth;
  scrollbar-width: thin;
  // position: absolute;
  // top: 50%;
  // left: 30%;
  // transform: translate(-50%, -50%);
  z-index: 0;
  .title {
    font-size: 44px;
  }
  .deskripsi {
    font-size: 16px;
    white-space: pre-line;
  }
  @media only screen and (max-width: 800px) {
    margin-bottom: 5%;

    .title {
      font-size: 30px;
    }
    .deskripsi {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-bottom: 5%;
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
</style>