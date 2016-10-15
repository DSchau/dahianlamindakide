// https://dahianlamindakide.ayriyazilir.com/

'use strict';

/**
 * These tests are confirming that the hash strings are forcing page to 
 * scroll down / up to related section. This is important because people may
 * share the page w/ a hash string in the URL.  
 */
Feature('Pages');

Before(function(I) {
  I.amOnPage('/');
});

Scenario('Open "homepage"', function*(I) {
  I.seeInCurrentUrl('/');
});

Scenario('Open "homepage" w/ hash', function*(I) {
  I.changeHash('#anasayfa');
  I.seeInCurrentUrl('/#anasayfa');
});

Scenario('Open "TLA" page w/ hash', function*(I) {
  I.changeHash('#tdk');
  I.seeInCurrentUrl('/#tdk');
});

Scenario('Open "share" page w/ hash', function*(I) {
  I.changeHash('#paylas');
  I.seeInCurrentUrl('/#paylas');
});
