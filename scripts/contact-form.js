function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    if (name.trim() === "") {
        nameError.textContent = "* Obligatorisk";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "* Ogiltigt e-postadress";
        isValid = false;
    }

    if (message.trim() === "") {
        messageError.textContent = "* Obligatorisk";
        isValid = false;
    }

    return isValid;
}

// Add pop up: "Ditt meddelande har skickats."