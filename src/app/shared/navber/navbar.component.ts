import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { single } from 'rxjs';
import { LucideAngularModule } from "lucide-angular";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navber',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, LucideAngularModule, RouterLink]
})
export class NavbarComponent implements OnInit {

  isSidebarOpen = signal<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

}
