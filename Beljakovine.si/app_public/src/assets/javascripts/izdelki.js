function deleteIzdelka(){
  var sinhronaZahteva = new XMLHttpRequest();
  var split = window.location.href.split("/");
  var id = split[split.length-1];
  sinhronaZahteva.open("DELETE", window.location.href , false);
  sinhronaZahteva.send(null);
}

function zacniUrejanje() {
  document.getElementById("naziv").contentEditable = true;
  document.getElementById("cena").contentEditable = true;
  document.getElementById("opis").contentEditable = true;
  document.getElementById("ocena").contentEditable = true;
  document.getElementById("ocena").style.display = "block";
  document.getElementById("ocenaIme").style.display = "block";
  document.getElementById("potrdiUrejanje").style.display = "block";
}

function putIzdelka() {
  var split = window.location.href.split("/");
  var id = split[split.length-1];
  let naziv = document.getElementById("naziv").innerHTML;
  let cena = document.getElementById("cena").innerHTML;
  let opis = document.getElementById("opis").innerHTML;
  let ocena = document.getElementById("ocena").innerHTML;
  let slikaTmp = document.getElementById("slika").src
  var split = slikaTmp.split("/");
  let index = 0;
  for(var i=0; i<split.length; i++) {
    if(split[i] == "img") {
      index = i;
      break;
    }
  }
  let slika = '';
  for(var i=index; i<split.length; i++) {
    slika += split[i];
    if(i!=split.length-1) {
      slika += "/";
    }
  }
  if(ocena <= 5 && ocena > 0 && cena > 0) {
    let updateInfoIzdelek = {
      "naziv" : naziv,
      "cena" : cena,
      "opis" : opis,
      "ocena_strokovnjaka" : ocena,
      "slika" : slika
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open('put', window.location.href, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(updateInfoIzdelek));
    document.getElementById("preusmeriPosodabljaj").href = "/izdelki"
  } else {
    document.getElementById("preusmeriPosodabljaj").removeAttribute('href')
    document.getElementById("napakaUrejanjaIzdelka").innerHTML = '<b>Napaka pri vnosu podatkov</b>'
  }
}

function dodajanjeVKosarico() {
  var split = window.location.href.split("/");
  var id = split[split.length-1];
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', window.location.href+ "/dodaj-v-kosarico", true);
  xhttp.send(null);
}