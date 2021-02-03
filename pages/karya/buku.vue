<template>
  <div class="container">
    <div class="zoom-icon zoom-icon-in" />

    <div class="book-viewport">
      <div class="book-container">
        <div id="album" class="book">
          <div ignore="1" class="next-button" @click="turnNext" />
          <div ignore="1" class="previous-button" @click="turnPrevious" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="slider-bar" class="turnjs-slider">
        <div id="slider" />
      </div>
    </div>
  </div>
</template>

<script>
if (process.client){
  require('~/assets/turnjs4/lib/turn')
  require('~/assets/turnjs4/lib/zoom')
  require('~/assets/turnjs4/lib/hash')
}

  export default {
    name: "TestBuku",
    data() {
      return {
        options: {
          width: 500*2,
          height: 500/(500/650),
          duration: 1000,
          gradients: true,
          autoCenter: true,
          elevation: 50,
          pages: 12,
          when: {
            turning: (event, page) => {
              var book = $(this.selector)
              this.currentPage = book.turn('page')
              this.pages = book.turn('pages')
              Hash.go('page/' + page).update()
              this.disableControls(page)
            },
            turned: (event, page) => {
              this.disableControls(page)
              $(this.selector).turn('center')
              if ($('#slider').slider('instance')){
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
        pages: undefined,
      }
    },
    mounted () {
      // $('.container').fadeIn(1000)

      let flipbook = $(this.selector)
      flipbook.turn(this.options)
      
      this.initializeZoom()
      this.initializeBinding()
      this.initializeSlider()
      this.initializeHash()

      this.resizeViewport()
      $(this.selector).addClass('animated')
      // $('.container').hide()
    },
    methods: {
      initializeZoom(){
        $('.book-viewport').zoom({
        flipbook: $('#album'),
        max: () => { 
          return this.largeMagazineWidth()/$(this.selector).width()
        }, 
        when: {
          swipeLeft: () => {
            $(this.selector).zoom('flipbook').turn('next')
          },
          swipeRight: () => {
            $(this.selector).zoom('flipbook').turn('previous')
          },
          resize: (event, scale, page, pageElement) => {
            if (scale==1)
              this.loadSmallPage(page, pageElement)
            else
              this.loadLargePage(page, pageElement)
          },
          zoomIn: () => {
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
            if ($(this.selector).turn('is'))
              $(this.selector).turn('page', page)
          }
        },
        nop: () => {
          if ($(this.selector).turn('is'))
            $(this.selector).turn('page', 1)
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
        }).click(function() {
          $('.magazine').turn('next')
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
        }).click(function() {
          $('.magazine').turn('previous')
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
        img.attr('src', '/book/pages/' +  page + '.jpg')
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
        if (page==1)
          $('.previous-button').hide()
        else
          $('.previous-button').show()
        if (page==$(this.selector).turn('pages'))
          $('.next-button').hide()
        else
          $('.next-button').show()
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
        return 2214
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
          previewSrc = '/book/pages/preview.jpg',
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
        img.attr('src', '/book/pages/' +  page + '-large.jpg')
      },
      loadSmallPage(page, pageElement) {
        var img = pageElement.find('img')
        img.css({width: '100%', height: '100%'})
        img.unbind('load')
        img.attr('src', '/book/pages/' +  page + '.jpg')
      },
      isChrome() {
        return navigator.userAgent.indexOf('Chrome')!=-1
      },
      turnNext() {
        $(this.selector).turn('next')
      },
      turnPrevious() {
        $(this.selector).turn('previous')
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
  background-size: cover;
  height: 100vh;
  position: relative;
}
</style>