import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, input, Input } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  standalone: true,
  imports: [CommonModule],
  template: `<img [src] = "imgUrl()" [width] = "imgWidth" [height] = "imgHeight"/>
              <ng-content></ng-content>
              <div *ngIf='!hasContent'>
                <b>No ng-content is provided</b>
              </div>`,
  styleUrl: './profile-pic.css'
})
export class ProfilePic {
  imgUrl = input('');
  @Input() imgWidth = '400px';
  @Input() imgHeight = '400px';
  @ContentChild('content', { read: ElementRef }) projectedContent?: ElementRef;

  hasContent = false;

  ngAfterContentInit() {
    this.hasContent = !this.projectedContent;
  }
}
