const hbs = require('hbs');

hbs.registerHelper('zvezdice', (ocenaStrokovnjaka) => {
    let zvezdice = '';
    for (let i = 1; i <= 5; i++)
      zvezdice += '<i class="fa' + (ocenaStrokovnjaka >= i ? 's' : 'r') + ' fa-star"></i>';
    return zvezdice;
});
hbs.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,10);
    return new hbs.SafeString(theString)
});