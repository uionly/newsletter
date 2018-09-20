import { Component,OnInit ,ViewChild} from '@angular/core';
import {Section} from './classes/section.model';
import {Highlight} from './classes/highlight.model';
import {IMyDrpOptions} from 'mydaterangepicker';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import {UpcommingEvent} from './classes/upcommingevent.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(private toastrService: ToastrService){}

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  onClick() {
    this.toastrService.success('in div');
  }

// For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
// to set initial date range value using the selDateRange attribute.
private model: any = {beginDate: {year: 2018, month: 10, day: 9},
                         endDate: {year: 2018, month: 10, day: 19}};

  private newSection: any = {};
  private newhighlight:any={};
  newevent:any={};
  sections: Section[] = [];
  highlights:Highlight[]=[];
  logo:string;
  backgroundimage:string;
  title:string;
  edition:string;
  finalObj:any;
  sname:string = '';
  hname:string='';
  ename:string ='';
  months:any= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  showform:boolean;
  sectionImage:string;
  eventimages:string;
  ngOnInit() {
    this.showform=false;
    this.toastrService.overlayContainer = this.toastContainer;
    //this.onClick();
  }

  onSubmit(){
    var date = new Date();




   this.finalObj ={
     logo:this.logo,
     backgroundimage:this.backgroundimage,
     title:this.title,
     edition:this.edition,
     currentDate : this.months[date.getMonth()] + '  ' + date.getFullYear(),
     section:{
       sectionname:this.sname,
       subsection:this.sections
     },
     highlight:{
      sectionname:this.hname,
      subsection: this.highlights
      },

     upcommingEvent:{
      sectionname:this.ename,
      subsection: this.upcommingEvent

      },
     footerText:this.footerText
   }
   this.showform=true;
  }




  save(event:any):void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.logo = event.target.result;
      }
      console.log(event.target.files[0])
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  backgroudImages(event:any):void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.backgroundimage = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  sectionImg(event:any):void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.sectionImage = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.sectionImage=null;
    event=null;
  }


  eventImages(event:any):void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.eventimages = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.eventimages=null;
    event=null;
  }


  footerText:string;
  upcommingEvent:UpcommingEvent[]=[];

  addUpcommingEvent(){


   /* if(this.newevent.eheading !=null &&  this.newevent.efromdate !=null && this.newevent.evenue !=null && this.eventimages !=null
      && this.newevent.edesc !=null &&  this.newevent.elink !=null ){
        */
        this.newevent.eimage= this.eventimages;
        this.newevent.efromdate= this.months[this.model.beginDate.month]+" "+ this.model.beginDate.day + " - "+this.model.endDate.day+","+this.model.beginDate.year;
        this.upcommingEvent.push(this.newevent);
        this.newevent = {};

     /* }*/

  }





    addSectionValue() {
      if(this.newSection.sec_heading!= null || this.sectionImage != null || this.newSection.sec_desc!=null  ||  this.newSection.sec_link!=null ){
          this.newSection.sec_img= this.sectionImage;
          this.sections.push(this.newSection);
          this.sectionImage = null;
      }
        this.sectionImage="";
        this.newSection = {};
    }

    removeSectionValue(index) {
       this.sections.splice(index, 1);
     }


     addHighlightSectionValue(){
      if(this.sectionImage!= null || this.newhighlight.hlightDesc!= null ){
         this.newhighlight.hlightImages = this.sectionImage;
        this.highlights.push(this.newhighlight);
        console.log(this.newhighlight)
        this.sectionImage=null;
       }

      this.newhighlight = {};
     }
    removeHighlightSectionValue(index){
      this.highlights.splice(index, 1);
    }
    removeUpcommingEvent(index){
      this.upcommingEvent.splice(index, 1);
    }



}
