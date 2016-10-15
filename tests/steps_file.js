// https://dahianlamindakide.ayriyazilir.com/

'use strict';

module.exports = function() {
  return actor({

    // I.seeElements(['.element1', '.element2', '#element3']);
    seeElements: function(elements) {
      let self = this;
      elements.forEach(function(element) {
        self.seeElement(element);
      });
    },
    
    // I.changeDevice('mobile', 'portrait');
    changeDevice: function(device, orientation) {
      if (device === 'desktop') {
        this.resizeWindow('maximize');
      }
      else if (device === 'tablet') {
        if (orientation === 'landscape') {
          this.resizeWindow(1024, 768);
        }
        else if (orientation === 'portrait') {
          this.resizeWindow(768, 1024);
        }
      }
      else if (device === 'mobile') {
        if (orientation === 'landscape') {
          this.resizeWindow(736, 414);
        }
        else if (orientation === 'portrait') {
          this.resizeWindow(414, 736);
        }
      }

      this.wait(1); // give it some time to resize the window
    },

    // I.changeHash('#anasayfa');
    changeHash: function(hash) {
      this.amOnPage('/' + (hash || ''));
      this.wait(1);
    },

    openMenu: function() {
      this.seeElement('#toggle');
      this.click('#toggle');
    },

    closeMenu: function() {
      this.seeElement('#toggle.on');
      this.click('#toggle.on');
    },

    checkMenu: function() {
      this.openMenu();
      this.seeElement('div#menu.visible');
      this.see('ANASAYFA');
      this.see('TÜRK DIL KURUMU'); // handles it as I because of text-transform rule
      this.see('PAYLAŞ');
      this.closeMenu();
    },

    // I.navigate('#paylas', '/#anasayfa', '#homepage');
    navigate: function(from, to, target) {
      this.changeHash(from);
      this.openMenu();
      this.click('div#menu.visible ul li a' + target);
      this.wait(1);
      this.seeInCurrentUrl(to);
    }
  });
};
