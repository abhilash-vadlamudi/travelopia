import { Component, Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    constructor(public translate: TranslateService) {
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang(environment.locale); //default language
        translate.use(environment.locale); //language to be used, cahnge to 'fr' for testing

    }
    //use this method to transalate, pass the key name to be translated
    translateValue(key, param = {}) {
      let t_value;
      this.translate.get(key, param).subscribe(res => { t_value = res });
      return t_value
    }
}