import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="!authService.isLoggedIn">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {
    const interval = setInterval(() => {
      if (!this.authService.isLoggedIn) {
        console.log('interval');
      } else {
        this.router.navigate(['/app']);
        clearInterval(interval);
      }
    }, 100);
  }

  ngOnInit() {}
}
