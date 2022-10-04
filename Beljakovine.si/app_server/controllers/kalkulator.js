const kalkulator = (req, res) => {
    res.render('kalkulator', {
        title: 'Kalkulator',
    });
};

module.exports = {
    kalkulator
};