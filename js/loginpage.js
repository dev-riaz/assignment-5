const loginBtn = document.getElementById('login-btn').addEventListener('click', function () {
    const usernameInput = document.getElementById('username-input');
    const usernameValue = usernameInput.value;

    const inputPassword = document.getElementById('password-input')
    const passValue = inputPassword.value;

    if (usernameValue === 'admin' && passValue === 'admin123') {
        alert('Login Successful')
        window.location.assign("./homepage.html")
    } else {
        alert('Invalid username & password')
    }

})