const { exec } = require("child_process");
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

const prikazi = (req, res) => {
    res.render('db', {
        title: 'DB'
    });
}

const uvozi = (req, res) => {
    console.log("SOM V SERVER DB UVOZI")
    axios
        .get('/api/db/uporabniki', {})
        .then((uporabniki) => {})
        .catch(() => {});
    axios
        .get('/api/db/kuponi', {})
        .then((uporabniki) => {})
        .catch(() => {});
    axios
        .get('/api/db/izdelki', {})
        .then((uporabniki) => {})
        .catch(() => {});
    axios
        .get('/api/db/trgovine', {})
        .then((uporabniki) => {})
        .catch(() => {});
    res.redirect("/db");
}

const brisi = (req, res) => {
    axios
        .get('/api/db/uporabniki/brisi', {})
        .then((uporabniki) => {})
        .catch(() => {});
        axios
        .get('/api/db/izdelki/brisi', {})
        .then((uporabniki) => {})
        .catch(() => {});
        axios
        .get('/api/db/kuponi/brisi', {})
        .then((uporabniki) => {})
        .catch(() => {});
        axios
        .get('/api/db/nakupi/brisi', {})
        .then((uporabniki) => {})
        .catch(() => {});
        axios
        .get('/api/db/trgovine/brisi', {})
        .then((uporabniki) => {})
        .catch(() => {});
    res.redirect("/db");
}

const showButtons = (req, res) => {
    res.render('zakljucekNakupa', {
        title: 'Zaključek in plačilo'
    });
};


module.exports = {
    uvozi,
    brisi,
    prikazi
};