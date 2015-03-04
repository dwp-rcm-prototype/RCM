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
    var form           = document.querySelector('#form-fraud-type'),
        fieldset       = document.querySelector('.fieldset-fraud-type'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please select atleast one type of fraud'),
        inputs         = document.querySelectorAll('.input-fraud-type'),
        continueButton = document.querySelector('.button');

    form.addEventListener('submit', function (e) {
      if(atLeastOneChecked(inputs) === false) {
        fieldset.classList.add('invalid');
        msgBox.classList.add('validation-message');
        msgBox.appendChild(msgText);
        form.insertBefore(msgBox,continueButton.previousSibling);
        e.preventDefault();
      }
    });
  };

  var errorMsg = function (action,input,msgText) {
    var msgBox         = document.createElement('div'),
        msgText        = document.createTextNode(msgText),
        form           = document.querySelector('.form'),
        continueButton = document.querySelector('.button');

    if (action === 'add') {
      input.classList.add('invalid');

      input.parentNode.classList.add('invalid');
      msgBox.classList.add('validation-message');
      msgBox.appendChild(msgText);
      form.insertBefore(msgBox,continueButton.previousSibling);
    }
    else {
      input.classList.remove('invalid');
      input.parentNode.classList.remove('invalid');
      document.querySelector('#form-nino').removeChild(document.querySelector('.validation-message'));
    }
  }

  var basicInfoValidation = function () {
    var form           = document.querySelector('#form-suspect-info'),
        firstName      = document.querySelector('#first-name-2'),
        lastName       = document.querySelector('#last-name-2'),
        age            = document.getElementsByName('radio-indent-group-1'),
        button         = document.querySelector('#button-step3a'),
        continueButton = document.querySelector('.button');

      button.addEventListener('click', function (e) {
        var validationMessages = document.querySelectorAll('.validation-message'),
            sendForm           = true;

      for (i=0;i  < validationMessages.length; i++) {
        validationMessages[i].parentNode.removeChild(validationMessages[i])
      }

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
        form.insertBefore(msgBox,continueButton.previousSibling);

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
          sendForm = false;
          day.parentNode.parentNode.parentNode.classList.add('invalid')
          msgBox.classList.add('validation-message');
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,continueButton.previousSibling);
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
          form.insertBefore(msgBox,continueButton.previousSibling)
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
          var msgText = document.createTextNode('Please enter either a building and street name and town   or just a postcode');
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
          form.insertBefore(msgBox,continueButton.previousSibling)
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

  var basicInfoValidationRoute3 = function () {
    var form           = document.querySelector('#form-suspect-info'),
        firstName      = document.querySelector('#first-name-2'),
        lastName       = document.querySelector('#last-name-2'),
        age            = document.getElementsByName('radio-indent-group-1'),
        contactDetails = document.getElementsByName('radio-indent-group-3'),
        button         = document.querySelector('#button-step3a-route3'),
        continueButton = document.querySelector('.button');

      button.addEventListener('click', function (e) {
        var validationMessages = document.querySelectorAll('.validation-message'),
            sendForm           = true;

      for (i=0;i  < validationMessages.length; i++) {
        validationMessages[i].parentNode.removeChild(validationMessages[i])
      }

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
        form.insertBefore(msgBox,continueButton.previousSibling);

        sendForm = false;
        //errorMsg('add',lastName ,'Please enter a last name');
      }

      if(document.querySelector('#radio-indent-contact-yes').checked) {
        //console.log('chekced')
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
          sendForm = false;
          day.parentNode.parentNode.parentNode.classList.add('invalid')
          msgBox.classList.add('validation-message');
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,continueButton.previousSibling);
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
          form.insertBefore(msgBox,continueButton.previousSibling)
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
          var msgText = document.createTextNode('Please enter either a building and street name and town   or just a postcode');
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
          form.insertBefore(msgBox,continueButton.previousSibling)
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

  var isTherePartner = function () {
    var form           = document.querySelector('#form-additonal-suspect-details'),
        inputs         = document.querySelectorAll('.hasPartner'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please select one of the options above.'),
        continueButton = document.querySelector('.button');

    form.addEventListener ('submit', function (e) {
      if (atLeastOneChecked(inputs) === false) {
        document.querySelector('.hasPartner').parentNode.parentNode.parentNode.classList.add('invalid')
        msgBox.classList.add('validation-message');
        msgBox.appendChild(msgText);
        form.insertBefore(msgBox,continueButton.previousSibling);
        e.preventDefault();
      }
    })
  };

  var partnerInfo = function () {
    var form           = document.querySelector('#form-partner-details'),
        firstName      = document.querySelector('#first-name-2'),
        lastName       = document.querySelector('#last-name-2'),
        additonalInfo  = document.querySelector('#additonalInfo'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please provide any information you have on the parnter.'),
        continueButton = document.querySelector('.button');

    continueButton.addEventListener ('click', function (e) {
      var sendForm = true,
          secondAttempt = false;

      if(document.querySelector('.validation-message')) {
        secondAttempt = true;
      }

      if (firstName.value === '' && lastName.value === '' && additonalInfo.value === '') {
        errorMsg('add',firstName,'Please enter a first name(s) if you know it.');
        errorMsg('add',lastName ,'Please enter a last name if you know it.');
        errorMsg('add',additonalInfo,'Please enter any additional information if you can.');
        sendForm = false;
      }

      if (firstName.value !== '' || lastName.value !== '' || additonalInfo.value !== '') {
        sendForm = true;
      }

      if (sendForm === false && secondAttempt === false) {
        e.preventDefault();
      }


    })
  };

  var suspectWork = function () {
    var form           = document.querySelector('#form-suspect-work'),
        whereWorking   = document.querySelector('#where-working'),
        selfEmployed   = document.querySelector('#radio-indent-self-employed-yes'),
        workType       = document.querySelector('#work-type'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please provide any information you have on the parnter.'),
        continueButton = document.querySelector('.button');

    continueButton.addEventListener ('click', function (e) {
      var sendForm = true;

      if (whereWorking.value === '') {
        errorMsg('add',whereWorking,'Please provide some information about where you believe they are working.');
        sendForm = false;
      }

      if (selfEmployed.checked && workType.value === '') {
        errorMsg('add',workType,'Please enter the type of work they do.');
        workType.parentNode.parentNode.parentNode.classList.add('invalid');
        sendForm = false;
      }

      if (sendForm === false) {
        e.preventDefault();
      }
    });

  }

  var vehicleDetails = function () {
    var form           = document.querySelector('#form-vehicle-details'),
        inputs         = document.querySelectorAll('.vechileDetails'),
        fieldset       = document.querySelector('.fieldset-vehcile-details'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please select atleast one type of fraud'),
        inputs         = document.querySelectorAll('.input-fraud-type'),
        continueButton = document.querySelector('.button');

        form.addEventListener('submit', function (e) {
          if(atLeastOneChecked(inputs) === false) {
            fieldset.classList.add('invalid');
            msgBox.classList.add('validation-message');
            msgBox.appendChild(msgText);
            form.insertBefore(msgBox,continueButton.previousSibling);
            e.preventDefault();
          }
        })
  }

  bindEvents = function () {
    var inputs    = document.querySelectorAll('.hide-show');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", hideShow, true );
    };

    if(document.querySelector('#form-fraud-type')) {
      fraudTypeValidation();
      document.querySelector('#step2').addEventListener('click', function (e) {
        var otherPerson = (document.querySelector('#checkbox-1').checked) ? true : false
        sessionStorage.otherPerson = otherPerson;
      })
    }

    if(document.querySelector('#button-step3a')) {
      basicInfoValidation();
    }

    if(document.querySelector('#button-step3a-route3')) {
      basicInfoValidationRoute3();
    }

    if(document.querySelector('#form-additonal-suspect-details')) {
      isTherePartner();
    }

    if(document.querySelector('#button-step4b')) {
      partnerInfo();
    }
    if(document.querySelector('#button-step6')) {
      suspectWork();
    }

  };

  return {
    bindEvents : bindEvents()
  };

})();
