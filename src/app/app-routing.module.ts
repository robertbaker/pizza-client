import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePizzaComponent } from './manage-pizza/manage-pizza.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { CreateToppingComponent } from './create-topping/create-topping.component';
import { PizzaListComponent } from './pizza/pizza-list.component';
import { PizzaToppingsComponent } from './pizza-toppings/pizza-toppings.component';
import { PizzaResolver } from './pizza/pizza.resolver';
import { ToppingListResolver } from './topping/topping-list.resolver';
import { PizzaToppingsResolver } from './pizza-toppings/pizza-toppings.resolver';
import { NoSelectionComponent } from './no-selection/no-selection.component';
import { AppComponent } from './app.component';
import { CreatePizzaDialogComponent } from './create-pizza/create-pizza-dialog.component';
import { CreateToppingDialogComponent } from './create-topping/create-topping-dialog.component';
import { ToppingListComponent } from './topping/topping-list.component';
import { SaveToppingsComponent } from './save-toppings/save-toppings.component';
import { DeleteToppingComponent } from './delete-topping/delete-topping.component';
import { DeletePizzaComponent } from './delete-pizza/delete-pizza.component';
import { PizzaListResolver } from './pizza/pizza-list.resolver';

// const routes: Routes = [
//   {
//     path: 'pizza',
//     pathMatch: 'full',
//     component: ManagePizzaComponent,
//     resolve: {
//       pizzas: PizzaResolver,
//       toppings: ToppingsResolver
//     }
//   },
//   {
//     path: 'pizza/:id',
//     pathMatch: 'full',
//     component: ManagePizzaComponent,
//     runGuardsAndResolvers: 'always',
//     resolve: {
//       pizzas: PizzaResolver,
//       toppings: ToppingsResolver,
//       selectedToppings: PizzaToppingsResolver
//     }
//   },
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'pizza'
//   }
// ];

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pizza'
  },
  {
    path: 'pizza',
    component: ManagePizzaComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      pizzas: PizzaListResolver
    },
    children: [
      {
        runGuardsAndResolvers: 'always',
        path: '',
        component: PizzaListComponent,
        outlet: 'list'
      },
      {
        path: ':id',
        component: PizzaToppingsComponent,
        outlet: 'detail',
        runGuardsAndResolvers: 'always',
        resolve: {
          selectedPizza: PizzaResolver,
          selectedToppings: PizzaToppingsResolver,
          toppings: ToppingListResolver
        }
      },
      {
        path: '',
        component: NoSelectionComponent,
        outlet: 'detail'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
