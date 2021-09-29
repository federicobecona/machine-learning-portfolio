import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private router:Router){}
 
  goToMenu(paramName:string):void{
    this.router.navigate(['menu', paramName]);
  }

  goToBlog(paramName:string):void{
    this.router.navigate(['blog', 'Casos', paramName]);
  }
}