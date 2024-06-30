import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
toggleHome = false;
users : any;
constructor(private http : HttpClient){}

  ngOnInit(): void {
    this.getUsers();
  }

registerToggle(){
  this.toggleHome = !this.toggleHome;
}
getUsers(){
  const url = "https://localhost:7000/api/users"
  this.http.get(url).subscribe({
    next:res => this.users = res,
    error: error => console.log(error),
    complete : () => console.log("request completed") 
  }
  )
}
}
