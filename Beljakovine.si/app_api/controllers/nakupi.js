const mongoose = require("mongoose");
const Nakup = mongoose.model('Nakup');

const brisiNakupe = (req, res) => {
    mongoose.connection.db.dropCollection('Nakupi', function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
}


const seznamNakupov = (req, res) => {
    
    Nakup
        .find({})
        .populate('kupon')
        .populate('uporabnik')
        .populate('izdelki')
        .then(nakupi => {
            res.json(nakupi);
        })
        .catch(napaka => {
            res.status(500).json(napaka);
        });
};


const nakupiPreberiIzbranega = (req, res) => {
    
    Nakup
        .findById(req.params.idNakupa)
        .populate('kupon')
        .populate('uporabnik')
        .populate('izdelki')
        .exec((napaka, nakup) => {
            
            if (!nakup) {
                return res.status(404).json({
                  "sporočilo": "Ne najdem nakupa s podanim enoličnim identifikatorjem idNakupa."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            
            res.status(200).json(nakup); //everything ok, send "nakup json"
        });
};


const nakupiPreberiZaUporabnika = (req, res) => {
    
    //idUporabnika
    Nakup
        .find({'uporabnik': req.params.idUporabnika})
        .populate('kupon')
        .populate('uporabnik')
        .populate('izdelki')
        .exec((napaka, nakupi) => {
            if(napaka){
                res.status(500).json(napaka);
            }
            
            res.status(200).json(nakupi);
        });
    
};


const nakupiPosodobiIzbranega = (req, res) => {
    if (!req.params.idNakupa) {
        return res.status(404).json({
            "sporočilo": "Ne najdem nakupa, idNakupa je obvezen parameter."
        });
    }
    
    Nakup
        .findById(req.params.idNakupa)
        .populate('kupon')
        .populate('uporabnik')
        .populate({
            path: 'izdelki',
            populate: { path: 'izdelek' , model: "Izdelek"}
        })
        .exec((napaka, nakup) => {
            
            if (!nakup) {
                return res.status(404).json({
                  "sporočilo": "Ne najdem nakupa s podanim enoličnim identifikatorjem idNakupa."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            
            nakup.datum = req.body.datum;
            nakup.kupon = req.body.kupon;
            nakup.uporabnik = req.body.uporabnik;
            nakup.izdelki = req.body.izdelki;
            nakup.naslov = {
                naslov: req.body.naslov,
                postnaSt: req.body.postnaSt,
                posta: req.body.posta
            };
            nakup.skupnaCena = req.body.skupnaCena;
            
            
            nakup.save((napaka, nakup) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.status(200).json(nakup);
                }
            });
            
        });
    
};


const nakupiKreiraj = (req, res) => {
    console.log(req.body.uporabnik);
    console.log(req.body.kupon);
    console.log(req.body.izdelki);
    console.log(req.body.skupnaCena);
    Nakup.create({
        //datum:
        kupon: req.body.kupon,
        uporabnik: req.body.uporabnik,
        izdelki: req.body.izdelki,
        skupnaCena: parseFloat(req.body.skupnaCena)
    }, (napaka, nakup) => {
        if (napaka) {
            res.status(400).json(napaka);
        } else {
            res.status(201).json(nakup);
        }
  });
  
};


const nakupiIzbrisiIzbranega = (req, res) => {
    const {idNakupa} = req.params;
    if (idNakupa) {
        Nakup
            .findByIdAndRemove(idNakupa)
            .exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
            
    } else {
        res.status(404).json({
            "sporočilo": "Ne najdem nakupa, idNakupa je obvezen parameter."
        });
    }
};



module.exports = {
    seznamNakupov,
    nakupiPreberiIzbranega,
    nakupiPreberiZaUporabnika,
    nakupiPosodobiIzbranega,
    nakupiKreiraj,
    nakupiIzbrisiIzbranega,
    brisiNakupe
};