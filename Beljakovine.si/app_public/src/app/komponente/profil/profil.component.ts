import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Nakup } from '../../razredi/nakup';
import { Uporabnik } from '../../razredi/uporabnik';
import * as $ from '../../../assets/javascripts/jquery-3.5.1.min.js';
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService,
              private avtentikacijaService: AvtentikacijaService,
              private router: Router,
              private povezavaStoritev: PovezavaService) { }

  public uporabnik: Uporabnik;
  public novi = {
  	_id: '',
  	ime: '',
  	priimek: '',
  	email: '',
  	geslo: '',
    admin:false
  }
  public G = {
  	staroGeslo: '',
  	novoGeslo: '',
  	ponoviGeslo: ''
  }
  public nakupi: Nakup[];
  public obrazecNapaka: string;
  public obrazecUspesno: string;

  public regName = new RegExp ('^[a-zA-Z]+$');
  public regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');
  public regPsw = new RegExp ('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

  ngOnInit(): void {

  	if(screen.width < 768)
        $("#sidebarProfil").addClass("row");
    else
        $("#sidebarProfil").className = '';


  	if(this.avtentikacijaService.jePrijavljen()) {

  	  this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
      if(this.uporabnik) {
        //this.obrazecUspesno = "Uspešno prijavljen uporabnik";

        this.novi = this.uporabnik;

        this.beljakovinePodatkiService
            .pridobiNakupe(this.uporabnik._id)
            .then(nakupi => {this.nakupi = nakupi})
            .catch(() => this.obrazecNapaka="Nismo našli vaših nakupov.");

      } else {
        this.obrazecNapaka = "Nismo mogli pridobiti vaših podatkov.";
      }

  	} else {
  		this.router.navigate(['prijava']);
  	}
  }

  public posodobiUporabnika(): void {

  	if (!this.novi.ime) this.novi.ime = this.uporabnik.ime;
    if (!this.novi.priimek) this.novi.priimek = this.uporabnik.priimek;
    if (!this.novi.email) this.novi.email = this.uporabnik.email;

  	if(this.regName.test(this.novi.ime) &&
  		this.regName.test(this.novi.priimek) &&
  		this.regEmail.test(this.novi.email)) {

  		/*this.beljakovinePodatkiService
	  		.updateUporabnika(this.uporabnik._id, this.novi)
	  		.then(() => this.uporabnik = this.novi)
	  		.catch(napaka => this.obrazecNapaka = napaka);*/
      this.avtentikacijaService
          .updateUporabnika(this.uporabnik._id, this.novi)
          .then(() => {this.uporabnik = this.novi;
                       this.obrazecUspesno = "Uspešna posodobitev informacij.";})
          .catch(napaka => this.obrazecNapaka = napaka);

  	} else {
      this.obrazecNapaka = "Prosimo pravilno vnesite podatke.";
    }
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public posodobiGeslo(): void {
  	if( this.G.staroGeslo != ''){

      if( this.G.novoGeslo == this.G.ponoviGeslo ){

      	if( this.regPsw.test(this.G.novoGeslo) ) {

    	  	this.beljakovinePodatkiService
    	  		.updateGeslo(this.uporabnik._id, this.G.novoGeslo, this.G.staroGeslo)
    	  		.then(() => {
              this.G = {staroGeslo: '',novoGeslo: '',ponoviGeslo: ''};
              this.obrazecUspesno = "Uspešno posodobljeno geslo.";
            })
    	  		.catch(napaka => this.obrazecNapaka = napaka);

        } else {
          this.obrazecNapaka = "Prosimo vnesite veljavno geslo.";
        }

      } else {
        this.obrazecNapaka = "Novo in ponovno geslo se ne ujemata.";
      }

  	} else {
      this.obrazecNapaka = "Prosimo vpišite staro geslo.";
    }
  }

  public zbrisiNakup(nakup:Nakup): void {
  	this.beljakovinePodatkiService
      .odstraniNakup(nakup._id)
      .then( () => {
        this.nakupi = this.nakupi.filter(s => s._id !== nakup._id);
        this.obrazecUspesno = "Nakup " + nakup._id + " izbrisan.";
      } )
      .catch(napaka => this.obrazecNapaka = napaka);
  }

  public zbrisiRacun(): void {
  	this.beljakovinePodatkiService
      .odstraniUporabnika(this.uporabnik._id)
      .then(() => { this.uporabnik = null;
                    this.obrazecUspesno="Račun uspešno izbrisan."})
      .catch(napaka => this.obrazecNapaka = napaka);

    this.odjava();
  }

  public odjava(): void {
    this.avtentikacijaService.odjava();
    this.router.navigate(['prijava']);
  }

}
