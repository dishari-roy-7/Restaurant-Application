import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../Admin';
import { RouterOutlet } from '@angular/router';
import { catchError } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HttpClientModule, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  Admin: Admin={
    username:"",
    password:""
  };
  errorMessage: string = "";

  constructor(private http: HttpClient) { }

  Login():void{
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // This should be set on the server-side
    });
    
    this.http.post<Admin>("http://localhost:5155/api/Auth/login",this.Admin,{headers: headers}).subscribe(data => {
      window.localStorage.setItem("admin","true"); 
    window.location.pathname="/restaurants";
    
  },(error)=>{
    this.errorMessage="Wrong Username or Password";
  })
  } 
}
