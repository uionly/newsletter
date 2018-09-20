import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public showMenu: boolean  = false;
  constructor(private userService: UserService, private router: Router,private toastr: ToastrService) { 
    userService.checkUser.subscribe((res) => this.showMenu = res);
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.showMenu = true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.toastr.success('You"re Logged Out!');

  }

}
