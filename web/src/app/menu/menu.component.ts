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
  
  public MenusList:{titulo:string, descripcion:string, contenido:string}[] = menus;
  public DescripcionList:{unidad:string, tarea:string, descripcion:string}[] = descriptions;

  ngOnInit(): void {
    var i=0;
    var title: string;
    let description;
    let content;
    var list: string | any[];
    let routeParams = this.route.snapshot.paramMap;
    var menuName = routeParams.get('idMenu')
    let titleEle = document.getElementById("name")!;
    let descriptionEle = document.getElementById("description")!;;
    let div = document.getElementById("menus")!;
    var router = this.router;
    let menu = this.MenusList.find(obj => obj.titulo === menuName);
    title = menu?.titulo!;
    description = menu?.descripcion!;
    content = menu?.contenido!;
    titleEle.innerText = title;
    titleEle.style.fontSize="40pt"
    titleEle.style.marginBottom="20px"
    descriptionEle.innerText = description;
    list = content.split(">>").map(x => x.trim());
    while(i < list.length){
      let sub_div;
      let taskTitle;
      let button;
      let br;
      let taskDescription;
      let blogName = list[i];
      sub_div = document.createElement('div');
      sub_div.setAttribute('class', "articulo");
      sub_div.style.marginTop = "30px"
      sub_div.style.padding = "20px"
      sub_div.style.border = "solid #aeb8c2 thin"
      taskTitle = document.createElement('h4');
      taskTitle.textContent = list[i];
      taskTitle.style.color = "white";
      taskDescription = document.createElement('p');
      taskDescription.style.color = "white";
      taskDescription.textContent = this.DescripcionList.find(desc => desc.unidad==title && desc.tarea==list[i])?.descripcion!;
      taskDescription.setAttribute('align',"center");
      button = document.createElement('button');
      button.textContent = "Ver más";
      button.setAttribute('class',"btn btn-primary");
      button.addEventListener("click", function(){router.navigate(["blog", menuName, blogName]);});
      br = document.createElement("br"); 
      sub_div.appendChild(taskTitle); 
      sub_div.appendChild(taskDescription);   
      sub_div.appendChild(button);
      div.appendChild(sub_div); 
      div.appendChild(br);
      i++;
    }
  }
}
  