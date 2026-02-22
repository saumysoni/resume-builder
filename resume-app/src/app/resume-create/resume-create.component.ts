import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.css'],
})
export class ResumeCreateComponent {
  flag: boolean = false;
  flag1: boolean = false;
  currentStep = 1;
  resumeFormData: any;
  eduFormData: any;
  expFormData: any;
  prjFormData: any;
  sklFormData: any;
  certiFormData: any;
  resume_id: any;
  education_id: any;
  exp_id: any;
  project_id: any;
  skill_id: any;
  certi_id: any;
  template_id?: any;
  user?: any;
  user_id?: number;
  currentDateTime?: Date;
  resume: any;
  resumeFlag: boolean = false;
  eduFlag: boolean = false;
  expFlag: boolean = false;
  sklFlag: boolean = false;
  prjFlag: boolean = false;
  certiFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private AppService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.flag);
  }

  ngOnInit(): void {
    if (this.education.length === 0) {
      this.addEducation();
    }
    if (this.experience.length === 0) {
      this.addExperience();
    }
    if (this.projects.length === 0) {
      this.addProject();
    }
    if (this.skills.length === 0) {
      this.addSkill();
    }
    if (this.certificate.length === 0) {
      this.addCertificate();
    }
    this.template_id = this.route.snapshot.paramMap.get('templateId');
    this.user = localStorage.getItem('CurrentUser');
    this.user = JSON.parse(this.user);
    this.user_id = this.user[0].user_id;
  }

  resumeForm = this.fb.group({
    // user_id: [''],
    // template_id: [''],
    full_name: ['', Validators.required],
    contact_no: [
      '',
      [Validators.required, Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    description: ['', Validators.required],
    bio: [''],
    github: [''],
    linkedin: [''],
  });

  eduForm = this.fb.group({
    education: this.fb.array([]),
  });

  expForm = this.fb.group({
    experience: this.fb.array([]),
  });

  prjForm = this.fb.group({
    projects: this.fb.array([]),
  });

  sklForm = this.fb.group({
    skills: this.fb.array([]),
  });

  certiForm = this.fb.group({
    certificate: this.fb.array([]),
  });

  get education() {
    return this.eduForm.controls['education'] as FormArray;
  }

  addEducation() {
    const educationForm = this.fb.group({
      resume_id: [''],
      program: ['', Validators.required],
      institution: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      is_present: [false, Validators.required],
    });
    this.education.push(educationForm);
  }

  deleteEducation(educationIndex: number) {
    this.education.removeAt(educationIndex);
  }

  get experience() {
    return this.expForm.controls['experience'] as FormArray;
  }

  addExperience() {
    const experienceForm = this.fb.group({
      resume_id: [''],
      company: ['', Validators.required],
      position: ['', Validators.required],
      start_date: ['', Validators.required],
      is_present: [false],
      end_date: [''],
      description: [''],
    });
    this.experience.push(experienceForm);
  }

  deleteExperience(experienceIndex: number) {
    this.experience.removeAt(experienceIndex);
  }

  get projects() {
    return this.prjForm.controls['projects'] as FormArray;
  }

  addProject() {
    const projectsForm = this.fb.group({
      resume_id: [''],
      project_name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.projects.push(projectsForm);
  }

  deleteProject(projectsIndex: number) {
    this.projects.removeAt(projectsIndex);
  }

  get skills() {
    return this.sklForm.controls['skills'] as FormArray;
  }

  addSkill() {
    const skillsForm = this.fb.group({
      skill_name: ['', Validators.required],
    });
    this.skills.push(skillsForm);
  }

  deleteSkill(skillsIndex: number) {
    this.skills.removeAt(skillsIndex);
  }

  get certificate() {
    return this.certiForm.controls['certificate'] as FormArray;
  }

  addCertificate() {
    const certificateForm = this.fb.group({
      resume_id: [''],
      certi_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      is_present: [false, Validators.required],
      description: ['', Validators.required],
    });
    this.certificate.push(certificateForm);
  }

  deleteCertificate(certificateIndex: number) {
    this.certificate.removeAt(certificateIndex);
  }

  getIsPresentControl(exp: AbstractControl): FormControl {
    return (exp as FormGroup).get('is_present') as FormControl;
  }

  postResume() {
    this.resumeFormData = this.resumeForm.value;
    this.resumeFormData.user_id = this.user_id;
    this.resumeFormData.template_id = parseInt(this.template_id);
    this.currentDateTime = new Date();
    this.resumeFormData.last_modified = this.currentDateTime;
    this.AppService.postResume(this.resumeFormData).subscribe((x: any) => {
      this.handleResumeData(x);
    });
  }

  putResume() {
    console.log('Hello');
    this.resumeFormData = this.resumeForm.value;
    this.resumeFormData.template_id = this.template_id;
    this.resumeFormData.user_id = this.user_id;
    this.currentDateTime = new Date();
    this.resumeFormData.last_modified = this.currentDateTime;
    this.resumeFormData.resume_id = this.resume_id;
    console.log(this.resumeFormData);
    this.AppService.putResume(this.resume_id, this.resumeFormData).subscribe(
      (x: any) => {
        console.log('How are you?');
        this.handleResumeData(x);
      }
    );
  }

  handleResumeData(data: any) {
    this.resume = data;
    this.resume_id = this.resume.resume_id;
    console.log('what is');
  }

  async postEducation() {
    this.eduFormData = this.eduForm.value.education;
    if (this.resume_id) {
      console.log(this.resume_id);
      await this.setResumeId();
      console.log(this.eduFormData);
      this.AppService.postEducation(this.eduFormData).subscribe((x: any) => {
        this.handleEducationData(x);
      });
    }
  }

  setResumeId(){
    console.log("Hello");
    for (let i = 0; i < this.eduFormData.length; i++) {
      console.log('Current resume_id:', this.resume_id);
      this.eduFormData[i].resume_id = this.resume_id;
      this.eduFormData[i].start_date = new Date(this.eduFormData[i].start_date)
      if(this.eduFormData[i].is_present)
      {
        this.eduFormData[i].end_date=null;
      }
      else{
      this.eduFormData[i].end_date = new Date(this.eduFormData[i].end_date)
      }
    }
  }

  handleEducationData(data: any) {
    this.education_id = data.education_id;
  }

  putEducation() {
    this.education.controls.forEach(
      (educationControl: AbstractControl, index: number) => {
        const educationId = educationControl.get('education_id')?.value;
        const educationData = educationControl.value;

        this.AppService.putEducation(educationId, educationData).subscribe(
          (response: any) => {
            console.log(
              `Education entry ${index + 1} updated successfully:`,
              response
            );
          }
        );
      }
    );
  }

  postExperience() {
    this.expFormData = this.expForm.value.experience;
    console.log(this.expFormData);
    for(let i=0;i<this.expFormData.length;i++)
    {
      this.expFormData[i].resume_id = this.resume_id;
      this.expFormData[i].start_date = new Date(this.expFormData[i].start_date)
      if(this.expFormData[i].is_present)
      {
        this.expFormData[i].end_date = null
      }
      else{
        this.expFormData[i].end_date = new Date(this.expFormData[i].end_date)
      }
    }
    this.AppService.postExperience(this.expFormData).subscribe((x: any) => {
      this.handleExperienceData(x);
    });
  }

  handleExperienceData(data: any) {
    this.exp_id = data.exp_id;
  }

  putExperience() {
    this.experience.controls.forEach(
      (experienceControl: AbstractControl, index: number) => {
        const experienceId = experienceControl.get('exp_id')?.value;
        const experienceData = experienceControl.value;

        this.AppService.putExperience(experienceId, experienceData).subscribe(
          (response: any) => {
            console.log(
              `Experience entry ${index + 1} updated successfully:`,
              response
            );
          }
        );
      }
    );
  }

  postSkill() {
    this.sklFormData = this.sklForm.value.skills;
    for(let i=0;i<this.sklFormData.length;i++)
    {
      this.sklFormData[i].resume_id = this.resume_id;
    }
    console.log(this.sklFormData);
    this.AppService.postSkill(this.sklFormData).subscribe((x: any) => {
      this.handleSkillData(x);
    });
  }

  handleSkillData(data: any) {
    this.skill_id = data.skill_id;
  }

  putSkill() {
    this.skills.controls.forEach(
      (skillControl: AbstractControl, index: number) => {
        const skillId = skillControl.get('skill_id')?.value;
        const skillData = skillControl.value;

        this.AppService.putSkill(skillId, skillData).subscribe(
          (response: any) => {
            console.log(
              `Skill entry ${index + 1} updated successfully:`,
              response
            );
          }
        );
      }
    );
  }

  postProject() {
    this.prjFormData = this.prjForm.value.projects;
    for(let i=0;i<this.expFormData.length;i++)
    {
      this.prjFormData[i].resume_id = this.resume_id;
      this.expFormData[i].start_date = new Date(this.expFormData[i].start_date)
      if(this.expFormData[i].is_present)
      {
        this.expFormData[i].end_date = null
      }
      else{
        this.expFormData[i].end_date = new Date(this.expFormData[i].end_date)
      }
    }
    console.log(this.prjFormData);
    this.AppService.postProject(this.prjFormData).subscribe((x: any) => {
      this.handleProjectData(x);
    });
  }

  handleProjectData(data: any) {
    this.project_id = data.project_id;
  }

  putProject() {
    this.projects.controls.forEach(
      (projectControl: AbstractControl, index: number) => {
        const projectId = projectControl.get('project_id')?.value;
        const projectData = projectControl.value;

        this.AppService.putProject(projectId, projectData).subscribe(
          (response: any) => {
            console.log(
              `Project entry ${index + 1} updated successfully:`,
              response
            );
          }
        );
      }
    );
  }

  postCertificate() {
    this.certiFormData = this.certiForm.value.certificate;
    for(let i=0;i<this.certiFormData.length;i++)
    {
      this.certiFormData[i].resume_id = this.resume_id;
      this.certiFormData[i].start_date = new Date(this.certiFormData[i].start_date)
      if(this.certiFormData[i].is_present)
      {
        this.certiFormData[i].end_date = null
      }
      else{
        this.certiFormData[i].end_date = new Date(this.certiFormData[i].end_date)
      }
    }
    console.log(this.certiFormData);
    
    this.AppService.postCertificate(this.certiFormData).subscribe((x: any) => {
      this.handleCertificateData(x);
    });
  }

  handleCertificateData(data: any) {
    this.certi_id = data.certi_id;
    this.router.navigateByUrl('display/' + this.resume_id);
  }

  putCertificate() {
    this.certificate.controls.forEach(
      (certificateControl: AbstractControl, index: number) => {
        const certificateId = certificateControl.get('certi_id')?.value;
        const certificateData = certificateControl.value;

        this.AppService.putCertificate(certificateId, certificateData).subscribe(
          (response: any) => {
            console.log(
              `Certificate entry ${index + 1} updated successfully:`,
              response
            );
          }
        );
      }
    );
  }

  nextStep() {
    if (this.currentStep < 6) {
      this.saveFormData();
      this.currentStep++;
      this.loadFormData();
    } else {
      this.saveFormData();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.saveFormData();
      this.currentStep--;
      this.loadFormData();
    }
  }

  saveFormData() {
    switch (this.currentStep) {
      case 1:
        if (!this.resumeFlag) {
          this.postResume();
          this.resumeFlag = true;
        } else {
          this.putResume();
        }
        break;
      case 2:
        if (!this.eduFlag) {
          this.postEducation();
          this.eduFlag = true
        } else {
          this.putEducation();
        }
        break;
      case 3:
        if (!this.expFlag) {
          this.postExperience();
          this.expFlag = true;
        } else {
          this.putExperience();
        }
        break;
      case 4:
        if (!this.prjFlag) {
          this.postProject();
          this.prjFlag = true;
        } else {
          this.putProject();
        }
        break;
      case 5:
        if (!this.sklFlag) {
          this.postSkill();
          this.sklFlag = true;
        } else {
          this.putSkill();
        }
        break;
      case 6:
        if (!this.certiFlag) {
          this.postCertificate();
          this.certiFlag = true;
        } else {
          this.putCertificate();
        }
        break;
    }
  }

  loadFormData() {
    // Load the form data based on the current step
    switch (this.currentStep) {
      case 1:
        this.resumeFormData = this.AppService.getResumebyResumeId(
          this.resume_id
        );
        this.resumeForm.patchValue(this.resumeFormData);
        break;
      case 2:
        this.eduFormData = this.AppService.getEducationbyResumeId(
          this.resume_id
        );
        this.eduForm.patchValue(this.eduFormData);
        break;
      case 3:
        this.expFormData = this.AppService.getExperiencebyResumeId(
          this.resume_id
        );
        this.expForm.patchValue(this.expFormData);
        break;
      case 4:
        this.prjFormData = this.AppService.getProjectsbyResumeId(
          this.resume_id
        );
        this.prjForm.patchValue(this.prjFormData);
        break;
      case 5:
        this.sklFormData = this.AppService.getSkillsbyResumeId(this.resume_id);
        this.sklForm.patchValue(this.sklFormData);
        break;
      case 6:
        this.certiFormData = this.AppService.getCertificatesbyResumeId(
          this.resume_id
        );
        this.certiForm.patchValue(this.certiFormData);
        break;
    }
  }
}
