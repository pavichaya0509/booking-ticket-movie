import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCarouselComponent } from "./movie-carousel/movie-carousel.component";
import { NowPlayingModel } from '../../model/api-movie-now-playing-model';
import { MovieService } from '../../service/movie-service';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [CommonModule, MovieCarouselComponent, MovieCardComponent]
})
export class MovieListComponent implements OnInit {

  nowPlayingMovie = signal<NowPlayingModel | null>(null);
  popularMovie = signal<NowPlayingModel | null>(null);
  comingSoonMovie = signal<NowPlayingModel | null>(null);
  selectedTab = signal<string>('nowPlaying');

  isLoading = signal<boolean>(true);

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadMovieData();
  }

  async loadMovieData() {
    try {
      this.isLoading.set(true);
      const [nowPlaying, popularMovie, comingSoon] = await Promise.all([
        firstValueFrom(this.movieService.getNowPlayingMoive()),
        firstValueFrom(this.movieService.getPopularMovie()),
        firstValueFrom(this.movieService.getComingSoonMovie())
      ]);
      this.nowPlayingMovie.set(this.transformMovieImagePaths(nowPlaying));
      this.comingSoonMovie.set(this.transformMovieImagePaths(comingSoon));
      this.popularMovie.set(this.transformMovieImagePaths(popularMovie));
      
      console.log(this.nowPlayingMovie(), this.comingSoonMovie());
      
      this.isLoading.set(false);
    } catch (error) {
      console.error(error);
      this.isLoading.set(true);
    }
  }

  transformMovieImagePaths(movieResponse: NowPlayingModel) {
    const transformedResults = movieResponse.results.map((f: any) => ({
      ...f,
      poster_path: f.poster_path ? "https://image.tmdb.org/t/p/original" + f.poster_path : f.poster_path,
      backdrop_path: f.backdrop_path ? "https://image.tmdb.org/t/p/original" + f.backdrop_path : f.backdrop_path
    }));

    return {
      ...movieResponse,
      results: transformedResults
    };
  }
}
