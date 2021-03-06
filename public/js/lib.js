'use strict';

function cutString(str, num) {
  if (str == undefined) {
    return "";
  }
  var res = str.substring(0, num);

  if (str.length > num) {
    res += "..."
  }
  return res;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Set of functions used on all the project.
 *
 */
var BM = {

  loading: {

    /// Display a screen loader + disable all buttons
    show: function () {
      var screenLoading = $('#screenloading');

      if (screenLoading.length == 0) {
        console.info('Create screenloading');
        $('body').append('<div id="screenloading"><div class="loader-gif"><img src="/common/img/loading-bars.svg" /></div></div>')
      }

      screenLoading.fadeIn();

      // disable buttons
      $('input[type="submit"]').prop('disabled', true);
      $('input[type="text"]').keyup(function () {
        if ($(this).val() != '') {
          $('input[type="submit"]').prop('disabled', false);
        }
      });

    },

    hide: function () {
      $('#screenloading').fadeOut();

      // enable buttons
      $('input[type="submit"]').prop('enabled', true);
      $('input[type="text"]').keyup(function () {
        if ($(this).val() != '') {
          $('input[type="submit"]').prop('enabled', false);
        }
      });
    }
  },

  copyTextOnElement: function (elem, successMessage) {

    elem.selectText();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      if (successful) {
        $.notify(
          {
            message: successMessage
          },
          {
            delay: 2000
          }
        );
      }
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  },

  // see http://stackoverflow.com/questions/13303151/getting-fullscreen-mode-to-my-browser-using-jquery
  toggleFullScreen: function () {
    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

};
