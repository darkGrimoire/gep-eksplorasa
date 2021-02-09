<template>
  <div class="container">
    <div v-if="!isPhone" class="zoom-icon zoom-icon-in" />

    <div v-if="isPhone" v-show="fs" class="reader-bg" />

    <div :class="['book-viewport', {blurred: (!fs && isPhone)}]">
      <div class="book-container">
        <div id="album" class="book">
          <div v-if="!isPhone" ignore="1" class="next-button" @click="turnNext" />
          <div v-if="!isPhone" ignore="1" class="previous-button" @click="turnPrevious" />
        </div>
      </div>
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
  </div>
</template>

<script>
/* eslint no-undef: 0 */
if (process.client){
  require('~/assets/turnjs4/lib/turn')
  require('~/assets/turnjs4/lib/zoom')
  require('~/assets/turnjs4/lib/hash')
}
const PAGE_WIDTH = 500
const PAGE_HEIGHT = 650
const TARGET_ZOOM_WIDTH = 2214
const STORAGE_LOCATION = ''
const IMG_EXT = ''

  export default {
    name: "TestBuku",
    data() {
      return {
        options: {
          width: 500*2,
          height: 500/(PAGE_WIDTH/PAGE_HEIGHT),
          duration: 500,
          gradients: true,
          autoCenter: true,
          elevation: 50,
          pages: 12,
          when: {
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
              for (var i = 0; i < pages.length; i++)
                this.addPage(pages[i], $(this.selector))
            }
          }
        },
        selector: "#album",
        currentPage: undefined,
        isPhone: false,
        fs: false,
      }
    },
    beforeDestroy () {
      if (this.isPhone){
        this.destroyPhoneHandler()
      }
    },
    mounted () {
      if (window.matchMedia("(orientation: portrait)").matches){
        this.isPhone = true
        this.options.width = 300
        this.options.height = 300/(PAGE_WIDTH/PAGE_HEIGHT)
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
      
    },
    methods: {
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
            $('#slider-bar').hide()
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
            console.log(window._thumbPreview)
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
            console.log(window._thumbPreview)
            if (window._thumbPreview)
              window._thumbPreview.removeClass('show')
            $(vm.selector).turn('page', Math.max(1, $(this).slider('value')*2 - 2))
          }
        })
      },
      addPage(page, book) {
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
        img.attr('src', '/book/pages/' +  page + '.jpg') // img.attr('src', src)
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
        return this.isPhone ? TARGET_ZOOM_WIDTH/3 : TARGET_ZOOM_WIDTH
      },
      numberOfViews(book) {
        return book.turn('pages') / 2 + 1
      },
      getViewNumber(book, page) {
        return parseInt((page || book.turn('page'))/2 + 1, 10)
      },
      setPreview(view) {
        var previewWidth = 112,
          previewHeight = 73,
          previewSrc = '/book/pages/preview.jpg', // previewSrc = this.getFirebaseURL('preview')
          preview = $(window._thumbPreview.children(':first')),
          numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
          width = (numPages==1) ? previewWidth/2 : previewWidth
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
        // src = this.getFirebaseURL(page + '-large')
        img.attr('src', '/book/pages/' +  page + '-large.jpg') // img.attr('src', src)
      },
      loadSmallPage(page, pageElement) {
        var img = pageElement.find('img')
        img.css({width: '100%', height: '100%'})
        img.unbind('load')
        // src = this.getFirebaseURL(page)
        img.attr('src', '/book/pages/' +  page + '.jpg') // img.attr('src', src)
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
      getFirebaseURL(name){
        let storageRef = this.$fire.storage.ref().child(STORAGE_LOCATION + name + IMG_EXT)
        storageRef.getDownloadURL().then((url) => {
          return url
        })
      }
    },
    head: {
      script: [
        { src: '/extras/jquery.min.1.7.js' },
        { src: '/extras/jquery-ui-1.8.20.custom.min.js' },
        { src: '/extras/modernizr.2.5.3.min.js' },
      ],
      link: [
        { rel: 'stylesheet',  href: '/extras/jquery.ui.css' }
      ]
    },
  }
</script>

<style lang="scss" scoped>
@import '~/assets/css/book.css';

.container {
  overflow: hidden;
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
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
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
  top: 50%;
  transform: translate(0, -50%);
  right: -5px;
  font-size: 30px; /* Set a font size */
}
.previous-button-mobile{
  top: 50%;
  left: -5px;
  transform: translate(0, -50%);
  font-size: 30px; /* Set a font size */
}
.exit-button-mobile{
  bottom: 50px;
  font-size: 20px; /* Set a font size */
}
.read-button-mobile{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px; /* Set a font size */

  display: flex;
  justify-content: center;
  align-items: center;
}

.blurred {
  filter: blur(5px);
  -webkit-filter: blur(5px);
}

.bottom {
  z-index: 2;
}
</style>