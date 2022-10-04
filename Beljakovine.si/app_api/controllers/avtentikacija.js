const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

const regName = new RegExp ('^[a-zA-Z]+$');
const regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
const regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

const registracija = (req, res) => {
    if (!req.body.ime || !req.body.email || !req.body.geslo || !req.body.priimek) {
      return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    if (!regName.test(req.body.ime)) {
      return res.status(400).json({"sporočilo": "Podatki niso ustrezni"});
    }
    if (!regName.test(req.body.priimek)) {
      return res.status(400).json({"sporočilo": "Podatki niso ustrezni"});
    }
    if (!regEmail.test(req.body.email)) {
      return res.status(400).json({"sporočilo": "Podatki niso ustrezni"});
    }
    if (!regPsw.test(req.body.geslo)) {
      return res.status(400).json({"sporočilo": "Podatki niso ustrezni"});
    }
    const uporabnik = new Uporabnik();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.email = req.body.email;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
      if (napaka) {
        if (napaka.name == "ValidationError") {
            res.status(409).json({"sporočilo": "Uporabnik s tem elektronskim naslovom je že registriran"});
          } else {
            res.status(500).json(napaka);
          }
      } else {
        res.status(200).json({"žeton": uporabnik.generirajJwt()});
      }
    });
  };

  const prijava = (req, res) => {
    if (!req.body.email || !req.body.geslo) {
      return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
      if (napaka)
        return res.status(500).json(napaka);
      if (uporabnik) {
        res.status(200).json({"žeton": uporabnik.generirajJwt()});
      } else {
        res.status(401).json(informacije);
      }
    })(req, res);
  };
  
  module.exports = {
    registracija,
    prijava
  };