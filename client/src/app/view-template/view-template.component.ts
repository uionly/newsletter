import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {
  @ViewChild('test') el:ElementRef;
  @Input() data;
  finalObj:any;
  constructor(private userService: UserService) { 
    userService.newsletterData.subscribe((res) =>{
      this.finalObj = res;
    } );
  }

  ngOnInit() {
    this.finalObj= this.data;
  }

}
