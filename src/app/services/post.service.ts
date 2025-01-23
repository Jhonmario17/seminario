import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { accessibilitySharp } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json' })};

  constructor(
    private http: HttpClient
  ) { }
  getPosts(){
    return new Promise ((accept, reject) =>{
      this.http.get(`${this.urlServer}/posts`, this.httpHeaders).subscribe(
        (data: any) =>{
          accept(data);
        },
        (error) => {
          console.log(error);
          if (error.status == 422 ){
            reject('Usuario o contraseña incorrectos');
          }else{
            reject('Error al obtener los posts');
          }  
        }
      )
    });
  }
}
