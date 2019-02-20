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

  constructor() { }

  ngOnInit() {}

  // Sentry - Runtime error captured by Sentry
  doTheImpossible() {
    this.setErrorText(false, true)
    let x = {}
    return x['y']['z']
  }

  // Sentry - Runtime error deliberately thrown and captured by Sentry
  submit() {
    const value1 = parseInt(this.value1)
    const value2 = parseInt(this.value2)

    if (isNaN(value1) || isNaN(value2)) {
      this.output = '?'
      this.setErrorText(true, false)
      throw new Error(`Deliberately thrown Error for input values ${this.value1} and ${this.value2}`) 
    } else {
      this.output = (value1 * value2).toString()
      this.setErrorText(false, false)
    }
  }

  setErrorText(error1: boolean, error2: boolean) {
    this.error1 = error1
    this.error2 = error2
    console.log('check sentry...')
  }

}
