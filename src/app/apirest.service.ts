import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  item: any;
  private urlAPi = 'http://localhost:3000/';
  private urlAPi2 = 'https://36dc-190-114-42-245.ngrok-free.app/';
  
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    let url = this.urlAPi2 + "usuarios";
    this.listado=[];
    return new Promise((resolve, reject) => {
      this.httpClient.get<[]>(url).subscribe((data: []) => {
        resolve(data);
        data.forEach(item => { this.listado.push(item);})
      },
      error =>
      {
        console.log("Error en la comunicación con la API " + url);
      });
    });
  }

  async getUserId(id:String){
    let url = this.urlAPi2 + "usuarios" + id;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
      });
    });
  }

  async getUser(username:String){
    let url = this.urlAPi2 + "usuarios?username=" + username;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
      });
    });
  }

  async addAsistencia(sigla:String, seccion:String, usuarioId:String, fecha:Date){
    const url = this.urlAPi2 + "asistencias?usuario=" + usuarioId;
    const texto = {
      sigla,
      seccion,
      usuarioId,
      fecha: fecha.toISOString()
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post(url,texto).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
        reject(error);
      });
    });
  }

  async getAsignaturaUsuario(id:String){
    let url = this.urlAPi2 + "usuarios" + id;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
      });
    });
  }
}
