import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

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
  shareInOut: string;
  valueDifference: string;
  stockPriceDifferenceNumber: string;
  stockPriceDifferencePercent: string;
  widthDifference: string;
  observation: string;
}

export interface ResItem {
  company: string
  date: string
  percent: string
  shares: string
  ticker: string
  value: string
}

interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: ARKKElement[] = [
  {
    company: '1', ticker: '1', t212: true,
    t212isa: false, sharesOnStart: '1', valueOnStart: '1',
    stockPriceStart: '1', weightOnStart: '1',
    sharesOnEnd: '1', valueOnEnd: '1',
    stockPriceEnd: '1', weightOnEnd: '1', sharesDifference: '1',
    shareInOut: '1', valueDifference: '1', stockPriceDifferenceNumber: '1', stockPriceDifferencePercent: '1',
    widthDifference: '1',
    observation: '1'
  }, {
    company: '2', ticker: '3', t212: true,
    t212isa: false, sharesOnStart: '4', valueOnStart: '2',
    stockPriceStart: '2', weightOnStart: '2',
    sharesOnEnd: '2', valueOnEnd: '2',
    stockPriceEnd: '2', weightOnEnd: '2', sharesDifference: '2',
    shareInOut: '2', valueDifference: '2', stockPriceDifferenceNumber: '2', stockPriceDifferencePercent: '2',
    widthDifference: '2',
    observation: '2',
  }
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _httpClient: HttpClient) { }

  title = 'ng-ark';
  selectedValue: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
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
  dataSource = new MatTableDataSource(ELEMENT_DATA);



  exampleDatabase: ExampleHttpDatabase | null;
  filteredAndPagedIssues: Observable<ARKKElement[] | ARKKElement | []>;
  isLoadingResults = true;
  isRateLimitReached = false;
  resultsLength = 0;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    this.filteredAndPagedIssues = merge(this.sort.sortChange, 0)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues();
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          const item: ARKKElement = {
            company: '1',
            ticker: '1',
            t212: true,
            t212isa: false,
            sharesOnStart: '1',
            valueOnStart: '1',
            stockPriceStart: '1',
            weightOnStart: '1',
            sharesOnEnd: '1',
            valueOnEnd: '1',
            stockPriceEnd: '1',
            weightOnEnd: '1',
            sharesDifference: '1',
            shareInOut: '1',
            valueDifference: '1',
            stockPriceDifferenceNumber: '1',
            stockPriceDifferencePercent: '1',
            widthDifference: '1',
            observation: '1',
          }

          return item;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
  }

}


export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(): Observable<ResItem[]> {
    const href = 'http://localhost:3000/arkk';
    const requestUrl = `${href}?q=repo:angular/components`;

    return this._httpClient.get<ResItem[]>(requestUrl);
  }
}