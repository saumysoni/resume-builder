import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

// const BASE_URL = "http://localhost:5128";

export class AppService {
  BASE_URL: string;
  id?:any;

  constructor(private http: HttpClient, private router: Router, private location: Location) {
    this.BASE_URL = "http://localhost:5128";

  }

  registerUser(formData:any)
  {
    delete formData['cpassword'];
    this.http.post(this.BASE_URL+"/user",formData).subscribe((x)=>{
      console.log(x);
      // this.toastr.success("Registration successful!!");
      this.router.navigateByUrl('/login');
    });
  }
  loginUser(formData:any)
  {
    this.http.get(this.BASE_URL+"/user/"+formData['email']).subscribe((x:any)=>{
      if(x[0]['password']==formData['password'])
      {
        localStorage.setItem('CurrentUser', JSON.stringify(x));
        this.router.navigateByUrl('/template').then(() => {
          window.location.reload();
        });
        // this.toastr.success;
      }
      else{
        // this.toastr.error("Invalid credentials!!");
        window.location.reload();
      }
    })
  }

  postResume(resumeFormData: any)
  {
    return this.http.post(this.BASE_URL+"/resume", resumeFormData);
  }

  postEducation(eduFormData: any)
  {
    return this.http.post(this.BASE_URL+"/education", eduFormData);
  }

  postExperience(expFormData: any)
  {
    return this.http.post(this.BASE_URL+"/experience", expFormData);
  }

  postSkill(sklFormData: any)
  {
    return this.http.post(this.BASE_URL+"/skill", sklFormData);
  }

  postProject(prjFormData: any)
  {
    return this.http.post(this.BASE_URL+"/project", prjFormData);
  }

  postCertificate(certiFormData: any)
  {
    return this.http.post(this.BASE_URL+"/certificate", certiFormData);
  }

  getResumebyUserId(user_id: Number)
  {
    return this.http.get(this.BASE_URL+"/resumeuser/"+user_id);
  }

  getResumebyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/resume/"+resume_id);
  }

  getEducationbyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/education/"+resume_id);
  }

  getExperiencebyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/experience/"+resume_id);
  }

  getProjectsbyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/project/"+resume_id);
  }

  getSkillsbyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/skill/"+resume_id);
  }

  getCertificatesbyResumeId(resume_id:number)
  {
    return this.http.get(this.BASE_URL+"/certificate/"+resume_id);
  }

  putEducation(education_id:number, formData:any)
  {
    return this.http.put(this.BASE_URL+"/education/"+education_id, formData);
  }

  putExperience(experience_id:number, formData:any)
  {
    return this.http.put(this.BASE_URL+"/experience/"+experience_id, formData);
  }

  putCertificate(certi_id:number, formData:any)
  {
    return this.http.put(this.BASE_URL+"/certificate/"+certi_id, formData);
  }

  putProject(project_id:number, formData:any)
  {
    return this.http.put(this.BASE_URL+"/project/"+project_id, formData);
  }

  putSkill(skill_id:number, formData:any)
  {
    return this.http.put(this.BASE_URL+"/skill/"+skill_id, formData);
  }

  putResume(resume_id:number, formData:any){
    return this.http.put(this.BASE_URL+"/resume/"+resume_id, formData);
  }

}
