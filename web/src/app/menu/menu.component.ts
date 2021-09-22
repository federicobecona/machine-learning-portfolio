import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    ngOnInit(): void {
  }

  constructor(private router:Router){}

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
