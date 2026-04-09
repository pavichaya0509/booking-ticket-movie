import { NowPlayingModel } from "./api-movie-now-playing-model";

export interface SimilarMoviesModel extends NowPlayingModel {
  // Reusing NowPlayingModel as the structure is likely the same for lists of movies
}
