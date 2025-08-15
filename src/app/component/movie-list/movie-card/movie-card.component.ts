import { Component, input, OnInit } from '@angular/core';
import { NowPlayingModel } from '../../../model/api-movie-now-playing-model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: []
})
export class MovieCardComponent implements OnInit {

  movieData = input<NowPlayingModel | null | undefined>();

  constructor() { }

  ngOnInit() {
  }

}
