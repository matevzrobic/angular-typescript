import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { Kupon } from '../../razredi/kupon';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-kuponi',
  templateUrl: './kuponi.component.html',
  styleUrls: ['./kuponi.component.css']
})

export class KuponiComponent implements OnInit
{

  constructor( private beljakovinePodatkiService: BeljakovinePodatkiService,
               private avtentikacija:             AvtentikacijaService,
               private usmerjevalnik:             Router,
               private povezavaStoritev: PovezavaService) { }

  public kuponi:    Kupon[] = [];
  public napaka:    string;
  public obrazec:   boolean = false;
  public sporocilo: string = "Prosimo počakajte...";

  public novKupon =
  {
    niz:    '',
    datum:  '',
    popust: 0
  }

  public ponastavi(): void
  {
    this.obrazec         = false;
    this.napaka          = "";
    this.novKupon.niz    = "";
    this.novKupon.datum  = "";
    this.novKupon.popust = 0;
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public dodajKupon(): void
  {
    if(this.ustrezniPodatki())
    {
      this.beljakovinePodatkiService.dodajKupon(this.novKupon).then
      (kupon =>
      {
        //console.log("sem noter");
        let temp = this.kuponi.slice(0);
        temp.push(kupon);
        this.kuponi = temp;
        this.ponastavi();
        this.sporocilo = "";
      })
        .catch(napaka => this.napaka = napaka);
    }
    else
    {
      this.napaka = "Prosim popravite vnosna polja!";
    }
  }

  private pridobiKupone(): void
  {
    this.beljakovinePodatkiService
      .pridobiKupone()
      .then(najdeniKuponi =>
      {
        console.log(najdeniKuponi);
        if(najdeniKuponi.length == 0)
          this.sporocilo = "V bazi ni nobenega kupona!";
        else
        {
          this.kuponi = najdeniKuponi;
          this.sporocilo = "";
        }
      });
  }

  private odstraniKupon(kupon: Kupon): void
  {
    this.beljakovinePodatkiService
      .odstraniKupon(kupon._id)
      .then(() =>
      {
        this.odstraniElement(kupon);
        if (this.kuponi.length == 0)
        {
          this.sporocilo = "V bazi ni nobenega kupona!";
        }
      })
      .catch(napaka => this.napaka = napaka);
  }

  private odstraniElement(kupon: Kupon): void
  {
    this.kuponi.forEach((vrednost, index) =>
    {
      if (kupon == vrednost)
        this.kuponi.splice(index, 1);
    })
  }

  private ustrezniPodatki(): boolean
  {
    if (this.novKupon.niz && this.novKupon.datum && this.novKupon.popust > 0 && this.novKupon.popust < 100)
      return true;
    else
      return false;
  }



  ngOnInit(): void
  {
     if(!this.avtentikacija.jeAdmin())
     {
       this.usmerjevalnik.navigateByUrl("/");
     }
     {
        this.pridobiKupone();
     }
  }

}
