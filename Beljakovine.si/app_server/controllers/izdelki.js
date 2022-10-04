
const storage = require('node-sessionstorage');
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

const izdelki = (req, res) => {
    axios
        .get('/api/izdelki', {

        })
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Trenutno ni na voljo nobenega izdelka.";
            prikaziSeznamIzdelkov(req,res, odgovor.data, sporocilo);
        })
        .catch(() => {
            prikaziSeznamIzdelkov(req,res,[], "Napaka API-ja pri iskanju izdelkov");
        });
};

const prikaziSeznamIzdelkov = (req, res, seznamIzdelkov, sporocilo) => {
    res.render('izdelki', { 
        title: 'Izdelki',
        izdelki: seznamIzdelkov,
        sporocilo: sporocilo,
    });
};

const shraniIzdelek = (req,res) => {
    axios({
        method: 'post',
        url: '/api/izdelki',
        data: {
            naziv: req.body.naziv,
            cena:  parseFloat(req.body.cena),
            ocena_strokovnjaka: parseInt(req.body.ocena),
            opis: req.body.opis,
            slika: req.body.slika
        }
    }).then(() => {
        res.redirect('/izdelki');
    }).catch((napaka) =>{
        res.redirect('/dodajanje');
        res.status(400).json(napaka);
    });
};

const posodobiIzdelek = (req,res) => {
    axios({
        method: 'put',
        url: '/api/izdelki/'+req.params.idIzdelka,
        data: {
            naziv: req.body.naziv,
            cena:  parseFloat(req.body.cena),
            ocena_strokovnjaka: parseFloat(req.body.ocena_strokovnjaka),
            opis: req.body.opis,
            slika: req.body.slika
        }
    }).then(() => {
        res.redirect('/izdelki');
    }).catch((napaka) => {
        res.status(400).json(napaka);
    });
  };

  const izbrisiIzdelki = (req,res) => {
    const idIzdelka = req.params.idIzdelka;
    axios({
        method: 'delete',
        url: '/api/izdelki/' + idIzdelka, 
        data: {}
    }).then(() => {
        res.redirect('/izdelki');
    }).catch((napaka) => {
        console.log("nekaj ne dela vredi!");
    });
};


module.exports = {
    izdelki,
    prikaziSeznamIzdelkov,
    shraniIzdelek,
    posodobiIzdelek,
    izbrisiIzdelki
};