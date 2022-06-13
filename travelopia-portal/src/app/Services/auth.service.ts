import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CookieService } from 'ngx-cookie';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn: any;
    public loggedId: any;
    public signUpStep: any;
    public baseUrl = environment.baseUrl + 'travelopia/';
    constructor(private http: HttpClient, private cookieService: CookieService) {
        const isLogged = this.cookieService.get('loggedUser');
        this.signUpStep = this.cookieService.get('signUpStep');
        if (isLogged) {
            this.isLoggedIn = true;
            this.loggedId = isLogged;
        } else {
            this.isLoggedIn = false;
            this.loggedId = false;
        }
    }
    public login(username: string, password: string) {
        return this.http.post(this.baseUrl + 'login', {
            responseType: 'json',
            username,
            password
        }).pipe(
            map(res => res)
        );
    }

    public landlordSignup(data) {
        return this.http.post(this.baseUrl + 'signup', data).pipe(
            map(res => res)
        );
    }
    public forgot(data) {
        return this.http.post(this.baseUrl + 'forgot', data).pipe(
            map(res => res)
        );
    }

}
