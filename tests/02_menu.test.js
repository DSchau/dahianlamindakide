// https://dahianlamindakide.ayriyazilir.com/

'use strict';

/**
 * These tests are confirming that the menu (top right corner) is working on all 
 * three layouts: desktop, tablet and mobile. Opening and closing functionalities 
 * are working as well as the main purpose of the menu, which is navigating through 
 * the webpage.
 */
Feature('Menu');

Before(function(I) {
  I.amOnPage('/');
});

Scenario('Open menu', function*(I) {
  I.changeDevice('desktop');
  I.checkMenu();
  I.changeDevice('tablet', 'portrait');
  I.checkMenu();
  I.changeDevice('tablet', 'landscape');
  I.checkMenu();
  I.changeDevice('mobile', 'portrait');
  I.checkMenu();
  I.changeDevice('mobile', 'landscape');
  I.checkMenu();
});

Scenario('Go to "homepage" from menu', function*(I) {
  let elements = [
    'div.header a.logo',
    'div.more a.arrow-down'
  ];

  I.changeDevice('desktop');
  I.navigate('#paylas', '/#anasayfa', '#homepage');
  I.see('Dahi anlamındaki de ayrı yazılır.');
  I.seeElements(elements);
  I.changeDevice('tablet', 'portrait');
  I.navigate('#tdk', '/#anasayfa', '#homepage');
  I.see('Dahi anlamındaki de ayrı yazılır.');
  I.seeElements(elements);
  I.changeDevice('tablet', 'landscape');
  I.navigate('#paylas', '/#anasayfa', '#homepage');
  I.see('Dahi anlamındaki de ayrı yazılır.');
  I.seeElements(elements);
  I.changeDevice('mobile', 'portrait');
  I.navigate('#tdk', '/#anasayfa', '#homepage');
  I.see('Dahi anlamındaki de ayrı yazılır.');
  I.seeElements(elements);
  I.changeDevice('mobile', 'landscape');
  I.navigate('#paylas', '/#anasayfa', '#homepage');
  I.see('Dahi anlamındaki de ayrı yazılır.');
  I.seeElements(elements);
});

Scenario('Go to "TLA" from menu', function*(I) {
  let elements = [
    'div.turkish-language-association',
    'div.turkish-language-association i.small',
    'div.turkish-language-association i.small a'
  ];

  I.changeDevice('desktop');
  I.navigate('#anasayfa', '/#tdk', '#tla');
  I.seeElements(elements);
  I.changeDevice('tablet', 'portrait');
  I.navigate('#paylas', '/#tdk', '#tla');
  I.seeElements(elements);
  I.changeDevice('tablet', 'landscape');
  I.navigate('#anasayfa', '/#tdk', '#tla');
  I.seeElements(elements);
  I.changeDevice('mobile', 'portrait');
  I.navigate('#paylas', '/#tdk', '#tla');
  I.seeElements(elements);
  I.changeDevice('mobile', 'landscape');
  I.navigate('#anasayfa', '/#tdk', '#tla');
  I.seeElements(elements);
});

Scenario('Go to "share" from menu', function*(I) {
  let elements = [
    'div.share a.sharer.facebook',
    'div.share a.sharer.twitter',
    'div.share a.sharer.googleplus',
    'div.share a.sharer.linkedin',
    'div.share a.sharer.pinterest',
    'div.share a.sharer.tumblr'
  ];

  I.changeDevice('desktop');
  I.navigate('#tdk', '/#paylas', '#share');
  I.seeElements(elements);
  I.dontSeeElement('div.share a.sharer.whatsapp');
  I.changeDevice('tablet', 'portrait');
  I.navigate('#anasayfa', '/#paylas', '#share');
  I.seeElements(elements);
  I.dontSeeElement('div.share a.sharer.whatsapp');
  I.changeDevice('tablet', 'landscape');
  I.navigate('#tdk', '/#paylas', '#share');
  I.seeElements(elements);
  I.dontSeeElement('div.share a.sharer.whatsapp');
  I.changeDevice('mobile', 'portrait');
  I.navigate('#anasayfa', '/#paylas', '#share');
  elements.push('div.share a.sharer.whatsapp');
  I.seeElements(elements);
  I.changeDevice('mobile', 'landscape');
  I.navigate('#tdk', '/#paylas', '#share');
  I.seeElements(elements);
});
