import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { CreateNewsletterComponent } from './create-newsletter/create-newsletter.component';
import { ViewNewsletterComponent } from './view-newsletter/view-newsletter.component';

export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'create', component: CreateNewsletterComponent  },
  { path: 'view', component: ViewNewsletterComponent  }
  ,{path:'**', component:LoginComponent}
];
