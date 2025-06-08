import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  private themeColor = signal("white");
  theme = this.themeColor.asReadonly();

  constructor() { }

  toggleTheme() {
    if (this.themeColor() === "white") {
      this.themeColor.set("black");
    }
    else {
      this.themeColor.set("white");
    }
  }

}