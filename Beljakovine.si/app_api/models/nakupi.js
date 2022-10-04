const mongoose = require('mongoose');



const izdelekStShema = new mongoose.Schema({
    kolicina: {type: Number, required: false},
    izdelek: {type: mongoose.Schema.Types.ObjectId, ref: 'Izdelek', required: false}
});

const naslovShema = new mongoose.Schema({
    naslov: { type:String, required:false },
    postnaSt: { type:Number, required:false },
    posta: String
}); 

const nakupiShema = new mongoose.Schema({
    //id
    datum: {type: Date, "default": Date.now},
    
    kupon: {type: mongoose.Schema.Types.ObjectId, ref: 'Kupon'},
    uporabnik: {type: mongoose.Schema.Types.ObjectId, ref: 'Uporabnik', required: true},
    //izdelki: [izdelekStShema],
    izdelki: [{type: mongoose.Schema.Types.ObjectId, ref: 'Izdelek'}],
    
    //naslov: naslovShema,
    
    skupnaCena: { type:Number, required:true }
});

mongoose.model('Nakup', nakupiShema, 'Nakupi');