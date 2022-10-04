const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

const zacetniUporabniki = (req, res) => {
    console.log("API");
    var json = require('../models/podatki-uporabniki.json');
    console.log(json);
    var neki = mongoose.connection.db.collection('Uporabniki')
    neki.insertMany(json, function(err,result) {
        console.log("SMO V INSERTMANY")
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}

const brisiUporabnike = (req, res) => {
    mongoose.connection.db.dropCollection('Uporabniki', function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}

const seznamUporabnikov = (req, res) => {
    Uporabnik
        .find({}, (napaka, uporabniki) => {
            if(napaka){
                res.status(500).json(napaka);
            }
            res.status(200).json(uporabniki);
        })
};

const kreirajUporabnika = (req, res) => {
    Uporabnik.create({
        ime: req.body.ime,
        priimek: req.body.priimek,
        email: req.body.email,
        geslo: req.body.geslo,

    }, (napaka, uporabnik) => {
        if(napaka){
            res.status(400).json(napaka);
        } else{
            res.status(201).json(uporabnik);
        }
    });
};

const preberiUporabnika = (req, res) => {
    Uporabnik
        .findById(req.params.idUporabnika)
        .exec((napaka, uporabnik) => {
            if(!uporabnik){
                return res.status(400).json({
                    "sporočilo":
                        "Ne najdem uporabnika s podanim id-jem idUporabnika."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(uporabnik);
        });
};


const izbrisiUporabnika = (req, res) => {
    const {idUporabnika} = req.params;
    if(idUporabnika){
        Uporabnik
            .findByIdAndRemove(idUporabnika)
            .exec((napaka) => {
                if(napaka){
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
    } else {
        res.status(404).json({
          "sporočilo": 
            "Ne najdem uporabnika"
        });
      }
};

const posodobiUporabnikaInfo = (req, res) => {
    console.log("Posodobi uporabnika info API");
    
    if (!req.params.idUporabnika) {
        
        return res.status(404).json({
            "sporočilo": 
            "Ne najdem uporabnika."
        });
    }
    Uporabnik.findByIdAndUpdate(
        req.params.idUporabnika,
        {ime : req.body.ime,
        priimek : req.body.priimek,
        email : req.body.email},
        {new: true},
        (napaka, uporabnik) => {
            if (napaka) {
                
                return res.status(500).send(napaka);
            }
            
            return res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    );
}

const posodobiUporabnikaGeslo = (req, res) => {
    if (!req.params.idUporabnika) {
        return res.status(404).json({
            "sporočilo": 
            "Ne najdem uporabnika."
        });
    }
    
    Uporabnik.findById(req.params.idUporabnika)
        .exec((napaka, uporabnik) => {
            if (napaka) {
                return res.status(500).send(napaka);
            }

            if(uporabnik.preveriGeslo(req.body.sGeslo)){
                uporabnik.nastaviGeslo(req.body.geslo);
                uporabnik.save(napaka => {
                  if (napaka) {
                    if (napaka.code == 11000) {
                        res.status(400).json({"sporočilo": "Napaka pri geslu."});
                      } else {
                        res.status(500).json(napaka);
                      }
                  } else {
                    res.status(200).json({"žeton": uporabnik.generirajJwt()});
                  }
                });
                //return res.send(uporabnik);
            }else {
                return res.status(400).json({"sporočilo":"Napačno geslo."});
            }
        });
}

module.exports = {
    seznamUporabnikov,
    preberiUporabnika,
    izbrisiUporabnika,
    kreirajUporabnika,
    posodobiUporabnikaInfo,
    posodobiUporabnikaGeslo,
    zacetniUporabniki,
    brisiUporabnike
}