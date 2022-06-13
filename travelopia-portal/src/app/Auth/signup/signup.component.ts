import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslatorService } from 'src/app/Services/translator.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { regex } from '../../models/appdata';
import { cTypeValues } from '../../models/cTypeValuesConstants';
import { CommonService } from 'src/app/Services/common.service';
import { HeaderComponent } from 'src/app/components/common/header/header.component';

declare var PNotify: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  emailError: any = false;
  mobileError: any = false;
  passwordPattern = /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;
  user: any = {};
  userType;
  verification: Object = {};
  response: any = {};
  currentStep = 'step1';
  emailRegex = regex.email;

  @ViewChild('headerComponent', { static: true }) headerComponent: HeaderComponent;
  vendorId: String = '';
  constructor(
    private authService: AuthService,
    private translate: TranslatorService,
    private route: Router,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private titleService: Title,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<SignupComponent>,
    ) {
  }
  ngOnInit() {
    this.titleService.setTitle('Travelopia Portal Signup');

    if (this.authService.signUpStep) {
      this.currentStep = this.authService.signUpStep;
    } else if (this.authService.isLoggedIn) {
      this.route.navigate(['/home']);
    }

    if (this.response.vendorId) {
      this.vendorId = this.response.vendorId;
    } else {
      let cookieData = this.cookieService.get('loggedUser');
      let adminData = cookieData ? JSON.parse(cookieData) : false;
      this.vendorId = adminData.userId;
    }

  }

  submitSignup() {
    this.authService.landlordSignup(this.user).subscribe((response: any) => {
      if (response.success) {
        this.dialogRef.close()
        this.route.navigate(['home']);
        this.commonService.showPnotify({ text: response.message });
        this.response = response.data;
        this.cookieService.put('loggedUser', JSON.stringify(this.response));
        this.vendorId = this.response.userId;
        this.cookieService.remove('signUpStep');
      } else {
        this.commonService.showPnotify({ text: response.error.message, type: 'error' });
      }
    })
  }

  navigateToLogin() {
    this.dialogRef.close({data:'login'})
  }

}
