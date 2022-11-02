/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.scrollClass = {
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

  /**
   * Video aspect ratio
   */
  Drupal.behaviors.videoSizeRatio = {
    attach: function attach(context, settings) {
      adjustVideoSize();

      $(window).on('resize', function() {
        adjustVideoSize();
      });

      function adjustVideoSize() {
        let $frame = $('iframe.media-oembed-content');
        let $width = $frame.attr('width');
        let $height = $frame.attr('height');
        let $ratio = $width / $height;
        if ($frame.width() !== $width) {
          $frame.height($frame.width() / $ratio);
        }
      }
    }}

  /**
   * Stops modal videos when the modal closes.
   */
  Drupal.behaviors.stopVideo = {
     attach: function (context, settings) {
       $('.modal-dialog button[data-dismiss="modal"]').on('click', function (e) {
         let $modal = $(this).parents('.modal-dialog');
         if ($modal === undefined) {
           return;
         }
         let $iframe = $modal.find('iframe.media-oembed-content');
         if ($iframe === undefined) {
           return;
         }
         let href = $iframe.attr("src");
         $iframe.attr("src", href);
       });
     }
   };

})(jQuery, Drupal);
