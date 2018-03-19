import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePizzaComponent } from './manage-pizza/manage-pizza.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { CreateToppingComponent } from './create-topping/create-topping.component';

const routes: Routes = [
  // {

  //   path: 'portfolio',
  //   loadChildren: 'app/pizza/portfolio.module#PortfolioModule',
  //   data: { preload: false }
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pizza'
  },
  {
    path: 'pizza',
    pathMatch: 'full',
    component: ManagePizzaComponent,
    data: { preload: true }
  },
  {
    path: 'pizza/:id',
    pathMatch: 'full',
    component: ManagePizzaComponent,
    data: { preload: true }
  },
  {
    path: 'create/pizza',
    pathMatch: 'full',
    component: ManagePizzaComponent,
    data: { preload: true }
  },
  {
    path: 'create/topping',
    pathMatch: 'full',
    component: CreateToppingComponent,
    data: { preload: true }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
