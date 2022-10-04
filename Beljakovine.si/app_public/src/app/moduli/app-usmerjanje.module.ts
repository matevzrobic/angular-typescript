import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {ZacetnaStranComponent} from '../komponente/zacetna-stran/zacetna-stran.component';
import { KontaktComponent } from '../komponente/kontakt/kontakt.component';
import { PrijavaComponent } from '../komponente/prijava/prijava.component';
import { RegistracijaComponent } from '../komponente/registracija/registracija.component';
import {KuponiComponent} from "../komponente/kuponi/kuponi.component";
import { IzdelkiComponent } from '../komponente/izdelki/izdelki.component';
import { StranIzdelkaComponent } from '../komponente/stran-izdelka/stran-izdelka.component';
import { DodajIzdelekComponent } from '../komponente/dodaj-izdelek/dodaj-izdelek.component';
import { ProfilComponent } from '../komponente/profil/profil.component';
import { KosaricaComponent} from '../komponente/kosarica/kosarica.component';
import { KalkulatorComponent } from '../komponente/kalkulator/kalkulator.component';
import { DbComponent } from '../komponente/db/db.component'

const poti: Routes = [
  {
    path: '',
    component: ZacetnaStranComponent
  }, {
    path: 'kontakt',
    component: KontaktComponent
  }, {
    path: 'prijava',
    component: PrijavaComponent
  }, {
    path: 'registracija',
    component: RegistracijaComponent
  }, {
    path: 'kuponi',
    component: KuponiComponent
  }, {
    path: 'izdelki',
    component: IzdelkiComponent
  }, {
    path: 'izdelki/:idIzdelka',
    component: StranIzdelkaComponent
  }, {
    path: 'dodaj-izdelek',
    component: DodajIzdelekComponent
  }, {
  	path: 'profil',
  	component: ProfilComponent
  },{
  	path: 'kosarica',
  	component: KosaricaComponent
  },{
    path: 'kalkulator',
    component: KalkulatorComponent
  },
  {
    path: 'db',
    component: DbComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppUsmerjanjeModule { }
