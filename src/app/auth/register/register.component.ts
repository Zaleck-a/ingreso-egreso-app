import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from './../../shared/ui.actions';

import Swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription

  constructor( private fb: FormBuilder,
               private authServices: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui')
                          .subscribe( ui => {
                            this.cargando = ui.isLoading;
                            console.log('cargando subs');
                          })
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }



  crearUsuario(){


    if(this.registroForm.invalid){ return; }
    this.store.dispatch(ui.isLoading());
    /* Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */

    const { nombre, correo, password } = this.registroForm.value

    this.authServices.crearUsuario( nombre, correo, password)
      .then( credenciales => {
        console.log(credenciales);
        /* Swal.close(); */
        this.router.navigateByUrl('/')
        this.store.dispatch(ui.stopLoading());
      } )
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }
}
