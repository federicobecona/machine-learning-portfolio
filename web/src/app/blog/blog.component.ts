import { Component, OnInit } from '@angular/core';
import articles from 'src/assets/articles.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  title = 'json-file-read-angular';

  public ArticlesList:{unidad:string, titulo:string, descripcion:string, contenido:string}[] = articles;
  
  

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    var i=0;
    let title;
    let description;
    let content;
    let list;
    let tags;
    let titleEle = document.getElementById("name")!;
    let descriptionEle = document.getElementById("description")!;
    let div = document.getElementById("post")!;
    let routeParams = this.route.snapshot.paramMap;
    let menuName = routeParams.get('idMenu');
    let taskName = routeParams.get('idBlog');
    title = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.titulo!;
    description = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.descripcion!;
    content = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.contenido!;
    titleEle.innerText = menuName+", "+taskName;
    descriptionEle.innerText = description;
    list = content.split("==");
    while(i < list.length){ 
      let ele;
      tags = list[i].split(">>").map(x => x.trim());
      ele = document.createElement(tags[0]);
      switch(tags[0]){
        case "p":
        case "h1":
          ele.textContent = tags[1];
          break; 
        case "a":
          ele.innerHTML = tags[1];
          ele.setAttribute('href', tags[2]);
          break;
        case "img":
          ele.setAttribute('src',"assets/images/" +tags[1]);
          ele.setAttribute('width', tags[2]);
          ele.setAttribute('height', tags[3]);
          break;
      }
      div.appendChild(ele);  
      i++;
    }
  }
  
}
