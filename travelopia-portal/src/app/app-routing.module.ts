import { AuthGuard } from './Auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/common/header/header.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { PublishDetailsComponent } from './components/publish-details/publish-details.component';
import { TravelDeatilsComponent } from './components/travel-deatils/travel-deatils.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'publish',
    component: PublishDetailsComponent
  },
  {
    path: 'details',
    component: TravelDeatilsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class AppRoutingModule { }
export const routingComponents = [
  HeaderComponent,
  LoginComponent
];
