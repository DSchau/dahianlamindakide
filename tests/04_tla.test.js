// https://dahianlamindakide.ayriyazilir.com/

'use strict';

/**
 * These tests are not directly related to the site or functionalities. They are just 
 * confirming that the sub-domains are up and running.
 */
Feature('How');

Before(function(I) {
  I.amOnPage('/');
  I.changeHash('#tdk');
});

Scenario('Open "TLA page"', function*(I) {
  I.seeElement('div.turkish-language-association i.small a');
  I.click('div.turkish-language-association i.small a');
  I.seeCurrentUrlEquals('http://tdk.gov.tr/index.php?view=article&id=211');
  I.seeInTitle('Bağlaç Olan da, de\'nin Yazılışı');
  I.see('Bağlaç Olan da, de\'nin Yazılışı');
});
