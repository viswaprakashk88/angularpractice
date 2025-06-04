import { CommonModule } from '@angular/common';
import { Component,signal, effect, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';


interface User {
  id: number,
  name: string,
  email: string,
  username: string
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular';

  firstSignal = signal(0);
  secondSignal = signal(10);
  firstComputed = computed(() => this.firstSignal()*10);

  response = signal<User[]>([]);

  secondComputed = computed( () => {
    if (this.secondSignal() < 18) {
      return "secondSignal is less than 18: " + this.secondSignal();
    }
    else{
      return "secondSignal is major";
    }
  });
  handleFirstClick = () => {
    this.firstSignal.set(this.firstSignal()+1);
  }

  handleSecondClick = () => {
    this.secondSignal.update(prev => prev+1);
  }

  
  constructor() {
    effect( (onCleanup) => {
      console.log("First Signal is changed to " + this.firstSignal());

      onCleanup(() => {
        //if we have any socket.io functionalities in the applications, we can disconnect them from the backend using this onCleanup function
      });
    });

    effect ( () => {
      console.log("Second Signal is changed to " + this.secondSignal());
    });
  }
  async fetchUserData () {
    try{
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data =await res.json();
      this.response.set(data);
      console.log(this.response());
    } catch (error) {
      console.log(error);
    }
  }


}
