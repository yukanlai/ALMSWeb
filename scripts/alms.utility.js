extValidator = {
  hookFeedback: function($selector, feedback){
    var $dom = typeof $selector === 'string' ? $($selector) : $selector;
    if(!$dom || !$dom instanceof jQuery){
      return;
    }

    var newDiv = document.createElement('DIV');
    newDiv.setAttribute('class', 'invalid-feedback');
    newDiv.innerText = feedback;

    $dom.after(newDiv);
  },

  setValid: function($selector){
    var $dom = typeof $selector === 'string' ? $($selector) : $selector;
    if(!$dom || !$dom instanceof jQuery){
      return;
    }
    $dom.removeClass('is-invalid');
    $dom.addClass('is-valid');
  },

  setInvalid: function($selector){
    var $dom = typeof $selector === 'string' ? $($selector) : $selector;
    if(!$dom || !$dom instanceof jQuery){
      return;
    }
    $dom.addClass('is-invalid');
  }
};