const mongoose = require('mongoose');
const Izdelek = mongoose.model('Izdelek');
const atob = require('atob');

const zacetniIzdelki = (req, res) => {
    console.log("API");
    var json = require('../models/podatki-izdelki.json');
    console.log(json);
    var neki = mongoose.connection.db.collection('Izdelki')
    neki.insertMany(json, function(err,result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
} 

const brisiIzdelke = (req, res) => {
        mongoose.connection.db.dropCollection('Izdelki', function(err, result) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        });
}

const seznamIzdelkov = (req, res) => {
    Izdelek
        .find({}, (napaka, izdelki) => {
            if(napaka){
                res.status(500).json(napaka);
            }
            res.status(200).json(izdelki);
        })
};

const kreirajIzdelek = (req, res) => {
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin) {
        Izdelek.create({
            naziv: req.body.naziv,
            cena: parseFloat(req.body.cena),
            ocena_strokovnjaka: parseInt(req.body.ocena_strokovnjaka),
            opis: req.body.opis,
            slika: req.body.slika
        }, (napaka, izdelek) => {
            if(napaka){
                res.status(500).json(napaka);
            } else{
                res.status(201).json(izdelek);
            }
        });
    }else {
        res.status(401).json({"sporočilo": "Uporabnik nima dostopa do tega klica!"})
    }
};

const posodobiIzdelek = (req, res) => {
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin) {
        if (!req.params.idIzdelka) {
            return res.status(404).json({
                "sporočilo": 
                "Ne najdem izdelka."
            });
        }
        Izdelek.findByIdAndUpdate(
            req.params.idIzdelka,
            {naziv: req.body.naziv,
            cena: parseFloat(req.body.cena),
            ocena_strokovnjaka: parseInt(req.body.ocena_strokovnjaka),
            opis: req.body.opis,
            slika: req.body.slika},
            {new: true},
            (napaka, izdelek) => {
                if (napaka) {
                    return res.status(500).send(napaka);
                }
                return res.status(200).send(izdelek);
            }
        );
    }else {
        res.status(401).json({"sporočilo": "Uporabnik nima dostopa do tega klica!"})
    }
};

const preberiIzdelek = (req, res) => {
    Izdelek
        .findById(req.params.idIzdelka)
        .exec((napaka, izdelek) => {
            if(!izdelek){
                return res.status(400).json({
                    "sporočilo":
                        "Ne najdem izdelka s podanim id-jem idIzdelka."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(izdelek);
        });
};

const izbrisiIzdelek = (req, res) => {
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin) { 
        const idIzdelka = req.params.idIzdelka;
        if(idIzdelka){
            Izdelek
                .findByIdAndRemove(idIzdelka)
                .exec((napaka) => {
                    if(napaka){
                        return res.status(500).json(napaka);
                    }
                    res.status(204).json(null);
                });
        } else {
            res.status(404).json({
            "sporočilo": 
                "Ne najdem izdelka, idIzdelka je obvezen parameter."
            });
        }
    }else {
        res.status(401).json({"sporočilo": "Uporabnik nima dostopa do tega klica!"})
    }
};



module.exports = {
    seznamIzdelkov,
    preberiIzdelek,
    izbrisiIzdelek,
    kreirajIzdelek,
    posodobiIzdelek,
    zacetniIzdelki,
    brisiIzdelke
}