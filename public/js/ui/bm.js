jQuery.fn.selectText = function(){
  var doc = document;
  var element = this[0];
  var range;
  var selection;

  if (doc.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

// Contains the last position before clicking on an anchor to allow the
// user to get back. TODO: implement the back button.
var lastPosition = null;
/*
 ** click on a link on a bookmark content
 */
$(document).on('click', '.bookmark__content a, .toc a', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var link = $(this).attr("href");
  // Anchor handling
  if (link.length > 1 && link[0] == '#')
    {
      var elemToGo = $(link);
      if (elemToGo.length == 0) {
        // Handle github anchor.
        var name = 'user-content-' + link.replace('#', '');
        elemToGo = $("a[name=" + name + "]");
      }

      if (elemToGo.length != 0) {
        lastPosition = $(document).scrollTop();
        $('html, body').animate({
          scrollTop: elemToGo.offset().top - 30
        }, 'slow');
      }
    }
    else if (link.length > 1 && link[0] != '#') { // Another link, handle link with just '#'
      // open the link in a new tab.
      window.open(link, '_blank');
    }
    return false;
});


$(document).on('click', '.bookmark__content code', function(e) {
  $(this).selectText();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    if (successful) {
      $.notify(
        {
          message: "Code copied to clipboard"
        },
        {
          delay: 2000
        }
      );
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});
