import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { InformativeComponent } from './informative/informative.component';
import { ResumeCreateComponent } from './resume-create/resume-create.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { SelectTemplateComponent } from './select-template/select-template.component';
import { ResumeDisplayComponent } from './resume-display/resume-display.component';

const routes: Routes = [
  { path: '', component: InformativeComponent},
  { path: 'login', component: UserLoginComponent },
  { path: 'create/:templateId', component: ResumeCreateComponent },
  { path: 'display/:resumeId', component: ResumeDisplayComponent },
  { path: 'list', component: ResumeListComponent},
  { path: 'template', component: SelectTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
