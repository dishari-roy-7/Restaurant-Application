import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Irestaurants } from '../Irestaurants';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DishesComponent } from '../dishes/dishes.component';
import { IaddRestaurants } from '../IaddRestaurants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-restaurants',
  imports: [NavbarComponent, FooterComponent, DishesComponent, FormsModule, CommonModule, RouterModule],
  standalone:true,
  styleUrls: ['./restaurants.component.css'], 
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent  {
  restaurants: Observable<Irestaurants[]>;
  private baseUrl = 'http://localhost:5155/api/restaurants';
  viewPopup = false;
  viewPopupCreate = false;

  AddData : IaddRestaurants ={
      rest_Name:"",
      address:"",
      contact:"",
      rating:0
  };
  EditData : Irestaurants ={
      rest_Id:0,
      rest_Name:"",
      address:"",
      contact:"",
      rating:0
  
  };
  constructor(private http: HttpClient) {
    this.restaurants = this.http.get<Irestaurants[]>(this.baseUrl); 
  }

  
  openViewPopup() {
    this.viewPopupCreate = true;
  }
  closeCreateDialog() {
    this.viewPopupCreate = false;
  }
  addRestaurant() {
    console.log(this.AddData)
    this.http.post<Irestaurants>(this.baseUrl, this.AddData).subscribe((data)=> console.log(data));
    this.viewPopupCreate = false;
  }
  setEdit(id:number,item:Irestaurants){
    this.EditData.rest_Id=id;
    this.EditData=item;
    this.viewPopup = true;
  }
  editRestaurant() {
     this.http.put<Irestaurants>(`${this.baseUrl}/${this.EditData.rest_Id}`, this.EditData);
  }

  deleteRestaurant(rest_Id: number) {
    
    this.http.delete<Irestaurants>(`${this.baseUrl}/${rest_Id}`).subscribe((data)=> window.location.reload());
  }

  Search(value:string){
    if(value==""){
      this.restaurants=this.http.get<Irestaurants[]>('http://localhost:5155/api/restaurants');
    }
    else{
      this.restaurants=this.http.get<Irestaurants[]>(`http://localhost:5155/api/restaurants/byname?name=${value}`);
      
    }
  }

  closePopup() {
      this.viewPopup = false;
  }

  // innerClick(event: MouseEvent) {
  //   event.stopPropagation();
  // }

  editSubmit() {
    // write 
    this.http.put<Irestaurants>(`${this.baseUrl}/${this.EditData.rest_Id}`, this.EditData).subscribe((data)=>{ window.location.reload()});
  
    this.viewPopup = false;
  }

  // ngOnInit(): void {
  //   this.loadRestaurants();
  // }

  // loadRestaurants() {
  //   // Fetch restaurants from API
  // }
}
