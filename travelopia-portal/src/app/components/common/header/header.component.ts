import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie';
import { AdminService } from 'src/app/Services/admin.service';
import { CommonService } from 'src/app/Services/common.service';
import { TranslatorService } from 'src/app/Services/translator.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from 'src/app/Auth/signup/signup.component';
import { LoginComponent } from 'src/app/Auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  image: any;
  userDetail: any = {
    type: 0
  };
  dateFormat: string = `${environment.dateFormat} ${environment.timeFormat}`;
  version = environment.version;
  isLoggedIn = false;
  signUpModalRef;
  loginModalRef;
  constructor(private route: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private cookieService: CookieService) {
    if (this.cookieService.get('loggedUser')) {
      this.isLoggedIn = true;
    }
  }


  syncLoggedStatus() {
    if (this.cookieService.get('loggedUser')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  /**
   * Angular life cycle
   */
  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
  
  navigateTo(route) {
    this.route.navigate([route]);
  }
  
  
  ngAfterViewInit() {
  }

  logOut() {
    this.cookieService.remove('loggedUser');
    this.authService.isLoggedIn = false;
    this.route.navigate(['home']);
    this.syncLoggedStatus()
  }

  openSignUpModal() {
    this.signUpModalRef = this.dialog.open(SignupComponent, {
      panelClass: 'sign-up-modal',
      autoFocus: false,
      data: {}
    })
    this.signUpModalRef.afterClosed().subscribe((res: any) => {
      if(res && res.data) {
        this.openLoginModal()
      } else {
        this.syncLoggedStatus()
      }
    })
  }

  openLoginModal() {
    this.loginModalRef = this.dialog.open(LoginComponent, {
      panelClass: 'login-modal',
      autoFocus: false,
      data: {}
    })
    this.loginModalRef.afterClosed().subscribe((res: any) => {
      if(res && res.data) {
        this.openSignUpModal()
      } else {
        this.syncLoggedStatus()
      }
    })
  }

  publishDetails() {
    if (this.isLoggedIn) {
      this.route.navigate(['/publish']);
    } else {
      this.openLoginModal()
    }
  }

}
