var express = require('express');
var router = express.Router();

const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const ctrlIzdelki = require('../controllers/izdelki.js');
const ctrlTrgovine = require('../controllers/trgovine.js');
const ctrlUporabniki = require('../controllers/uporabniki.js');
const ctrlNakupi = require('../controllers/nakupi.js');
const ctrlKuponi = require('../controllers/kuponi.js');
const ctrlAvtentikacija = require('../controllers/avtentikacija');
const ctrlMail = require('../controllers/mail');
//const ctrlKomentarji = require('../controllers/komentarji');

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

// krmilniki v app_api
//lokacije
router.get('/trgovine',
    ctrlTrgovine.seznamTrgovin);
/**
 * @swagger
 *     /trgovine:
 *      get:
 *       summary: Pridobi seznam trgovin
 *       description: Pridobi seznam trgovin v podatkovni bazi.
 *       tags: [Trgovine]
 *       responses:
 *         "200":
 *           description: Uspešno vrnjen seznam trgovin.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Trgovine"
 *         "500":
 *           description: Napaka na strežniku pri pridobivanju seznama trgovin.
 */
router.post('/trgovine', avtentikacija,
    ctrlTrgovine.kreirajTrgovino);
/**
 * @swagger
 *   /trgovine:
 *     post:
 *       summary: Kreacija nove trgovine
 *       description: Kreacija **nove trgovine** s podatki o imenu, lokaciji, prevzemu, lng in lat.
 *       tags: [Trgovine]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje trgovine
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Trgovine"
 *       responses:
 *         "201":
 *           description: Uspešna kreacija trgovine.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Trgovine"
 *         "500":
 *           description: Napaka na strežniku pri kreiranju trgovine.
 */
router.get('/trgovine/:idTrgovine',
    ctrlTrgovine.preberiTrgovino);
/**
 * @swagger
 *     /trgovine/{idTrgovine}:
 *      get:
 *       summary: Pridobi trgovino
 *       description: Pridobi trgovino iz podatkovne baze.
 *       tags: [Trgovine]
 *       parameters:
 *        - in: path
 *          name: idTrgovine
 *          description: enolični identifikator trgovine
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "200":
 *           description: Uspešno najdena trgovina.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Trgovine"
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.delete('/trgovine/:idTrgovine',avtentikacija,
    ctrlTrgovine.izbrisiTrgovino);
/**
 * @swagger
 *     /trgovine/{idTrgovine}:
 *      delete:
 *       summary: Izbriši trgovino
 *       description: Izbriši trgovino iz podatkovne baze.
 *       tags: [Trgovine]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idTrgovine
 *          description: enolični identifikator trgovine.
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "204":
 *           description: Uspešno izbrisana trgovina.
 *         "404":
 *           description: Ne najdem trgovine. Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *         "500":
 *           description: Napaka na strežniku.
 */

//izdelki
router.get('/izdelki',
    ctrlIzdelki.seznamIzdelkov);
/**
 * @swagger
 *     /izdelki:
 *      get:
 *       summary: Pridobi seznam izdelkov
 *       description: Pridobi seznam izdelkov v podatkovni bazi.
 *       tags: [Izdelki]
 *       responses:
 *         "200":
 *           description: Uspešno vrnjen seznam izdelkov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Izdelki"
 *         "500":
 *           description: Napaka na strežniku pri pridobivanju seznama izdelkov.
 */
router.get('/izdelki/:idIzdelka',
    ctrlIzdelki.preberiIzdelek);
