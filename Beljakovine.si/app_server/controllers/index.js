/* GET home page */
const index = (req, res) => {
    res.render('index', { 
        title: 'Začetna stran',
        opis_aplikacije: {
            tekst1_naslov: "O nas",
            tekst1: "Smo mladi slovenski podjetniki in naša želja je da ljudem ponudimo\nkaj se da poceni ampak vseeno kvalitetna prehranska dopolnila. Vsi smo smo že kdaj bili na tej točki\nko smo začeli in nismo vedeli kaj je za nas dobro in kaj ekonomsko ugodno, zato smo razvili slednjo podjetniško idejo.",
            tekst2_naslov: "Zakaj so naši proteini najboljši?",
            tekst2: "Naši proteini so narejeni iz zelo kakovostnih materialov, z minimalno dodanimi sladili\nin umetnimi sintetičnimi snovmi. Produkti so bili testirani na večih raziskavah, kjer so dosegali odlične rezulate,\npohvalimo pa se lahko tudi z nagrado za slovenski top produkt leta. Ne bo vam žal če nas poskusite..."       
        } ,


});
};

module.exports = {
    index
};