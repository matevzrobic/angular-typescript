import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uporabnik } from '../../razredi/uporabnik';
import { PovezavaService } from '../../storitve/povezava.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private avtentikacijaService: AvtentikacijaService,
  				private router: Router, private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {

  }
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public jePrijavljen(): boolean {
  	return this.avtentikacijaService.jePrijavljen();
  }

  public jeAdmin(): boolean {
    return this.avtentikacijaService.jeAdmin();
  }

  public vrniImeUporabnika(): string {
  	return this.avtentikacijaService.vrniTrenutnegaUporabnika().ime;
  }

  public odjava(): void {
    this.avtentikacijaService.odjava();
    this.router.navigate(['izdelki']);
  }
}
