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
    let actualURL = this.router.parseUrl(this.router.url);
    let lang = actualURL.queryParamMap.get('lang');
    if(lang==null){
      let newURL = this.router.createUrlTree(['']);
      newURL.queryParams['lang'] = 'en';
      this.router.navigateByUrl(newURL); 
    } 
    if(lang=="en"){
      this.setEnglish() 
    }
    if(lang=="es"){
      this.setSpanish() 
    } 
  }
  
  goHome():void{
    let actualURL = this.router.parseUrl(this.router.url);
    let newURL = this.router.createUrlTree(['']);
    newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
    this.router.navigateByUrl(newURL);
  }

  goToMenu(paramName: string): void {
    const sanitizedParamName = encodeURIComponent(paramName.toLowerCase().replace(/\s+/g, '-'));
    let actualURL = this.router.parseUrl(this.router.url);
    let newURL = this.router.createUrlTree([sanitizedParamName]);
    newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
    this.router.navigateByUrl(newURL);
  }
  

  goToBlog(paramName:string):void{
    let actualURL = this.router.parseUrl(this.router.url);
    let newURL = this.router.createUrlTree(['case', paramName]);
    newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
    this.router.navigateByUrl(newURL); 
  }

  goToEnglish(){
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['lang'] = 'en';
    this.router.navigateByUrl(urlTree); 
    this.setEnglish()
  }

  goToSpanish(){
    let urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['lang'] = 'es';
    this.router.navigateByUrl(urlTree); 
    this.setSpanish()
  }
  
  setEnglish(){
    document.getElementById("title00")!.innerText = "Home";
    document.getElementById("cases")!.innerText = "Case studies";
    document.getElementById("exercises")!.innerText = "Exercises";
    document.getElementById("title1")!.innerText = "Ames housing";
    document.getElementById("title2")!.innerText = "Heart disease";
    document.getElementById("title3")!.innerText = "Customer segmentation";
    document.getElementById("title4")!.innerText = "Data preparation";
    document.getElementById("title5")!.innerText = "Linear algorithms";
    document.getElementById("title6")!.innerText = "Non linear algorithms";
    document.getElementById("title7")!.innerText = "Unsupervised";
    document.getElementById("title8")!.innerText = "Ensembles";
  }

  setSpanish(){
    document.getElementById("title00")!.innerText = "Inicio";
    document.getElementById("cases")!.innerText = "Casos de estudio";
    document.getElementById("exercises")!.innerText = "Ejercicios";
    document.getElementById("title1")!.innerText = "Bienes raíces en Ames Iowa";
    document.getElementById("title2")!.innerText = "Enfermedad Cardíaca";
    document.getElementById("title3")!.innerText = "Segmentación de clientes";
    document.getElementById("title4")!.innerText = "Preparación de datos";
    document.getElementById("title5")!.innerText = "Algoritmos lineales";
    document.getElementById("title6")!.innerText = "Algoritmos no lineales";
    document.getElementById("title7")!.innerText = "No supervisado";
    document.getElementById("title8")!.innerText = "Ensambles";
  }
}
