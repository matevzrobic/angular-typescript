// var kupon;
//
// function preveriKupon() {
//     let kuponi;
//     niz = document.getElementById("kuponText").value;
//     cena = document.getElementById("skupnaCena").innerHTML;
//     var zahteva = new XMLHttpRequest();
//     zahteva.open("GET", "api/kuponi", true);
//     zahteva.addEventListener("load", function() {
//         kuponi = JSON.parse(zahteva.responseText);
//         for(var i = 0; i < kuponi.length; i++) {
//             if(kuponi[i].niz == niz) {
//                 novaCena = cena * (1-kuponi[i].popust/100);
//                 document.getElementById("skupnaCena").innerHTML = novaCena.toFixed(2);
//                 document.getElementById("kuponButton").disabled = true;
//                 kupon = kuponi[i]._id;
//                 break;
//             }
//         }
//     });
//     zahteva.send(null);
// }
/*
addEventListener("load", () => {
    var forma = document.querySelector("#dodajNakup");
    forma.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(kupon);
        var novaCena = document.getElementById("skupnaCena").innerHTML;
        console.log(novaCena);
        var url = window.location.href;
        var parameters = {
            "kupon" : kupon,
            "skupnaCena" : novaCena
        };
        url.split("/");
        httpZahteva = new XMLHttpRequest();
        httpZahteva.open("POST", url, true)
        httpZahteva.setRequestHeader("Content-type", "application/json");
        httpZahteva.addEventListener("load", () => {});
        httpZahteva.send(JSON.stringify(parameters));
        window.location.replace("/izdelki");
    });
})
*/
