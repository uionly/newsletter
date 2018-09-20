import { UpcommingEvent } from './../../classes/upcommingevent.model';
import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from "@angular/router";
import html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-showtemplate',
  templateUrl: './showtemplate.component.html',
  styleUrls: ['./showtemplate.component.css']
})
export class ShowtemplateComponent implements OnInit {
  @ViewChild('test') el:ElementRef;

  @Input() data;
  finalObj:any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.finalObj= this.data;
    console.log(this.finalObj)
  }

  saveNewsletter(){
    let original = this.finalObj;

    this.userService.saveNewsletter(original).subscribe(res=>{
      //console.log(res)
    })
  }

  cancel(){
    this.userService.removeDirectory().subscribe(res=>{
      this.router.navigate(['create']);
    })
  }

  createPdf(): void {
    let pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [29, 30]
    });
    let options = {
       pagesplit: false
    };
    pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
       pdf.save("test.pdf");
    });
 }


  public generatePdf() {

   var element = document.getElementById('GenPDF');

    var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      pagesplit    : false,
      background   : '#f4d742',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 6,windowWidth:2000 },
      jsPDF:        { unit: 'in', format: 'a2', orientation: 'portrait' }
    };


    html2pdf().from(element).set(opt).save();

  }

}
