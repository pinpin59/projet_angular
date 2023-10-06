
import express, { Router, Request, Response } from "express";

import cors from "cors";
import MovieModel from "./movie";

const router: Router = express.Router();


// Route pour ajouter un film
router.post('/add', async (req, res) => {
    try {
      const { title, director, year, duration } = req.body;
      
      const newMovie = new MovieModel({
        title,
        director,
        year,
        duration,
      });
  
      setTimeout(async () => {
        await newMovie.save();
        res.status(201).json(newMovie);
      }, 3000); 
      
    } catch (error) {
      console.error('Erreur lors de lajout du film :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour recuperer tous les films
router.get('/all', async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour supprimer un film
router.delete('/delete/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      if (!movieId) {
        return res.status(400).json({ error: 'ID de film invalide' });
      }
      setTimeout(async () => {
        await MovieModel.findByIdAndRemove(movieId);
        res.status(204).send();
      }, 4000); 
     
    } catch (error) {
      console.error('Erreur lors de la suppression du film :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour modifier un film
router.put('/edit/:id/:title/:director/:year/:duration', async (req, res) => {
    try {
      const movieId = req.params.id;
      const {title, director, year, duration } = req.params;
  
      if (!movieId) {
        return res.status(400).json({ error: 'ID de film invalide' });
      }
  
      const movie = await MovieModel.findByIdAndUpdate(
        movieId,
        { title, director, year, duration },
        { new: true } 
      );
  
      if (!movie) {
        return res.status(404).json({ error: 'Film non trouvé' });
      }
  
      setTimeout(() => {
        res.status(200).json(movie);
    }, 2000);
    } catch (error) {
      console.error('Erreur lors de la modification du film :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
export default router;