AOS.init({
  duration: 800,
  easing: 'slide',
  once: false
});

jQuery(document).ready(function($) {

  "use strict";

  $(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");

  // ================= MOBILE MENU CLONE =================
  var siteMenuClone = function() {

    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });

    setTimeout(function() {

      var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){

        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed"></span>');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 500);

    // Arrow click toggle
    $('body').on('click', '.arrow-collapse', function(e) {

      e.preventDefault();

      var $this = $(this);
      var $collapse = $this.closest('li').find('.collapse');

      if ($collapse.hasClass('show')) {
        $collapse.collapse('hide');
        $this.removeClass('active');
      } else {
        $collapse.collapse('show');
        $this.addClass('active');
      }

    });

    // Parent link click (important fix)
    $('body').on('click', '.site-mobile-menu .has-children > a', function(e){

      e.preventDefault();

      var $parent = $(this).closest('li');
      var $collapse = $parent.find('.collapse');
      var $arrow = $parent.find('.arrow-collapse');

      // Close other open dropdowns
      $parent.siblings().find('.collapse').collapse('hide');
      $parent.siblings().find('.arrow-collapse').removeClass('active');

      if ($collapse.hasClass('show')) {
        $collapse.collapse('hide');
        $arrow.removeClass('active');
      } else {
        $collapse.collapse('show');
        $arrow.addClass('active');
      }

    });

    // Toggle menu
    $('body').on('click', '.js-menu-toggle', function(e) {
      e.preventDefault();
      $('body').toggleClass('offcanvas-menu');
      $(this).toggleClass('active');
    });

    // Close on outside click
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('body').removeClass('offcanvas-menu');
      }
    });

  };
  siteMenuClone();


  // ================= STICKY HEADER =================
  var siteSticky = function() {
    $(".js-sticky-header").sticky({topSpacing:0});
  };
  siteSticky();


  // ================= SAFE ONE PAGE NAVIGATION =================
  var OnePageNavigation = function() {

    $("body").on("click", 
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", 
      function(e) {

        var hash = this.hash;

        // Prevent error if element doesn't exist
        if (hash && $(hash).length > 0) {

          e.preventDefault();

          $('html, body').animate({
            scrollTop: $(hash).offset().top - 50
          }, 600, 'easeInOutExpo');

        }

    });

  };
  OnePageNavigation();


  // ================= SCROLL EFFECT =================
  var siteScroll = function() {

    $(window).scroll(function() {

      var st = $(this).scrollTop();

      if (st > 100) {
        $('.js-sticky-header').addClass('shrink');
      } else {
        $('.js-sticky-header').removeClass('shrink');
      }

    });

  };
  siteScroll();


});
