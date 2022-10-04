const storage = require('node-sessionstorage');

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
  
const profil = (req, res) => {
   
    if(storage.getItem("trenutni_UID")) {
        axios
            .get('/api/uporabniki/'+storage.getItem("trenutni_UID"), { })
            .then((uporabnik) => {
                
                  axios.get('/api/nakupi/u/' + storage.getItem("trenutni_UID"), { })
                     .then((nakupi) => { prikaziProfil(req,res, uporabnik.data, nakupi.data); })
                     .catch((napaka) => { prikaziProfil(req,res, uporabnik.data, []); });
                
            })
            .catch((napaka) => {
                res.status(404).json(napaka);
            });
    } else {
        res.redirect('/prijava');
    }
};

const prikaziProfil = (req, res, uporabnik, nakupi) => {
    var datum = ""
    if (uporabnik.datumRojstva) {
        datum = new Date(uporabnik.datumRojstva).toISOString().split("T")[0];
    }

    res.render('profil', {
        title: 'Profil',
        uporabnik: {
            ime: uporabnik.ime,
            priimek: uporabnik.priimek,
            email: uporabnik.email,
            datumRojstva: datum,
            // datumRojstva: new Date(uporabnik.datumRojstva).toISOString().split("T")[0],
            geslo: uporabnik.geslo
        },
        nakupi: nakupi
    });
};

const prikaziNeprijavljenProfil = (req, res) => {

    res.render('profil', {
        title: 'Profil',
        uporabnik: {
            ime: 'Marko',
            priimek: 'Pokonc',
            email: 'marko.pokonc@lavbic.net',
            datumRojstva: '2018-07-22',
            geslo: 'marko123'
        },
        nakupi: [{
            nakup_id: 1304873301,
            datum: '12.7.2020',
            izdelki:[],
            popust: 25,
            cena: 19.49
        },{
            nakup_id: 1304823011,
            datum: '9.5.2020',
            izdelki:[{
                naziv: 'Impact Whey Protein Stevia, 2500g',
                cena: 34.99
            },{
                naziv: 'Vitamin C plus, 180 tablet',
                cena: 19.99
            },{
                naziv: 'Vegan Protein Blend, 1000g',
                cena: 20.99
            }],
            popust: 10,
            cena: 68.37
        },{
            nakup_id: 1301280182,
            datum: '25.2.2020',
            izdelki:[],
            popust: 0,
            cena: 78.56
        },{
            nakup_id: 1271560528,
            datum: '12.10.2019',
            izdelki:[],
            popust: 12,
            cena: 22.87
        }]
    });
};



const updateInfo = (req,res) => {
    axios({
        method: 'put',
        url: '/api/uporabniki/info/'+storage.getItem("trenutni_UID"),
        data: {
            ime: req.body.ime,
            priimek: req.body.priimek,
            email: req.body.email,
            datumRojstva: req.body.datumRojstva,
        }
    }).then(() => {
        res.redirect('/profil');
        
    }).catch((napaka) => {
        res.status(400).json(napaka);
    });
};

const updateGeslo = (req,res) => {
    console.log("SERVER")
    console.log(req.body.geslo);
    axios({
        method: 'put',
        url: '/api/uporabniki/geslo/'+storage.getItem("trenutni_UID"),
        data: {
            geslo: req.body.geslo,
        }
    }).then(() => {
        res.redirect('/profil');
    }).catch((napaka) => {
        res.status(400).json(napaka);
    });
};


const izbrisiUporabnika= (req, res) => {
    var idUporabnika = storage.getItem("trenutni_UID");
    axios({
        method: 'delete',
        url: '/api/uporabniki/' + idUporabnika, 
        data: {}
    }).then(() => {
        storage.removeItem("trenutni_UID");
        res.redirect('/index');
    }).catch((napaka) => {
        console.log("nekaj ne dela vredi");
    });
}

const odjava = (req, res) => {
    storage.removeItem("trenutni_UID");
}

const izbrisiNakup = (req,res) => {
    var id = req.params.idNakupa;
    
    axios({
        method: 'delete',
        url: '/api/nakupi/' + id, 
        data: {}
    }).then(() => {
        res.status(204).json({"Uspesno":"uspesno izbrisan nakup"});
    }).catch((napaka) => {
        res.status(500).json({"Napaka":"napaka pri izbrisu nakupa"});
    });
 
}

module.exports = {
    profil,
    updateInfo,
    updateGeslo,
    izbrisiUporabnika,
    odjava,
    izbrisiNakup
};