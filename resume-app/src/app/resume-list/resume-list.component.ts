import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent {
  jsonString = localStorage.getItem('CurrentUser')!;
  currentUser = JSON.parse(this.jsonString);
  listOfResume:any;

  constructor(private AppService:AppService, private router: Router){}

  ngOnInit(): void {
    this.AppService.getResumebyUserId(this.currentUser[0].user_id).subscribe((x:any)=>{
      this.listOfResume = x;
      console.log(x);
    });
  }

  view()
  {
    this.router.navigateByUrl('/create/1');
  }
}
