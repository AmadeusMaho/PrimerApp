import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  item: any;
  private urlAPi = 'https://registrapp-3285b-default-rtdb.firebaseio.com/';
  private urlAPi2= 'http://192.168.100.5:3000/';
  
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    let url = this.urlAPi + "usuarios/.json";
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
    let url = this.urlAPi + "usuarios/" + id + ".json";
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

  async getAsistenciasId(usuarioId:String){
    this.listado=[];
    const url = this.urlAPi+"asistencias?usuarioId="+usuarioId + ".json";
    return new Promise((resolve, reject) => {
      this.httpClient.get<[]>(url).subscribe((data: []) => {
        resolve(data);
        data.forEach(item => { this.listado.push(item);})
      },
      error =>
      {
        console.log("Error en la comunicación con la API" + this.item);
      });
    });
  }

  async getUser(username:String){
    let url = this.urlAPi + "usuarios?username=" + username + ".json";
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
    const url = this.urlAPi + "asistencias?usuario=" + usuarioId + ".json";
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
    let url = this.urlAPi + "asignaturas/" + ".json";
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
    var rx = /[^-]*$/
    var seccion = rx.exec(sigla1)
    let url = this.urlAPi + "asignaturas?sigla=" + sigla + "&seccion=" + seccion + ".json";
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
    let url = this.urlAPi + "horario?id=" + id + ".json";
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
    const url = this.urlAPi + "usuarios/" + user["id"] + ".json";
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