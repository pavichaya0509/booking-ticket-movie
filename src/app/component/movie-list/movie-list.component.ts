import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { NowPlayingModel } from '../../model/api-movie-now-playing-model';
import { MovieService } from '../../service/movie-service.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { firstValueFrom } from 'rxjs';
import { LoadingScreenComponent } from '../../shared/loading-screen/loading-screen.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [
    CommonModule,
    MovieCarouselComponent,
    MovieCardComponent,
    LoadingScreenComponent,
  ],
})
export class MovieListComponent implements OnInit {
  nowPlayingMovie = signal<NowPlayingModel | null>(null);
  popularMovie = signal<NowPlayingModel | null>(null);
  comingSoonMovie = signal<NowPlayingModel | null>(null);
  selectedTab = signal<string>('nowPlaying');
  loadingService = inject(LoadingService);

  isLoading = signal<boolean>(true);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovieData();
  }

  async loadMovieData() {
    try {
      this.isLoading.set(true);
      this.loadingService.show();
      const [nowPlaying, popularMovie, comingSoon] = await Promise.all([
        firstValueFrom(this.movieService.getNowPlayingMoive()),
        firstValueFrom(this.movieService.getPopularMovie()),
        firstValueFrom(this.movieService.getComingSoonMovie()),
      ]);
      this.nowPlayingMovie.set(this.transformMovieImagePaths(nowPlaying));
      this.comingSoonMovie.set(this.transformMovieImagePaths(comingSoon));
      this.popularMovie.set(this.transformMovieImagePaths(popularMovie));

      console.log(this.nowPlayingMovie(), this.comingSoonMovie());

      this.isLoading.set(false);
      this.loadingService.hide();
    } catch (error) {
      console.error(error);
      this.isLoading.set(false);
      this.loadingService.hide();
    }
  }

  transformMovieImagePaths(movieResponse: NowPlayingModel) {
    const transformedResults = movieResponse.results.map((f: any) => ({
      ...f,
      poster_path: f.poster_path
        ? this.movieService.imageUrlPath + f.poster_path
        : 'assets/img/no-image.jpg',
      backdrop_path: f.backdrop_path
        ? this.movieService.imageUrlPath + f.backdrop_path
        : 'assets/img/no-image.jpg',
    }));

    return {
      ...movieResponse,
      results: transformedResults,
    };
  }
}