/**
 * @swagger
 *     /izdelki/{idIzdelka}:
 *      get:
 *       summary: Pridobi izdelek
 *       description: Pridobi izdelek iz podatkovne baze.
 *       tags: [Izdelki]
 *       parameters:
 *        - in: path
 *          name: idIzdelka
 *          description: enolični identifikator izdelka
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "200":
 *           description: Uspešno najden izdelek.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Izdelki"
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.delete('/izdelki/:idIzdelka', avtentikacija,
    ctrlIzdelki.izbrisiIzdelek);
/**
 * @swagger
 *     /izdelki/{idIzdelka}:
 *      delete:
 *       summary: Izbriši izdelek
 *       description: Izbriši izdelek iz podatkovne baze.
 *       tags: [Izdelki]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idIzdelka
 *          description: enolični identifikator izdelka
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "204":
 *           description: Uspešno izbrisan izdelek.
 *         "404":
 *           description: Ne najdem izdelka. Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.post('/izdelki', avtentikacija, 
    ctrlIzdelki.kreirajIzdelek);
/**
 * @swagger
 *   /izdelki:
 *     post:
 *       summary: Kreacija novega izdelka
 *       description: Kreacija **novega izdelka** s podatki o nazivu, ceni, oceni strokovnjaka, opisu in sliki.
 *       tags: [Izdelki]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje izdelka
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Izdelki"
 *       responses:
 *         "201":
 *           description: Uspešna kreacija izdelka.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Izdelki"
 *         "500":
 *           description: Napaka na strežniku pri registraciji izdelka.
 */
router.put('/izdelki/:idIzdelka', avtentikacija,
    ctrlIzdelki.posodobiIzdelek);
/**
 * @swagger
 *   /izdelki/{idIzdelka}:
 *     put:
 *       summary: Posodobi informacije o izdelku
 *       description: Posodobi informacije o izdelku.
 *       tags: [Izdelki]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idIzdelka
 *          description: enolični identifikator izdelka
 *          schema:
 *           type: string
 *          required: true
 *       requestBody:
 *         description: Podatki za posodabljanje izdelka.
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Izdelki"
 *       responses:
 *         "200":
 *           description: Uspešna posodobitev izdelka.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Izdelki"
 *         "404":
 *           description: Napaka pri iskanju izdelka.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *             example:
 *               sporočilo: Ne najdem izdelka.
 *         "500":
 *           description: Napaka na strežniku.
 */

//uporabniki
router.get('/uporabniki',
    ctrlUporabniki.seznamUporabnikov);
/**
 * @swagger
 *     /uporabniki:
 *      get:
 *       summary: Pridobi seznam uporabnikov
 *       description: Pridobi seznam uporabnikov v podatkovni bazi.
 *       tags: [Uporabniki]
 *       responses:
 *         "200":
 *           description: Uspešno vrnjen seznam uporabnikov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Uporabniki"
 *         "500":
 *           description: Napaka na strežniku pri pridobivanju seznama uporabnikov.
 */
router.post('/uporabniki', avtentikacija,
    ctrlUporabniki.kreirajUporabnika);
router.get('/uporabniki/:idUporabnika',avtentikacija,
    ctrlUporabniki.preberiUporabnika);

router.delete('/uporabniki/:idUporabnika',avtentikacija,
    ctrlUporabniki.izbrisiUporabnika);
/**
 * @swagger
 *     /uporabniki/{idUporabnika}:
 *      delete:
 *       summary: Izbriši uporabnika
 *       description: Izbriše uporabnika iz podatkovne baze.
 *       tags: [Uporabniki]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idUporabnika
 *          description: enolični identifikator uporabnika
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "204":
 *           description: Uspešno izbrisan uporabnik.
 *         "404":
 *           description: Napaka pri iskanju uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *             example:
 *               sporočilo: Ne najdem uporabnika.
 *         "500":
 *           description: Napaka na strežniku pri brisanju uporabnika.
 */
router.put('/uporabniki/info/:idUporabnika', avtentikacija,
    ctrlUporabniki.posodobiUporabnikaInfo);
/**
 * @swagger
 *   /uporabniki/info/{idUporabnika}:
 *     put:
 *       summary: Posodobi informacije o uporabniku
 *       description: Posodobi ime, priimek ali email naslov uporabnika.
 *       tags: [Uporabniki]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idUporabnika
 *          description: enolični identifikator uporabnika
 *          schema:
 *           type: string
 *          required: true
 *       requestBody:
 *         description: Podatki za posodabljanje uporabnika.
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikUpdateInfo"
 *       responses:
 *         "200":
 *           description: Uspešna posodobitev uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "404":
 *           description: Napaka pri iskanju uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *             example:
 *               sporočilo: Ne najdem uporabnika.
 *         "500":
 *           description: Napaka na strežniku.
 */
