import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css']
})
export class NotAllowedComponent implements OnInit {

  @Input() notLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
