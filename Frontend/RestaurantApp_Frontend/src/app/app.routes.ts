import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { DishesComponent } from './dishes/dishes.component';
// import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

export const routes: Routes = [
    {path:"", pathMatch:"full", component:HomeComponent},
  /*   {path:"home", component:HomeComponent}, */
    {path:"login", component:LoginComponent},
    {path:"about", component:AboutComponent},
    {path:"contact", component:ContactComponent},
    {path:"restaurants", component:RestaurantsComponent},
    {path:"dishes", component:DishesComponent},
    // {path: "add-restaurant", component: AddRestaurantComponent}
];
