import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpreq: HttpClient) { }

  private apiUrl = environment.apiUrl;

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka);
    return Promise.reject(napaka.error["sporočilo"]|| napaka.error.errmsg || napaka);
  }

  sendMessage(body, pot) {
    let headers = {
      headers : new HttpHeaders({
        'Content-Type' :'application/json'
      })
    }
    return this.httpreq.post(this.apiUrl + "/email/" + pot, body, headers)
                      .toPromise()                    
                      .then((data) => {})
                      .catch(this.obdelajNapako);
                    }
}
