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
  // this commit did it
  suspectCommitInterference() {
    throw new Error(`This line throwing error first. Which commit was I in? Stacktrace?`) 
    const message = `
      Math function didn't come close to running.
      It errored before the inputs could get evaluated as string vs number.
      Some rogue code may have caused this.
      Click OK to close this and the error will get sent to Sentry.
      Login to your sentry.io and see if its linked to a suspect commit and release`
    window.alert(message)
    throw new Error(`Error thrown by code from a commit. Which commit was I in? Stacktrace?`) 
  }

  // Sentry - Runtime error deliberately thrown and captured by Sentry
  submit() {
    const value1 = parseInt(this.value1)
    const value2 = parseInt(this.value2)
    
    return this.suspectCommitInterference();

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
    if (this.error1 || this.error2) console.log('check sentry...')
  }

}
