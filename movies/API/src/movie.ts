import mongoose, { Schema, Document } from 'mongoose';

export interface Movie extends Document {
  title: string;
  director: string;
  year: number;
  duration: number;
}

const movieSchema = new Schema<Movie>({
  title: { type: String, required: false },
  director: { type: String, required: false },
  year: { type: Number, required: false },
  duration: { type: Number, required: false },
});


const MovieModel = mongoose.model<Movie>('Movie', movieSchema);

export default MovieModel;