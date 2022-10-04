addEventListener("load", function() {
    let psw = document.querySelector("#psw");
    let email = document.querySelector("#email");
    let form = document.querySelector("#form");
    
    let regEmail = new RegExp ('[a-zA-ZčČšŠćĆđĐžŽ0-9\-{1}\.{1}\_]+[a-zA-ZčČšŠćĆđĐžŽ0-9]*@[a-zA-ZčČšŠćĆđĐžŽ0-9\-{1}\.{1}\_]+[a-zA-ZčČšŠćĆđĐžŽ]{2,4}');
    let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    
    form.addEventListener("submit", function(e) {

        document.querySelector("#napaka").style.display = "none";
        
        if (!regEmail.test(email.value) || !regPsw.test(psw.value)) {
            console.log("NAPAKA V EMAILU ALI GESLU");
            e.preventDefault();
            document.querySelector("#napaka").style.display = "block";
        }
    });
});

