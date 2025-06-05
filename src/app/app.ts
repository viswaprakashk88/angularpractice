import { CommonModule } from '@angular/common';
import { Component,signal, effect, computed, ViewChild, ElementRef, Renderer2, AfterViewInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfilePic } from './profile-pic/profile-pic';
import { HoverHighlight } from './hover-highlight';
import { Theme } from './theme';
import { FormsModule } from '@angular/forms';



interface User {
  id: number,
  name: string,
  email: string,
  username: string
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, HoverHighlight, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected title = 'angular';

  username = '';

  themeService = inject(Theme);
  themeColor = this.themeService.theme;

  toggle() {
    this.themeService.toggleTheme();
  }


  //DOM API selector
  @ViewChild('myDiv') divisionRef!: ElementRef;

  //signals example
  firstSignal = signal(0);
  secondSignal = signal(10);
  firstComputed = computed(() => this.firstSignal()*10);

  //fetch data from API
  response = signal<User[]>([]);

  imageLink = signal("");

  //computed
  secondComputed = computed( () => {
    if (this.secondSignal() < 18) {
      return "secondSignal is less than 18: " + this.secondSignal();
    }
    else{
      return "secondSignal is major";
    }
  });

  //button event listeners
  handleFirstClick = () => {
    this.firstSignal.set(this.firstSignal()+1);
  }

  handleSecondClick = () => {
    this.secondSignal.update(prev => prev+1);
  }

  //effects should be inside this
  constructor(private renderer2: Renderer2) {
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

  //ngAfterViewInit
  ngAfterViewInit() {
    // console.log("ngAfterViewInit is called");
    // console.log(this.divRef.nativeElement);
    setTimeout(() => {
      this.renderer2.setStyle(this.divisionRef.nativeElement, 'color', 'red');
      this.renderer2.setStyle(this.divisionRef.nativeElement, 'font-size', '35px')
    }, 3000);
  }

  //async function
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

  fetchImage (event: Event) {
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      this.imageLink.set(inputElement.value);
    }
  }


}
