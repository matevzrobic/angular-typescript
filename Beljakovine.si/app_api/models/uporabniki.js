const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator')

/**
 * @swagger
 * components:
 *  schemas:
 *   EmailPozabljenoGeslo:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *    required:
 *     - email
 *   Email:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     priimek:
 *      type: string
 *     sporocilo:
 *      type: string
 *     email:
 *      type: string
 *    required:
 *     - ime
 *     - priimek
 *     - sporocilo
 *     - email
 *   Kuponi:
 *    type: object
 *    properties:
 *     niz:
 *      type: string
 *     popust:
 *      type: number
 *      minimum: 1
 *      maximum: 99
 *      example: 20
 *     datum:
 *      type: string
 *      format: date-time
 *      example: 2019-12-26T14:12:06.488Z
 *    required:
 *     - niz
 *     - popust
 *     - datum
 *   Nakupi:
 *    type: object
 *    properties:
 *     datum:
 *      type: string
 *      format: date-time
 *      example: 2019-12-26T14:12:06.488Z
 *     kupon:
 *      type: string
 *     uporabnik:
 *      type: string
 *     izdelki:
 *      type: array
 *      items:
 *        type: string
 *     skupnaCena:
 *      type: number
 *    required:
 *     - skupnaCena
 *     - uporabnik
 *   IzdelkiUpdate:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *     cena:
 *      type: number
 *     ocena_strokovnjaka:
 *      type: number
 *      minimum: 0
 *      maximum: 5
 *     opis:
 *      type: string
 *    required:
 *     - naziv
 *     - cena
 *     - ocena_strokovnjaka
 *     - opis
 *   Izdelki:
 *    type: object
 *    properties:
 *     naziv:
 *      type: string
 *     cena:
 *      type: number
 *     ocena_strokovnjaka:
 *      type: number
 *      minimum: 0
 *      maximum: 5
 *     opis:
 *      type: string
 *     slika:
 *      type: string
 *    required:
 *     - naziv
 *     - cena
 *     - ocena_strokovnjaka
 *     - opis
 *     - slika
 *   UporabnikUpdateGeslo:
 *    type: object
 *    properties:
 *     sGeslo:
 *      type: string
 *     geslo:
 *      type: string
 *    required:
 *     - geslo
 *     - sGeslo
 *   UporabnikUpdateInfo:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     priimek:
 *      type: string
 *     email:
 *      type: string
 *   Uporabniki:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     priimek:
 *      type: string
 *     email:
 *      type: string
 *     zgoscenaVrednost:
 *      type: string
 *     nakljucnaVrednost:
 *      type: string
 *     admin:
 *      type: boolean
 *    required:
 *     - ime
 *     - priimek
 *     - email
 *     - zgoscenaVrednost
 *     - nakljucnaVrednost
 *   UporabnikPrijava:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: email@service.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: Test123!
 *    required:
 *     - email
 *     - geslo
 *   UporabnikRegistracija:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      description: ime
 *      writeOnly: true
 *      example: Janez
 *     priimek:
 *      type: string
 *      description: priimek
 *      writeOnly: true
 *      example: Jansa
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: email@service.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: Test123!
 *    required:
 *     - ime
 *     - priimek
 *     - email
 *     - geslo
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 *   NapakaUpdate:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Ne najdem objekta.
 */

const uporabnikiShema = new mongoose.Schema({
    ime: {type: String, required: true},
    priimek: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    /*datumRojstva: {type: String, required: false},*/
    zgoscenaVrednost: {type: String, required: true},
    nakljucnaVrednost: {type: String, required: true},
    admin: {type: Boolean, required: false ,default: false}
});

uporabnikiShema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
      .toString('hex');
  };

  uporabnikiShema.methods.preveriGeslo = function(geslo) {
    let zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
      .toString('hex');
    return this.zgoscenaVrednost == zgoscenaVrednost;
  };

  uporabnikiShema.methods.generirajJwt = function() {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      ime: this.ime,
      priimek: this.priimek,
      admin: this.admin,
      exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
  };
  
  uporabnikiShema.plugin(uniqueValidator)
  mongoose.model('Uporabnik',uporabnikiShema, 'Uporabniki');


/**
 * @swagger
 *  components:
 *   examples:
 *    NiZetona:
 *     summary: ni JWT žetona
 *     value:
 *      sporočilo: "UnauthorizedError: No authorization token was found."
 */