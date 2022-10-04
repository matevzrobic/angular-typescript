import { Component, OnInit } from '@angular/core';
import * as $ from '../../../assets/javascripts/jquery-3.5.1.min.js';
@Component({
  selector: 'app-zacetna-stran',
  templateUrl: './zacetna-stran.component.html',
  styleUrls: ['./zacetna-stran.component.css']
})
export class ZacetnaStranComponent implements OnInit {

  constructor() { }

  public title = "Zacetna-stran";

  public tekst1: string = "Smo mladi slovenski podjetniki in naša želja je,\n da ljudem ponudimo kaj se da poceni ampak vseeno kvalitetna prehranska dopolnila.\n Vsi smo smo že kdaj bili na tej točki,ko smo začeli in nismo vedeli kaj je za nas dobro in kaj ekonomsko ugodno, zato smo razvili slednjo podjetniško idejo." 
  public tekst2: string = "Naši proteini so narejeni iz zelo kakovostnih materialov, z minimalno dodanimi sladili in umetnimi sintetičnimi snovmi.\n Produkti so bili testirani na večih raziskavah, kjer so dosegali odlične rezulate,pohvalimo pa se lahko tudi z nagrado za slovenski top produkt leta.\n\n Ne bo vam žal če nas poskusite..."

  ngOnInit(): void {
    var postPos = 0;
    var newPos = 0;
    var newPos1 = 0;
    var postPos1 = 0;
    var x = window.innerWidth / 5;
    if(screen.width >= 600){
      
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
                  }
                  else{
                      newPos = startPosition + st*speed;
                      $horizontal.css({
                          'left': (x-(newPos-x))
                      });
                  }
              }
          });
          $(document).on("scroll", function() {
              var pageTop = $(document).scrollTop();
              var pageBottom = pageTop + $(window).height();
              var tags = $(".slika");
              var que_el = $(".vprasanje");
              if($(que_el).position().top < pageBottom){
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
      ;
    }
  }
  
}
