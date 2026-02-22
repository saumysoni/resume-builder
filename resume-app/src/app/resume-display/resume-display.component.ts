import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-display',
  templateUrl: './resume-display.component.html',
  styleUrls: ['./resume-display.component.css'],
})
export class ResumeDisplayComponent implements OnInit {
  resume_id: any;
  resumeData?: any;
  skillData?: any;
  educationData?: any;
  projectData?: any;
  experienceData?: any;
  certificateData?: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resume_id = params['resumeId'];
      console.log(this.resume_id);

      if (this.resume_id) {
        this.appService
          .getResumebyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.resumeData = x;

            // Now that resumeData is set, you can perform operations or log it here
            console.log(this.resumeData);

            // Other API calls...
          });
        this.appService
          .getSkillsbyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.skillData = x;
          });
        this.appService
          .getCertificatesbyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.certificateData = x;
          });
        this.appService
          .getEducationbyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.educationData = x;
          });
        this.appService
          .getExperiencebyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.experienceData = x;
          });
        this.appService
          .getProjectsbyResumeId(this.resume_id)
          .subscribe((x: any) => {
            this.projectData = x;
          });
      }
    });
  }

  

  download() {
    let data = document.getElementById('resume');
    if(data){
      html2canvas(data).then(canvas => {
        let imgWidth = 208;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let imgData = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('MyResume.pdf');
      });
    }
 }
}
