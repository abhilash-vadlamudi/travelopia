import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from './Services/admin.service';
import { CommonService } from './Services/common.service';

//import { $ } from 'protractor';
declare var $:any, PNotify: any;
@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  commonService
  constructor(private status: HTTPStatus,
    private cookieService: CookieService,
    private authService: AuthService,
    private injector: Injector,
    private route: Router) {
      setTimeout(() => {
        this.commonService = this.injector.get(CommonService);
      })
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let adminData, headers;
    let cookieData = this.cookieService.get('loggedUser');
    adminData = cookieData ? JSON.parse(cookieData) : false;
      
    this.setStatus(req, true);
    headers = req.headers;
    if (adminData && req.url.indexOf('maps.google') === -1) {
      if (adminData.authtoken) {
        headers = headers.set('Authorization', 'Bearer ' + adminData.authtoken);
      }

      if (adminData.userId) {
        headers = headers.set('userId', adminData.userId);
      }
      headers = headers.set("Application", "webapp")
    }
    const started = Date.now();
    return next.handle(req.clone({
      headers: headers
    })).pipe(
      tap(event => {
        if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
          const elapsed = Date.now() - started;
        } else {
          if (event['body']) {
            if (event['body']['error']) {
              if (event['body']['error']['name'] === 'TokenExpiredError' || event['body']['error']['name'] === 'JsonWebTokenError') {
                if (event['url']) {
                  if(this.authService.isLoggedIn)
                      alert('You have been logged out, please log in again.');
                  this.cookieService.remove('loggedUser');
                  this.authService.isLoggedIn = false;
                  return event;
                }
              }
            }
          }

        }
        return event;
      }, error => {
        this.setStatus(req, false);
        if (error.status == '401') {       
          this.route.navigate(['unauthorized'])
        } 
        if(error.error.error && error.error.error.message) {
          this.commonService.showPnotify({ title: 'Oh No!', text: error.error.error.message, type: 'error' })
        }
      }),
      catchError(error => {
        this.setStatus(req, false);
        return [];
      }),
      finalize(() => {
        this.setStatus(req, false);
      })
    );
  }

  setStatus(req, status) {
    if (req.url.indexOf('notifications/count') === -1) {
      this.status.setHttpStatus(status);
    }
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Travelopia';
  constructor( private httpStatus: HTTPStatus, private spinner: NgxSpinnerService, private authService:  AuthService) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if (status) {
        this.spinner.show();
        
      } else {
        this.spinner.hide()
      }
    });
  }

  ngOnInit(): void {

  }
}
