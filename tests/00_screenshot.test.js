// https://dahianlamindakide.ayriyazilir.com/

'use strict';

Feature('Screenshot');

Before(function(I) {
  I.amOnPage('/');
});

Scenario('Desktop', function*(I) {
  I.changeDevice('desktop');
  I.saveScreenshot('desktop.png');
});

Scenario('Tablet (portrait)', function*(I) {
  I.changeDevice('tablet', 'portrait');
  I.saveScreenshot('tablet-portrait.png');
});

Scenario('Tablet (landscape)', function*(I) {
  I.changeDevice('tablet', 'landscape');
  I.saveScreenshot('tablet-landscape.png');
});

Scenario('Mobile (portrait)', function*(I) {
  I.changeDevice('mobile', 'portrait');
  I.saveScreenshot('mobile-portrait.png');
});

Scenario('Mobile (landscape)', function*(I) {
  I.changeDevice('mobile', 'landscape');
  I.saveScreenshot('mobile-landscape.png');
});
