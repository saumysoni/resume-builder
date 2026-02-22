import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent {

  templateSelection?: number;

  constructor(private router:Router){}

  submitTemplate()
  {
    if(this.templateSelection)
    {
      this.router.navigate(['/create', this.templateSelection]);
    } else {
      console.error('Please select a template before submitting.');
    }
  }
}
