import { Injectable, Inject } from '@angular/core';
import { Trgovina }   from '../razredi/trgovina';
import { Uporabnik }  from '../razredi/uporabnik';
import { Kupon }      from '../razredi/kupon';
import { Izdelki } from '../razredi/izdelki';
import { Nakup }  from '../razredi/nakup';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
//import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { AvtentikacijaService } from '../storitve/avtentikacija.service';
import { environment } from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class BeljakovinePodatkiService {

  constructor(private http: HttpClient, @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }

  private apiUrl = environment.apiUrl;

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka);
    return Promise.reject(napaka.error["sporočilo"]|| napaka.error.errmsg || napaka);
  }

  //*************************************************************************
  public pridobiTrgovine(): Promise<Trgovina[]> {
    const url: string = `${this.apiUrl}/trgovine`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Trgovina[])
      .catch(this.obdelajNapako);
  }

  public dodajTrgovino(podatki: any): Promise<any> {
    const url: string = `${this.apiUrl}/trgovine`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .post(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public odstraniTrgovino(idTrgovine:string): Promise<any> {
    const url: string = this.apiUrl + "/trgovine/" + idTrgovine;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }

  //*************************************************************************
  public pridobiUporabnike(): Promise<any> {
    const url: string = this.apiUrl + "/uporabniki"
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik[])
      .catch(this.obdelajNapako);
  }

  public prijava(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('prijava', uporabnik);
  }

  public registracija(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('registracija', uporabnik);
  }

  private avtentikacija(urlNaslov: string, uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
  }

  /* public dodajUporabnika(podatki: any): Promise<any> {
    const url: string = this.apiUrl + "/registracija"
    return this.http
      .post(url, podatki)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  } */

  public updateUporabnika(idUporabnika: string, uporabnik: Uporabnik): Promise<any> {
    const url: string = this.apiUrl + '/uporabniki/info/' + idUporabnika;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
  	return this.http
  		.put(url, uporabnik, httpLastnosti)
  		.toPromise()
  		.then(rezultat => rezultat as RezultatAvtentikacije)
		.catch(this.obdelajNapako);
  }

  public updateGeslo(idUporabnika: string, geslo: string, sGeslo: string): Promise<any> {
    const url: string = this.apiUrl + '/uporabniki/geslo/' + idUporabnika;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
  	return this.http
  		.put(url, {"geslo":geslo, "sGeslo":sGeslo}, httpLastnosti)
  		.toPromise()
  		.then(odgovor => odgovor as any)
		.catch(this.obdelajNapako);
  }

  public odstraniUporabnika(idUporabnika: string): Promise<any>
  {
    const url: string = this.apiUrl + "/uporabniki/" + idUporabnika;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }

  //*************************************************************************
  public pridobiKupone(): Promise<Kupon[]>
  {
    const url: string = this.apiUrl + "/kuponi";
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .get(url, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Kupon[])
      .catch(this.obdelajNapako);
  }

  public dodajKupon(podatki: any): Promise<any> {
    const url: string = this.apiUrl + "/kuponi";
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };

    return this.http
      .post(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public odstraniKupon(idKupona: string): Promise<any>
  {
    const url: string = this.apiUrl + "/kuponi/" + idKupona;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }

  //*************************************************************************
  public pridobiIzdelke(): Promise<Izdelki[]> {
    const url: string = `${this.apiUrl}/izdelki`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Izdelki[])
      .catch(this.obdelajNapako);
  }

  public pridobiIzdelek(id): Promise<Izdelki> {
    const url: string = `${this.apiUrl}/izdelki/`+id;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Izdelki)
      .catch(this.obdelajNapako);
  }

  public odstraniIzdelek(idIzdelka:string): Promise<any> {
    const url: string = this.apiUrl + "/izdelki/" + idIzdelka;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }

  public dodajIzdelek(podatki: any): Promise<any> {
    const url: string = `${this.apiUrl}/izdelki`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .post(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public posodobiIzdelek(podatki: any): Promise<any>  {
    const url: string = `${this.apiUrl}/izdelki/` + podatki._id;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .put(url, podatki, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  //*************************************************************************
  public pridobiNakupe(idUporabnika: string): Promise<Nakup[]> {
    const url: string = this.apiUrl + '/nakupi/u/' + idUporabnika;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .get(url, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Izdelki[])
      .catch(this.obdelajNapako);
  }

  public odstraniNakup(idNakupa: string): Promise<any> {
    const url: string = this.apiUrl + "/nakupi/" + idNakupa;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }

  public dodajNakup(idUprabnika: string, idKupona: string, idIzdelkov: string[], skupnaCena: number) {
    const url: string = this.apiUrl + "/nakupi/";
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('beljakovine-zeton')}`
      })
    };
    return this.http
      .post(url, {uporabnik: idUprabnika, kupon: idKupona, izdelki: idIzdelkov, skupnaCena: skupnaCena}, httpLastnosti)
      .toPromise()
      .then(() => {})
      .catch(this.obdelajNapako);
  }
  //*************************************************************************

  public uvozi(): String{
    const url: string = this.apiUrl;
    let napaka = "";
    this.http
      .get(url + "/db/uporabniki")
      .toPromise()
      .then((podatki) => {})
      .catch(()=>{});

    this.http
      .get(url + "/db/izdelki")
      .toPromise()
      .then((podatki) => {})
      .catch(()=>{});

    this.http
      .get(url + "/db/kuponi")
      .toPromise()
      .then((podatki) => {})
      .catch(()=>{});

    this.http
      .get(url + "/db/trgovine")
      .toPromise()
      .then((podatki) => {})
      .catch(()=>{});

      return napaka;
    }

    public brisi(): String{
      const url: string = this.apiUrl;
      let napaka = "";
      this.http
        .get(url + "/db/uporabniki/brisi")
        .toPromise()
        .then((podatki) => {})
        .catch(napaka1 => napaka+=napaka1);

      this.http
        .get(url + "/db/izdelki/brisi")
        .toPromise()
        .then((podatki) => {})
        .catch(napaka1 => napaka+=napaka1);

      this.http
        .get(url + "/db/kuponi/brisi")
        .toPromise()
        .then((podatki) => {})
        .catch(napaka1 => napaka+=napaka1);

      this.http
        .get(url + "/db/trgovine/brisi")
        .toPromise()
        .then((podatki) => {})
        .catch(napaka1 => napaka+=napaka1);

      this.http
        .get(url + "/db/nakupi/brisi")
        .toPromise()
        .then((podatki) => {})
        .catch(napaka1 => napaka+=napaka1);

      return napaka;
    }

}
