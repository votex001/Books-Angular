import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'reset-pass-page',
  standalone: false,
  
  templateUrl: './reset-pass-page.component.html',
  styleUrl: './reset-pass-page.component.scss'
})
export class ResetPassPageComponent {
private route = inject(ActivatedRoute);
  private tokenStatus = toSignal(
    this.route.data.pipe(map((data) => data['tokenStatus']))
  );
}
