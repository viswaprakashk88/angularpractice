import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  imports: [],
  template: `<img [src] = 'imageLink()' width = '300px' height = '300px'/>`,
  styleUrl: './profile-pic.css'
})
export class ProfilePic {
  @Input() imgUrl = '';
}
