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

const kuponi = (req, res) => {
    axios
        .get('/api/kuponi', {

        })
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Trenutno ni v bazi nobenih kuponov.";
            prikaziKupone(req,res, odgovor.data, sporocilo);
        })
        .catch(() => {
            prikaziKupone(req,res,[], "Napaka API-ja pri iskanju kuponov");
        });
};
const prikaziKupone = (req, res, seznamKuponov, sporocilo) => {
    res.render('kuponi', {
        title: 'Urejanje kuponov',
        kuponi: seznamKuponov,
        sporocilo: sporocilo,
    });
};

const shraniKupon = (req,res) => {
    if(!req.body.niz || !req.body.popust || !req.body.datum){
        res.redirect('kuponi');
    }
    else{
        axios({
            method: 'post',
            url: '/api/kuponi',
            data: {
                niz: req.body.niz,
                popust: req.body.popust,
                datum: req.body.datum,
            }
        }).then(() => {
            res.redirect('/kuponi');
        }).catch((napaka) =>{
            console.log("Napaka pri dodajanju kupona!");
        });
    }
};

const izbrisiKupon = (req,res) => {
    const idKupona = req.body._id;
    axios({
        method: 'delete',
        url: '/api/kuponi/' + idKupona,
        data: {}
    }).then(() => {
        res.redirect('/kuponi');
    }).catch((napaka) => {
        console.log("Napaka pri brisanju kupona!");
    });
};

module.exports = {
    kuponi,
    shraniKupon,
    izbrisiKupon
};