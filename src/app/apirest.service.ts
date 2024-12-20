import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  item: any;
  private urlAPi = 'http://localhost:3000/';
  private urlAPi2= 'http://192.168.100.5:3000/';
  
  constructor(private httpClient: HttpClient) { }

  getUsers(){
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    let url = this.urlAPi + "usuarios/";
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    let url = this.urlAPi + "usuarios/" + id;
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    this.listado=[];
    const url = this.urlAPi+"asistencias?usuarioId="+usuarioId;
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    let url = this.urlAPi + "usuarios?username=" + username;
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    const url = this.urlAPi + "asistencias?usuario=" + usuarioId;
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    var rx = /^[^-]*/
    var sigla = rx.exec(sigla1)
    var rx = /[^-]*$/
    var seccion = rx.exec(sigla1)
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    let url = this.urlAPi + "horario?id=" + id;
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
    const ip = sessionStorage.getItem('ip')
    if(ip){
      this.urlAPi = 'http://' + ip + ':3000/'
    }
    const url = this.urlAPi + "usuarios/" + user["id"]
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