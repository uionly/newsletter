import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import User from '../user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  public user: User = new User();
  constructor(private userService: UserService,private router: Router,private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    if(this.userService.isLoggedIn()){
      console.log(this.userService.isAdmin())
      if(this.userService.isAdmin()){
        this.router.navigate(['create']);
        
      }else{
        this.router.navigate(['view']);
      }
      //this.router.navigate(['create']);
      //this.toasterService.pop('success', 'Args Title', 'Args Body');
    }else{
      this.router.navigate(['login']);
      //this.toasterService.pop('success', 'Args Title', 'Args Body');
    }
  }
  get f() { return this.loginForm.controls; }

  authenticate(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.authenticate(this.loginForm.value)
      .subscribe((res)=>{
        if(res.success){
          var user = JSON.stringify(res.record);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', user);
          this.router.navigate(['create']);
          this.toastr.success('You"re Logged In');
        }else{
          this.toastr.error(res.message)
        }


      })
  }

}
