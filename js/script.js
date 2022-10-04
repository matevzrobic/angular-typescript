var postPos = 0;
var newPos = 0;
var newPos1 = 0;
var postPos1 = 0;
var x = window.innerWidth / 5;
$(document).ready(function () {
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

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  // Initialize and add the map
 /* function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}*/
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
}
function mouseout(){
    var dropdown = document.getElementById("dropdown");
    dropdown.style.height="0px";
    document.getElementById("pomik_tabele").style.marginTop = "0px";
}
function mouseover(){
    console.log("mouseOVEr");
    var dropdown = document.getElementById("dropdown");
    dropdown.style.height="50px";
    document.getElementById("pomik_tabele").style.marginTop = "50px";
}


document.addEventListener('click', function(event) {
    var isClickOutside = document.getElementById("skupaj").contains(event.target);
    if(!isClickOutside){
        console.log("TEST");
        document.getElementById("login_gumb").style.display = "none";
    }
    else{
        document.getElementById("login_gumb").style.display = "block";
        console.log("TEST1");
    }
});

function filtriranje(){
    var input = document.getElementById("search_input").value.toUpperCase();
    var row = document.getElementById("vsi_izdelki");
    var posamezene_izdelek = row.getElementsByClassName("mb-4");
    console.log(posamezene_izdelek.length);
    for(var i = 0; i < posamezene_izdelek.length; i++){
        var a = posamezene_izdelek[i].getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName("h4")[0].getElementsByTagName("a")[0];
        console.log(a);
        var in_text = a.textContent || a.innerText;
        console.log(in_text);
        var input1 = new RegExp(input.toUpperCase());
        var drzi = input1.test(in_text.toUpperCase());
        console.log(drzi);
        if(drzi){
            posamezene_izdelek[i].style.display = "";
        }
        else{
            posamezene_izdelek[i].style.display = "none";
        }
    }
}
//filtriranje po checkboxu
/*var checkbox = document.getElementsByName("type");
for(var i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener("change", function(){
        var type = checkbox[i].value;
        var row = document.getElementById("vsi_izdelki");
        var posamezene_izdelek = row.getElementsByClassName("mb-4");
        if(checkbox[i].checked){
            console.log(posamezene_izdelek.length);
            for(var i = 0; i < posamezene_izdelek.length; i++){
                var type_izdelka = posamezene_izdelek[i].getAttribute("data-type");
                if(type_izdelka == type){
                    //stoping session
                }
            }  
        }
    });
}
*/



addEventListener("load", function(){
var poslji_sporocilo = document.querySelector("form");
    poslji_sporocilo.addEventListener("submit", function(dogodek){
        var ime = poslji_sporocilo.elements.ime.value;
        console.log(ime);
        dogodek.preventDefault();
    });

});


