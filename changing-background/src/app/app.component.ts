import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'changing-background';
  swappingImages: string[];

  constructor() {
    this.swappingImages = [
      'assets/coding_background_1.jpg',
      'assets/coding_background_2.jpg',
    ];
  }
}
