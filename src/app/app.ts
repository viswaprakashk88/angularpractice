import { Component,signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  template: `<b>First Signal: {{firstSignal()}}, Scond Signal: {{secondSignal()}}</b><br/>
            <button (click) = "handleFirstClick()">Increase First</button>
            <button (click) = "handleSecondClick()">Increase Second</button>`,
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular';

  firstSignal = signal(0);
  secondSignal = signal(10);
  handleFirstClick = () => {
    this.firstSignal.update(prev => prev+1);
  }

  handleSecondClick = () => {
    this.secondSignal.update(prev => prev+1);
  }

  constructor() {
    effect( () => {
      console.log("First Signal is changed to " + this.firstSignal());
    });

    effect ( () => {
      console.log("Second Signal is changed to " + this.secondSignal());
    });
  }


}
