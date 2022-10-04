addEventListener("load", function() {
    let fname = document.querySelector("#fname");
    let lname = document.querySelector("#lname");
    let psw = document.querySelector("#psw");
    let email = document.querySelector("#email");
    let form = document.querySelector("#form");
    let pswValidation = document.querySelector("#psw-validation");
    
    let regName = new RegExp ('^[a-zA-Z]+$');
    let regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
    let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    
    form.addEventListener("submit", function(e) {

        document.querySelector("#napakaIme").style.display = "none";
        document.querySelector("#napakaPriimek").style.display = "none";
        document.querySelector("#napakaEmail").style.display = "none";
        document.querySelector("#napakaGeslo").style.display = "none";
        document.querySelector("#napakaValidation").style.display = "none";
        
        if (!regName.test(fname.value)) {
            console.log("NAPAKA V IMENU");
            e.preventDefault();
            document.querySelector("#napakaIme").style.display = "block";
        }
        if (!regName.test(lname.value)) {
            console.log("NAPAKA V PRIIMKU");
            e.preventDefault();
            document.querySelector("#napakaPriimek").style.display = "block";
        }
        if (!regEmail.test(email.value)) {
            console.log(email.value);
            console.log("NAPAKA V EMAILU");
            e.preventDefault();
            document.querySelector("#napakaEmail").style.display = "block";
        }
        if (!regPsw.test(psw.value)) {
            console.log("NAPAKA V GESLU");
            e.preventDefault();
            document.querySelector("#napakaGeslo").style.display = "block";
        }
        if (psw.value != pswValidation.value) {
            console.log("NEUJEMANJE GESLA");
            e.preventDefault();
            document.querySelector("#napakaValidation").style.display = "block";
        }

        

    });
});

