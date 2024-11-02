import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado: any = [];
  item: any;
  item2: any;
  private urlAPi = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    let url = this.urlAPi + "usuarios/";
    this.listado=[];
    return new Promise((resolve, reject) => {
      this.httpClient.get<[]>(url).subscribe((data: []) => {
        resolve(data);
        this.listado = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
      });
    });
  }

  async getUserId(id:String){
    let url = this.urlAPi + "usuarios/" + id;
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
    let url = this.urlAPi + "usuarios?username=" + username;
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

  getAsignaturas(){
    let url = this.urlAPi + "asignaturas/";
    this.listado=[];
    return new Promise((resolve, reject) => {
      this.httpClient.get<[]>(url).subscribe((data: []) => {
        resolve(data);
        this.listado = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API");
      });
    });
  }

  async getAsignaturasSigla(sigla1:string){
    var rx = /^[^-]*/
    var sigla = rx.exec(sigla1)
    console.log(sigla)
    var rx = /[^-]*$/
    var seccion = rx.exec(sigla1)
    console.log(seccion)
    let url = this.urlAPi + "asignaturas?sigla=" + sigla + "&seccion=" + seccion;
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

  async getHorario(id:String){
    let url = this.urlAPi + "horario?id=" + id;
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
