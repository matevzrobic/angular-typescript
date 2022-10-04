addEventListener("load", function() {
    let fname = document.querySelector("#fname");
    let lname = document.querySelector("#lname");
    let psw = document.querySelector("#psw");
    let email = document.querySelector("#email");
    let form = document.querySelector("#form");
    
    let regName = new RegExp ('[a-zA-ZčČšŠćĆđĐžŽ]+[-{1}| {1}a-zA-ZčČšŠćĆđĐžŽ]*');
    let regEmail = new RegExp ('[a-zA-ZčČšŠćĆđĐžŽ0-9\-{1}\.{1}\_]+[a-zA-ZčČšŠćĆđĐžŽ0-9]*@[a-zA-ZčČšŠćĆđĐžŽ0-9\-{1}\.{1}\_]+[a-zA-ZčČšŠćĆđĐžŽ]{2,4}');
    let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    
    form.addEventListener("submit", function(e) {

        document.querySelector("#napakaIme").style.display = "none";
        document.querySelector("#napakaPriimek").style.display = "none";
        document.querySelector("#napakaEmail").style.display = "none";
        document.querySelector("#napakaGeslo").style.display = "none";
        
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
            console.log("NAPAKA V EMAILU");
            e.preventDefault();
            document.querySelector("#napakaEmail").style.display = "block";
        }
        if (!regPsw.test(psw.value)) {
            console.log("NAPAKA V GESLU");
            e.preventDefault();
            document.querySelector("#napakaGeslo").style.display = "block";
        }

        

    });
});

