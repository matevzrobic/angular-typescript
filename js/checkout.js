
    function izracunCene1() {
        var stIzdelkov = document.getElementById('stIzdelkov1').value;
        var cena = 49.99;
        var rezultat = stIzdelkov * cena;
        rezultatS = rezultat.toFixed(2);
        document.querySelector('#cena1').innerHTML = rezultatS + " €";
        return rezultat;
    }
    function izracunCene2() {
        var stIzdelkov = document.getElementById('stIzdelkov2').value;
        var cena = 24.99;
        var rezultat = stIzdelkov * cena;
        rezultatS = rezultat.toFixed(2);
        document.querySelector('#cena2').innerHTML = rezultatS + " €";
        return rezultat;
    }
    function izracunSkupneCene() {
        var cena1 = izracunCene1();
        var cena2 = izracunCene2();
        var rezultat = cena1 + cena2;
        rezultatS = rezultat.toFixed(2);
        document.querySelector('#cenaSkupaj').innerHTML = rezultatS + " €";
    }