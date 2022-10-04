import { Component, OnInit } from '@angular/core';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';


@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService) { }

  public sporocilo:String = "";

  public uvozi():void {
    var napaka = this.beljakovinePodatkiService.uvozi();
    if(napaka){
      this.sporocilo = napaka;
    }
    else{
      this.sporocilo = "podatki so bili uspešno uvoženi."
    }
      
  }

  public brisi(): void{
    var napaka = this.beljakovinePodatkiService.brisi();
    if(napaka){
      this.sporocilo = napaka;
    }
    else{
      this.sporocilo = "podatki so bili uspešno izrbrisani."
    }
  }

  ngOnInit(): void {
  }

}
