import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface Seat {
  id: string;
  row: string;
  col: number;
  zone: string;
  price: number;
  selected: boolean;
  occupied: boolean;
} 

@Component({
  selector: 'app-book-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  movieId = signal<number>(0);
  seats = signal<Seat[]>([]);
  selectedSeats = signal<Seat[]>([]);
  totalPrice = signal<number>(0);

  zones = [
    { name: 'Sofa', price: 250, rows: ['A', 'B'], cols: 8 },
    { name: 'Luxury', price: 160, rows: ['C', 'D', 'E'], cols: 10 },
    { name: 'Normal', price: 120, rows: ['F', 'G', 'H', 'I'], cols: 12 }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.movieId.set(id);
        this.generateSeats();
      }
    });
  }

  generateSeats() {
    let tempSeats: Seat[] = [];
    this.zones.forEach(zone => {
      zone.rows.forEach(row => {
        for (let i = 1; i <= zone.cols; i++) {
          tempSeats.push({
            id: `${row}${i}`,
            row: row,
            col: i,
            zone: zone.name,
            price: zone.price,
            selected: false,
            // Randomly set some seats to occupied for demonstration
            occupied: Math.random() > 0.85
          });
        }
      });
    });
    this.seats.set(tempSeats);
  }

  toggleSeat(seat: Seat) {
    if (seat.occupied) return;
    seat.selected = !seat.selected;
    const currentSelected = this.seats().filter(s => s.selected);
    this.selectedSeats.set(currentSelected);
    this.totalPrice.set(currentSelected.reduce((sum, s) => sum + s.price, 0));
  }

  getSeatsByRow(row: string): Seat[] {
    return this.seats().filter(s => s.row === row);
  }

  bookTickets() {
    if (this.selectedSeats().length > 0) {
      alert(`Successfully booked ${this.selectedSeats().length} tickets for a total of $${this.totalPrice()}`);
      // Mark selected seats as occupied
      let currentSeats = this.seats();
      currentSeats.forEach(s => {
        if(s.selected) {
          s.occupied = true;
          s.selected = false;
        }
      });
      this.seats.set(currentSeats);
      this.selectedSeats.set([]);
      this.totalPrice.set(0);
    }
  }
}
