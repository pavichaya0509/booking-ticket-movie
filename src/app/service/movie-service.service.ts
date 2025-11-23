import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NowPlayingModel } from '../model/api-movie-now-playing-model';
import { MovieDetailModel } from '../model/movie-detail-model';
import { VideoTrailerModel } from '../model/video-trailer-model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWY0ZjE2NGZjZDhiYTk0NjViYzk4ZDFlMmEzMGIwYiIsIm5iZiI6MTc1MzM3NDUzNS4yNCwic3ViIjoiNjg4MjVmNDc0OGVhNTU5NzMzNTVlNTYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.jNThAlyEGAvrzH20pTV_aO4Jx4X9IGUqFXKEFqyqrEY'; // ใส่ Bearer Token จริง
  private movieUrl = 'https://api.themoviedb.org/3/movie';
  imageUrlPath = 'https://image.tmdb.org/t/p/original';

  constructor(private http: HttpClient) { }

  getNowPlayingMoive():Observable<NowPlayingModel> {
    const url = `${this.movieUrl}/now_playing?language=en-US&page=1`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    });
    
    return this.http.get<NowPlayingModel>(url, {headers});
  }

  getPopularMovie(): Observable<NowPlayingModel> {
    const url = `${this.movieUrl}/popular?language=en-US&page=1`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.apiKey}`,
      'accept' : 'application/json'
    });
    return this.http.get<NowPlayingModel>(url, { headers });
  }

  getComingSoonMovie(): Observable<NowPlayingModel> {
    const url = `${this.movieUrl}/upcoming?language=en-US&page=1`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.apiKey}`,
      'accept' : 'application/json'
    });
    return this.http.get<NowPlayingModel>(url, { headers }); 
  }

  getMovieDetail(movieId: number): Observable<MovieDetailModel> {
    const url = `${this.movieUrl}/${movieId}`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.apiKey}`,
      'accept' : 'application/json'
    });
    return this.http.get<MovieDetailModel>(url, { headers });
  }

  getVideoTrailer(movieId: number): Observable<VideoTrailerModel> {
    const url = `${this.movieUrl}/${movieId}/videos`;
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${this.apiKey}`,
      'accept' : 'application/json'
    });
    return this.http.get<VideoTrailerModel>(url, { headers });
  }
}
