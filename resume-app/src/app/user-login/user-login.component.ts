import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}

  flag: boolean = true;
  loginFormData: any;
  registerFormData: any;

  loginForm() {
    this.flag = true;
  }

  registerForm() {
    this.flag = false;
  }

  loginFormBuilder = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required]
  })

  registerFormBuilder = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    contactno: ['',[Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    cpassword: ['', Validators.required], // Remove the custom validator here
    isPremium: [false]
  }, {
    validators: this.passwordMatchValidator() // Apply the custom validator to the entire form
  })
  

  get fname()
  {
    return this.registerFormBuilder.get('fname');
  }
  get lname()
  {
    return this.registerFormBuilder.get('lname');
  }
  get contactno()
  {
    return this.registerFormBuilder.get('contactno');
  }
  get email()
  {
    return this.registerFormBuilder.get('email');
  }
  get password()
  {
    return this.registerFormBuilder.get('password');
  }
  get cpassword()
  {
    return this.registerFormBuilder.get('cpassword');
  }
  get isPremium()
  {
    return this.registerFormBuilder.get('isPremium');
  }

  // Custom validator function for password and cpassword fields
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const cpassword = control.get('cpassword');

      if (password && cpassword && password.value !== cpassword.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  register() {
    this.registerFormData = this.registerFormBuilder.value;
    this.appService.registerUser(this.registerFormData);
  }

  login() {
    this.loginFormData = this.loginFormBuilder.value;
    this.appService.loginUser(this.loginFormData);
  }
}
