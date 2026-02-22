import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InformativeComponent } from './informative/informative.component';
import { ResumeCreateComponent } from './resume-create/resume-create.component';
import { ToastrService } from 'ngx-toastr';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeDisplayComponent } from './resume-display/resume-display.component';
import { SelectTemplateComponent } from './select-template/select-template.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    InformativeComponent,
    ResumeCreateComponent,
    ResumeListComponent,
    ResumeDisplayComponent,
    SelectTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [{ provide: ToastrService, useValue: ToastrService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
