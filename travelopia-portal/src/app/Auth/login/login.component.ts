import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';import { DOCUMENT } from "@angular/common";
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { CommonService } from 'src/app/Services/common.service';
import { cTypeValues }  from 'src/app/models/cTypeValuesConstants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  emailError: any = false;
  mobileError: any = false;
  loginValue = {
    username: '',
    password: ''
  }
  response: any = {};
  
  forgotPasswordModalRef: any;

  constructor(@Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private route: Router,
    private commonService: CommonService,
    private cookieService: CookieService,
    private titleService: Title,
    private translate: TranslateService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.titleService.setTitle('Travelopia Portal');
    this.authService.signUpStep = undefined;
    this.cookieService.remove('signUpStep');
    if (this.authService.isLoggedIn) {
      this.route.navigate(['/home']);
    }

  }

  ngOnInit() {
    this.document.body.classList.add('login');
  }
  checkValid(event: Event, value: any) {
    if(value) {
      if (value.match(/^-?\d+$/)) {
        this.emailError = false;
        if (event['key'].match(/^-?\d+$/)) {
          if (value.length <= 10) {
            if (value.length === 10) {
              this.mobileError = false;
              return false;
            } else {
              this.mobileError = true;
              return true;
            }
          } else {
            this.mobileError = false;
            return false;
          }
        } else {
          this.mobileError = false;
          return false;
        }
      } else {
        this.mobileError = false;
        // tslint:disable-next-line:max-line-length
        if(value) {
          if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
            this.emailError = true;
          } else {
            this.emailError = false;
          }
        }
      }
    } else {
      this.emailError = false;
      this.mobileError = false;
    }
  }
  isValid(value: any) {
    if(value) {
      if (value.match(/^-?\d+$/)) {
        this.emailError = false;
        if (value.length === 10) {
          this.mobileError = false;
          return true;
        } else {
          this.mobileError = true;
          return false;
        }
      } else {
        this.mobileError = false;
        // tslint:disable-next-line:max-line-length
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          this.emailError = true;

          return false;
        } else {
          this.emailError = false;
          return true;
        }
      }
    } else {
      this.emailError = false;
      this.mobileError = false;
    }
  }
  stopDefaultSubmit() { return false; }

  submitLogin() {
    const { username, password } = this.loginValue;
    this.authService.login(username, password).subscribe((response: any) => {
      if (response['response_code'] === 'success') {
        this.authService.isLoggedIn = true;
        this.dialogRef.close()
        this.cookieService.put('loggedUser', JSON.stringify(response['data']));
        this.route.navigate(['home']);
      } else if (response['response_code'] == '600') {
        this.response = response['data'];
        $('.responses').modal('show');
      } else {
        this.commonService.showPnotify({
          text: response['msg'],
          type: 'error'
        });
      }
    });
  }

   /**
   * Function to open forgot password modal
   */
  openForgotPasswordModal() {
    this.forgotPasswordModalRef = this.dialog.open(ForgotPasswordComponent, {
      autoFocus: false 
    });
  }

  navigateToSignup() {
    this.dialogRef.close({data:'signup'})
  }
}