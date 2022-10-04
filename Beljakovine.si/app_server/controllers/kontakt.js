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

const kontakt = (req, res) => {
    axios
        .get('/api/trgovine', {

        })
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Trenutno ni na voljo nobene trgovine za prevzem.";
            prikaziSeznamTrgovin(req,res, odgovor.data, sporocilo);
        })
        .catch(() => {
            prikaziSeznamTrgovin(req,res,[], "Napaka API-ja pri iskanju trgovin");
        });
};
const prikaziSeznamTrgovin = (req, res, seznamTrgovin, sporocilo) => {
    res.render('kontakt', { 
        title: 'Kontakt',
        trgovine: seznamTrgovin,
        sporocilo: sporocilo,
    });
};

const shraniTrgovino = (req,res) => {
    if(!req.body.ime || !req.body.lokacija || !req.body.prevzem || !req.body.lng || !req.body.lat || isNaN(req.body.lng) || isNaN(req.body.lat) || !(req.body.prevzem == "NE" || req.body.prevzem == "DA") || !isNaN(req.body.ime) || !isNaN(req.body.lokacija)){
        res.redirect('kontakt');
    }
    else{
        axios({
            method: 'post',
            url: '/api/trgovine',
            data: {
                ime: req.body.ime,
                lokacija: req.body.lokacija,
                prevzem: req.body.prevzem,
                lng: parseFloat(req.body.lng),
                lat: parseFloat(req.body.lat),
            }
        }).then(() => {
            res.redirect('/kontakt');
        }).catch((napaka) =>{
            console.log("nekaj ne dela vredi");
        });
    }
};

const izbrisiTrgovino = (req,res) => {
    const idTrgovine = req.body._id;
    axios({
        method: 'delete',
        url: '/api/trgovine/' + idTrgovine, 
        data: {}
    }).then(() => {
        res.redirect('/kontakt');
    }).catch((napaka) => {
        console.log("nekaj ne dela vredi");
    });
};

module.exports = {
    kontakt,
    shraniTrgovino,
    izbrisiTrgovino
};