router.put('/uporabniki/geslo/:idUporabnika',avtentikacija,
    ctrlUporabniki.posodobiUporabnikaGeslo);
/**
 * @swagger
 *   /uporabniki/geslo/{idUporabnika}:
 *     put:
 *       summary: Posodobi geslo uporabniku
 *       description: Posodobi geslo uporabnika.
 *       tags: [Uporabniki]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idUporabnika
 *          description: enolični identifikator uporabnika
 *          schema:
 *           type: string
 *          required: true
 *       requestBody:
 *         description: Podatki za posodabljanje gesla uporabnika.
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikUpdateGeslo"
 *       responses:
 *         "200":
 *           description: Uspešna posodobitev uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napačno staro geslo.
 *         "404":
 *           description: Napaka pri iskanju uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *             example:
 *               sporočilo: Ne najdem uporabnika.
 *         "500":
 *           description: Napaka na strežniku.
 */

/* Avtentikacija */
router.post('/registracija', ctrlAvtentikacija.registracija);
/**
 * @swagger
 *   /registracija:
 *     post:
 *       summary: Registracija novega uporabnika
 *       description: Registracija **novega uporabnika** s podatki o imenu, priimku, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za registracijo
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, priimek, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             example:
 *               sporočilo: Zahtevani so vsi podatki.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */
router.post('/prijava', ctrlAvtentikacija.prijava);
/**
 * @swagger
 *   /prijava:
 *     post:
 *       summary: Prijava obstoječega uporabnika
 *       description: Prijava **obstoječega uporabnika** z elektronskim naslovom in geslom.
 *       tags: [Avtentikacija]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Prijavni podatki
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Zahtevani so vsi podatki.
 *         "401":
 *           description: Napaka pri prijavi uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 uporabniško ime:
 *                   value:
 *                     sporočilo: Napačno uporabniško ime.
 *                   summary: napačno uporabniško ime
 *                 geslo:
 *                   value:
 *                     sporočilo: Napačno geslo.
 *                   summary: napačno geslo
 *         "500":
 *           description: Napaka na strežniku pri preverjanju uporabnika.
 */

//kuponi
router.get('/kuponi', avtentikacija,
    ctrlKuponi.seznamKuponov);
/**
 * @swagger
 *     /kuponi:
 *      get:
 *       summary: Pridobi seznam kuponov
 *       description: Pridobi seznam kuponov v podatkovni bazi.
 *       tags: [Kuponi]
 *       security:
 *        - jwt: []
 *       responses:
 *         "200":
 *           description: Uspešno vrnjen seznam kuponov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Kuponi"
 *         "500":
 *           description: Napaka na strežniku pri pridobivanju seznama kuponov.
 */
router.post('/kuponi', avtentikacija,
    ctrlKuponi.kreirajKupon);
/**
 * @swagger
 *   /kuponi:
 *     post:
 *       summary: Kreacija novega kupona
 *       description: Kreacija **novega kupona** s podatki o nizu, popustu in datumom.
 *       tags: [Kuponi]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje kupona
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Kuponi"
 *       responses:
 *         "201":
 *           description: Uspešna kreacija kupona.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Kuponi"
 *         "500":
 *           description: Napaka na strežniku pri registraciji kupona.
 */
router.get('/kuponi/:idKupona',avtentikacija,
    ctrlKuponi.preberiKupon);
/**
 * @swagger
 *     /kuponi/{idKupona}:
 *      get:
 *       summary: Pridobi kupon
 *       description: Pridobi kupon iz podatkovne baze.
 *       tags: [Kuponi]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idKupona
 *          description: enolični identifikator kupona
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "200":
 *           description: Uspešno najden kupon.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Kuponi"
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.delete('/kuponi/:idKupona', avtentikacija,
    ctrlKuponi.izbrisiKupon);
/**
 * @swagger
 *     /kuponi/{idKupona}:
 *      delete:
 *       summary: Izbriši kupon
 *       description: Izbriše kupon iz podatkovne baze.
 *       tags: [Kuponi]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idKupona
 *          description: enolični identifikator kupon
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "204":
 *           description: Uspešno izbrisan kupon.
 *         "404":
 *           description: Napaka pri iskanju kupona.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *             example:
 *               sporočilo: Ne najdem kupona.
 *         "500":
 *           description: Napaka na strežniku pri brisanju kupona.
 */

