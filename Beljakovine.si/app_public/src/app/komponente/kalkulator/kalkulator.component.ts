import { Component, OnInit , ViewChild} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as jQuery from 'jquery';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.css']
})
export class KalkulatorComponent implements OnInit {

  constructor() { }

  public calc = {
  	starost: 25,
  	visina: 180,
  	teza: 80,
  	spol: 'Male'
  };

  public results: string;
  public resultsDisp = "none";
  public half = "100%";

  private hasValues = 
    (obj) => Object.values(obj).every(v => v !== null && typeof v !== "undefined")


  ngOnInit(): void {

  }


	public izracunaj(): void {
		if(this.soPodatki()) {
			this.calculate(this.calc.starost, this.calc.visina, this.calc.teza, this.calc.spol);
		}
	}

	private soPodatki(): boolean {
		return this.hasValues(this.calc);
	} 

	public calculate(age, heightCM, weight, gender): void {

	    let calories = 0;
	    if(gender == 'Female') {  
	        calories = 655.09 + (9.56 * weight) + (1.84 * heightCM) - (4.67 * age);
	    }  else {
			calories = 66.47 + (13.75 * weight) + (5 * heightCM) - (6.75 * age);
	    }
		calories = +Number(calories).toFixed(0);
	    
	    this.showResults(calories);
	}

	public showResults(calories): void {
	    this.results = `<p>Vaš maksimalni dnevni vnos kalorij znaša: <strong>${(calories)}</strong>.</p>`;
	    this.resultsDisp = "flex";
	}


	//***********************************


	public query = '';
	private limit = 24;
    private queryURL;
    private queryParams;
    public resAPI="";

	public foodSearch(): void {
		this.resAPI='<div class="alert alert-warning col-5" role="alert" > Pridobivanje ...</div>';
		
		this.getRequest().then( response => 
		  this.posodobiResAPI(response)
		);
	}

    private setParams() {
      this.queryURL = "https://api.edamam.com/api/food-database/v2/parser";
      this.queryParams = {
        "app_id": "91aeea3f",
        "app_key": "89336a92f5a90027d3c5bea9ee46d7f8"
      };
      this.queryParams.ingr = encodeURI( this.query.trim() );
    }

	private getRequest(): JQueryPromise<any> {
		if (this.query.length > 3){
			this.setParams();

			return jQuery.ajax({
		        url: this.queryURL,
		        method: "GET",
		        data: this.queryParams
		      });
		}
	}

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

	private posodobiResAPI(response): void {
		var first = response.hints[0];
		var img = first.food.image;
		var label = (first.food.label).toUpperCase();
		var kcal = first.food.nutrients.ENERC_KCAL;
		var prot = first.food.nutrients.PROCNT;
		var oh = first.food.nutrients.CHOCDF;
		var fat = first.food.nutrients.FAT;
		var fib = first.food.nutrients.FIBTG;
		var ost = 100 - (prot+oh+fat+fib);

		this.resAPI = `<div>
		                  <table class="table">
		                      <thead>
		                        <tr>
		                          <th rowspan="6">
		                              <img src="${img}" >
		                          </th>
		                          <th>${label}</th>
		                          <th> 100g </th>
		                        </tr>
		                        <tr>
		                          <td>Kalorije:</td>
		                          <td>${kcal} kcal</td>
		                        </tr>
		                        <tr>
		                          <td>Beljakovine:</td>
		                          <td>${prot} g</td>
		                        </tr>
		                        <tr>
		                          <td>Ogljikovi hidrati:</td>
		                          <td>${oh} g</td>
		                        </tr>
		                        <tr>
		                          <td>Maščobe:</td>
		                          <td>${fat} g</td>
		                        </tr>
		                        <tr>
		                          <td>Vlaknine:</td>
		                          <td>${fib} g</td>
		                        </tr>
		                      </thead>
		                  </table> </div>`;

		var sw = screen.width;
		if(sw > 768) {sw = sw/2; this.half = "50%"}
		else this.half = "100%";

		this.chartOptions = {
	      series: [prot, oh, fat, fib, ost],
	      chart: { width: sw ,type: "pie" },
	      labels: ["Beljakovine", "Ogljikovi hidrati", "Maščobe", "Vlaknine", "Ostalo"],
	      responsive: [
	        {
	          breakpoint: 480,
	          options: {
	            chart: {
	              width: sw-30
	            },
	            legend: {
	              position: "bottom"
	            }
	          }
	        }
	      ]
	    };

	}

}
