import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-ark';
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
}
