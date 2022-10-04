const mongoose = require('mongoose');
const Kupon = mongoose.model('Kupon');
const atob = require('atob');

const zacetniKuponi = (req, res) => {
    console.log("API");
    var json = require('../models/podatki-kuponi.json');
    console.log(json);
    var neki = mongoose.connection.db.collection('Kuponi')
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

const brisiKupone = (req, res) => {
    mongoose.connection.db.dropCollection('Kuponi', function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}

const seznamKuponov = (req, res) => {
    Kupon
        .find({}, (napaka, kuponi) => {
            if(napaka){
                res.status(500).json(napaka);
            }
            res.status(200).json(kuponi);
        })
};

const kreirajKupon = (req, res) => {
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin){
        Kupon
            .create({
            niz:    req.body.niz,
            popust: req.body.popust,
            datum:  req.body.datum,
        }, (napaka, kupon) => {
            if(napaka){
                res.status(400).json(napaka);
            } else{
                res.status(201).json(kupon);
            }
        });
    }
    else {
        res.status(401).json({"sporočilo": "Uporabnik nima dostopa do tega klica!"})
    }
};

const preberiKupon = (req, res) => {
    Kupon
        .findById(req.params.idKupona)
        .exec((napaka, kupon) => {
            if(!kupon){
                return res.status(400).json({
                    "sporočilo":
                        "Ne najdem kupona s podanim id-jem idIzdelka."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(kupon);
        });
};

const izbrisiKupon = (req, res) => {
    const {idKupona} = req.params;
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin} = JSON.parse(atob(zeton.split('.')[1]));
    if(admin) {
        if (idKupona) {
            Kupon
                .findByIdAndRemove(idKupona)
                .exec((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                    res.status(204).json(null);
                });
        } else {
            res.status(404).json({
                "sporočilo":
                    "Ne najdem kupona, idKupona je obvezen parameter."
            });
        }
    }
    else{
        res.status(401).json({
            "sporočilo": "Uporabnik nima dostopa do tega klica!"
        })
    }
};

module.exports = {
    seznamKuponov,
    kreirajKupon,
    preberiKupon,
    izbrisiKupon,
    zacetniKuponi,
    brisiKupone
}