//nakupi
router.get('/nakupi',avtentikacija, ctrlNakupi.seznamNakupov);
/**
 * @swagger
 *     /nakupi:
 *      get:
 *       summary: Pridobi seznam nakupov
 *       description: Pridobi seznam nakupov v podatkovni bazi.
 *       tags: [Nakupi]
 *       responses:
 *         "200":
 *           description: Uspešno vrnjen seznam nakupov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Nakupi"
 *         "500":
 *           description: Napaka na strežniku pri pridobivanju seznama nakupov.
 */
router.get('/nakupi/:idNakupa',avtentikacija, ctrlNakupi.nakupiPreberiIzbranega);
/**
 * @swagger
 *     /nakupi/{idNakupa}:
 *      get:
 *       summary: Pridobi nakup
 *       description: Pridobi nakup iz podatkovne baze.
 *       tags: [Nakupi]
 *       parameters:
 *        - in: path
 *          name: idNakupa
 *          description: enolični identifikator nakupa
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "200":
 *           description: Uspešno najden nakup.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Nakupi"
 *         "404":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/NapakaUpdate"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.get('/nakupi/u/:idUporabnika',avtentikacija, ctrlNakupi.nakupiPreberiZaUporabnika);
/**
 * @swagger
 *     /nakupi/u/{idUporabnika}:
 *      get:
 *       summary: Pridobi nakupe za uporabnika
 *       description: Pridobi nakupe za uporabnika iz podatkovne baze.
 *       tags: [Nakupi]
 *       parameters:
 *        - in: path
 *          name: idUporabnika
 *          description: enolični identifikator uporabnika
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "200":
 *           description: Uspešno najdeni nakupi za uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Nakupi"
 *         "500":
 *           description: Napaka na strežniku.
 */
router.put('/nakupi/:idNakupa', avtentikacija, ctrlNakupi.nakupiPosodobiIzbranega);
router.post('/nakupi',avtentikacija, ctrlNakupi.nakupiKreiraj);
/**
 * @swagger
 *   /nakupi:
 *     post:
 *       summary: Kreacija novega nakupa
 *       description: Kreacija **novega nakupa** s podatki o datumu, kuponu, uporabniku, izdelkih in skupni ceni.
 *       tags: [Nakupi]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje nakupa
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Nakupi"
 *       responses:
 *         "201":
 *           description: Uspešna kreacija nakupa.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Nakupi"
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 */
router.delete('/nakupi/:idNakupa', avtentikacija,ctrlNakupi.nakupiIzbrisiIzbranega);
/**
 * @swagger
 *     /nakupi/{idNakupa}:
 *      delete:
 *       summary: Izbriši nakup
 *       description: Izbriše nakup iz podatkovne baze.
 *       tags: [Nakupi]
 *       security:
 *        - jwt: []
 *       parameters:
 *        - in: path
 *          name: idNakupa
 *          description: enolični identifikator nakupa
 *          schema:
 *           type: string
 *          required: true
 *       responses:
 *         "204":
 *           description: Uspešno izbrisan nakup.
 *         "500":
 *           description: Napaka na strežniku pri brisanju nakupa.
 */

//db
router.get('/db/uporabniki', ctrlUporabniki.zacetniUporabniki);
/**
 * @swagger
 *     /db/uporabniki:
 *      get:
 *       summary: Vstavi seznam uporabnikov
 *       description: Vstavi seznam uporabnikov iz skripte.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno vstavljen seznam uporabnikov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Uporabniki"
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama uporabnikov. Morda so začetni podatki že v bazi?
 */
router.get('/db/kuponi', ctrlKuponi.zacetniKuponi);
/**
 * @swagger
 *     /db/kuponi:
 *      get:
 *       summary: Vstavi seznam kuponov
 *       description: Vstavi seznam kuponov iz skripte.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno vstavljen seznam kuponov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Kuponi"
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama kuponov. Morda so začetni podatki že v bazi?
 */
