import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin=false;
  ngOnInit(){
    if(localStorage.length!=0)
    if(localStorage.getItem("admin")=="true"){
      this.isLogin=true;
    }
  }
  Logout(){
    localStorage.clear()
    window.location.pathname="/";
  }
}
