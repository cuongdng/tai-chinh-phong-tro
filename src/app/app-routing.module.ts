import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/signin/signin.component';
import { SignupComponent } from './features/signup/signup.component';
import { SpendingComponent } from './features/spending/spending.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { LoadingComponent } from './shared/loading.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'app',
    component: SpendingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
  {
    path: 'sign-in',
    component: SigninComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [SecureInnerPagesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
