import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service'; 
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService, public router: Router, 
    private avtentikacijaService: AvtentikacijaService, private povezavaStoritev: PovezavaService) { }

  public sporocilo = '';

  public registracijaUporabnika = {
    _id: '',
    ime: '',
    priimek: '',
    email: '',
    geslo: '',
    admin:false
  }

  public regName = new RegExp ('^[a-zA-Z]+$');
  public regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
  public regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public soPodatkiUstrezni (): boolean {
    if (!this.regName.test(this.registracijaUporabnika.ime)) {
      return false;
    }
    if (!this.regName.test(this.registracijaUporabnika.priimek)) {
      return false;
    }
    if (!this.regEmail.test(this.registracijaUporabnika.email)) {
      return false;
    }
    if (!this.regPsw.test(this.registracijaUporabnika.geslo)) {
      return false;
    }
    return true;
  }

  public registrirajUporabnika(): void {
    if(this.soPodatkiUstrezni()) {
      this.avtentikacijaService.registracija(this.registracijaUporabnika)
      .then(() => this.router.navigate(['/']))
      .catch(napaka => this.sporocilo = napaka);
    }
    else {
      this.sporocilo = "Prosimo pravilno vnesite vse podatke!"
    }
  }




  ngOnInit(): void {
    if(this.avtentikacijaService.jePrijavljen()) {
      this.router.navigate(['/']);
    }
  }

}
