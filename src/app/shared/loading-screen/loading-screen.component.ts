import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
})
export class LoadingScreenComponent {
  private loadingService = inject(LoadingService);
  isLoading = toSignal(this.loadingService.isLoading$, { initialValue: false });
}
