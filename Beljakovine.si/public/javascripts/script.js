

var postPos = 0;
var newPos = 0;
var newPos1 = 0;
var postPos1 = 0;
var x = window.innerWidth / 5;
if(screen.width >= 600){
    addEventListener("load", () => {
        var $horizontal = $('.horizontal');
        var $horizontal1 = $('.horizontal2');
        var startPosition = $horizontal.position().left;
        var startPosition1 = $horizontal1.position().left;
        var speed = 1.2;
        var speed1 = 1.0;
        var $slika = $('.slika');

        $(window).scroll(function () {
            var st = $(this).scrollTop();
            if(st>1000){
                st = st-1000;
                if(newPos1<x){
                    newPos1 = startPosition1 + st*speed1 ;
                    $horizontal1.css({
                        'left' : newPos1
                    });
                }
                else{
                    console.log("gre v else");
                    newPos1 = startPosition1 + st*speed1;
                    $horizontal1.css({
                        'left': (x-(newPos1-x))
                    });
                }
        
            }
            else{
                if(newPos<x){
                    newPos = startPosition + st*speed ;
                    $horizontal.css({
                        'left' : newPos
                    });
                    checker = true;
                }
                else{
                    newPos = startPosition + st*speed;
                    $horizontal.css({
                        'left': (x-(newPos-x))
                    });
                }
            //console.log(st + " newPos");
            }
        });
        $(document).on("scroll", function() {
            var pageTop = $(document).scrollTop();
            var pageBottom = pageTop + $(window).height();
            var tags = $(".slika");
            var que_el = $(".vprasanje");
            console.log($(que_el).position());
            if($(que_el).position().top < pageBottom){
                console.log("se notri");
                $(que_el).addClass("visible");
            }
            for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            
            if ($(tag).position().top < pageBottom && ($(tag).position().top)>pageTop) {
                $(tag).addClass("visible");
            }
            else {
                $(tag).removeClass("visible");
            }
            }
            });
    });
}


var mapa;
var markerji = [];
addEventListener("load", function() {
        //-------------- ustvarimo mapo
        // Ustvarimo objekt mapa ter dodamo osnovne lastnosti mapi
        mapa = L.map('mapa_id', {
            center: L.latLng(46, 14.6),
            zoom: 9
        });
    
        // Ustvarimo prikazni sloj mape
        var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    
        // Prikazni sloj dodamo na mapo
        mapa.addLayer(layer);
    
        // Ročno dodamo fakulteto za računalništvo in informatiko na mapo
        var trgovine = document.getElementsByClassName("trgovina");
        for(var i = 0; i < trgovine.length; i++){
            var ime = trgovine[i].innerHTML;
            var lng = trgovine[i].getAttribute("data-lng");
            var lat = trgovine[i].getAttribute("data-lat");
            var marker = L.marker([lng,lat]).addTo(mapa);
            console.log(ime)
            marker.bindPopup("<div>" + ime + "</div>");
        }
        markerji.push(marker);   
});

/*
 function prikaziLog(){
     console.log("pride not");
     var reg = document.getElementById("reg");
     var log = document.getElementById("log");
     reg.style.display="none";
     log.style.display="block";
 }

 function prikaziReg(){
    var reg = document.getElementById("reg");
    var log = document.getElementById("log");
    log.style.display="none";
    reg.style.display="block";
}*/



document.addEventListener('click', function(event) {
    var isClickOutside = document.getElementById("skupaj").contains(event.target);
    var location = document.getElementById("skupaj").getBoundingClientRect();
    document.getElementById("login_gumb").style.top = location.top + 25 + "px";
    document.getElementById("login_gumb").style.left = location.left - 25 + "px";
    if(!isClickOutside){
        document.getElementById("login_gumb").style.display = "none";
    }
    else{
        document.getElementById("login_gumb").style.display = "block";
    }
});

