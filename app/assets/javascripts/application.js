(function() {

  var hideShow = function () {
    var inputs = document.querySelectorAll('.hide-show');

    for(var i=0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        if(inputs[i].value === 'No-dob') {
          document.querySelector('#dob-reveal').className = 'panel-indent js-hidden';
          document.querySelector('#approx-age').className = 'panel-indent';
        }
        else if (inputs[i].value === 'Yes-dob') {
          document.querySelector('#approx-age').className = 'panel-indent js-hidden';
          document.querySelector('#dob-reveal').className = 'panel-indent';
        }
        else if (inputs[i].value === 'Yes') {
          inputs[i].parentElement.parentElement.nextElementSibling.className = 'panel-indent';
        }
        else {
          inputs[i].parentElement.parentElement.nextElementSibling.className = 'panel-indent js-hidden';
        }
      }
    }
  };

  bindEvents = function () {
    var inputs = document.querySelectorAll('.hide-show');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", hideShow, true );
    };
  };

  return {
    bindEvents : bindEvents()
  };

})();
