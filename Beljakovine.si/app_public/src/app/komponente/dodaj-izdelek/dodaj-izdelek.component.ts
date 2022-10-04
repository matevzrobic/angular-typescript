import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-dodaj-izdelek',
  templateUrl: './dodaj-izdelek.component.html',
  styleUrls: ['./dodaj-izdelek.component.css']
})
export class DodajIzdelekComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService,
              private formBuilder: FormBuilder,
              private avtentikacijaService: AvtentikacijaService,
              private router: Router,
              private povezavaStoritev: PovezavaService) { }

  public novIzdelek = {
    naziv: '',
    cena: 0,
    ocena_strokovnjaka: 0,
    opis: '',
    slika: ''
  }

  public obrazecNapaka: string;
  public sporocilo = "Prosim vnesite pravilne podatke!";

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public soPodatkiUstrezniIzdelki(): boolean{
    if(this.novIzdelek.naziv && this.novIzdelek.cena > 0 && this.novIzdelek.ocena_strokovnjaka > 0 && this.novIzdelek.opis && this.novIzdelek.slika){
      this.sporocilo = "";
      return true;
    }
    else{
      this.sporocilo = "Prosim vnesite pravilne podatke!"
      return false;
    }
  }

  public dodajIzdelek(): void{
    if(this.soPodatkiUstrezniIzdelki()){
      this.beljakovinePodatkiService.dodajIzdelek(this.novIzdelek)
      .then(izdelek => {
      })
      .catch(napaka => this.obrazecNapaka = napaka);
    }
    else{
      this.obrazecNapaka = "Prosimo pravilno vnesite vse podatke!";
    }
  }

  ngOnInit(): void {
    if(!this.avtentikacijaService.jeAdmin()) {
      this.router.navigate(['izdelki']);
    }
  }

}