function filtriranje(){
    var input = document.getElementById("search_input").value.toUpperCase();
    var row = document.getElementById("vsi_izdelki");
    var posamezene_izdelek = row.getElementsByClassName("mb-4");
    for(var i = 0; i < posamezene_izdelek.length; i++){
        var a = posamezene_izdelek[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName("h4")[0].getElementsByTagName("a")[0];
        var in_text = a.textContent || a.innerText;
        var input1 = new RegExp(input.toUpperCase());
        var drzi = input1.test(in_text.toUpperCase());
        if(in_text == "Dodaj izdelek") {
            continue;
        }
        if(drzi){
            posamezene_izdelek[i].style.display = "";
        }
        else{
            posamezene_izdelek[i].style.display = "none";
        }
    }
}


let regName = new RegExp ('^[a-zA-Z]+$');
let regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
let regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
let decimal = new RegExp('([0-9]*[.])?[0-9]+');

//addEventListener("load", function(){
    var dodajTrgovino = document.querySelector("#dodajTrgovino");
    dodajTrgovino.addEventListener("submit", function(dogodek){
        if(!regName.test(dodajTrgovino.elements.ime.value)){
            document.querySelector("#popraviPoljeVnosa").style.display = "flex";
            dogodek.preventDefault();
        }
        if(dodajTrgovino.elements.lokacija.value == ""){
            document.querySelector("#popraviPoljeVnosa").style.display = "flex";
            dogodek.preventDefault();
        }
        if(!(dodajTrgovino.elements.prevzem.value == "DA" || dodajTrgovino.elements.prevzem.value == "NE")){
            document.querySelector("#popraviPoljeVnosa").style.display = "flex";
            dogodek.preventDefault();
        }
        if(isNaN(dodajTrgovino.elements.lng.value) || dodajTrgovino.elements.lng.value == ""){
            document.querySelector("#popraviPoljeVnosa").style.display = "flex";
            dogodek.preventDefault();
        }
        if(isNaN(dodajTrgovino.elements.lat.value) || dodajTrgovino.elements.lat.value == ""){
            document.querySelector("#popraviPoljeVnosa").style.display = "flex";
            dogodek.preventDefault();
        }
    });

    var poslji_sporocilo = document.querySelector("#poslji_sporocilo");
    poslji_sporocilo.addEventListener("submit", function(dogodek){
        var ime = poslji_sporocilo.elements.ime;
        var priimek = poslji_sporocilo.elements.priimek;
        var email = poslji_sporocilo.elements.email;
        var msg = poslji_sporocilo.elements.msg;
        if(!regName.test(ime.value)){
            document.getElementById("error_name").style.display = "inline"; 
            dogodek.preventDefault();           
        }
        else{
            document.getElementById("error_name").style.display = "none";
        }
        if(!regName.test(priimek.value)){
            document.getElementById("error_lname").style.display = "inline"; 
            dogodek.preventDefault();
        }
        else{
            document.getElementById("error_lname").style.display = "none";
        }
        if(!regEmail.test(email.value)){
            document.getElementById("error_email").style.display = "inline"; 
            dogodek.preventDefault();
        }
        else{
            document.getElementById("error_email").style.display = "none";
        }
        if(msg.value == ""){
            document.getElementById("error_msg").style.display = "inline";
            dogodek.preventDefault();
        }else{
            document.getElementById("error_msg").style.display = "none";
        }
    });
//});


function dodajTabelo(){
    document.getElementById("dodajTabelo").style.display = "block";
}
console.log(window.location.href);
function posljiDelete(identifier){
    var sinhronaZahteva = new XMLHttpRequest();
    var parameters = {"_id" : identifier.getAttribute("data-id")};
    console.log(identifier.getAttribute("data-id"));
      sinhronaZahteva.open("DELETE", window.location.href, true);
      sinhronaZahteva.setRequestHeader('Content-type', 'application/json');
      sinhronaZahteva.send(JSON.stringify(parameters));
      location.reload();
}

function uvozi() {
    var url = window.location.href;
    window.location.replace(url + "/uvozi");
}


function brisi() {
    var url = window.location.href;
    window.location.replace(url + "/brisi");
}
