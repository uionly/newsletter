import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import {Section} from '../classes/section.model';
import {Highlight} from '../classes/highlight.model';
import {IMyDrpOptions} from 'mydaterangepicker';
import {UpcommingEvent} from '../classes/upcommingevent.model';
import { UserService } from '../user.service';
import { FileUploader } from 'ng2-file-upload';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.css']
})
export class CreateNewsletterComponent implements OnInit {

  industryForm: FormGroup;
  submitted = false;

  @ViewChild('myLogo')
  inputLogo: ElementRef;

  @ViewChild('myHeader')
  inputHeader: ElementRef;

  public logoUploader:FileUploader = new FileUploader({url:'/api/logo'});
  public headerUploader:FileUploader = new FileUploader({url:'/api/header'});
  public industryUploader:FileUploader = new FileUploader({url:'/api/industryWatch'});
  public highlightsUploader:FileUploader = new FileUploader({url:'/api/highlights'});
  public eventsUploader:FileUploader = new FileUploader({url:'/api/events'});

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

// For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
// to set initial date range value using the selDateRange attribute.
private model: any = {beginDate: {year: 2018, month: 10, day: 9},
                         endDate: {year: 2018, month: 10, day: 19}};

  private newSection: any = {};
  private newhighlight:any={};
  newevent:any={};
  sections: Section[] = [];
  industryWatch: Section[] = [];
  highlights:Highlight[]=[];
  logo:string;
  backgroundimage:string;
  title:string;
  edition:string;
  finalObj:any;
  sname:string = 'Industry Watch';
  hname:string='Highlights';
  ename:string ='Upcoming Events';
  months:any= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  showform:boolean;
  sectionImage:string;
  eventimages:string;

  footerText:string;
  upcommingEvent:UpcommingEvent[]=[];

  constructor(private userService: UserService, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.industryForm = this.formBuilder.group({
      heading:['',Validators.required],
      description:['',Validators.required],
      Img:['',Validators.required],
      link:['',Validators.required]
    })

    if(this.userService.isLoggedIn()){
      if(this.userService.isAdmin()){
        this.router.navigate(['create']);
      }else{
        this.router.navigate(['view']);
      }
    }else{
      this.router.navigate(['login']);
    }

    this.showform=false;
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
  addSectionValue() {
    if(this.newSection.sec_heading!= null || this.sectionImage != null || this.newSection.sec_desc!=null  ||  this.newSection.sec_link!=null ){
        this.newSection.sec_img= this.sectionImage;
        this.industryWatch.push(this.newSection);
        this.sectionImage = null;
    }
      this.sectionImage="";
      this.newSection = {};
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
      save(event:any):void {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
              this.logo = event.target.result;
          }
          console.log(event.target.files[0]);
          this.logoUploader.uploadAll();
          //this.userService.uploadLogo(event.target.files[0]).subscribe(res=>console.log(res))
          reader.readAsDataURL(event.target.files[0]);
        }
      }

      uploadImgHeader(event:any):void {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
              this.backgroundimage = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
          this.headerUploader.uploadAll();
        }
      }
      industryImgHeader(event:any):void {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
               this.sectionImage = event.target.result;
            
              //this.backgroundimage = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
          this.industryUploader.uploadAll();
        }
      }

      highlightsImgHeader(event:any):void {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
               this.sectionImage = event.target.result;
            
              //this.backgroundimage = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
          this.highlightsUploader.uploadAll();
        }
      }

      eventsImgHeader(event:any):void {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.eventimages = event.target.result;
            
              //this.backgroundimage = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
          this.eventsUploader.uploadAll();
        }
      }

  get fi() { return this.industryForm.controls; }


  openIndustryModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      result.sec_img = this.sectionImage;
      this.industryWatch.push(result);
      this.sectionImage = null;
      this.sectionImage="";
      this.newSection = {};
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openHighlightsModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      if(this.sectionImage!= null || this.newhighlight.hlightDesc!= null ){
        this.newhighlight.hlightImages = this.sectionImage;
       this.highlights.push(this.newhighlight);
       this.sectionImage=null;
      }
 
     this.newhighlight = {};
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEventsModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.newevent.eimage= this.eventimages;
      this.newevent.efromdate= this.months[this.model.beginDate.month]+" "+ this.model.beginDate.day + " - "+this.model.endDate.day+","+this.model.beginDate.year;
      this.upcommingEvent.push(this.newevent);
      this.newevent = {};
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  removeSectionValue(index) {
    this.industryWatch.splice(index, 1);
  }
  removeHighlightSectionValue(index){
    this.highlights.splice(index, 1);
  }
  removeUpcommingEvent(index){
    this.upcommingEvent.splice(index, 1);
  }
  clear(){
    this.title = null;
    this.edition = null;
    this.logo = null;
    this.backgroundimage = null;
    this.industryWatch  = [];
    this.highlights = [];
    this.upcommingEvent = [];
    this.footerText = null;

    //this.inputLogo.nativeElement.value = "";
    //this.inputHeader.nativeElement.value = "";
    this.userService.removeDirectory().subscribe(res=>{
      //console.log(res);
      this.showform=false;
    })
  }

  saveNewsletter(){
    let original = this.finalObj;

    this.userService.saveNewsletter(original).subscribe(res=>{
      //console.log(res)
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.title && this.edition){
      var date = new Date();
      this.finalObj ={
        header:{
          logo: this.logo,
          headerImg:this.backgroundimage,
          title:this.title,
          currentDate : this.months[date.getMonth()] + '  ' + date.getFullYear(),
          edition:this.edition,
        },
        
  
        industryWatch:this.industryWatch,
        highlights:this.highlights,
        UpcommingEvents:this.upcommingEvent,
    
  
        footerText:this.footerText
      }
       this.showform=true;
    }

  }

}
