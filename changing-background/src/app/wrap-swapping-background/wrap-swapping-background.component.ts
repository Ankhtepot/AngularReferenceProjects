import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-wrap-swapping-background',
  templateUrl: './wrap-swapping-background.component.html',
  styleUrl: './wrap-swapping-background.component.scss'
})
export class WrapSwappingBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('primary_image') primaryImage: ElementRef;
  @ViewChild('secondary_image') secondaryImage: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @Input() images: string[] = [];
  @Input() top: number = 0;
  @Input() bottom: number = 0;
  @Input() timeBetweenSwaps: number = 5000;
  @Input() transitionTime: number = 2000;
  @Input() overlayColor: string = 'white';
  @Input() overlayOpacity: number = 0.5;
  doLoop = true;
  primaryImageStyle: CSSStyleDeclaration;
  secondaryImageStyle: CSSStyleDeclaration
  lastPrimaryImage: string;
  lastSecondaryImage: string;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.wrapper.nativeElement.style.top = `${this.top}px`;
    this.wrapper.nativeElement.style.bottom = `${this.bottom}px`;
    this.wrapper.nativeElement.style.height = `calc(100% - ${this.top}px - ${this.bottom}px)`;

    if (!this.images || this.images.length < 2) {
      console.log('WrapSwappingBackgroundComponent: Must provide at least 2 images to swap between');
      return;
    }

    this.primaryImageStyle = this.primaryImage.nativeElement.style;
    this.secondaryImageStyle = this.secondaryImage.nativeElement.style;
    this.primaryImageStyle.backgroundImage = `url(${this.images[0]})`;
    this.secondaryImageStyle.backgroundImage = `url(${this.images[1]})`;

    if (this.images.length === 1) {
      return;
    }

    this.imageSwapLoop();
  }

  ngOnDestroy(): void {
    this.doLoop = false;
  }

  private async imageSwapLoop() {
    while (this.doLoop) {
      await this.delay(this.timeBetweenSwaps);
      await this.swapImages();
    }
  }

  private async swapImages() {
    let primaryImageSrc = this.primaryImageStyle.backgroundImage;
    let secondaryImageSrc = this.secondaryImageStyle.backgroundImage;

    this.primaryImage.nativeElement.classList.add('fade-out');
    this.secondaryImage.nativeElement.classList.add('fade-in');

    // Wait for the fade animation to complete before swapping images
    await this.delay(2000);  // Matches the animation duration

    this.swapBackgrounds(secondaryImageSrc, primaryImageSrc);

    // Remove animation classes to reset state for next swap
    this.primaryImage.nativeElement.classList.remove('fade-out');
    this.secondaryImage.nativeElement.classList.remove('fade-in');
    this.secondaryImageStyle.opacity = '0'; // Ensures it's ready to fade in again
    this.primaryImageStyle.opacity = '1';
  }

  private swapBackgrounds(secondaryImageSrc: string, primaryImageSrc: string) {
    if (this.images.length === 2) {
      // swaps primary and secondary images
      this.primaryImageStyle.backgroundImage = secondaryImageSrc;
      this.secondaryImageStyle.backgroundImage = primaryImageSrc;
    } else {
      let randomIndex = Math.floor(Math.random() * this.images.length);
      while (this.images[randomIndex] === this.lastPrimaryImage || this.images[randomIndex] === this.lastSecondaryImage) {
        randomIndex = Math.floor(Math.random() * this.images.length);
      }
      this.lastPrimaryImage = primaryImageSrc;
      this.lastSecondaryImage = secondaryImageSrc;
      this.primaryImageStyle.backgroundImage = secondaryImageSrc;
      this.secondaryImageStyle.backgroundImage = `url(${this.images[randomIndex]})`;
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
