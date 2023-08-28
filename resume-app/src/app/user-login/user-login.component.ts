import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private fb: FormBuilder, private AppService: AppService){}

  flag: boolean = true;
  loginFormData:any;

  loginForm()
  {
    this.flag=true;
  }

  registerForm()
  {
    this.flag=false;
  }

  loginFormBuilder = this.fb.group({
    email: [''],
    password: ['']
  })

  registerFormBuilder = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    cpassword: ['']
  })

  login()
  {
    this.loginFormData = this.loginFormBuilder.value;
    this.AppService.loginUser(this.loginFormData).subscribe(()=>{
    })
  }

}
