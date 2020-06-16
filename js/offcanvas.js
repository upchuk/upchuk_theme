(function($, Drupal) {
  'use strict';

  Drupal.behaviors.offCanvasJs = {
    attach: function(context, settings) {

      $('[data-toggle="offcanvas"]').on('click', function () {
        $('.navbar-toggle').toggleClass('open');
        $('.offcanvas-collapse').toggleClass('open');
      })
    }
  }
})(jQuery, Drupal);
