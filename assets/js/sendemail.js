// Function adapted from CI tutorial for emailjs in mini-project walkthrough
function sendMail(contactForm) {
    emailjs.send("Duncan", "ci-ms77", {
        "from_firstname": contactForm.firstname.value,
        "from_lastname": contactForm.lastname.value,
        "from_email": contactForm.email.value,
        "request_message": contactForm.message.value,
        "subscribe": contactForm.subscribe.value
    })
        .then(
            // Change button text to green and display 'sent' message
            function () {
                let sentButton = document.getElementById('submit-btn');
                sentButton.style.backgroundColor = "green";
                sentButton.innerHTML = "Sent!";
            },
            // On error, using standard browser alert
            function (error) {
                alert("Sorry, it seems we have a problem. Please fill out the form and Submit again", error);
            });
            // Clear form after submission
            document.getElementById('contactForm').reset();
    return false;
}