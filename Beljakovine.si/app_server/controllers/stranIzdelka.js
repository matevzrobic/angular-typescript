const storage = require('node-sessionstorage');
const { prikaziSeznamIzdelkov } = require('./izdelki');

var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
  };
  if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://Beljakovine.herokuapp.com/';
  }
  const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
  });

const stranIzdelka = (req, res) => {
    axios
    .get('/api/izdelki/' + req.params.idIzdelka)
    .then((odgovor) => {
      prikaziPodrobnostiIzdelka(req, res, odgovor.data);
    });
}

const prikaziPodrobnostiIzdelka = (req, res, podrobnostiIzdelka) => {
    res.render('stran-izdelka', {
        title: podrobnostiIzdelka.naziv,
        naziv: podrobnostiIzdelka.naziv,
        cena: parseFloat(podrobnostiIzdelka.cena),
        ocenaStrokovnjaka: parseFloat(podrobnostiIzdelka.ocena_strokovnjaka),
        opis: podrobnostiIzdelka.opis,
        kategorija: podrobnostiIzdelka.kategorija,
        slika: podrobnostiIzdelka.slika
    })
}


storage.setItem("kosarica", JSON.stringify([]));

const dodajVKosarico = (req,res) => {
    const idIzdelka = req.params.idIzdelka;
    var tmp = JSON.parse(storage.getItem("kosarica"));
    tmp.push(idIzdelka)
    storage.setItem("kosarica", JSON.stringify(tmp));
    res.redirect('/izdelki');
};

module.exports = {
    stranIzdelka,
    prikaziPodrobnostiIzdelka,
    prikaziSeznamIzdelkov,
    dodajVKosarico
};