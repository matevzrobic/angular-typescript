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

  
  const prijavaUporabnika = (req,res) => {
      axios
      .get('/api/uporabniki', {
          
    })
    .then((uporabniki) => {
        storage.setItem('sporocilo', null);
        let flag = 0;
        for (let i = 0; i < uporabniki.data.length; i++) {
            if (uporabniki.data[i].email == req.query.email && uporabniki.data[i].geslo == req.query.geslo) {
                storage.setItem('trenutni_UID', uporabniki.data[i]._id);
                res.redirect('/profil');
                flag = 1;
                break;
            }
        }
        if (!flag) {
            storage.setItem('sporocilo', 'Napačno uporabniško ime ali geslo!');
            res.redirect('/prijava');
        }
    })
    .catch(() => {
        res.status(400).json;
    });
};

const prijava = (req, res, sporocilo) => {
    res.render('prijava', {
        title: 'Prijava',
        label: {
            ena: 'E-mail',
            dva: 'Geslo'
        },
        err: 'Neustrezno uporabniško ime ali geslo!',
        sporocilo : storage.getItem('sporocilo')
    });
};

module.exports = {
    prijava,
    prijavaUporabnika
};