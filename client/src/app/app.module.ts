import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ShowtemplateComponent } from './components/showtemplate/showtemplate.component';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { routes } from './routes';
import { CreateNewsletterComponent } from './create-newsletter/create-newsletter.component';
import { ViewNewsletterComponent } from './view-newsletter/view-newsletter.component';

import { UserService } from './user.service';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ViewTemplateComponent } from './view-template/view-template.component'


const appRoutes: Routes = [
  { path: 'test', component: TestComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ShowtemplateComponent,
    TestComponent,
    LoginComponent,
    CreateNewsletterComponent,
    ViewNewsletterComponent,
    NavComponent,
    FileSelectDirective,
    RegisterComponent,
    ViewTemplateComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MyDateRangePickerModule,
    ToastrModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true},
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
