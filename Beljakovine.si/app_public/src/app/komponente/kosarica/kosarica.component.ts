import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { Izdelki } from '../../razredi/izdelki';
import {Kupon} from "../../razredi/kupon";
import { SHRAMBA_BRSKALNIKA } from '../../razredi/shramba';
import { Inject, Injectable } from '@angular/core';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-kosarica',
  templateUrl: './kosarica.component.html',
  styleUrls: ['./kosarica.component.css']
})
export class KosaricaComponent implements OnInit
{

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService,
              @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
              private avtentikacijaService: AvtentikacijaService,
              private usmerjevalnik: Router,
              private povezavaStoritev: PovezavaService) { }

  public sporocilo: String = "Prosimo počakajte...";
  public kuponNiz: String = '';
  public novNakup;
  public skupnaCena: number = 0;
  private kuponi: Kupon[];
  public kuponSporocilo: String = '';
  public kuponNapaka: String = '';
  public uporabljenKupon: Boolean = false;
  public nakupZakljucen: Boolean = false;
  public napakaNakup: String = '';

  public izdelki: Izdelki[] = [];
  public izdelkiKosarica: string[];
  private kupon: Kupon;

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  private pridobiIzdelke(): void
  {
    this.beljakovinePodatkiService
      .pridobiIzdelke()
      .then(najdeniIzdelki =>
      {
        for(let i = 0; i < najdeniIzdelki.length; i++) {
          for(let j = 0; j < this.izdelkiKosarica.length; j++) {
            if(najdeniIzdelki[i]._id == this.izdelkiKosarica[j]) {
              this.izdelki.push(najdeniIzdelki[i]);
            }
          }
        }
        this.izracunajCeno();
      });
  }

  private izracunajCeno(): void
  {
    this.skupnaCena = 0.0;

    for (let i = 0; i < this.izdelki.length; i++)
    {
      this.skupnaCena += this.izdelki[i].cena;
    }
  }

  private pridobiKupone(): void
  {
    this.beljakovinePodatkiService
      .pridobiKupone()
      .then(najdeniKuponi =>
      {
        this.kuponi = najdeniKuponi;
      })
  }

  public preveriKupon(): void {
    if (!this.uporabljenKupon) {
      for (let i = 0; i < this.kuponi.length; i++) {
        if (this.kuponi[i].niz == this.kuponNiz) {
          this.kupon = this.kuponi[i];
          this.skupnaCena = this.skupnaCena * (100 - this.kupon.popust) / 100;
          this.kuponSporocilo = "Kupon potrjen!";
          this.kuponNapaka = "";
          this.uporabljenKupon = true;
        }
      }
      if (!this.uporabljenKupon) {
        this.kuponNapaka = "Ta kupon ne obstaja!";
      }
    }
  }

  public dodajNakup() {
    if (this.shramba.getItem("beljakovine-zeton")) {
      if (this.izdelki.length > 0) {
        let uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
        this.beljakovinePodatkiService.dodajNakup(uporabnik._id, this.uporabljenKupon ? this.kupon._id : null, this.izdelkiKosarica, this.skupnaCena)
          .then(() => {
            this.nakupZakljucen = true;
            this.shramba.removeItem("kosarica");
            // setTimeout(() => {
            //   this.usmerjevalnik.navigateByUrl("/izdelki");
            // }, 2000);
          })
          .catch(napaka => this.napakaNakup = napaka);
      }
    }
    else {
      this.usmerjevalnik.navigateByUrl("/prijava");
    }
  }

  public nazaj() {
    this.usmerjevalnik.navigateByUrl("/izdelki");
  }

  ngOnInit(): void
  {
    if(!this.avtentikacijaService.jePrijavljen()) {
      this.usmerjevalnik.navigate(['prijava']);
    }
    this.izdelkiKosarica = JSON.parse(this.shramba.getItem("kosarica"));
    this.pridobiIzdelke();
    this.pridobiKupone();
    if (!this.izdelkiKosarica)
      this.sporocilo = "Košarica je prazna!";
    else
      this.sporocilo = "";
  }

}
