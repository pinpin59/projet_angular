import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../movie.interface';
import 'bootstrap/dist/js/bootstrap.bundle';
import { APIServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

enum State {
  Waiting,
  Read,
  Edit,
}
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie?: Movie;
  @Output() movieDeleted: EventEmitter<void> = new EventEmitter<void>();
  movieForm: FormGroup;
  currentMovie?: Movie;
  isShowDeleteModal:boolean = false;
  state: number = State.Read;
  waiting :boolean = false;

  constructor(private apiService : APIServiceService, private formBuilder : FormBuilder){
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
      _id: [this.movie?._id],
    });

  }

  ngOnInit(): void {
    if(this.movie){
      this.movieForm.patchValue({
        title: this.movie.title,
        director: this.movie.director,
        year: this.movie.year,
        duration: this.movie.duration,
        _id: this.movie._id
  
      });
    }
    if(!this.movie?.title){
      this.state = 4
    }
    
    
    console.log(this.movie)
    
  }

  openEditModal(){
    this.state = 2;
    
    console.log(this.state)
  }

  openDeleteModal(){
    this.isShowDeleteModal = true;
  }

  onDeleteMovie(id: string): void {
    console.log(id)
    this.state = State.Waiting; 

    this.apiService.deleteMovie(id).subscribe(() => {
      this.movieDeleted.emit(); 
      console.log(`Film ${id} supprimé`);
    });
  }

  closeEditModal(){
    this.state = 1;
    console.log(this.state)
  }
  
  closeDeleteModal(){
    this.isShowDeleteModal = false;
  }

  onEditMovie(){
    const formData = this.movieForm.value;
    console.log(formData)
    this.apiService.editMovie(formData).subscribe(
      (response) => {
        this.state = 1;
        this.movieDeleted.emit(); 
        console.log('Film édité avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de l\'édition du film', error);
      }
    );
  }

  // childFunction(){
  //   this.waiting = true;
  //   console.log('waiting')
  //     const movieData = {}
  //   this.apiService.addMovie(movieData).subscribe(
  //       (movieId: number) => {
  //         console.log(`Film ajouté avec l'ID : ${movieId}`);
  //         this.apiService.getMovies().subscribe((movies) => {
  //           this.movieDeleted.emit(); 
  //         })
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'ajout du film :', error);
  //       }
  //   );
    
  // }
}
