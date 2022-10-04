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

const registracija = (req, res) => {
    res.render('registracija', {
        title: 'Registracija',
        label: {
            ena: 'Ime',
            dva: 'Priimek',
            tri: 'E-mail',
            stiri: 'Geslo',
            pet: 'Ponovi geslo'
        },
        err: {
            ime: 'Prosim vnesite veljavno ime!',
            priimek: 'Prosim vnesite veljaven priimek!',
            email: 'Prosim vnesite veljaven e-mail naslov!',
            geslo: 'Geslo mora imeti vsaj eno majhno črko, eno veliko črko, en znak, eno število in dolgo mora biti vsaj 8 znakov!',
            validation: 'Gesli se ne ujemata!'
        }
    });
};

let regName = new RegExp ('^[a-zA-Z]+$');
let regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
    let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

const shraniUporabnika = (req,res) => {
    if (!regName.test(req.body.ime)) {
        res.status(400).json();
    }
    if (!regName.test(req.body.priimek)) {
        res.status(400).json();
    }
    if (!regEmail.test(req.body.email)) {
        res.status(400).json();
    }
    if (!regPsw.test(req.body.geslo)) {
        res.status(400).json();
    }
    if (req.body.geslo != req.body.geslo2) {
        res.status(400).json();
    }
    axios({
        method: 'post',
        url: '/api/uporabniki',
        data: {
            ime: req.body.ime,
            priimek: req.body.priimek,
            email: req.body.email,
            geslo: req.body.geslo,
        }
    }).then((response) => {
        storage.setItem('trenutni_UID', response.data._id);
        res.redirect('/profil');
    }).catch((napaka) =>{
        res.status(400).json(napaka);
    });
};

module.exports = {
    registracija,
    shraniUporabnika
};