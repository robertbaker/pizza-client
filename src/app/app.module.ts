import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CreatePizzaDialogComponent } from './create-pizza/create-pizza-dialog.component';
import { ManagePizzaComponent } from './manage-pizza/manage-pizza.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { ApiInterceptor } from './api-interceptor';
import { PizzaToppingsComponent } from './pizza-toppings/pizza-toppings.component';
import { NoSelectionComponent } from './no-selection/no-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateToppingComponent } from './create-topping/create-topping.component';
import { PizzaListComponent } from './pizza/pizza-list.component';
import { CreateToppingDialogComponent } from './create-topping/create-topping-dialog.component';
import { PizzaResolver } from './pizza/pizza.resolver';
import { ToppingListResolver } from './topping/topping-list.resolver';
import { SaveToppingsComponent } from './save-toppings/save-toppings.component';
import { ToppingListComponent } from './topping/topping-list.component';
import { DeleteToppingComponent } from './delete-topping/delete-topping.component';
import { DeletePizzaComponent } from './delete-pizza/delete-pizza.component';
import { PizzaToppingsResolver } from './pizza-toppings/pizza-toppings.resolver';
import { PizzaListResolver } from './pizza/pizza-list.resolver';

@NgModule({
  entryComponents: [CreatePizzaDialogComponent, CreateToppingDialogComponent],
  declarations: [
    AppComponent,
    PizzaListComponent,
    ManagePizzaComponent,
    CreatePizzaComponent,
    PizzaToppingsComponent,
    NoSelectionComponent,
    CreateToppingComponent,
    CreatePizzaDialogComponent,
    CreateToppingDialogComponent,
    SaveToppingsComponent,
    ToppingListComponent,
    DeleteToppingComponent,
    DeletePizzaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    PizzaResolver,
    ToppingListResolver,
    PizzaToppingsResolver,
    PizzaListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
