import { CommonModule } from '@angular/common';
import { Component, effect, EnvironmentInjector, inject, input, OnInit, runInInjectionContext, signal } from '@angular/core';
import { NowPlayingModel } from '../../../model/api-movie-now-playing-model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  imports: [CommonModule, LucideAngularModule]
})
export class MovieCarouselComponent implements OnInit {

  popularMovieList = input<NowPlayingModel | null | undefined>();
  countMovie = signal<number>(0);
  currentSlide = 0;
  touchStartX = 0;
  mouseStartX = 0;
  mouseDown = false;

  constructor() {
    const injector = inject(EnvironmentInjector);
    runInInjectionContext(injector, () => {
      effect(() => {
        const data = this.popularMovieList()?.results;
        if (data) {
          this.countMovie.set(data.length);
        }
      });
    });
  }

  ngOnInit() {

  }

  nextSlide() {
    const count = this.countMovie();
    if (count > 0) {
      this.currentSlide = (this.currentSlide + 1) % count;
    }
  }

  prevSlide() {
    const count = this.countMovie();
    if (count > 0) {
      this.currentSlide = (this.currentSlide - 1 + count) % count;
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const diffX = this.touchStartX - endX;
    this.handleSwipe(diffX);
  }

  onMouseDown(event: MouseEvent) {
    this.mouseDown = true;
    this.mouseStartX = event.clientX;
  }

  onMouseUp(event: MouseEvent) {
    if (!this.mouseDown) return;
    this.mouseDown = false;
    const endX = event.clientX;
    const diffX = this.mouseStartX - endX;
    this.handleSwipe(diffX);
  }

  handleSwipe(diffX: number) {
    if (diffX > 50) {
      this.nextSlide(); // swipe left
    } else if (diffX < -50) {
      this.prevSlide(); // swipe right
    }
  }
}
