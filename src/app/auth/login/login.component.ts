import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

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

    const { correo, password } = this.loginForm.value;

    this.authServise.logInUsuario(correo, password)
      .then( credenciales => {
        console.log(credenciales);
        this.router.navigateByUrl('/');

      })
      .catch( err => console.error(err));
  }

}
