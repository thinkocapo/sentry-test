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
  output = "?";

  error1 = false;
  error2 = false;

  error1Style = "{'visibility': hidden}"

  constructor() { }

  ngOnInit() {}

  // Sentry - runtime error captured by Sentry
  doTheImpossible() {
    this.error1 = false
    this.error2 = true
    let x = {}
    return x['y']
  }

  // Sentry - error deliberately thrown during runtime and captured by Sentry
  submit() {
    const value1 = parseInt(this.value1)
    const value2 = parseInt(this.value2)

    if (isNaN(value1) || isNaN(value2)) {
      this.output = '?'
      this.error1 = true
      this.error2 = false
      throw `Deliberately thrown Error for input values ${this.value1} and ${this.value2}`
    } else {
      this.output = (value1 * value2).toString()
    }
  }

}
