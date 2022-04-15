import { Component, OnInit } from '@angular/core';
import menus from 'src/assets/menus.json';
import descriptions from 'src/assets/descriptions.json';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private router:Router, private route: ActivatedRoute){ }

  title = 'json-file-read-angular';
  
  public MenusList:{titulo:string, title:string, descripcion:string, description:string, contenido:string, content:string}[] = menus;
  public DescripcionList:{unidad:string, tarea:string, descripcion:string}[] = descriptions;

  ngOnInit(): void {
    var i=0;
    var title: string;
    let description : string;
    let auxContent : string;
    var list: string | any[];
    let routeParams = this.route.snapshot.paramMap;
    var menuName = routeParams.get('idMenu')
    let titleEle = document.getElementById("name")!;
    let descriptionEle = document.getElementById("description")!;;
    let div = document.getElementById("menus")!;
    var router = this.router;
    let menu = this.MenusList.find(obj => obj.titulo === menuName);
    let actualURL = this.router.parseUrl(this.router.url);
    let lang = actualURL.queryParamMap.get('lang');
    if(lang=="en"){
      title = menu?.title!;
      description = menu?.description!;
      auxContent = menu?.content!;
      list = auxContent.split(">>").map(x => x.trim());
    }
    if(lang=="es"){
      title = menu?.titulo!;
      description = menu?.descripcion!;
      auxContent = menu?.contenido!;
      list = auxContent.split(">>").map(x => x.trim());
    }
    titleEle.innerText = title!;
    titleEle.style.color = "white"
    titleEle.style.marginBottom="10px"
    titleEle.style.fontWeight = "700"
    if (window.matchMedia("(min-width: 768px)").matches){
      titleEle.style.fontSize = "xxx-large"
    }else{
      titleEle.style.fontSize = "xx-large"
    }
    descriptionEle.innerText = description!;
    if (window.matchMedia("(min-width: 768px)").matches){
      descriptionEle.style.fontSize = "medium"
    }else{
      descriptionEle.style.fontSize = "small"
    }
    while(i < list!.length){
      let sub_div;
      let taskTitle;
      let button;
      let taskDescription;
      let auxDescription;
      let blogName = list![i];
      sub_div = document.createElement('div');
      sub_div.setAttribute('class', "articulo");
      sub_div.style.marginTop = "15px"
      sub_div.style.marginBottom = "15px"
      sub_div.style.padding = "18px"
      sub_div.style.border = "solid rgba(255, 255, 255, .25) thin"
      taskTitle = document.createElement('h4');
      taskTitle.textContent = list![i];
      taskTitle.style.color = "white";
      if (window.matchMedia("(min-width: 768px)").matches){
        taskTitle.style.fontSize = "large"
      }else{
        taskTitle
      }
      taskDescription = document.createElement('p');
      taskDescription.style.color = "white";
      auxDescription = this.DescripcionList.find(desc => desc.unidad== menu?.titulo! && desc.tarea==list[i])
      taskDescription.textContent = auxDescription!.descripcion;
      taskDescription.setAttribute('align',"center");
      if (window.matchMedia("(min-width: 768px)").matches){
        taskDescription.style.fontSize = "medium"
      }else{
        taskDescription.style.fontSize = "small"
      }
      button = document.createElement('button');
      if(lang=="en"){
        button.textContent = "Show more";
      }
      if(lang=="es"){
        button.textContent = "Ver más";
      }
      button.setAttribute('class',"btn btn-primary");
      button.addEventListener("click", function(){
        let actualURL = router.parseUrl(router.url);
        let newURL = router.createUrlTree(['blog', menuName, blogName]);
        newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
        router.navigateByUrl(newURL);
      });
      sub_div.appendChild(taskTitle); 
      sub_div.appendChild(taskDescription);   
      sub_div.appendChild(button);
      div.appendChild(sub_div); 
      i++;
    }
  }
}
  