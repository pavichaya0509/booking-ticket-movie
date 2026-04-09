import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navber/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    LoadingScreenComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('booking-movie');
}
