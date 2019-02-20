import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  value1 = "foo";
  value2 = "bar";

  constructor() { }

  ngOnInit() {}

  // Sentry - runtime error captured by Sentry
  doTheImpossible() {
    let x = {}
    return x['y']
  }

  // Sentry - error deliberately thrown during runtime and captured by Sentry
  submit() {
    const value1 = parseInt(this.value1)
    const value2 = parseInt(this.value2)

    if (isNaN(value1) || isNaN(value2)) {
      throw 'Deliberately thrown Error'
    }
  }

}
