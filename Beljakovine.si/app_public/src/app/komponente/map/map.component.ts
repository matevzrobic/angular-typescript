import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Trgovina } from '../../razredi/trgovina';
import * as L from 'leaflet';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import 'leaflet-routing-machine';
import { GeoLokacijaService } from "../../storitve/geo-lokacija.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private geolokacijaStoritev: GeoLokacijaService) { }

  @Input() trgovine: Trgovina[];
  
  public sporocilo: string;

  private najblizjaTrgovina: number = Infinity;
  private najblizjaTrgovinaId: number;
  private map;

  private prikaziNapako = (napaka: any): void => {
    this.sporocilo = napaka;
  }

  private niGeolokacije = (): void => {
    this.sporocilo = "Spletni brskalnik ne podpira geolociranja";
  }

  private pridobiPolozaj = (): void => {
    this.sporocilo = "Pridobivam trenutni položaj odjemalca ...";
    this.geolokacijaStoritev.pridobiLokacijo(
      this.initMap.bind(this),
      this.initMapDenied.bind(this),
      this.initMapNoGeoLocation.bind(this)
    )
  }

  private initMap(polozaj: any): void{
    this.sporocilo = "";
    this.map = L.map('mapa_id', {
      center: L.latLng(46, 14.6),
      zoom: 9
    });

    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.addLayer(layer);
    var mojaLokacija = [polozaj.coords.latitude, polozaj.coords.longitude];    

    for(var i=0; i < this.trgovine.length; i++){
      var ime = this.trgovine[i].ime;
      var lng: number = this.trgovine[i].lng;
      var lat: number = this.trgovine[i].lat;
      this.najkrajsaRazdalja(mojaLokacija, lng, lat, i);
      var marker = L.marker([lat,lng]).addTo(this.map);
      marker.bindPopup("<div>" + ime + "</div>");
    }
      L.Routing.control({
        waypoints: [
            L.latLng(mojaLokacija[0], mojaLokacija[1]),
            L.latLng(this.trgovine[this.najblizjaTrgovinaId].lat, this.trgovine[this.najblizjaTrgovinaId].lng)
        ],
        routeWhileDragging: true
      }).addTo(this.map);
  }

  private initMapDenied(napaka: any): void{
    this.sporocilo = "uporabnik ni dovolil dostopa do geolokacije.";
    this.map = L.map('mapa_id', {
      center: L.latLng(46, 14.6),
      zoom: 9
    });

    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.addLayer(layer);

    for(var i=0; i < this.trgovine.length; i++){
      var ime = this.trgovine[i].ime;
      var lng: number = this.trgovine[i].lng;
      var lat: number = this.trgovine[i].lat;
      var marker = L.marker([lat,lng]).addTo(this.map);
      marker.bindPopup("<div>" + ime + "</div>");
    }
  }

  private initMapNoGeoLocation(): void{
    this.sporocilo = "spletni brskalnik ne podpira geolociranja.";
    this.map = L.map('mapa_id', {
      center: L.latLng(46, 14.6),
      zoom: 9
    });

    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.map.addLayer(layer);

    for(var i=0; i < this.trgovine.length; i++){
      var ime = this.trgovine[i].ime;
      var lng: number = this.trgovine[i].lng;
      var lat: number = this.trgovine[i].lat;
      var marker = L.marker([lat,lng]).addTo(this.map);
      marker.bindPopup("<div>" + ime + "</div>");
    }
  }
  private najkrajsaRazdalja(mojaLokacija: any, lng:number, lat:number, zapSt:number): void{
    var razdalja = Math.abs(mojaLokacija[1]-lng)+Math.abs(mojaLokacija[0]-lat);
    if(razdalja <= this.najblizjaTrgovina){
      this.najblizjaTrgovina = razdalja;
      this.najblizjaTrgovinaId = zapSt;
    }
  }

  ngOnInit(): void {
     this.pridobiPolozaj();
  }
}
