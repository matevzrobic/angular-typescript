const mongoose = require('mongoose');
const Trgovina = mongoose.model('Trgovina');
const atob = require('atob');

const zacetneTrgovine = (req, res) => {
    console.log("API");
    var json = require('../models/podatki-trgovine.json');
    console.log(json);
    var neki = mongoose.connection.db.collection('Trgovine')
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

const brisiTrgovine = (req, res) => {
    mongoose.connection.db.dropCollection('Trgovine', function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}

const seznamTrgovin = (req, res) => {
    Trgovina
        .find({}, (napaka, trgovine) => {
            if(napaka){
                res.status(500).json(napaka);
            }
            res.status(200).json(trgovine);
        })
};

const kreirajTrgovino = (req, res) => {
    var zeton = req.headers.authorization;
    console.log(zeton);
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin){
        Trgovina.create({
            ime: req.body.ime,
            lokacija: req.body.lokacija,
            prevzem: req.body.prevzem,
            lng: parseFloat(req.body.lng),
            lat: parseFloat(req.body.lat)
            
        }, (napaka, trgovina) => {
            if(napaka){
                res.status(400).json(napaka);
            } else{
                res.status(201).json(trgovina);
            }
        });
    }
    else{
        res.status(401).json({"sporočilo": "Uporabnik nima dostopa do tega klica!"})
    }
    
};

const preberiTrgovino = (req, res) => {
    Trgovina
        .findById(req.params.idTrgovine)
        .exec((napaka, trgovina) => {
            if(!trgovina){
                return res.status(400).json({
                    "sporočilo":
                        "Ne najdem trgovine s podanim id-jem idTrgovine."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(trgovina);
        });
};


const izbrisiTrgovino = (req, res) => {
    const {idTrgovine} = req.params;
    var zeton = req.headers.authorization;
    const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
    if(admin){
        if(idTrgovine){
            Trgovina
                .findByIdAndRemove(idTrgovine)
                .exec((napaka) => {
                    if(napaka){
                        return res.status(500).json(napaka);
                    }
                    res.status(204).json(null);
                });
        } else {
            res.status(404).json({
            "sporočilo": 
                "Ne najdem lokacije, idLokacije je obvezen parameter."
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
    seznamTrgovin,
    preberiTrgovino,
    izbrisiTrgovino,
    kreirajTrgovino,
    zacetneTrgovine,
    brisiTrgovine
}