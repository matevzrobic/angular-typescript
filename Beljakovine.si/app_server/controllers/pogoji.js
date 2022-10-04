const pogoji = (req, res) => {
    res.render('pogoji', {
        title: 'Pogoji uporabe',
        p: {
           ena: 'Prosimo, da te pogoje preberete pozorno, \nsaj vsebujejo pomembne informacije o \nvaših pravicah in obveznostih. Te pogoje \nsi lahko tudi natisnete, in sicer s klikom \nna gumb za tiskanje v svojem brskalniku.',
           dva: 'Prosimo, da pozorno preberete te pogoje,\npreden začnete uporabljati spletno mesto.\nZ uporabo spletnega mesta, vključno z vsemi\nspletnimi stranmi in vsemi informacijami, \npodatki, besedili, programsko opremo, slikami, \nzvoki ali drugimi gradivi (imenovano s \nskupnim izrazom: vsebina), ki jih vsebuje to \nspletno mesto, oziroma uporabo ali nakupom katerih \nkoli drugih izdelkov ali ponudbe (kot je opredeljeno \nspodaj), se strinjate, da vas pravno zavezujejo \nti pogoji uporabe, vaša uporaba pa temelji na stalni \nskladnosti s temi pogoji uporabe.',
           tri: 'Če ne sprejemate teh pogojev uporabe, ne \nuporabljajte spletnega mesta niti ne \nopravite spletnih nakupov.' 
        }
    });
};

module.exports = {
    pogoji
};