import { Component, OnInit, ViewChild, TemplateRef, ElementRef, QueryList, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { CommonService } from 'src/app/Services/common.service';
import { regex } from 'src/app/models/appdata';

declare var $: any, PNotify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('itemsContainer') itemsContainer: ElementRef;
  showPassword: boolean = false;
  loggedUser: any = {};
  emailRegex = regex.email;
  nowhitespace = regex.nowhitespace
  verification: Object = {};
  businessUserEmailExist: any = false;
  businessUserEmailExistMsg: any = '';
  businessUser: any = {
    title: '',
    first_name: '',
    last_name: '',
    email: '',
    role: {}
  };
  User;

  constructor(public cookieService: CookieService,
    private route: Router,
    public agentService: AuthService,
    public dialog: MatDialog) { 
    }

  /**
   * Angular life cycle
   */
  ngOnInit() {
    const isLogged = this.cookieService.get('loggedUser');
    this.loggedUser = isLogged ? JSON.parse(isLogged) : {};
    this.User  = this.loggedUser.userId;
  }



  /**
   * Angular life cycle
   */
  ngAfterViewInit() {

  }


}
