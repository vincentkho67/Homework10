const pool = require("../config/config");
const MovieService = require("../services/movieServices");

class Movie {
    static getMovies = async (next) => {

        const findQuery = `
            SELECT
                *
            FROM movies;
        `
        try {
            const data = await pool.query(findQuery)

            return data.rows
        } catch(err) {
            next(err)

        }
    } ;

    static findById = async (id, next) => {


        const findQuery = `
            SELECT
                *   
            FROM movies
            WHERE id = $1
            ;`
        try {
            const data = await pool.query(findQuery, [id]);
            
            if(data.rows.length === 0) {
                next({name: "ErrorNotFound"})
            } else {
                return data.rows[0];
            }

        } catch(err) {
            next(err)

        }
    };

    static createMovie = async (params, next) => {
        try{
            const insertQuery = `
                INSERT INTO movies (id, title, genres, year)
                    VALUES
                        ($1, $2, $3, $4)
                RETURNING *
            `

            const data = await pool.query(insertQuery, [title, developer, year])

            
            return data.rows[0];

        } catch(err) {
            next(err)
        }
    };

    static updateMovie = async (id, params, next) => {
        try {
          const updateQuery = `
            UPDATE movies
            SET title = $1,
                genres = $2,
                year = $3
            WHERE id = $4
            RETURNING *
          `;
          const data = await pool.query(updateQuery, [
            params.title,
            params.genres,
            params.year,
            id,
          ]);
          if (data.rows.length === 0) {
            next({ name: "ErrorNotFound" });
          } else {
            return data.rows[0];
          }
        } catch (err) {
          next(err);
        }
    };

    static deleteMovie = async (id, next) => {
        try {
            const deleteQuery = `
            DELETE FROM movies 
            WHERE id = $1
            RETURNING *
            `
            const data = await pool.query(deleteQuery, [id])
            return data.rows[0]

        } catch(err) {
            next(err)
        }
    };
};

module.exports = Movie;