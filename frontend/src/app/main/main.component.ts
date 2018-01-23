import { Component, OnInit} from "@angular/core"
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  file : File;
  userList = [];

  constructor( private http : Http, private route : Router ){}

  ngOnInit(){

  const token = sessionStorage.getItem("token");
  
  if (!token){
    this.route.navigate(['/']);
    //redirect to login
  }
  else{
    console.log(token);
    let header = new Headers({ "Authorization" : "Bearer " + token});
    let options = new RequestOptions({ headers : header });

    
    this.http.post("http://localhost:3000/api/validatetoken", {}, options)
    .subscribe(
      result => {

      },
      error => {
        sessionStorage.removeItem("token");
        this.route.navigate(['/']);
        //redirect to login

      }
    )
  }

  this.loadUserList();
  }

  loadUserList(){

    let token = sessionStorage.getItem("token");
    let header = new Headers({ "Authorization" : "Bearer " + token});
    let options = new RequestOptions({ headers : header });
    

    this.http.get("http://localhost:3000/api/user", options)
    .subscribe(
      result => {
        this.userList = result.json();
      },
      error => {

      }
    );
  }
  
  fileChange($event){
    this.file = $event.target.files[0];
  }

  SaveUserData(f : NgForm){
    if( f.value.name != "" && f.value.name != null && this.file != null){


      let formData = new FormData();
      formData.append("username", f.value.username);
      formData.append("email", f.value.email);
      formData.append("password", f.value.password);
     

      let header = new Headers();
      let options = new RequestOptions({ headers : header });


      this.http.post("http://localhost:3000/api/user", formData, options)
      .subscribe(
        result => {
          console.log(result.json());
          this.loadUserList();
          f.reset();
        },
        error => {
          console.log(error);
        },
      );

    }
    else{
     console.log("error")
    }
  }


  DeleteUserData(id){
    let header = new Headers();
    let options = new RequestOptions({ headers: header });

    this.http.delete("http://localhost:3000/api/user/" + id, options)
    .subscribe(
      result => {
        this.loadUserList()
        },
      error => {
        console.log(error);
      }
    );
  }


}
