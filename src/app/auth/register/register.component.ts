import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor( private fb: FormBuilder,
               private authServices: AuthService,
               private router: Router) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  crearUsuario(){

    const { nombre, correo, password } = this.registroForm.value

    this.authServices.crearUsuario( nombre, correo, password)
      .then( credenciales => {
        console.log(credenciales);
        this.router.navigateByUrl('/')
      } )
      .catch( err => console.error(err))
  }
}