router.get('/db/izdelki', ctrlIzdelki.zacetniIzdelki);
/**
 * @swagger
 *     /db/izdelki:
 *      get:
 *       summary: Vstavi seznam izdelkov
 *       description: Vstavi seznam izdelkov iz skripte.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno vstavljen seznam izdelkov.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Izdelki"
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama izdelkov. Morda so začetni podatki že v bazi?
 */
router.get('/db/trgovine', ctrlTrgovine.zacetneTrgovine);
/**
 * @swagger
 *     /db/trgovine:
 *      get:
 *       summary: Vstavi seznam trgovin
 *       description: Vstavi seznam trgovin iz skripte.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno vstavljen seznam trgovin.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Trgovine"
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama trgovin. Morda so začetni podatki že v bazi?
 */

router.get('/db/uporabniki/brisi', ctrlUporabniki.brisiUporabnike);
/**
 * @swagger
 *     /db/uporabniki/brisi:
 *      get:
 *       summary: Izbriši seznam uporabnikov
 *       description: Izbriši seznam uporabnikov iz baze.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno izbrisan seznam uporabnikov.
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama uporabnikov. Morda je baza prazna?
 */
router.get('/db/kuponi/brisi', ctrlKuponi.brisiKupone);
/**
 * @swagger
 *     /db/kuponi/brisi:
 *      get:
 *       summary: Izbriši seznam kuponov
 *       description: Izbriši seznam kuponov iz baze.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno izbrisan seznam kuponov.
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama kuponov. Morda je baza prazna?
 */
router.get('/db/izdelki/brisi', ctrlIzdelki.brisiIzdelke);
/**
 * @swagger
 *     /db/izdelki/brisi:
 *      get:
 *       summary: Izbriši seznam izdelkov
 *       description: Izbriši seznam izdelkov iz baze.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno izbrisan seznam izdelkov.
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama izdelkov. Morda je baza prazna?
 */
router.get('/db/trgovine/brisi', ctrlTrgovine.brisiTrgovine);
/**
 * @swagger
 *     /db/trgovine/brisi:
 *      get:
 *       summary: Izbriši seznam trgovin
 *       description: Izbriši seznam trgovin iz baze.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno izbrisan seznam trgovin.
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama trgovin. Morda je baza prazna?
 */
router.get('/db/nakupi/brisi', ctrlNakupi.brisiNakupe);
/**
 * @swagger
 *     /db/nakupi/brisi:
 *      get:
 *       summary: Izbriši seznam nakupov
 *       description: Izbriši seznam nakupov iz baze.
 *       tags: [DB]
 *       responses:
 *         "200":
 *           description: Uspešno izbrisan seznam nakupov.
 *         "500":
 *           description: Napaka na strežniku pri vstavljanju seznama nakupov. Morda je baza prazna?
 */

router.route('/email/post')
    .post(ctrlMail.mailPost);
/**
 * @swagger
 *   /email/post:
 *     post:
 *       summary: Kreacija novega email sporočila za administratorja
 *       description: Kreacija **novega email sporočila** za administratorja.
 *       tags: [E-mail]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje emaila
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Email"
 *       responses:
 *         "201":
 *           description: Uspešno poslan email.
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 */
router.route('/email/geslo')
    .post(ctrlMail.mailGeslo);
/**
 * @swagger
 *   /email/geslo:
 *     post:
 *       summary: Kreacija novega email sporočila z posodobitvijo gesla
 *       description: Kreacija **novega email sporočila** ob pozabi gesla uporabnika.
 *       tags: [E-mail]
 *       security:
 *        - jwt: []
 *       requestBody:
 *         description: Podatki za kreiranje emaila
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/EmailPozabljenoGeslo"
 *       responses:
 *         "201":
 *           description: Uspešno poslan email.
 *         "400":
 *           description: Potrebni so vsi parametri.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 */
router.options('/email', ctrlMail.mailOptions);


module.exports = router;