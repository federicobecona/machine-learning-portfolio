import { Component, OnInit } from '@angular/core';
import articles from '../../assets/articles.json';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute){ }

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
    let subEle = document.getElementById("sub")!;
    let descriptionEle = document.getElementById("description")!;
    let div = document.getElementById("post")!;
    let routeParams = this.route.snapshot.paramMap;
    let menuName = routeParams.get('idMenu');
    let taskName = routeParams.get('idBlog');
    var router = this.router;
    title = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.titulo!;
    description = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.descripcion!;
    content = this.ArticlesList.find(obj => obj.unidad === menuName && obj.titulo === taskName)?.contenido!;
    if(menuName!="Caso"){
      titleEle.innerText = menuName!;
      titleEle.style.fontSize = "1.2em"
      titleEle.style.color = "white"
      titleEle.addEventListener("click", function(){router.navigate(["menu", menuName]);});
    }
    subEle.innerText = taskName!;
    subEle.style.fontSize = "2.5rem"
    subEle.style.color = "white"
    descriptionEle.innerText = description;
    list = content.split("=,=");
    while(i < list.length){ 
      let ele;
      tags = list[i].split(">>").map(x => x.trim());
      ele = document.createElement(tags[0]);
      switch(tags[0]){
        case "p":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          ele.textContent = tags[1];
          ele.setAttribute("align","justify");
          ele.style.color = "white"
          break; 
        case "code":
          ele.textContent= tags[1].substring(1);
          ele.setAttribute('class', "python");
          ele.style.color = "pink"
          break;
        case "a":
          ele.innerHTML = tags[1];
          if(tags.length>2){
            ele.setAttribute('download', tags[2])
            ele.setAttribute('href', "assets/downloads/"+tags[2]);
            ele.style.color="skyblue"
          }else{
            ele.setAttribute('href', tags[2])
          }
          break;
        case "hr":
          ele.style.color = "white"
          break
        case "script":
          ele.setAttribute('src', tags[1])
          break;
        case "iframe":
          ele.setAttribute('src', "data:text/html;charset=utf-8,<head><base target='_blank'/></head><body><script src='https://gist.github.com/federicobecona/95ce34e328222ae483fb8d5025ea95a8.js'></script></body>")
          ele.setAttribute('width', tags[1])
          ele.setAttribute('height', tags[2])
          break;
        case "img":
          ele.setAttribute('src',"assets/images/" + tags[1]);
          ele.setAttribute('width', tags[2]);
          ele.setAttribute('height', tags[3]);
          break;
      } 
      div.appendChild(ele);  
      i++;
    }
  }
  
}
