import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ngOnInit(): void {
    let actualURL = this.router.parseUrl(this.router.url);
    let lang = actualURL.queryParamMap.get('lang');
    if(lang=="es"){
      this.setSpanish() 
    }
  }

  constructor(private router:Router){}
 
  goToMenu(paramName: string): void {
    const sanitizedParamName = encodeURIComponent(paramName.toLowerCase().replace(/\s+/g, '-'));  
    let actualURL = this.router.parseUrl(this.router.url);
    let newURL = this.router.createUrlTree([sanitizedParamName]);
    newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
    this.router.navigateByUrl(newURL);
  }
  
  goToBlog(paramName:string):void{
    const sanitizedParamName = encodeURIComponent(paramName.toLowerCase().replace(/\s+/g, '-'));  
    let actualURL = this.router.parseUrl(this.router.url);
    let newURL = this.router.createUrlTree(['case', sanitizedParamName]);
    newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
    this.router.navigateByUrl(newURL); 
  }

  setSpanish(){
    document.querySelectorAll('.case').forEach(p => p.innerHTML = "Caso de estudio")
    document.querySelectorAll('.more').forEach(p => p.innerHTML = "Ver más" )
    document.getElementById("case1")!.innerText = "Bienes raíces en Ames Iowa";
    document.getElementById("case2")!.innerText = "Enfermedad cardíaca";
    document.getElementById("case3")!.innerText = "Segmentación de clientes";
    document.getElementById("title11")!.innerText = "Preparación de datos";
    document.getElementById("title12")!.innerText = "Proyectos con missing values, outliers, transformaciones, selección de atributos, etc.";
    document.getElementById("title13")!.innerText = "Algoritmos lineales";
    document.getElementById("title14")!.innerText = "Ejercicios con Regresión Lineal, Regresión Logística y Linear Discriminant Analysis.";
    document.getElementById("title15")!.innerText = "Algoritmos no lineales";
    document.getElementById("title16")!.innerText = "Problemas con Árboles de Decisión, Naive Bayes, Support Vector Machines y K-Nearest Neighbors.";
    document.getElementById("title17")!.innerText = "No supervisado";
    document.getElementById("title18")!.innerText = "Estudios con métodos de clustering y Principal Component Analysis.";
    document.getElementById("title19")!.innerText = "Ensambles";
    document.getElementById("title110")!.innerText = "Análisis de algoritmos Bagging, Random Forest, Boosting y Ada Boost.";
  }  
}
