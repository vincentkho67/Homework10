const Movie = require("../models/movie")

class MovieRepository {

    static findMovies = async (next) => {
        try {
            const data = await Movie.getMovies(next)
            return data;
        } catch {
            next(err);
        }
        
    }

    static findById = async (id, next) => {
        try {
            const data = await Movie.findById(id, next)
            return data
        } catch(err){
            next(err)
        }
    }

    static createMovie = async (params, next) => {
        try {
            const data = await Movie.createMovie(params, next);
            return data;
        } catch(err) {
            next(err);
        }
    }
    static updateMovie = async (id, params, next) => {
        try {
            const movie = await Movie.findById(id, next);
            if (!movie) {
                const err = new Error(`Movie with id ${id} not found`);
                err.status = 404;
                throw err;
            }
            Object.assign(movie, params);
            const updatedMovie = await movie.save();
            return updatedMovie;
        } catch(err) {
            next(err);
        }
    }
    static deleteMovie = async (id, next) => {
        try {
            return Movie.deleteMovie(id, next)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = MovieRepository