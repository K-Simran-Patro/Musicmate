document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to server-side for processing
    fetch('signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Account created successfully!");
            window.location.href = "login.html";  // Redirect to login page
        } else {
            alert("Signup failed: " + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Show/hide password toggle
const passwordField = document.getElementById('password');
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
