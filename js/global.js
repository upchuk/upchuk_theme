/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio_subtheme = {
    attach: function(context, settings) {
      var position = $(window).scrollTop();
      $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $('body').addClass("scrolled");
        }
        else {
          $('body').removeClass("scrolled");
        }
        var scroll = $(window).scrollTop();
        if (scroll > position) {
          $('body').addClass("scrolldown");
          $('body').removeClass("scrollup");
        } else {
          $('body').addClass("scrollup");
          $('body').removeClass("scrolldown");
        }
        position = scroll;
      });

    }
  };

  /**
   * Slick carousels
   */
  Drupal.behaviors.slick = {
    attach: function (context, settings) {

      if (settings.slick === undefined) {
        return;
      }

      var slick = settings.slick;
      for (var key in slick) {
        var info = slick[key];
        var id = '#' + info.slick_id;
        $(id).once('slick-attached-' + slick[key]).slick(info.settings);

        if (info.nav === undefined) {
          continue;
        }

        var nav_id = '#' + info.nav.slick_id;
        $(nav_id).once('slick-attached-nav-' + info.nav.slick_id).slick(info.nav.settings);
      }
    }
  };

  /**
   * Hide the tabledrag weight.
   */
  Drupal.behaviors.tableWeight = {
    attach: function (context, settings) {
      if (Drupal.tableDrag != undefined) {
        localStorage.removeItem('Drupal.tableDrag.showWeight');
        Drupal.tableDrag.prototype.hideColumns();
        $('.tabledrag-toggle-weight').hide();
      }
    }
  };

  /**
   * Image zoom
   */
  Drupal.behaviors.zizoom = {
    attach: function (context, settings) {

      jQuery('.zoom-photo').each(function () {
        jQuery(this).once().zoom();
      });
    }
  };

})(jQuery, Drupal);
