const storage = require('node-sessionstorage');
var skupnaCena = 0.0;
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://Beljakovine.herokuapp.com/';
}
const axios = require('axios').create({
    baseURL: apiParametri.streznik,
    timeout: 5000
});

const kosarica = (req, res, seznam, skupnaCena, sporocilo, kuponi) => {
    res.render('kosarica', {
        title: 'Potrditev nakupa',
        izdelki: seznam,
        sporocilo: sporocilo,
        skupnaCena: skupnaCena,
        kuponi: kuponi
    });
};

const getIzdelek = (req, res) => {
    let seznamIzdelkov = [];
    let izdelkiId = JSON.parse(storage.getItem("kosarica"));
        axios
            .get('/api/izdelki/',{})
            .then((odgovor) => {
                skupnaCena = 0;
                let sporocilo = odgovor.data.length ? null : "Ta izdelek ne obstaja";
                for(var i = 0; i < izdelkiId.length; i++) {
                    for(let j = 0; j < odgovor.data.length; j++) {
                        if(odgovor.data[j]._id == izdelkiId[i]) {
                            seznamIzdelkov[i] = odgovor.data[j];
                            skupnaCena += odgovor.data[j].cena;
                        }
                    }
                }
                dobiKupone(req, res, seznamIzdelkov, skupnaCena.toFixed(2), null);

                /*seznamIzdelkov[i] = (odgovor.data);
                skupnaCena += odgovor.data.cena;
                console.log(odgovor.data.cena);
                console.log(skupnaCena);*/
            })
            .catch(() => {
                kosarica(req, res, [], "Napaka API-ja pri iskanju izdelkov");
            });
}

const dobiKupone = (req, res, seznamIzdelkov, skupnaCena, sporocilo) => {
    axios
        .get('/api/kuponi', {

        })
        .then((odgovor) => {
            kosarica(req,res, seznamIzdelkov, skupnaCena, sporocilo, odgovor.data);
        })
        .catch((napaka) => {
            res.status(napaka)
        });
};

const dodajNakup = (req, res) => {
    if(storage.getItem("trenutni_UID") == null){
        res.redirect("/prijava");
    }
    else{
        axios({
            method: 'post',
            url: '/api/nakupi',
            data: {
                kupon: req.body.kupon,
                uporabnik: storage.getItem("trenutni_UID"),
                izdelki: JSON.parse(storage.getItem("kosarica")),
                skupnaCena: req.body.skupnaCena
            }
        }).then(() => {
            storage.removeItem("kosarica");
            storage.setItem("kosarica", JSON.stringify([]));
           // res.redirect('/izdelki');
        }).catch((napaka) =>{
            console.log("nekaj ne dela vredi");
        });
    }
};


module.exports = {
    getIzdelek,
    dodajNakup
};