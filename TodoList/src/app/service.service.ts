import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Events } from './model/Event';
import { comments } from './model/comments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get<Events[]>("http://localhost:8080/api/retrieve/all");
  }
  saveProduct(comment:comments):
Observable<Object>{
return this.http.post('http://localhost:8090/comment/create',
comment);
}
updateProduct(product: Events): Observable<Object> {
  return this.http.put("http://localhost:8080/api/update", product);
}
getProductById(id: number): Observable<Events> {
  return this.http.get<Events>(`http://localhost:8080/api/retrieve/${id}`);
}
}
