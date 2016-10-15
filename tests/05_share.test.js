// https://dahianlamindakide.ayriyazilir.com/

'use strict';

/**
 * This test is confirming that the share links are there and clickable.
 * There's another javascript library which is responsible from opening the
 * share dialogs and passing parameters to their correct locations, etc.
 */
Feature('Share');

Before(function(I) {
  I.amOnPage('/');
  I.changeHash('#paylas');
});

Scenario('Share buttons - Facebook', function*(I) {
  I.click('div.share a.sharer.facebook');
});

Scenario('Share buttons - Twitter', function*(I) {
  I.click('div.share a.sharer.twitter');
});

Scenario('Share buttons - Google+', function*(I) {
  I.click('div.share a.sharer.googleplus');
});

Scenario('Share buttons - LinkedIn', function*(I) {
  I.click('div.share a.sharer.linkedin');
});

Scenario('Share buttons - Pinterest', function*(I) {
  I.click('div.share a.sharer.pinterest');
});

Scenario('Share buttons - Tumblr', function*(I) {
  I.click('div.share a.sharer.tumblr');
});

Scenario('Share buttons - WhatsApp', function*(I) {
  I.changeDevice('mobile', 'landscape');
  I.click('div.share a.sharer.whatsapp');
});
