import { Routes } from '@angular/router';
import { MovieDetailComponent } from './component/movie-detail/movie-detail/movie-detail.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MovieListComponent },
  { path: 'detail/:id', component: MovieDetailComponent }
];
