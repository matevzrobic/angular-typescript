var nodeMailer = require('nodemailer');
var crypto = require('crypto');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

const mailOptions = (req, res) => {
    console.log("Email coming here");
    res.sendStatus(200);
}

const mailPost = (req, res) => {

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'beljakovine.info@gmail.com',
            pass: process.env.MAIL_GESLO
        }
    });

    let ime       = req.body.ime;
    let priimek   = req.body.priimek;
    let sporocilo = req.body.sporocilo;
    let email     = req.body.email;

    var mailOptions = {
        from:    'beljakovine.info@gmail.com',
        to:      'beljakovine.info@gmail.com'  ,
        subject: 'Povprasevanje',
        text:    "Ime: " + ime + "\nPriimek: " + priimek + '\nPovratni email naslov: ' + email + '\n\n' + sporocilo
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('error');
        } else {
            //console.log('Email sent: ' + info.response);
            res.status(201).send('Sent successfully');
        }
    })
}

const mailGeslo = (req, res) => {

    let email = req.body.email;

    Uporabnik
        .findOne({email: email}, (napaka, uporabnik) => {
            if(!uporabnik){
                console.log("pride noter");
                return res.status(404).json({"sporočilo": "uporabnik s tem emailom ne obstaja!"});
            }
            else if(napaka){
                return res.status(500).json({"sporočilo": "napaka na strezniku."});
            }
            else {
                let geslo = crypto.randomBytes(10).toString('hex');

                uporabnik.nastaviGeslo(geslo);
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

                var transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'beljakovine.info@gmail.com',
                        pass: process.env.MAIL_GESLO
                    }
                });

                var mailOptions = {
                    from:    'beljakovine.info@gmail.com',
                    to:      email  ,
                    subject: 'Pozabljeno geslo',
                    text:    "Pozdravljeni!\n\nTo sporočilo ste prejeli, ker ste pozabili geslo.Vaše novo geslo je " + geslo + "\nGeslo si zapišite in naslednjič bodite" +
                        " bolj previdni!\n\nVaši Beljakovinarji"
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send('error');
                    } else {
                        //console.log('Email sent: ' + info.response);
                        res.status(201).send('Sent successfully');
                    }
                })
            }
        })
}


module.exports = {
    mailOptions,
    mailPost,
    mailGeslo
}