import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {

  @Input() control: FormControl;
  
  constructor() { }

  ngOnInit(): void {
  }

  showErrors() {
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }
}
