import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario( nombre: string, correo: string, password:string ){

    // console.log({nombre, correo, password});

    return this.auth.createUserWithEmailAndPassword(correo, password);
  }

  logInUsuario( correo: string, password:string ){

    // console.log({nombre, password});

    return this.auth.signInWithEmailAndPassword(correo, password);
  }

}
