import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }


  initAuthListener(){
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.email);
    })
  }


  crearUsuario( nombre: string, correo: string, password:string ){

    // console.log({nombre, correo, password});

    return this.auth.createUserWithEmailAndPassword(correo, password);
  }

  logInUsuario( correo: string, password:string ){

    // console.log({nombre, password});

    return this.auth.signInWithEmailAndPassword(correo, password);
  }


  logout(){
    return this.auth.signOut();
  }


  isAuth(){
    return this.auth.authState.pipe(
      map( fuser => fuser != null)
    )
  }

}
