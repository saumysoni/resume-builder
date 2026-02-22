import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resume-builder';
  jsonString = localStorage.getItem('CurrentUser')!;
  currentUser = JSON.parse(this.jsonString);


  constructor(private router: Router){}

  logout()
  {
    localStorage.removeItem('CurrentUser');
    this.router.navigateByUrl('/login').then(()=>{
      window.location.reload();
    })
  }

}
