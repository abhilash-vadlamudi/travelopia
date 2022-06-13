import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { regex } from 'src/app/models/appdata';
import { AuthService } from 'src/app/Services/auth.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  emailId: '';
  emailRegex = regex.email;
  constructor(private authService: AuthService,
    private commonService: CommonService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,) { }


  ngOnInit() {
  }


  forgotPassword() {
    this.authService.forgot({ email: this.emailId }).subscribe((m) => {
      if (m['response_code'] === 'success') {
        this.commonService.showPnotify({ text: m['msg'] })
        this.dialogRef.close();
      } else {
        this.commonService.showPnotify({ text: m['msg'], type: 'error' });
      }
    })
  }

}
