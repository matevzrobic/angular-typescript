import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje.module';
import { AppComponent } from './app.component';
import { KontaktComponent } from './komponente/kontakt/kontakt.component';
import { OgrodjeComponent } from './komponente/ogrodje/ogrodje.component';
import { ZacetnaStranComponent } from "./komponente/zacetna-stran/zacetna-stran.component";
import { HtmlPrelomVrsticePipe } from './cevi/html-prelom-vrstice.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './komponente/map/map.component';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import { KuponiComponent } from './komponente/kuponi/kuponi.component';
import { IzdelkiComponent } from './komponente/izdelki/izdelki.component';
import { StranIzdelkaComponent } from './komponente/stran-izdelka/stran-izdelka.component';
import { DodajIzdelekComponent } from './komponente/dodaj-izdelek/dodaj-izdelek.component';
import { ProfilComponent } from './komponente/profil/profil.component';
import { ZvezdicePipe } from './cevi/zvezdice.pipe';
import { CurrencyPipe } from './cevi/currency.pipe';
import { KosaricaComponent } from './komponente/kosarica/kosarica.component';
import { UppercasePipe } from './cevi/uppercase.pipe';
import { DatumPipe } from './cevi/datum.pipe';
import { DecimalkePipe } from './cevi/decimalke.pipe';
import { KalkulatorComponent } from './komponente/kalkulator/kalkulator.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DbComponent } from './komponente/db/db.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    KontaktComponent,
    OgrodjeComponent,
    ZacetnaStranComponent,
    HtmlPrelomVrsticePipe,
    MapComponent,
    PrijavaComponent,
    RegistracijaComponent,
    KuponiComponent,
    IzdelkiComponent,
    StranIzdelkaComponent,
    DodajIzdelekComponent,
    ProfilComponent,
    ZvezdicePipe,
    CurrencyPipe,
    KosaricaComponent,
    UppercasePipe,
    DatumPipe,
    DecimalkePipe,
    KalkulatorComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AppUsmerjanjeModule,
    NgApexchartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
