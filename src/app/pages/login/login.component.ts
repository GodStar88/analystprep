import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedService, UserService } from '../../services/index';
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public onlogin: boolean = true;
  user: any = null;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService,
    fb: FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.user = {};
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit(): void {

  }

  onFacebooklogin() {
    this.userService.facebook(this.user)
      .then(res => {
        if (res.success) {
          if (res.message != "User already exists") {
            this.router.navigate(['/register']);
          }
          else {
            this.sharedService.setUser(res.data);
            this.router.navigate(['/']);
          }

        } else {
        }
      });
  }

  ongooglelogin() {
    this.userService.google(this.user)
      .then(res => {
        if (res.success) {
          if (res.message != "User already exists") {
            this.router.navigate(['/register']);
          }
          else {
            this.sharedService.setUser(res.data);
            this.router.navigate(['/']);
          }

        } else {
        }
      });
  }
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {

      this.userService.Login(this.user)
        .then(res => {
          if (res.success) {
            this.sharedService.setUser(res.data);
            this.router.navigate(['/']);
          } else {
            this.onlogin = false;
          };
        });

    }
  }
}
