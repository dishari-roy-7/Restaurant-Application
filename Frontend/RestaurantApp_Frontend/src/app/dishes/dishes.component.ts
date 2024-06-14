import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Idishes } from '../Idishes';

import { Observable } from 'rxjs';
import { IaddDishes } from '../IaddDishes';
import { RouterModule } from '@angular/router';
import { RestaurantsComponent } from '../restaurants/restaurants.component';
import { Irestaurants } from '../Irestaurants';

@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FooterComponent,NavbarComponent, RouterModule, RestaurantsComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.css'
})
export class DishesComponent {

  dishes: Observable<Idishes[]> | null = null; // Initialize as null
  private baseUrl = 'http://localhost:5155/api/dishes';

  selectedRestaurantId!:number;
restaurants:Observable<Irestaurants[]>;
  viewPopupCreate = false;

  AddData : IaddDishes ={
      dish_Name:"",
      category:"",
      price:0,
      rest_Id:0
  };
  EditData : Idishes ={
    dishId:0,
    dish_Name:"",
    category:"",
    price:0,
    rest_Id:0
  };
  constructor(private http: HttpClient) {
    this.restaurants = this.http.get<Irestaurants[]>('http://localhost:5155/api/restaurants');
    //this.dishes = this.http.get<Idishes[]>(this.baseUrl); 
    this.fetchDishes();
  }
  fetchDishes() {
     // Fetch dishes for the selected restaurant if selectedRestaurantId is set
     
     if (this.selectedRestaurantId) {
      this.dishes = this.http.get<Idishes[]>(`http://localhost:5155/api/Dishes/api/dishesbyRestaurant?restId=${this.selectedRestaurantId}`);
    } else {
      // Otherwise, fetch all dishes
      this.dishes = this.http.get<Idishes[]>(this.baseUrl);
    }
  }
  

  openViewPopup() {
    this.viewPopupCreate = true;
  }
  closeCreateDialog() {
    this.viewPopupCreate = false;
  }
  
  // addDish() {
  //   alert("gygy")
  //   console.log(this.AddData)
  //   this.http.post<Idishes>(this.baseUrl, this.AddData).subscribe((data)=>{ window.location.reload()});
  // }
  // // setEdit(id:number,item:Idishes){
  // //   this.EditData.dish_Id=id;
  // //   this.EditData=item;
  // // }
  // // editDish() {
  // //    this.http.put<Idishes>(`${this.baseUrl}/${this.EditData.dish_Id}`, this.EditData);
  // // }

  // deleteDish(dish_Id: number) {
  //   this.http.delete(`${this.baseUrl}/${dish_Id}`).subscribe((data)=>{ window.location.reload()});
  // }

  addDish() {
    // Set the rest_id property of AddData to the selected restaurant ID
    this.AddData.rest_Id = this.selectedRestaurantId;
    // Send a POST request to add the dish
    this.http.post<Idishes>(this.baseUrl, this.AddData).subscribe(() => {
      // Reload dishes after successful addition
      this.fetchDishes();
      // Close the popup
      this.closeCreateDialog();
      this.AddData={
        dish_Name:"",
        category:"",
        price:0,
        rest_Id:0
      }
    });
  }

  deleteDish(dishId: number) {
    // Send a DELETE request to delete the dish
    this.http.delete(`${this.baseUrl}/${dishId}`).subscribe(() => {
      // Reload dishes after successful deletion
      this.fetchDishes();
    });
  }
}
