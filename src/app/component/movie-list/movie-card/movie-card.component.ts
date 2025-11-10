import { Component, input, OnInit } from '@angular/core';
import { NowPlayingModel } from '../../../model/api-movie-now-playing-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: []
})
export class MovieCardComponent implements OnInit {

  movieData = input<NowPlayingModel | null | undefined>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  routeToDetail(movieId: number) {
    this.router.navigate(['/detail', movieId]);
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    // ป้องกันวนลูป: ถ้า already fallback แล้ว ก็ไม่เซ็ตซ้ำ
    if (!img.dataset['fallbackApplied']) {
      img.dataset['fallbackApplied'] = 'true';
      img.onerror = null; // ปิด handler ก่อนเปลี่ยน src
      img.src = '/assets/img/no-image.jpg';
    }
  }
}
