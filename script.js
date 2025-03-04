/**************** DROPDOWN LIST *******************/
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.bx.bxs-chevron-down');
    const dropdownMenu = document.getElementById('dropdown-menu');
    let hideTimeout;

    function showMenu() {
        clearTimeout(hideTimeout);
        dropdownMenu.style.display = 'block';
        setTimeout(() => {
            dropdownMenu.style.opacity = 1;
        }, 10); // Slight delay to ensure the transition works
    }

    function hideMenu() {
        dropdownMenu.style.opacity = 0;
        hideTimeout = setTimeout(() => {
            dropdownMenu.style.display = 'none';
        }, 1000); // 1 second delay before hiding completely
    }

    toggleButton.addEventListener('click', () => {
        if (dropdownMenu.style.display === 'block') {
            hideMenu();
        } else {
            showMenu();
        }
    });

    dropdownMenu.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        dropdownMenu.style.opacity = 1;
    });

    dropdownMenu.addEventListener('mouseleave', () => {
        hideMenu();
    });
});
/***************************************************** */



/*login ----> pour accede directement login/sginup*/

/*********** BLOCK POUR INPUT DATE AND DOUBLE_CLICK *************/
const inputField = document.getElementById('combinedInput');
let isDateMode = false;

inputField.addEventListener('dblclick', function() {
    if (isDateMode) {
        // Si le mode est déjà date, revenir au mode texte
        inputField.type = 'text';
        inputField.value = ''; // Réinitialiser la valeur à vide
        inputField.placeholder = 'Date';
        isDateMode = false;
    } else {
        // Si le mode est texte, passer au mode date
        inputField.type = 'date';
        inputField.value = ''; // Réinitialiser la valeur à vide
        inputField.focus(); // Mettre le focus sur le champ de date
        isDateMode = true;
    }
});
/***************************************************************** */

//script pour la formule  de login/SignUp
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});


// touche les icon pour conncter avec app

// il faut apprandre de regle le probleme dans ce code il function pas correctement comme il faut il ouver l'ongle 
//mais il affiche un message d'un error

function facebookLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
      // L'utilisateur s'est connecté et a autorisé votre application
      FB.api('/me', { fields: 'name,email' }, function(response) {
    
        var name = response.name;
        var email = response.email;
        fetch('/http://127.0.0.1:5500/form.html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: name, email: email })
        })
        .then(function(response) {
         
        })
        .catch(function(error) {
          
        });
      });
      // Vous pouvez accéder à l'API Facebook en utilisant votre clé d'API ici
    } else {
      // L'utilisateur a refusé la connexion ou n'a pas autorisé votre application
    }
  }, {scope: 'email'}); // Définissez les autorisations requises ici
}


function validateForm(form) {
  const emailInput = form.querySelector('input[name="email"]');
  const phoneInput = form.querySelector('input[name="phone"]');
  const nameInput = form.querySelector('input[name="name"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const name = nameInput.value.trim();
  const password = passwordInput.value.trim();
  let isValid = true;

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
  } else {
      hideError(emailInput);
  }

  // Validation du numéro de téléphone
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
      showError(phoneInput, 'Phone number must be exactly 10 digits.');
      isValid = false;
  } else if (/[^0-9]/.test(phone)) {
      showError(phoneInput, 'Phone number can only contain digits (0-9).');
      isValid = false;
  } else {
      hideError(phoneInput);
  }

  // Validation du nom
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
      showError(nameInput, 'Name must contain only letters (A-Z, a-z).');
      isValid = false;
  } else {
      hideError(nameInput);
  }

  // Validation du mot de passe
  if (password.length < 8) {
      showError(passwordInput, 'Password must be at least 8 characters long.');
      isValid = false;
  } else {
      hideError(passwordInput);
  }

  // Si toutes les validations passent, retourner true pour soumettre le formulaire
  return isValid;
}


function showError(input, errorMessage) {
  const errorElement = input.parentElement.querySelector('.error-message');
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block'; // Afficher le message d'erreur
}

function hideError(input) {
  const errorElement = input.parentElement.querySelector('.error-message');
  errorElement.textContent = '';
  errorElement.style.display = 'none'; // Masquer le message d'erreur
}

