const mongoose = require('mongoose');

const izdelkiShema = new mongoose.Schema({
    naziv: {type: String, required: true},
    cena: {type: Number, required: true},
    ocena_strokovnjaka: {type: Number, min: 0, max: 5, required: true},
    opis: {type: String, required: true},
    slika: {type: String, required: true}
});

mongoose.model('Izdelek', izdelkiShema, 'Izdelki');