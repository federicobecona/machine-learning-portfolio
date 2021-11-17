import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'portfolio';
  
  constructor(private router:Router){
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
   };
  }

  ngOnInit(): void {
    window.addEventListener("scroll", function(){
    var header = document.querySelector("nav")!  
    header.classList.toggle("sticky-navbar", window.scrollY > 0)
})

  }

  goHome():void{
    this.router.navigate(['']);
  }

  goToMenu(paramName:string):void{
    this.router.navigate(['menu', paramName]);
  }

  goToBlog(paramName:string):void{
    this.router.navigate(['blog', 'Caso', paramName]);
  }

  
}
