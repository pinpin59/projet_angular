import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'bootstrap/dist/js/bootstrap.bundle';
import { APIServiceService } from '../api-service.service';
import { Movie } from '../movie.interface';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesData? :Movie[];
  movieForm : FormGroup;
  movieDelete? : Movie;
  waiting:boolean = false;
  movieEdit? : Movie;
  @ViewChild('movieComponent') movieComponent: MovieComponent | undefined;

  constructor(private formBuilder: FormBuilder, private apiService: APIServiceService){
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      (data) => {
        this.moviesData = data;
        console.log(this.moviesData)
      },
      (error) => {
        console.error('Erreur lors de la récupération des films :', error);
      }
    );
  }

  
  onSubmit(){
    if(this.movieForm.valid){
      const movieData = this.movieForm.value;
      console.log(this.movieForm)
      this.apiService.addMovie(movieData).subscribe(
        (movieId: number) => {
          console.log(`Film ajouté avec l'ID : ${movieId}`);
          this.apiService.getMovies().subscribe((movies) => {
            this.moviesData = movies;
          })
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du film :', error);
        }
      );
    }else{
      console.log('invalid form')
    }
  }

  //Ecouteur d'évenement pour reload les movies après suppression dans le composant enfant
  onMovieDeleted(): void {
    this.apiService.getMovies().subscribe((movies) => {
      this.moviesData = movies;
    })
  };

  addNewLine(){
    this.waiting = true;
      console.log('waiting')
        const movieData = {}
      this.apiService.addMovie(movieData).subscribe(
          (movieId: number) => {
            console.log(`Film ajouté avec l'ID : ${movieId}`);
            this.apiService.getMovies().subscribe((movies) => {
              this.apiService.getMovies().subscribe((movies) => {
                this.waiting = false;
                this.moviesData = movies;
              })
            })
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du film :', error);
          }
      );
  }
}
