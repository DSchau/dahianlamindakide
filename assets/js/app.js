// https://dahianlamindakide.ayriyazilir.com/

'use strict';

$(function() {

  var App = function() {

    var el = {
      particles: $('#particles-js'),
      fullpage : $('#fullpage'),
      toggle   : $('#toggle'),
      menu     : $('#menu'),
      menuullia: $('#menu ul li a')
    };

    this.initParticles = function() {
      if (particlesJS && el.particles.length) {
        particlesJS.load('particles-js', 'assets/js/particles.json', function() {
          console.log('%cOK: initParticles()', 'color: color: #4f8a10; background-color: #dff2bf;');
        });
      }
      else {
        console.log('%cError: initParticles()', 'color: #d8000c; background-color: #ffbaba;');
      }
    };

    this.initFullpage = function() {
      if (el.fullpage.length) {
        el.fullpage.fullpage({
          anchors: [
            'anasayfa',
            'tdk',
            'paylas'
          ],
          recordHistory: true,
          scrollingSpeed: 1000,
          slidesNavigation: true,
          loopHorizontal: false,
          afterLoad: function(anchorLink, index) {
            if (el.menu) {
              var lis = el.menu.find('li');

              for (var i = 0; i < lis.length; ++i) {
                if (i === index - 1) {
                  $(lis[i]).addClass('active');
                }
                else {
                  $(lis[i]).removeClass('active');
                }
              }
            }
          }
        });

        $('#fullpage').fadeIn('slow'); // _extras.scss: 61

        console.log('%cOK: initFullpage()', 'color: color: #4f8a10; background-color: #dff2bf;');
      }
      else {
        console.log('%cError: initFullpage()', 'color: #d8000c; background-color: #ffbaba;');
      }
    };

    this.initMenu = function() {
      if (el.toggle.length && el.menu.length && el.menuullia.length) {
        el.toggle.click(function() {
          $(this).toggleClass('on');
          el.menu.toggleClass('visible');
        });

        el.menuullia.click(function() {
          el.toggle.toggleClass('on');
          el.menu.toggleClass('visible');
        });

        console.log('%cOK: initMenu()', 'color: color: #4f8a10; background-color: #dff2bf;');
      }
      else {
        console.log('%cError: initMenu()', 'color: #d8000c; background-color: #ffbaba;');
      }
    };

    this.initAnalytics = function() {
      if (analytics) {
        var sites = {
          facebook: $('.share .facebook'),
          twitter: $('.share .twitter'),
          googleplus: $('.share .googleplus'),
          linkedin: $('.share .linkedin'),
          pinterest: $('.share .pinterest'),
          tumblr: $('.share .tumblr'),
          whatsapp: $('.share .whatsapp')
        };

        $.each(sites, function(site, elem) {
          elem.on('click', function() {
            analytics.track('share', {
              site: site
            });
          });
        });

        window.onhashchange = function() {
          analytics.track('hash', {
            hash: location.hash
          });
        };

        console.log('%cOK: initAnalytics()', 'color: color: #4f8a10; background-color: #dff2bf;');
      }
      else {
        console.log('%cError: initAnalytics()', 'color: #d8000c; background-color: #ffbaba;');
      }
    };

    this.init = function() {

      console.log('%cDahi anlamındaki de ayrı yazılır.', 'font-size: x-large; color: #64d2ff;');

      this.initParticles();
      this.initFullpage();
      this.initMenu();
      this.initAnalytics();
    };
  };

  var app = new App();

  // init everything!
  app.init();

});
