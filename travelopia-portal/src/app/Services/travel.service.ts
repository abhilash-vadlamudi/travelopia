import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  public apiBaseUrl = environment.baseUrl + 'admin/api/';

  public options: any;
  public loggedUser;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router,
    private cookieService: CookieService, private dialog: MatDialog) {
    const cookieData = this.cookieService.get('loggedUser');
    if(typeof cookieData !== 'undefined' && cookieData) {
      this.loggedUser = JSON.parse(cookieData)
    }
  }

  public getCountry() {
    return this.http.get(this.apiBaseUrl + 'travel/country').pipe(
      map(res => res)
    );
  }

  public addTraveller(data) {
    return this.http.post(this.apiBaseUrl + 'travel/add', data).pipe(
      map(res => res)
    );
  }

  public getTravelDetails() {
    return this.http.get(this.apiBaseUrl + 'travel/details').pipe(
      map(res => res)
    );
  }

    
}

