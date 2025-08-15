import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { NavberComponent } from "./shared/navber/navber.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule ,MovieListComponent, NavberComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nDay: number = 0;
  result: number = 0;
  nRow: number = 0;

  protected readonly title = signal('booking-movie');

  calculateDay(num: number) {
    const qutityWater = 5832;
    let x = qutityWater;
    for (let i = 1; i <= num; i++) {
      // const j = x / 3;
      // x = x - j;

      x = x - (x / 3);
    }
    return this.result = x;
  }

  checkInput(num: number) {
    if (typeof(num) === 'string' || !num) this.nRow = 0;
    if (num.toString().length > 1) {
      this.nRow = 9;
    }
  }
}
