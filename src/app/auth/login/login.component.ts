import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authServise: AuthService,
               private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    })

  }


  logInUsuario(){

    if(this.loginForm.invalid){ return; }


    Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const { correo, password } = this.loginForm.value;

    this.authServise.logInUsuario(correo, password)
      .then( credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigateByUrl('/');

      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

}
