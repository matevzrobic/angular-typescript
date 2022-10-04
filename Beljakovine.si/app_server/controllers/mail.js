var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://Beljakovine.herokuapp.com/';
}

var nodeMailer = require('nodemailer');

const mailOptions = (req, res) => {
    console.log("Email coming here");
    res.sendStatus(200);
}

const mailPost = (req, res) => {

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'beljakovine.info@gmail.com',
            pass: 'beljakovine123'
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
            res.send('error');
        } else {
            //console.log('Email sent: ' + info.response);
            res.send('Sent successfully');
        }
    })
}

const mailGeslo = (req, res) => {

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'beljakovine.info@gmail.com',
            pass: 'beljakovine123'
        }
    });
    let geslo = "As8j!2Sk4gj2";
    let email = req.body.email;

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
            res.send('error');
        } else {
            //console.log('Email sent: ' + info.response);
            res.send('Sent successfully');
        }
    })
}


module.exports = {
    mailOptions,
    mailPost,
    mailGeslo
}

