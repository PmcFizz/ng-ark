import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

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
export class AppComponent implements AfterViewInit {
  displayedColumns2: string[] = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDatabase | null;
  filteredAndPagedIssues: Observable<GithubIssue[]>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    this.filteredAndPagedIssues = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      );
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }


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


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
