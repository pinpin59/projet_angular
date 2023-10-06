import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie.interface';


@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  private apiUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) {}

  addMovie(movieData: any): Observable<number> {
    const url = `${this.apiUrl}/add`; 
    return this.http.post<number>(url, movieData);
  }

  getMovies(): Observable<Movie[]>{
    const url = `${this.apiUrl}/all`;
    return this.http.get<Movie[]>(url)
  }

  deleteMovie(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

  editMovie(data: Movie): Observable<Movie> {
    const url = `${this.apiUrl}/edit/${data._id}/${data.title}/${data.director}/${data.year}/${data.duration}`;
    return this.http.put<Movie>(url, data);
  }

}
