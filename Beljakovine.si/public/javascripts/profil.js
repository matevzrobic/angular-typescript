
addEventListener("load", function() {
    if(screen.width < 768)
        $("#sidebarProfil").addClass("row");
    else
        $("#sidebarProfil").className = '';
        
    
    var nakupi = document.querySelectorAll(".nakup");
    for (var i = 0; i<nakupi.length; i++) {
        
        nakupi[i].addEventListener('contextmenu', function(event) {
              
              var par = event.path;
              for (var k = 0; k < par.length; k++){
                  if(par[k].id) {
                      //klici api delete
                      console.log(par[k].id);
                        let url = window.location.href;
                        let praviUrl = url.split("#");
                        var http = new XMLHttpRequest();
                        http.open('DELETE', praviUrl[0] + "/" + par[k].id, true);
                        http.send(null);
                        location.reload();

                      //console.log(par[k].id);
                      break;
                  }
              }
              event.preventDefault();
        });
        
    }
    

    // let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        
    
    /*var changedInfo = []
    const inputsP = document.querySelectorAll("#profil input");
    for(var i = 0; i<inputsP.length; i++) {
        changedInfo.push(0);
        
        inputsP[i].id = i;
        
        inputsP[i].onblur = function(e) {
            
            if (e.target.value != "") changedInfo[e.target.id] = 1;
            else changedInfo[e.target.id] = 0;
            
            
            if(changedInfo.reduce((a, b) => a + b, 0)  > 0) {
                document.getElementById("updateInfoButton").disabled = false;
            } else {
                document.getElementById("updateInfoButton").disabled = true;
            }
        }
    }
    
    
    var changedGeslo = []
    const inputsG = document.querySelectorAll("#sprGesla input");
    for(var i = 0; i<inputsP.length; i++) {
        changedGeslo.push(0);
        
        inputsG[i].id = i;
        
        inputsG[i].onblur = function(e) {
            
            if (e.target.value != "") changedGeslo[e.target.id] = 1;
            else changedGeslo[e.target.id] = 0;
            
            
            if(changedGeslo.reduce((a, b) => a + b, 0)  > 0) {
                document.getElementById("updateGesloButton").disabled = false;
            } else {
                document.getElementById("updateGesloButton").disabled = true;
            }
        }
    }*/

    let regName = new RegExp ('^[a-zA-Z]+$');
    let regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
    let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    const formInfo = document.querySelector("#updateInfo");
    const btn = document.querySelector("#updateInfoButton");
    formInfo.addEventListener("submit", function(e) {
        
        e.preventDefault();
        e.stopPropagation();
        //e.preventDefault();
        let url = window.location.href;
        let praviUrl = url.split("#");
        let ime = formInfo.elements.ime.value;
        let priimek = formInfo.elements.priimek.value;
        let email = formInfo.elements.email.value;
        let datumRojstva = formInfo.elements.datumRojstva.value;
        let flag = 0;
        if (!regName.test(ime) && ime) {
            alert("Neustrezen vnos imena!");
            flag = 1;
        }
        if (!regName.test(priimek) && priimek) {
            alert("Neustrezen vnos priimka!");
            flag = 1;
        }
        if (!regEmail.test(email) && email) {
            alert("Neustrezen vnos email naslova!");
            flag = 1;
        }
        if (!flag) {
            if (!ime) ime = formInfo.elements.ime.placeholder;
            if (!priimek) priimek = formInfo.elements.priimek.placeholder;
            if (!email) email = formInfo.elements.email.placeholder;
            let updateInfoUporabnik = {
                "ime" : ime,
                "priimek" : priimek,
                "email" : email,
                "datumRojstva" : datumRojstva,
            }
            var xhttp = new XMLHttpRequest();
            xhttp.open('put', praviUrl[0]+'/u/i', true);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.send(JSON.stringify(updateInfoUporabnik));
            window.location.reload();
        }
    });

    const formGeslo = document.querySelector("#updateGeslo");
    const btnGeslo = document.querySelector("#updateGesloButton");
    btnGeslo.addEventListener("click", function(e) {
        e.preventDefault();
        let url = window.location.href;
        let praviUrl = url.split("#");
        let geslo = formGeslo.elements.novoGeslo.value;
        console.log("JS")
        console.log(formGeslo.elements.novoGeslo.value);
        let flag = 0;
        if (!regPsw.test(geslo)) {
            alert("Neustrezen vnos gesla!");
            flag = 1;
        }
        if (!flag) {
            console.log("POSILJAMO GESLO NAPREJ");
            console.log(geslo);
            let updateGesloUporabnik = {
                "geslo" : geslo,
            }
            var xhttp = new XMLHttpRequest();
            xhttp.open('put', praviUrl[0]+'/u/g', true);
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.send(JSON.stringify(updateGesloUporabnik));
            location.reload();
        }
    });

    
});
function zbrisiRacun(){
    let url = window.location.href;
    let praviUrl = url.split("#");
    var http = new XMLHttpRequest();
    http.open('DELETE', praviUrl[0], false);
    http.send(null);
    location.reload();
}

function odjava(){
    let url = window.location.href;
    let praviUrl = url.split("#");
    var http = new XMLHttpRequest();
    http.open("GET", praviUrl[0] + "/odjava", true);
    http.send(null);
    location.reload();
}