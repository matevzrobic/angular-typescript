import { Component, OnInit } from '@angular/core';
import { Izdelki } from 'src/app/razredi/izdelki';
import { BeljakovinePodatkiService } from '../../storitve/beljakovine-podatki.service';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-izdelki',
  templateUrl: './izdelki.component.html',
  styleUrls: ['./izdelki.component.css']
})
export class IzdelkiComponent implements OnInit {

  constructor(private beljakovinePodatkiService: BeljakovinePodatkiService, private avtentikacijaService: AvtentikacijaService,
    private povezavaStoritev: PovezavaService) { }

  public izdelki: Izdelki[];
  public page = 1;
  public collectionSize = 0;
  public pageSize = 10;
  public numOfPages = 0;
  public numbers = new Array;
  public sporocilo = "Prosimo počakajte.";
  public adminB: boolean = false;

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  private pridobiIzdelke(): void {
    this.beljakovinePodatkiService
      .pridobiIzdelke()
      .then(najdeniIzdelki => {
        this.izdelki = najdeniIzdelki; 
        this.numOfPages = najdeniIzdelki.length / 10;
        if(this.numOfPages % 1 != 0) {
          this.numOfPages = Math.floor(this.numOfPages)+1;
        }
        for(var i=0; i<this.numOfPages; i++) {
          this.numbers.push(i+1);
        }
        if(najdeniIzdelki.length == 0) {
          this.sporocilo = "V bazi ni nobenega izdelka";
        }else {
          this.sporocilo = "";
        }
      });
      
  }

  public paginacija(id: number): void  {
      if(id == -1) {
        this.page -= 1;
      } else if(id == 0) {
        this.page += 1;
      } else {
        this.page = id;
      }
      if(this.page < 1) {
        this.page = 1;
      } else if(this.page > this.numOfPages) {
        this.page = this.numOfPages;
      }
  }

  ngOnInit(): void {
    this.pridobiIzdelke();
    this.adminB = this.avtentikacijaService.jeAdmin();
  }

}