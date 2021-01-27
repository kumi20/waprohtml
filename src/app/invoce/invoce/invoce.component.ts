import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoce',
  templateUrl: './invoce.component.html',
  styleUrls: ['./invoce.component.scss']
})
export class InvoceComponent implements OnInit {

  zmienna = true;
  
  constructor() { }

  ngOnInit(): void {
    console.log('tak')
  }

}
