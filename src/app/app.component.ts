import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}

export interface ARKKElement {
  company: string;
  ticker: string;
  t212: boolean;
  t212isa: boolean;
  sharesOnStart: string;
  valueOnStart: string;
  stockPriceStart: string;
  weightOnStart: string;
  sharesOnEnd: string;
  valueOnEnd: string;
  stockPriceEnd: string;
  weightOnEnd: string;
  sharesDifference: string;
  shareInOut:string;
  valueDifference:string;
  stockPriceDifferenceNumber: string;
  stockPriceDifferencePercent: string;
  widthDifference: string;
  observation: string;
}

const ELEMENT_DATA: ARKKElement[] = [
  {company:'1',ticker:'1',t212:true,
  t212isa:false,sharesOnStart:'1',valueOnStart:'1',
  stockPriceStart:'1',weightOnStart:'1',
  sharesOnEnd:'1',valueOnEnd:'1',
  stockPriceEnd:'1',weightOnEnd:'1',sharesDifference:'1',
  shareInOut:'1',valueDifference:'1',stockPriceDifferenceNumber:'1',stockPriceDifferencePercent:'1',
  widthDifference:'1',
  observation:'1',}
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-ark';
  selectedValue: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  displayedColumns: string[] = [
    'company',
    'ticker',
    't212',
    't212isa',
    'sharesOnStart',
    'valueOnStart',
    'stockPriceStart',
    'weightOnStart',
    'sharesOnEnd',
    'valueOnEnd',
    'stockPriceEnd',
    'weightOnEnd',
    'sharesDifference',
    'shareInOut',
    'valueDifference',
    'stockPriceDifferenceNumber',
    'stockPriceDifferencePercent',
    'widthDifference',
    'observation'];
  dataSource = ELEMENT_DATA;

}
