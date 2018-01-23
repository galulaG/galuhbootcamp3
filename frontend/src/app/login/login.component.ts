import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
  }
  Login(f : NgForm) {

    let obj = {
    username : f.value.username,
    email : f.value.email,
    password : f.value.password
  }

    let header = new Headers({ "Content-Type" : "application/json" });
    let options = new RequestOptions({ headers : header });

    this.http.post("https://localhost:3000/user/login", obj, options)
    .subscribe(
      result => {
        sessionStorage.setItem("token", result.json().token) 
        //sessionStorage hanya di catch, kl browser ditutup hilang. 
        //localStorage ttp ada walau browser ditutup (simpen di cookies)
        this.route.navigate(['/main']); 
      },
      error => {
        console.log("User Not Found!")
      }
    );
  }

}
