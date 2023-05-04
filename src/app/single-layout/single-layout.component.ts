import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-layout',
  templateUrl: './single-layout.component.html',
  styleUrls: ['./single-layout.component.css']
})
export class SingleLayoutComponent implements OnInit {

  dataAuth: any;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {

  }

  hideShowPass() {

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  getAuthentication(): void {
    this.http.get('http://localhost:8080').subscribe(
      (response) => {
        // Realiza una acción en consecuencia de la respuesta de la solicitud HTTP
        console.log(response);

        // Navega a la nueva página
        this.router.navigate(['/example']);
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
