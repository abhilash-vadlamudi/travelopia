import { Injectable } from '@angular/core';
import { logging } from 'protractor';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { TranslatorService } from 'src/app/Services/translator.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
declare var PNotify: any,tinycolor: any;

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  loggedUser: any = {};
  private image = new BehaviorSubject('');
  profileImage = this.image.asObservable();

  constructor(private cookieService: CookieService, private translatorService: TranslatorService) {
    this.loggedUser = this.cookieService.get('loggedUser') ? JSON.parse(this.cookieService.get('loggedUser')) : {}
  }

  getId() {
    this.loggedUser = this.cookieService.get('loggedUser') ? JSON.parse(this.cookieService.get('loggedUser')) : {}
    return this.loggedUser['userId']
  }
  get(field) {
    this.loggedUser = this.cookieService.get('loggedUser') ? JSON.parse(this.cookieService.get('loggedUser')) : {}
    return this.loggedUser['userDetails'][field]
  }

  showPnotify({ title = 'Success', text = '', type = 'success', styling = 'bootstrap3' }) {
    PNotify.removeAll();
    type === "success"
      ? new PNotify({ title, text, type, styling })
      : new PNotify({ title: 'Oh No!', text, type: 'error', styling })
  }

  isJSON(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }
  getBrowserInfo() {
    return {
     // "AcceptHeader": "application/json,text/javascript,*/*;q=0.01<",
      "JavaEnabled": navigator.javaEnabled(),
      "Language": navigator.language,
      "ColorDepth": screen.colorDepth,
      "ScreenHeight": screen.height,
      "ScreenWidth": screen.width,
      "TimeZoneOffset": new Date().getTimezoneOffset().toString(),
      "UserAgent": navigator.userAgent,
      "JavascriptEnabled": true
      }
  }
  strRep(data) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }
}

