    let form = document.getElementById("signUp");
    form.addEventListener("submit",validateForm);

    function validateForm(e) {
        e.preventDefault(); 

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let loader = document.getElementById("loader");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    loader.innerHTML = "";

    if (email.value === "") {
        emailError.innerHTML = "Email is required";
        emailError.style.color = "red";
    }

    if (password.value.length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters";
        passwordError.style.color = "red";
    }

    if (email.value !== "" && password.value.length >= 6) {
        loader.classList.remove("hidden")
        loader.innerHTML = "Loading...";
        loader.style.color = "green";

        setTimeout(function() {
            window.location.href = "home.html";
        }, 2000);
    }
}