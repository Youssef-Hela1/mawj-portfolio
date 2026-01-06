document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Credentials
    const validEmail = "mawj.eg@outlook.com";
    const validPass = "M123456";

    // Validate (Email case-insensitive, Pass case-sensitive)
    if (emailInput.toLowerCase() === validEmail.toLowerCase() && passwordInput === validPass) {
        // Success
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        // Error
        errorMsg.style.display = 'block';

        // Reset animation to allow re-shake
        errorMsg.style.animation = 'none';
        errorMsg.offsetHeight; /* trigger reflow */
        errorMsg.style.animation = 'shake 0.4s ease-in-out';
    }
});
