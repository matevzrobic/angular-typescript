import { Component, OnInit } from '@angular/core';
import { Izdelki } from 'src/app/razredi/izdelki';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { Router, RouterLink } from '@angular/router';
import { SHRAMBA_BRSKALNIKA } from '../../razredi/shramba';
import { Inject, Injectable } from '@angular/core';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-stran-izdelka',
  templateUrl: './stran-izdelka.component.html',
  styleUrls: ['./stran-izdelka.component.css']
})
export class StranIzdelkaComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService, private router: Router,
    private povezavaStoritev: PovezavaService, @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage, private avtentikacijaService: AvtentikacijaService
  ) { }

  public izdelek: Izdelki;
  public obrazecNapaka: string;
  public adminB: boolean = false;
  public sporocilo = "";
  public regNum = new RegExp ('^[0-9]*$');
  public sporociloWait = "Prosimo počakajte..."

  private pridobiIzdelek(): void {
    const url = this.router.url;
    const tmp = url.split("/");
    this.beljakovinePodatkiService
      .pridobiIzdelek(tmp[tmp.length-1])
      .then(najdenIzdelek => {this.izdelek = najdenIzdelek;
      this.sporociloWait = "";
    });
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public odstraniIzdelek(izdelek: Izdelki): void{
    this.beljakovinePodatkiService
      .odstraniIzdelek(izdelek._id)
      .then(() => {
      })
      .catch(napaka => this.obrazecNapaka = napaka);
  }

  public posodobiIzdelek(): void{
    let naziv1 = document.getElementById("naziv").innerHTML;
    let cena1 = document.getElementById("cena").innerHTML.split(" ")[0];
    let opis1 = document.getElementById("opis").innerHTML;
    let ocena1 = document.getElementById("ocena").innerHTML;
    let slikaTmp = (<HTMLImageElement>document.querySelector("#slika")).src;
    var split = slikaTmp.split("/");
    var slika1 = split[split.length-2] + "/" + split[split.length-1];
    if(this.regNum.test(cena1) && this.regNum.test(ocena1) && naziv1 && parseFloat(cena1) > 0 && parseFloat(ocena1) > 0 && parseFloat(ocena1) <= 5 && opis1 && slika1) {
      this.izdelek.naziv = naziv1;
      this.izdelek.cena = parseFloat(cena1);
      this.izdelek.ocena_strokovnjaka = parseFloat(ocena1);
      this.izdelek.opis = opis1;
      this.izdelek.slika = slika1;
      this.beljakovinePodatkiService
      .posodobiIzdelek(this.izdelek)
      .then(() => {
        this.router.navigate(['izdelki']);
      })
      .catch(napaka => this.obrazecNapaka = napaka);
    } else {
      this.sporocilo = "Prosimo vnesite pravilne podatke";
    }
  }

  public dodajVKosarico() {
    var tmp = JSON.parse(this.shramba.getItem("kosarica"));
    tmp.push(this.izdelek._id);
    this.shramba.setItem("kosarica", JSON.stringify(tmp));
  }

  ngOnInit(): void {
    this.pridobiIzdelek();
    if(!this.shramba.getItem("kosarica")) {
      this.shramba.setItem("kosarica", JSON.stringify([]));
    }
    this.adminB = this.avtentikacijaService.jeAdmin();
  }

}
