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

const dodajanje = (req, res) => {
    res.render('dodajanje', {
        title: 'Dodajanje izdelka',
        izbira: {
            dis: 'Izberi kategorijo',
            ena: 'Whey proteini',
            dva: 'Veganski proteini',
            tri: 'Aminokisline',
            stiri: 'Moška oblačila',
            pet: 'Ženska oblačila'
        }
    });
};

module.exports = {
    dodajanje
};