(function() {
  var inputPassword = document.querySelector('.input-password'),
      sendForm = document.querySelector('.sign-in'),
      emailHelp = document.querySelector('.help-email'),
      openPassword = document.querySelector('.view-password');

  document.querySelectorAll('input.input-field').forEach(function(inputEl) {
    if(inputEl.value.trim() !== '') {
      inputEl.parentNode.classList.add('input-filled');
    }

    inputEl.addEventListener('focus', onInputFocus);
    inputEl.addEventListener('blur', onInputBlur);
  });

  var onEnter = function(event) {
    if(event.keyCode == 13) {
      event.preventDefault();
    }

    return false;
  }

  function onInputFocus(event) {
    event.target.parentNode.classList.add('input-filled');

    if(event.target.id == 'email-adress') {
      inputPassword.classList.remove('active');
      //btnAddPassword.classList.remove('disable');
      sendForm.classList.remove('active');

      event.target.onkeyup = function() {
        if(this.value) {
          if(isValidEmailAddress(this.value)) {
            this.parentNode.classList.remove('novalid');
            this.parentNode.classList.add('valid');
            emailHelp.classList.remove('active');

            this.onkeyup = onEnter;
          } else {
            this.parentNode.classList.remove('valid');
            this.parentNode.classList.add('novalid');
          }
        } else {
          this.parentNode.classList.remove('valid');
          this.parentNode.classList.remove('novalid');
        }
      }
    }
  }

  function onInputBlur(event) {
    if(event.target.value.trim() === '') {
      event.target.parentNode.classList.remove('input-filled');
    }
  };

  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };

  sendForm.onclick = function(){
    var inputEmail = document.querySelector('.input-email .input');

    if (!inputEmail.classList.contains('valid')) {
      emailHelp.classList.add('active');
    } else {
      alert('Successfully');
    }
  };

  openPassword.onclick = function(){
    var passwordInput = document.querySelector('#password-field');
    var passwordInputVisible = document.querySelector('.visible');
    var passwordInputInisible = document.querySelector('.invisible');

    if(passwordInput.type == 'password') {
      passwordInput.setAttribute('type', 'text');
      passwordInputVisible.classList.remove('active');
      passwordInputInisible.classList.add('active');
    } else {
      passwordInput.setAttribute('type', 'password');
      passwordInputInisible.classList.remove('active');
      passwordInputVisible.classList.add('active');
    }
  };
})();
