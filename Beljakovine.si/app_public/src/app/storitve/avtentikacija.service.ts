import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { BeljakovinePodatkiService } from '../storitve/beljakovine-podatki.service';

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
  private beljakovinePodatkiService: BeljakovinePodatkiService) { }

  public async prijava(uporabnik: Uporabnik): Promise<any> {
    return this.beljakovinePodatkiService
      .prijava(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"])
      });
  }

  public async registracija(uporabnik: Uporabnik): Promise<any> {
    return this.beljakovinePodatkiService
      .registracija(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public async updateUporabnika(_id: string, uporabnikNov: Uporabnik): Promise<any> {
    return this.beljakovinePodatkiService
              .updateUporabnika(_id,uporabnikNov)
              .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
                this.shraniZeton(rezultatAvtentikacije["žeton"]);
              });
  }

  public odjava(): void {
    this.shramba.removeItem('beljakovine-zeton');
  }

  public vrniZeton(): string {
    return this.shramba.getItem('beljakovine-zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('beljakovine-zeton', zeton);
  }

  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    if (zeton) {
      const koristnaVsebina = JSON.parse(atob(zeton.split('.')[1]));
      return koristnaVsebina.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public vrniTrenutnegaUporabnika(): Uporabnik {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
      return {_id, email, ime, priimek, admin } as Uporabnik;
    }
  }

  public jeAdmin(): boolean {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id, email, ime, priimek, admin } = JSON.parse(atob(zeton.split('.')[1]));
      return admin;
    } else return false
  }

}