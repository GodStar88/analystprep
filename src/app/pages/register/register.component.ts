import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService, UserService } from '../../services/index';
import { Message } from 'primeng/primeng';

import { CONFIG } from '../../services/config';
declare let $: any;
@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public location: AbstractControl;
  public exam: AbstractControl;
  public location1: AbstractControl;
  public exam1: AbstractControl;
  user: any = null;
  public submitted: boolean = false;
  public onregister: boolean = true;
  public FG: boolean = true;
  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private userService: UserService, ) {


    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'location': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'exam': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'location1': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'exam1': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });
    this.user = {};
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.location = this.form.controls['location'];
    this.exam = this.form.controls['exam'];
    this.location1 = this.form.controls['location1'];
    this.exam1 = this.form.controls['exam1'];
  }
  ngOnInit(): void {

  }

  FGlogin() {
    if (this.FG == true) {
      this.userService.facebook(this.user)
        .then(res => {
          if (res.success) {
            this.user.email = res.data.email;
            this.user.name = res.data.username;
            this.user.photo = res.data.image;
            this.sharedService.setUser(this.user);
            this.router.navigate(['/']);
          } else {
          }
        });
    } else {
      this.userService.google(this.user)
        .then(res => {
          if (res.success) {
            this.user.email = res.data.email;
            this.user.name = res.data.username;
            this.user.photo = res.data.image;
            this.sharedService.setUser(this.user);
            this.router.navigate(['/']);
          } else {
          }
        });
    }
  }

  onFacebooklogin() {
    this.FG = true;
    $("#myModal").modal();

  }

  ongooglelogin() {
    this.FG = false;
    $("#myModal").modal();
  }
  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.userService.signup(this.user)
        .then(res => {
          if (res.success) {
            this.sharedService.setUser(this.user);
            this.router.navigate(['/']);
          } else {
            this.onregister = false;
          };

        });
    }
  }
}
