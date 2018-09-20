import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from '../password';
import User from '../user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  public user: User = new User();
  constructor(private userService: UserService,private router: Router,private toastr: ToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username:['',Validators.required],
      email:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.required],
      password2:['',Validators.required]
    },{
      validator:PasswordValidation.MatchPassword
    })
  }
  get f() { return this.registerForm.controls; }
  register(){
    this.submitted = true;
    if (this.registerForm.invalid || this.f.password2.errors) {
      return;
    }
    this.userService.register(this.registerForm.value)
      .subscribe((res)=>{
        if(res.success){
          this.toastr.success(res.message);
          this.router.navigate(['login']);
        }else{
          this.toastr.error(res.message)
        }


      })
  }

}
