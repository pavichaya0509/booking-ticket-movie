import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { single } from 'rxjs';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-navber',
  templateUrl: './navber.component.html',
  styleUrls: ['./navber.component.css'],
  imports: [CommonModule, LucideAngularModule]
})
export class NavberComponent implements OnInit {

  isSidebarOpen = signal<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

}
