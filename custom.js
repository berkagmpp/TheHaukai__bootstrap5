// header: nav manu with the hamburger icon
// Remove global variables that may cause security issues by accessing the browser
// Use of Closure: Prevent exposure and inaccessible of regional variables and functions declared inside const navEvent
const navEvent = (function () { 
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
    return {
        menuBtn: menuBtn,
        cancelBtn: cancelBtn
    }
})();



// Contact page: validation - enter condition for preventing Command Injection and the vaild value
// Remove global variables that may cause security issues by accessing the browser
// Use of Closure: Prevent exposure and inaccessible of regional variables and functions declared inside const manager
const manager = (function () { 

    // Name
    const nameRegEx = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=0-9]/gi; // user cannot enter these all special charactor, blank and number
    const nameError = document.getElementById("name-error");

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

    // Email
    const emailRegEx = /[ \{\}\[\]\/?,;:|\)*~`!^\+┼<>\#$%&\'\"\\\(\=]/gi; // user cannot enter shell commands and these special charactors (only can enter . and @)
    const emailError = document.getElementById("email-error");

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

    // Content
    const contentRegEx = /[&<>};|{[\]]+$/gi; // user cannot enter shell commands (filter sensitive characters such as |, &, ;, > and <)
    const contentError = document.getElementById("content-error");
    const cusContent = document.getElementById("cus_content");

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

    // Submit click
    const cusName = document.getElementById("cus_name");
    const cusEmail = document.getElementById("cus_email");

    if (document.getElementById("submit")) {
        document.getElementById("submit").addEventListener("click", submit);
    }

    function submit(event) {
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
                        // needed server-side validation after integration for security
                        cusName.value = "";
                        cusEmail.value = "";
                        cusContent.value = "";
                        contentError.classList.add("alert-success");
                    contentError.innerHTML = "Submit complete.";
                } else {
                    return false;
                }
            }
        }
    }

    return {
        nameCharCheck: nameCharCheck,
        emailCharCheck: emailCharCheck,
        contentCharCheck: contentCharCheck,
        submit: submit
    };
})();



// footer: copyright auto generation
// Remove global variables that may cause security issues by accessing the browser
// Use of Closure: Prevent exposure and inaccessible of regional variables and functions declared inside anonymous function
// Set to excute footer-copyright with html and script(DOMContentLoaded) loading before onload
(function () { 
    const copyYear = 2021;
    const now = new Date;
    const curYear = now.getFullYear();
    const credit = document.getElementById("copyright-text");

    window.addEventListener('DOMContentLoaded', copyText);
    function copyText() {
        if (copyYear === curYear) {
            credit.innerHTML = copyYear + ", The HAUKAI";
        } else {
            credit.innerHTML = copyYear + "-" + curYear + ", The HAUKAI";
        }
    }
    return {
        window : window
    }
})();



// Contact page: Google map iframe
// Remove global variables that may cause security issues by accessing the browser
// Use of Closure: Prevent exposure and inaccessible of regional variables and functions declared inside anonymous function
// Set to excute <iframe> which has a slow loading speed after the all content are loaded
// for preventing JavaScript errors in the foam input validation on contact page.
(function () { 
    if (document.getElementById("map-iframe")) {
        const iframe = document.createElement('iframe');
        window.onload = function() {
            iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11615.282571345257!2d174.00238844449052!3d-35.22069815766716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0bb73e31b0728b%3A0x500ef6143a2d500!2sKerikeri!5e0!3m2!1sen!2snz!4v1642044788042!5m2!1sen!2snz";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.allowFullscreen = "";
            iframe.loading = "lazy";
            iframe.title = "Google map for location";
            document.getElementById("map-iframe").appendChild(iframe);
        }
        return {
            window : window
        }
    }
})();