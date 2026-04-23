document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginButton = loginForm.querySelector('button[type="submit"]');

    // Show/hide password toggle
    const passwordField = document.getElementById('loginPassword');
    const togglePassword = document.createElement('span');
    togglePassword.classList.add('toggle-password');
    togglePassword.innerHTML = '<i class="eye-icon">👁️</i>';
    passwordField.parentNode.appendChild(togglePassword);

    togglePassword.addEventListener('click', function () {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.innerHTML = '<i class="eye-icon">👁️</i>';
        } else {
            passwordField.type = 'password';
            togglePassword.innerHTML = '<i class="eye-icon">🙈</i>';
        }
    });

    // Form submission handling
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Perform validation (optional)
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
        }

        // Prepare the data to send to the server
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // Send an AJAX request to the server
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Check the response from the server
            if (data.includes('User account does not exist')) {
                alert('User account does not exist. Please sign up.');
                window.location.href = 'signup.html';
            } else if (data.includes('Incorrect password')) {
                alert('Incorrect password.');
            } else {
                // If login is successful, redirect to the main page
                window.location.href = 'main.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the login process. Please try again.');
        });
    });
    // Example login function (this is usually in your login script)
    function login(userId) {
    // Assuming you get the userId when the user logs in
    sessionStorage.setItem('user_id', userId);
    // Redirect to chat page or other necessary actions
    window.location.href = 'chat.html';
}

});
