import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  template: ` <app-header></app-header>
    <div class="app-container">
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>
    </div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
