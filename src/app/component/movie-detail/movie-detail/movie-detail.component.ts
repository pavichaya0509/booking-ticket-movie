import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie-service';
import { MovieDetailModel } from '../../../model/movie-detail-model';
import { LucideAngularModule } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoTrailerModel } from '../../../model/video-trailer-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CreditsModel } from '../../../model/credits-model';
import { SimilarMoviesModel } from '../../../model/similar-movies-model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  imports: [CommonModule, LucideAngularModule, RouterModule]
})
export class MovieDetailComponent implements OnInit {

  private sub?: Subscription;
  trailerUrl: SafeResourceUrl | null = null;
  isLoadingTrailer = signal<boolean>(true);
  movieId = signal<number>(0);
  movieDetail = signal<MovieDetailModel | null>(null);
  movieTrailer = signal<VideoTrailerModel | null>(null);
  credits = signal<CreditsModel | null>(null);
  similarMovies = signal<SimilarMoviesModel | null>(null);

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isLoadingTrailer.set(true);
    this.sub = this.route.paramMap.subscribe(async (param: ParamMap) => {
      const id = Number(param.get('id'));
      if (id) {
        this.movieId.set(id);
        const [movieDetail, trailer, credits, similar] = await Promise.all([
          firstValueFrom(this.movieService.getMovieDetail(this.movieId())),
          firstValueFrom(this.movieService.getVideoTrailer(this.movieId())),
          firstValueFrom(this.movieService.getCredits(this.movieId())),
          firstValueFrom(this.movieService.getSimilarMovies(this.movieId()))
        ]);
        if (movieDetail) this.movieDetail.set(movieDetail);
        if (trailer) this.movieTrailer.set(trailer);
        if (credits) this.credits.set(credits);
        if (similar) this.similarMovies.set(similar);
        console.log(this.movieDetail(), this.movieTrailer());
        if (this.movieTrailer()?.results) {
          this.playTrailer();
        }
      }
    });
  }

  checkBackdropPath(path?: string | null) {
    return path ? this.movieService.imageUrlPath + path : 'assets/img/no-image.jpg';
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

  playTrailer() {
    const key = this.getYoutubeTrailerKey();
    if (!key) {
      console.warn("No trailer available");
      return;
    }
    else {
      const url = `https://www.youtube.com/embed/${key}`;
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.isLoadingTrailer.set(false);
    }
  }

  getYoutubeTrailerKey(): string | null {
    const videos = this.movieTrailer()?.results ?? [];
    const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer");
    return trailer ? trailer.key : null;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub?.unsubscribe();
  }
}
