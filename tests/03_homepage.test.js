// https://dahianlamindakide.ayriyazilir.com/

'use strict';

/**
 * This test is confirming that the arrow button scrolls down to the next
 * page which is #how. All other parts are already tested in 'Menu' feature.
 */
Feature('Homepage');

Before(function(I) {
  I.amOnPage('/');
});

Scenario('Scroll via arrow', function*(I) {
  I.seeElement('div.more a.arrow-down');
  I.click('div.more a.arrow-down')
  I.seeInCurrentUrl('/#tdk');
  I.wait(1);
});
