import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  item: any;
  private urlAPi = 'http://localhost:3000/';
  private urlAPi2 = 'http://192.168.100.5:3000/';
  
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    let url = this.urlAPi2 + "usuarios/";
    this.listado=[];
    return new Promise((resolve, reject) => {
      this.httpClient.get<[]>(url).subscribe((data: []) => {
        resolve(data);
        data.forEach(item => { this.listado.push(item);})
      },
      error =>
      {
        console.log("Error en la comunicación con la API " + this.listado);
      });
    });
  }

  async getUserId(id:String){
    let url = this.urlAPi2 + "usuarios/" + id;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API" + this.item);
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
        console.log("Error en la comunicación con la API" + this.item );
      });
    });
  }

  async addAsistencia(sigla:String, seccion:String, usuarioId:String, fecha:String){
    const url = this.urlAPi2 + "asistencias?usuario=" + usuarioId;
    const texto = {
      sigla,
      seccion,
      usuarioId,
      fecha
    }
    return new Promise((resolve, reject) => {
      this.httpClient.post(url,texto).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API" + this.item );
        reject(error);
      });
    });
  }

  
  getAsignaturas(){
    let url = this.urlAPi2 + "asignaturas/";
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
    let url = this.urlAPi2 + "asignaturas?sigla=" + sigla + "&seccion=" + seccion;
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
    let url = this.urlAPi2 + "horario?id=" + id;
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API" + this.item  );
      });
    });
  }

  async modClave(clave:string, user:any){
    const url = this.urlAPi2 + "usuarios/" + user["id"]
    console.log(url)
    user.password = clave;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url,user).subscribe((data: any) => {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en la comunicación con la API" + this.item );
        reject(error);
      });
    });
  }
}
