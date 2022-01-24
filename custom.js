// header: nav manu with the hamburger icon
const body = document.querySelector("body");
const menuBtn = document.getElementById("btn_menu");
const cancelBtn = document.getElementById("btn_cancel");
const navbarStatic = document.getElementById("navbar-static");
const navbarFull = document.getElementById("navbar-full");
const nav = document.querySelector("nav");

menuBtn.onclick = () => {
    navbarFull.style.display = "flex";
    navbarStatic.style.display = "none";
    body.classList.add("disabled");
}

cancelBtn.onclick = () => {
    navbarFull.style.display = "none";
    navbarStatic.style.display = "flex";
    body.classList.remove("disabled");
}

window.onscroll = () => {
    this.scrollY > 20 ? nav.classList.add("sticky-top") : nav.classList.remove("sticky-top");
}



// footer: copyright auto generation
let copyYear = "2021";
let now = new Date;
let curYear = now.getFullYear();
let credit = document.getElementById("copyright-text");

if (copyYear == curYear) {
    credit.innerHTML = copyYear + ", The HAUKAI";
} else {
    credit.innerHTML = copyYear + "-" + curYear + ", The HAUKAI";
}



// Contact page: Name validation - enter condition for preventing Command Injection and the vaild value
let nameRegEx = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=0-9]/gi; // user cannot enter these all special charactor, blank and number
let nameError = document.getElementById("name-error");

function nameCharCheck(obj) {
    if (nameRegEx.test(obj.value) ){
        nameError.classList.add("alert-danger");
        nameError.innerHTML="Please enter your correct name.";
        obj.value = obj.value.substring( 0 , obj.value.length - 1 );
        setTimeout(function() {
            nameError.classList.remove("alert-danger");
            nameError.innerHTML="";
        }, 3000);
    }
}


// Contact page: Email validation - enter condition for preventing Command Injection and the vaild value
let emailRegEx = /[ \{\}\[\]\/?,;:|\)*~`!^\+┼<>\#$%&\'\"\\\(\=]/gi; // user cannot enter shell commands and these special charactors (only can enter . and @)
let emailError = document.getElementById("email-error");

function emailCharCheck(obj) {
    if (emailRegEx.test(obj.value) ){
        emailError.classList.add("alert-danger");
        emailError.innerHTML="Can not enter special characters.";
        obj.value = obj.value.substring( 0 , obj.value.length - 1 );
        setTimeout(function() {
            emailError.classList.remove("alert-danger");
            emailError.innerHTML="";
        }, 3000);
    }
}


// Contact page: Content validation - enter condition for preventing Command Injection
let contentRegEx = /[&<>};|{[\]]+$/gi; // user cannot enter shell commands (filter sensitive characters such as |, &, ;, > and <)
let contentError = document.getElementById("content-error");

function contentSettimeout() {
    setTimeout(function() {
        contentError.classList.remove("alert-danger");
        contentError.innerHTML="";
    }, 3000);
}

function contentCharCheck(obj) {
    if (contentRegEx.test(obj.value) ){
        contentError.classList.add("alert-danger");
        contentError.innerHTML="Can not enter special characters.";
        obj.value = obj.value.substring( 0 , obj.value.length - 1 );
        contentSettimeout();
    }
}


// Contact page: submit button click
let cusName = document.getElementById("cus_name");
let cusEmail = document.getElementById("cus_email");
let cusContent = document.getElementById("cus_content");

if (document.getElementById("submit")) {
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault(); // prevent opening the URL
        if (cusName.value == "" || cusEmail.value == "" || cusContent.value == "") {
            contentError.classList.add("alert-danger");
            contentError.innerHTML="Please enter all fields.";
            contentSettimeout();
            return false;
        } else {
            // check input values again for preventing Command Injection
            if (nameRegEx.test(cusName.value) | emailRegEx.test(cusEmail.value) | contentRegEx.test(cusContent.value)) {
                contentError.classList.add("alert-danger");
                contentError.innerHTML="Please enter correctly.";
                contentSettimeout();
                return false;
            } else {
                if (confirm ("Are you sure to submit?\n\n Name: " + cusName.value
                    + "\n Email: " + cusEmail.value + "\n Content: \n" + cusContent.value) == true) {
                        // needed back-end validation after integration for security
                        cusName.value = "";
                        cusEmail.value = "";
                        cusContent.value = "";
                        contentError.classList.add("alert-success");
                        contentError.innerHTML="Submit complete.";
                } else {
                    return false;
                }
            }
        }
    })
}

