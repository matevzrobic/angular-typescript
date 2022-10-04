import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { Uporabnik } from '../../razredi/uporabnik';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import {EmailService} from "../../storitve/email.service";
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private usmerjevalnik: Router,
    private avtentikacijaStoritev: AvtentikacijaService,
    private beljakovinePodatkiService: BeljakovinePodatkiService,
    private emailService: EmailService,
    private povezavaStoritev: PovezavaService) { }

  public err = 'Neustrezno uporabniško ime ali geslo!';

  public sporocilo = '';

  public uporabniki: Uporabnik[];

  public obrazecNapaka: string = "";

  public pozabljenoGesloMail: string = "";

  public poslanMail: string = "";

  public napacenMail: string = "";

  public regEmail = new RegExp ('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$');

  public prijavaUporabnika = {
    _id: "",
    email: '',
    geslo: '',
    ime: "",
    priimek: "",
    admin: false
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public posiljanjePodatkov(): void {
    let flag = 1;
    this.obrazecNapaka = "";
    if (
      !this.prijavaUporabnika.email ||
      !this.prijavaUporabnika.geslo
    ) {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite znova!";
      return
    }

    this.izvediPrijavo();
  }

  private izvediPrijavo(): void {
    this.poslanMail = "";
    this.avtentikacijaStoritev
      .prijava(this.prijavaUporabnika)
      .then(() => {
        this.usmerjevalnik.navigateByUrl("/izdelki")})
      .catch(sporocilo => this.obrazecNapaka = sporocilo);
  }

  public popup() {
    const data = Array.from(document.getElementsByClassName("popup") as HTMLCollectionOf<HTMLElement>);
    data.forEach((element) => {
      element.style.display = "flex"
    })
    this.poslanMail = "";
  }

  public posljiMail(): void {
    if (this.regEmail.test(this.pozabljenoGesloMail)) {
      this.napacenMail = "preglejujemo če vaš mail obstaja..."
      this.emailService.sendMessage({email: this.pozabljenoGesloMail}, "geslo").then(data => {
        this.poslanMail = "Preverite svoj poštni nabiralnik!";
        this.napacenMail = "";
        this.pozabljenoGesloMail = "";
      }).catch(napaka => this.napacenMail = napaka)
    }
    else {
      this.poslanMail = "";
      this.napacenMail = "Neveljaven poštni naslov!";
    }
  }

  ngOnInit(): void {
    if(this.avtentikacijaStoritev.jePrijavljen()) {
      this.usmerjevalnik.navigate(['/']);
    }
  }

}
