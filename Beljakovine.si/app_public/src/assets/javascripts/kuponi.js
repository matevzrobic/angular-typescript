// let regNiz = new RegExp('^[0-9a-zA-Z]+$');
// let regDatum = new RegExp('^[2-9][0-9][0-9][0-9]-(0[1-9]|1[012])-[012][0-9]$');
//
// addEventListener("load", function() {
//     var dodajKupon = document.querySelector("#dodajKupon");
//     dodajKupon.addEventListener("submit", function(dogodek) {
//         if (!regNiz.test(dodajKupon.elements.niz.value)) {
//             document.querySelector("#popraviPoljeVnosaKupon").style.display = "flex";
//             dogodek.preventDefault();
//         }
//         if (dodajKupon.elements.popust.value < 1 || dodajKupon.elements.popust.value > 99) {
//             document.querySelector("#popraviPoljeVnosaKupon").style.display = "flex";
//             dogodek.preventDefault();
//         }
//         if (!regDatum.test(dodajKupon.elements.datum.value)) {
//             document.querySelector("#popraviPoljeVnosaKupon").style.display = "flex";
//             dogodek.preventDefault();
//         }
//     });
// });
