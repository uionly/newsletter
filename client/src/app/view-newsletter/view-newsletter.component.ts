import { Component, OnInit,Injectable, Output  } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-newsletter',
  templateUrl: './view-newsletter.component.html',
  styleUrls: ['./view-newsletter.component.css']
})
export class ViewNewsletterComponent implements OnInit {

  public newsletters;
  public img;
  public showform = false;
  public finalObj;

  @Output() newsletterData: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService, private router: Router) { 
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      // if(this.userService.isAdmin()){
      //   this.router.navigate(['create']);
      // }else{
      //   this.router.navigate(['view']);
      // }
      this.userService.viewAllNewsletter().subscribe(res=>{
        this.newsletters = res.data;
      })
    }else{
      this.router.navigate(['login']);
    }
  }

  show(newsletter){
    console.log(newsletter)
    this.img = newsletter.headerBanner;
    this.finalObj = newsletter;
    this.userService.sendNewsletterData(newsletter);
    this.showform = true;
    
  }

}
