import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, HTTPStatus, HTTPListener } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import {
  HttpClientModule, HTTP_INTERCEPTORS, HttpClient
} from '@angular/common/http';
import { DatePipe, TitleCasePipe } from '@angular/common'
import { AuthGuard } from './Auth/auth.guard';
import { AuthService } from './Services/auth.service';
import { CookieModule, CookieService } from 'ngx-cookie';
import { NgxMaskModule } from 'ngx-mask'
import { ConfirmationModalComponent } from './components/common/confirmation-modal/confirmation-modal.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const RxJS_Services = [HTTPListener, HTTPStatus];
import { NgbModule, NgbRatingModule, NgbModalModule, NgbPaginationModule, NgbCarouselModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './Auth/signup/signup.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { onlyNumbersInput } from './only-numbers-input-directive';
import 'hammerjs';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonService } from './Services/common.service';
import { DynamicComponentLoaderService } from './Services/dynamic-component-loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';


import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/common/header/header.component';
import { PublishDetailsComponent } from './components/publish-details/publish-details.component';
import { amountInput } from './amount-input-directive';
import { TravelDeatilsComponent } from './components/travel-deatils/travel-deatils.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    ConfirmationModalComponent,
    ForgotPasswordComponent,
    onlyNumbersInput,
    amountInput,
    PublishDetailsComponent,
    TravelDeatilsComponent,
  ],
  entryComponents: [
    ConfirmationModalComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    TagInputModule,
    BrowserAnimationsModule,
    NgbRatingModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbCarouselModule,
    InfiniteScrollModule,
    RouterModule,
    NgbTypeaheadModule,
    NgbModule,
    CookieModule.forRoot(),
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSliderModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    NgxSliderModule,
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    DatePipe,
    TitleCasePipe,
    AuthGuard,
    AuthService,
    CommonService,
    HTTPStatus,
    CookieService,
    MatIconRegistry,
    DynamicComponentLoaderService,
    ...RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('gridizenicon', 'gd');
  }
}

