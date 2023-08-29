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

  public ArticlesList:{unidad:string, unit:string, titulo:string, title:string, descripcion:string, description:string, contenido:string, content:string}[] = articles;
  
  ngOnInit(): void {
    var i=0;
    let description: string;
    let content: string;
    let list;
    let tags;
    let sch
    let titleEle = document.getElementById("name")!;
    let subEle = document.getElementById("sub")!;
    let descriptionEle = document.getElementById("description")!;
    let div = document.getElementById("post")!;
    let routeParams = this.route.snapshot.paramMap;
    let menuName = routeParams.get('idMenu');
    let auxMenuName = menuName;
    let taskName = routeParams.get('idBlog');
    var router = this.router;
    let actualURL = this.router.parseUrl(this.router.url);
    let lang = actualURL.queryParamMap.get('lang');
    const articlesCopy = this.ArticlesList
      .filter(article => article && article.unit && article.title)
      .map(article => ({
        ...article,
        sanitizedUnit: encodeURIComponent(article.unit.toLowerCase().replace(/\s+/g, '-')),
        sanitizedTitle: encodeURIComponent(article.title.toLowerCase().replace(/\s+/g, '-'))
      }));
    sch = articlesCopy.find(obj => obj.sanitizedUnit === menuName && obj.sanitizedTitle === taskName);
    if(lang=="en"){
      auxMenuName = sch!.unit!;
      taskName = sch!.title!;
      description = sch!.description!;
      content = sch!.content!;
    }
    if(lang=="es"){
      auxMenuName = sch!.unidad!;
      taskName = sch!.titulo!;
      description =sch!.descripcion!;
      content = sch!.contenido!;
    }
    if((menuName!="caso") && (menuName!="case")){
      titleEle.innerText = auxMenuName!;
      if (window.matchMedia("(min-width: 768px)").matches){
        titleEle.style.fontSize = "medium"
      }else{
        titleEle.style.fontSize = "small"
      }
      titleEle.style.color = "white"
      titleEle.addEventListener("click", function(){
        router.navigate(["menu", menuName]);
        let actualURL = router.parseUrl(router.url);
        let newURL = router.createUrlTree([menuName]);
        newURL.queryParams['lang'] = actualURL.queryParamMap.get('lang');
        router.navigateByUrl(newURL);
      });
    }
    subEle.innerText = taskName!;
    subEle.style.color = "white"
    subEle.style.marginTop = "1rem"
    subEle.style.fontWeight = "700"
    if (window.matchMedia("(min-width: 768px)").matches){
      subEle.style.fontSize = "xxx-large"
    }else{
      subEle.style.fontSize = "x-large"
    }
    descriptionEle.innerText = description!;
    if (window.matchMedia("(min-width: 768px)").matches){
      descriptionEle.style.fontSize = "medium"
    }else{
      descriptionEle.style.fontSize = "small"
    }
    list = content!.split("=,=");
    while(i < list.length){ 
      let ele;
      tags = list[i].split(">>").map(x => x.trim());
      ele = document.createElement(tags[0]);
      switch(tags[0]){
        case "p":
          ele.setAttribute("align","justify");
          ele.textContent = tags[1];
          ele.style.color = "white"
          if (window.matchMedia("(min-width: 768px)").matches){
            ele.style.fontSize = "medium"
          }else{
            ele.style.fontSize = "small"
          }
          break; 
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          ele.textContent = tags[1];
          ele.style.color = "white"
          break; 
        case "code":
          ele.textContent= tags[1].substring(1);
          ele.setAttribute('class', "python");
          ele.style.color = "pink"
          if (window.matchMedia("(min-width: 768px)").matches){
            ele.style.fontSize = "medium"
          }else{
            ele.style.fontSize = "x-small"
          }
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
          if (window.matchMedia("(min-width: 768px)").matches){
            ele.style.fontSize = "medium"
          }else{
            ele.style.fontSize = "small"
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
          ele.setAttribute('height', 'auto');
          break;
      } 
      div.appendChild(ele);  
      i++;
    }
  }
  
}
