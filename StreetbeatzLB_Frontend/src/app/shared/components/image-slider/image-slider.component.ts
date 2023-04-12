import {Component, Input} from '@angular/core';
import {SlideInterface} from "./types/slide.interface";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() slides: SlideInterface[] = [];

  currentIndex: number = 0;
  // currentSlideUrl:string = 'assets/streetMusicFestival/SMF1.jpeg';

  getCurrentSlideUrl(): string{
    return `url('${this.slides[this.currentIndex].url}')`;
  }

  next(): void{
    const isLastSlide = this.currentIndex === this.slides.length -1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
    // this.currentSlideUrl = this.getCurrentSlideUrl();
  }

  prev(): void{
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
    // this.currentSlideUrl = this.getCurrentSlideUrl();
  }
}
