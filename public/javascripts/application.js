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

  var atLeastOneChecked = function (inputs) {
    var fraudTypes        = inputs,
        atleastOneChecked = false;
    for (var i=0; i <= fraudTypes.length; i++) {
      if(fraudTypes[i] && fraudTypes[i].checked) {
        atleastOneChecked = true;
      }
    }
    return atleastOneChecked;
  }

  var fraudTypeValidation = function () {
    var form     = document.querySelector('#form-fraud-type'),
        fieldset = document.querySelector('.fieldset-fraud-type'),
        msgBox   = document.createElement('div'),
        msgText  = document.createTextNode('Please select atleast one type of fraud'),
        inputs   = document.querySelectorAll('.input-fraud-type');

    form.addEventListener('submit', function (e) {
      if(atLeastOneChecked(inputs) === false) {
        fieldset.classList.add('invalid');
        msgBox.classList.add('validation-message');
        msgBox.appendChild(msgText);
        form.insertBefore(msgBox,form.lastChild.previousSibling);
        e.preventDefault();
      }
    });
  };

  var errorMsg = function (action,input,msgText) {
    var msgBox  = document.createElement('div'),
        msgText = document.createTextNode(msgText),
        form    = document.querySelector('#form-suspect-info');

    if (action === 'add') {
      input.classList.add('invalid');

      input.parentNode.classList.add('invalid');
      msgBox.classList.add('validation-message');
      msgBox.appendChild(msgText);
      form.insertBefore(msgBox,form.lastChild.previousSibling);
    }
    else {
      input.classList.remove('invalid');
      input.parentNode.classList.remove('invalid');
      document.querySelector('#form-nino').removeChild(document.querySelector('.validation-message'));
    }
  }

  var basicInfoValidation = function () {
    var form      = document.querySelector('#form-suspect-info'),
        firstName = document.querySelector('#first-name-2')
        lastName  = document.querySelector('#last-name-2')
        age       = document.getElementsByName('radio-indent-group-1'),
        button    = document.querySelector('#button-step3a');

      button.addEventListener('click', function (e) {
      var sendForm  = true
      if(firstName.value === '') {
        errorMsg('add',firstName,'Please enter a first name(s)');
        sendForm = false;
      }
      if (lastName.value === '') {
        errorMsg('add',lastName ,'Please enter a last name');
        sendForm = false;
      }
      if(atLeastOneChecked(age) === false) {
        var form     = document.querySelector('#form-suspect-info'),
            fieldset = document.querySelector('.fieldset-dob'),
            msgBox   = document.createElement('div'),
            msgText  = document.createTextNode('Please enter a date of birth or an approximate age');

        fieldset.classList.add('invalid');
        msgBox.classList.add('validation-message');
        msgBox.appendChild(msgText);
        form.insertBefore(msgBox,form.lastChild.previousSibling);

        sendForm = false;
        //errorMsg('add',lastName ,'Please enter a last name');
      }

      if(document.querySelector('#radio-indent-dob-1').checked) {
        var form    = document.querySelector('#form-suspect-info'),
            day     = document.querySelector('#dob-day'),
            month   = document.querySelector('#dob-month'),
            year    = document.querySelector('#dob-year'),
            dobFull = true,
            msgBox  = document.createElement('div'),
            msgText = document.createTextNode('Please enter a full date of birth');


        if(day.value === '') {
          day.classList.add('invalid')
          dobFull = false;
        }
        if(month.value === ''){
          month.classList.add('invalid')
          dobFull = false;
        }
        if(year.value === ''){
          year.classList.add('invalid')
          dobFull = false;
        }

        if (dobFull === false) {
          console.log('test ')
          sendForm = false;
          day.parentNode.parentNode.parentNode.classList.add('invalid')
          msgBox.classList.add('validation-message');
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,form.lastChild.previousSibling);
        }
      }

      if(document.querySelector('#radio-indent-dob-2').checked) {
        var form      = document.querySelector('#form-suspect-info'),
            approxAge = document.querySelector('#dob-approx'),
            msgBox    = document.createElement('div'),
            msgText   = document.createTextNode('Please enter an approximate age');

        if(approxAge.value === '') {
          approxAge.classList.add('invalid');
          approxAge.parentNode.parentNode.classList.add('invalid');
          msgBox.classList.add('validation-message');
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,form.lastChild.previousSibling)
        }
      }

      if(document.querySelector('#radio-indent-address-yes').checked) {
        var postcode  = document.querySelector('#postcode'),
            address   = document.querySelector('#address'),
            town      = document.querySelector('#town'),
            msgBox    = document.createElement('div'),
            addressOk = false;

        if (postcode.value) {
          addressOk = true;
        }

        if (address.value && town.value) {
          addressOk = true;
        }

        if(addressOk !== true) {
          var msgText = document.createTextNode('Please enter either a building and street name and town or postcode or just a postcode');
          sendForm = false;
          postcode.parentNode.parentNode.classList.add('invalid');
          if (address.value === '') {
            address.classList.add('invalid');
          }
          if (town.value === '') {
            town.classList.add('invalid');
          }
          if (postcode.value === '') {
            postcode.classList.add('invalid');
          }
          if (address.value === '' && town.value) {
            var msgText = document.createTextNode('Please enter either a building and street name or postcode');
          }
          if (address.value && town.value === '') {
            var msgText = document.createTextNode('Please enter either a town or postcode');
          }
          msgBox.classList.add('validation-message');
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,form.lastChild.previousSibling)
        }

        /*if (postcode.value === '') {
          var msgText   = document.createTextNode('Please enter a postcode');
          //postcode.classList.add('invalid');
          postcode.parentNode.parentNode.classList.add('invalid');
          sendForm = false;
        }

        if (postcode === '' && (address === '' || town === '')) {
          console.log('no address, no town');
          sendForm = false;
        }*/


      }

      if (sendForm === false) {
        e.preventDefault();
      }
    })
  };

  bindEvents = function () {
    var inputs    = document.querySelectorAll('.hide-show');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", hideShow, true );
    };

    if(document.querySelector('#form-fraud-type')) {
      fraudTypeValidation();
    }

    if(document.querySelector('#form-suspect-info')) {
      basicInfoValidation();
    }

  };

  return {
    bindEvents : bindEvents()
  };

})();
