import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { Trgovina } from '../../razredi/trgovina';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {EmailService} from "../../storitve/email.service";
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {
  nodeMailerForm: FormGroup;

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService,
              private formBuilder:               FormBuilder,
              private emailService:              EmailService,
              private avtentikacijaService: AvtentikacijaService,
              private povezavaStoritev: PovezavaService) { }

  public trgovine: Trgovina[] = [];

  public novaTrgovina= {
    ime: '',
    lokacija: '',
    prevzem: '',
    lng: 1,
    lat: 1
  }

  public sporocilo: String = "Prosimo počakajte...";
  public jeAdmin: Boolean = false;

  public regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  private soPodatkiUstrezni(): boolean{
    if(this.novaTrgovina.ime && this.novaTrgovina.lokacija && this.novaTrgovina.prevzem && !isNaN(this.novaTrgovina.lng) && !isNaN(this.novaTrgovina.lat)){
      if(this.novaTrgovina.prevzem == "NE" || this.novaTrgovina.prevzem == "DA")
        return true;
    }
    else{
      return false;
    }
  }

  private mailUstrezen(objekt): boolean {
    if (objekt.ime && objekt.priimek && objekt.sporocilo && this.regEmail.test(objekt.email)) { return true; }
    else { return false; }
  }

  public obrazecNapaka: string;
  public prikazanObrazec: boolean = false;
  public mailNapaka: boolean = false;
  public mailPoslan: boolean = false;

  private ponastaviInSkrijObrazec(): void {
    this.prikazanObrazec = false;
    this.obrazecNapaka = "";
    this.novaTrgovina.ime = "";
    this.novaTrgovina.lokacija = "";
    this.novaTrgovina.prevzem = "";
    this.novaTrgovina.lng = 1;
    this.novaTrgovina.lat = 1;
  }

  public dodajNovoTrgovino(): void{
    if(this.soPodatkiUstrezni()){
      this.beljakovinePodatkiService.dodajTrgovino(this.novaTrgovina)
      .then(trgovina => {
        let trgovine1 = this.trgovine.slice(0);
        trgovine1.push(trgovina);
        this.trgovine = trgovine1;
        this.ponastaviInSkrijObrazec();
        this.sporocilo = "";
      })
      .catch(napaka => this.obrazecNapaka = napaka);
    }
    else{
      this.obrazecNapaka = "Prosimo pravilno vnesite vse podatke!";
    }
  }

  private pridobiTrgovine(): void {
    this.beljakovinePodatkiService
      .pridobiTrgovine()
      .then(najdeneTrovine => {
        if(najdeneTrovine.length == 0){
          this.sporocilo = "v bazi ni nobene trgovine!";
        }
        else{
          this.trgovine = najdeneTrovine
          this.sporocilo = "";
        }
      });
  }

  public odstraniTrgovino(trgovina: Trgovina): void{
    console.log(trgovina);
    this.beljakovinePodatkiService
      .odstraniTrgovino(trgovina._id)
      .then(() => {
        this.removeElementFromArray(trgovina);
        if(this.trgovine.length == 0){
          this.sporocilo = "v bazi ni nobene trgovine!";
        }
      })
      .catch(napaka => this.obrazecNapaka = napaka);
  }

  public removeElementFromArray(trgovina: Trgovina): void {
    this.trgovine.forEach((value, index) => {
      if(value==trgovina) this.trgovine.splice(index, 1);
    });
  }

  public sendMail(form: NgForm)
  {

    let email     = this.nodeMailerForm.value.email;
    let ime       = this.nodeMailerForm.value.ime;
    let priimek   = this.nodeMailerForm.value.priimek;
    let sporocilo = this.nodeMailerForm.value.sporocilo;

    let reqObj =
      {
        email:     email,
        ime:       ime,
        priimek:   priimek,
        sporocilo: sporocilo
      }

    if (this.mailUstrezen(reqObj))
    {
      this.emailService.sendMessage(reqObj, "post").then(data => {console.log(data);}).catch();
      form.resetForm();
      this.mailNapaka = false;
      this.mailPoslan = true;
    }
    else
    {
      this.mailPoslan = false;
      this.mailNapaka = true;
    }
  }

  ngOnInit(): void {
    this.pridobiTrgovine();

    this.nodeMailerForm = this.formBuilder.group(
      {
      email:     [null,[Validators.required]],
      ime:       [null,[Validators.required]],
      priimek:   [null,[Validators.required]],
      sporocilo: [null,[Validators.required]]
    });

    this.jeAdmin = this.avtentikacijaService.jeAdmin();
  }

}



