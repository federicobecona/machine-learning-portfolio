import { Component, OnInit } from '@angular/core';
import menus from 'src/assets/menus.json';
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
  
  public MenusList:{titulo:string, contenido:string}[] = menus;


  ngOnInit(): void {
    var i=0;
    let title;
    let content;
    var list;
    let routeParams = this.route.snapshot.paramMap;
    var menuName = routeParams.get('idMenu')
    let titleEle = document.getElementById("name")!;
    let div = document.getElementById("menus")!;
    var router = this.router;
    title = this.MenusList.find(obj => obj.titulo === menuName)?.titulo!;
    content = this.MenusList.find(obj => obj.titulo === menuName)?.contenido!;
    titleEle.innerText = title;
    list = content.split(">>").map(x => x.trim());
    while(i < list.length){
      let sub_div;
      let title;
      let button;
      let blogName = list[i];
      sub_div = document.createElement('div');
      sub_div.setAttribute('class', "col-lg-4");
      title = document.createElement('h2');
      title.textContent = list[i];
      button = document.createElement('button');
      button.textContent = "Ver más";
      button.setAttribute('class',"btn btn-primary");
      button.addEventListener("click", function(){router.navigate(["blog", menuName, blogName]);});
      sub_div.appendChild(title);  
      sub_div.appendChild(button);
      div.appendChild(sub_div);
      i++;
    }
  }
}
  