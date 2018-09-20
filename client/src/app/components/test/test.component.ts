import { Component, OnInit,Output,EventEmitter } from '@angular/core';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Output() countChanged: EventEmitter<string> = new EventEmitter();
  data:string= "sending data to parent";
  constructor() { }

  ngOnInit() {
  }

  sendData() {
   
    this.countChanged.emit(this.data);
  }

}
