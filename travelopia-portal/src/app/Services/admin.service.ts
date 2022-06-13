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
export class AdminService {
  public baseUrl = environment.baseUrl + 'admin/agent/';
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
    
}

