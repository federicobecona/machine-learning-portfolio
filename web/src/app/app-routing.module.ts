import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent} from './menu/menu.component';
import { BlogComponent} from './blog/blog.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:':idMenu', component: MenuComponent},
  {path:':idMenu/:idBlog', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
