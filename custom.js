// nav manu with the hamburger icon
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

if (copyYear == curYear) credit.innerHTML = copyYear + ", The HAUKAI";
else credit.innerHTML = copyYear + "-" + curYear + ", The HAUKAI";


// contact page: submit button click
if (document.getElementById("submit")) {
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault(); // prevent opening the URL
        let name = document.getElementById("cus_name");
        let email = document.getElementById("cus_email");
        let content = document.getElementById("cus_content");
        if (name.value == "" || email.value == "" || content.value == "") {
            alert("Please enter all boxes.");
            return false;
        } else {
            if (confirm ("Are you sure to submit?\n\n Name: " + name.value
                + "\n Email: " + email.value + "\n Content: \n" + content.value) == true) {
                    // below would be change for the backend integration
                    name.value = "";
                    email.value = "";
                    content.value = "";
                    alert("complete.");
            } else {
                return false;
            }
        }
    })
}