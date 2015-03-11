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

  var atLeastOneFieldEntered =  function (inputs) {
    var atLeastOneFieldEntered = false;
    for (i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        atLeastOneFieldEntered = true;
      }
    }
    return atLeastOneFieldEntered;
  }

  var fraudTypeValidation = function () {
    var form           = document.querySelector('#form-fraud-type'),
        fieldset       = document.querySelector('.fieldset-fraud-type'),
        msgBox         = document.createElement('div'),
        msgText        = document.createTextNode('Please select atleast one type of fraud.'),
        inputs         = document.querySelectorAll('.input-fraud-type'),
        continueButton = document.querySelector('.button');

    form.addEventListener('submit', function (e) {
      if(atLeastOneChecked(inputs) === false) {
        fieldset.className += ' invalid';
        msgBox.className += ' validation-message';
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
      input.className += ' invalid';

      input.parentNode.className += ' invalid';
      msgBox.className += ' validation-message';
      msgBox.appendChild(msgText);
      form.insertBefore(msgBox,continueButton.previousSibling);
    }
    else {
      input.className.replace('invalid','');
      input.parentNode.className.replace('invalid','');
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

      form.addEventListener('submit', function (e) {
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
            msgText  = document.createTextNode('Please enter a date of birth or an approximate age.');

        fieldset.className += ' invalid';
        msgBox.className += ' validation-message';
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
            msgText = document.createTextNode('Please enter a full date of birth.');


        if(day.value === '') {
          day.className += ' invalid'
          dobFull = false;
        }
        if(month.value === ''){
          month.className += ' invalid'
          dobFull = false;
        }
        if(year.value === ''){
          year.className += ' invalid'
          dobFull = false;
        }

        if (dobFull === false) {
          sendForm = false;
          day.parentNode.parentNode.parentNode.className += ' invalid'
          msgBox.className += ' validation-message';
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,continueButton.previousSibling);
        }
      }

      if(document.querySelector('#radio-indent-dob-2').checked) {
        var form      = document.querySelector('#form-suspect-info'),
            approxAge = document.querySelector('#dob-approx'),
            msgBox    = document.createElement('div'),
            msgText   = document.createTextNode('Please enter an approximate age.');

        if(approxAge.value === '') {
          approxAge.className += ' invalid';
          approxAge.parentNode.parentNode.className += ' invalid';
          msgBox.className += ' validation-message';
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
          var msgText = document.createTextNode('Please enter either a building and street name and town or just a postcode.');
          sendForm = false;
          if (address.value === '') {
            address.className += ' invalid';
          }
          if (town.value === '') {
            town.className += ' invalid';
          }
          if (postcode.value === '') {
            postcode.className += ' invalid';
          }
          if (address.value === '' && town.value) {
            var msgText = document.createTextNode('Please enter either a building and street name or postcode.');
          }
          if (address.value && town.value === '') {
            var msgText = document.createTextNode('Please enter either a town or postcode.');
          }
          postcode.parentNode.parentNode.className += ' invalid';
          msgBox.className += ' validation-message';
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,continueButton.previousSibling)
        }
      }

      if (document.querySelector('#radio-indent-contact-yes').checked) {
        var inputs = document.querySelectorAll('.step3-contact');
        if (! atLeastOneFieldEntered(inputs)) {

          var msgText    = document.createTextNode('Please enter at least one contact detail.'),
              msgBox     = document.createElement('div'),
              homeNumber = document.querySelector('#home-number');

          homeNumber.parentNode.parentNode.className += ' invalid';
          msgBox.className += ' validation-message';
          msgBox.appendChild(msgText);
          form.insertBefore(msgBox,continueButton.previousSibling)
        }
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
        document.querySelector('.hasPartner').parentNode.parentNode.parentNode.className += ' invalid'
        msgBox.className += ' validation-message';
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
        workType.parentNode.parentNode.parentNode.className += ' invalid';
        sendForm = false;
      }

      if (sendForm === false) {
        e.preventDefault();
      }
    });

  }

  var vehicleDetails = function () {
    var form           = document.querySelector('#form-vehicle-information'),
        vehicleType    = document.querySelector('#vehicle-type');
        form.addEventListener('submit', function (e) {
          if(vehicleType.value === '') {
            errorMsg('add',vehicleType,'Please enter the type of transport.');
            e.preventDefault();
          }
        })
  }

  var businessRules = function () {
    var form             = document.querySelector('#form-suspect-info');

    form.addEventListener('submit', function (e) {
      var firstname        = document.querySelector('#first-name-2'),
          lastname         = document.querySelector('#last-name-2'),
          nino             = document.querySelector('#nino'),
          othernameChecked = document.querySelector('#radio-indent-other-yes').checked,
          ninoChecked      = document.querySelector('#radio-indent-nino-yes').checked,
          addressChecked   = document.querySelector('#radio-indent-address-yes').checked,
          contactsChecked  = document.querySelector('#radio-indent-contact-yes').checked,
          ageDob           = atLeastOneChecked(document.querySelectorAll('.dob-age')),
          submitForm       = true;





      if (ninoChecked && nino.value === '') {
        console.log('enter nino')
      }

      if (ninoChecked && nino.value !== '') {
        if ((firstname.value === '' && lastname.value === '' && ageDob === false) && (addressChecked === false) && (contactsChecked === false) ) {
        console.log('nino entered but nothing else')
        }
      }

      if (firstname.value && (lastname.value === '' && ageDob === false && addressChecked === false && contactsChecked === false)) {
        console.log('first name but nothing else')
      }

      if (lastname.value && (firstname.value === '' && ageDob === false && addressChecked === false && contactsChecked === false)) {
        console.log('last name but nothing else')
      }

      if (ageDob === true && (firstname.value === '' && lastname.value === '') && (addressChecked === false && contactsChecked === false)) {
        console.log('age but nothing else')
      }


      e.preventDefault();
    })
  }

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
      //businessRules();
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

    if(document.querySelector('#form-vehicle-information')) {
      vehicleDetails();
    }

  };

  return {
    bindEvents : bindEvents()
  };

})();
