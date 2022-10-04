var express = require('express');
var router = express.Router();
const ctrlIndex = require('../controllers/index');
const ctrlKontakt = require('../controllers/kontakt');
const ctrlPrijava = require('../controllers/prijava');
const ctrlProfil = require('../controllers/profil');
const ctrlRegistracija = require('../controllers/registracija');
const ctrlIzdelki = require('../controllers/izdelki');
const ctrlStranIzdelka = require('../controllers/stranIzdelka');
const ctrlPogoji = require('../controllers/pogoji');
const ctrlKalkulator = require('../controllers/kalkulator');
const ctrlDodajanje = require('../controllers/dodajanje');
const ctrlKosarica = require('../controllers/kosarica');
const ctrlZakljucekNakupa = require('../controllers/zakljucekNakupa');
const ctrlKuponi = require('../controllers/kuponi');
const ctrlDB = require('../controllers/db');
const ctrlMail = require('../controllers/mail');

const { route } = require('../../app_api/routes');

/* GET home page. */
router.get('/', ctrlIndex.index);
router.route('/kontakt')
      .get(ctrlKontakt.kontakt)
      .post(ctrlKontakt.shraniTrgovino)
      .delete(ctrlKontakt.izbrisiTrgovino);
    //  .delete(ctrlKontakt.izbrisiTrgovino);
router.route('/registracija')
      .post(ctrlRegistracija.shraniUporabnika);
router.route('/prijava/i')
      .get(ctrlPrijava.prijavaUporabnika);

router.route('/profil/u/i')
      .put(ctrlProfil.updateInfo);
router.route('/profil/u/g')
      .put(ctrlProfil.updateGeslo);

router.route('/profil')
      .get(ctrlProfil.profil)
      .delete(ctrlProfil.izbrisiUporabnika);
router.route('/profil/:idNakupa')
      .delete(ctrlProfil.izbrisiNakup);

router.get('/prijava', ctrlPrijava.prijava);
router.get('/registracija', ctrlRegistracija.registracija);
router.get('/profil/odjava', ctrlProfil.odjava);

router.get('/izdelki', ctrlIzdelki.izdelki);
router.get('/izdelki/:idIzdelka', ctrlStranIzdelka.stranIzdelka);
router.delete('/izdelki/:idIzdelka', ctrlIzdelki.izbrisiIzdelki);
router.put('/izdelki/:idIzdelka', ctrlIzdelki.posodobiIzdelek)
router.get('/izdelki/:idIzdelka/dodaj-v-kosarico', ctrlStranIzdelka.dodajVKosarico);

router.get('/registracija', ctrlRegistracija.registracija);
router.get('/pogoji', ctrlPogoji.pogoji);
router.get('/kalkulator', ctrlKalkulator.kalkulator);
router.route('/dodajanje')
      .post(ctrlIzdelki.shraniIzdelek);
router.put('/dodajanje/:idIzdelka', ctrlIzdelki.posodobiIzdelek);
router.get('/dodajanje/:idIzdelka', ctrlIzdelki.prikaziSeznamIzdelkov);
router.get('/dodajanje', ctrlDodajanje.dodajanje);
router.route('/kosarica')
      .get(ctrlKosarica.getIzdelek)
      .post(ctrlKosarica.dodajNakup);
router.get('/zakljucekNakupa', ctrlZakljucekNakupa.zakljucekNakupa);
router.route('/kuponi')
    .get(ctrlKuponi.kuponi)
    .post(ctrlKuponi.shraniKupon)
    .delete(ctrlKuponi.izbrisiKupon);

router.get('/db', ctrlDB.prikazi);
router.route('/db/uvozi')
      .get(ctrlDB.uvozi);
router.route('/db/brisi')
      .get(ctrlDB.brisi);

router.route('/email/post')
    .post(ctrlMail.mailPost);
router.route('/email/geslo')
    .post(ctrlMail.mailGeslo);
router.options('/email', ctrlMail.mailOptions);

module.exports = router;