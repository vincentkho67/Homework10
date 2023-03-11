const pool = require("../config/config")
const UserService = require("../services/userService")

class User {
    static getUser = async (next) => {

        const findQuery = `
            SELECT
                *
            FROM users;
        `
        try {
            const data = await pool.query(findQuery)

            return data.rows
        } catch(err) {
            next(err)

        }
    } 

    static findById = async (id, next) => {


        const findQuery = `
            SELECT
                *   
            FROM users
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
    }

    static createUser = async (params, next) => {
        try{
            const insertQuery = `
                INSERT INTO movies (id, email, gender, password ,role)
                    VALUES
                        ($1, $2, $3, $4, $5)
                RETURNING *
            `

            const data = await pool.query(insertQuery, [id, email, gender, password, role])

            
            return data.rows[0];

        } catch(err) {
            next(err)
        }
    }

    static updateMovie = async (id, params, next) => {
        try {
          const updateQuery = `
            UPDATE users
            SET email = $1,
                gender = $2,
                password = $3,
                role = $4,
            WHERE id = $5
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

    static deleteUser = async (id, next) => {
        try {
            const deleteQuery = `
            DELETE FROM users 
            WHERE id = $1
            RETURNING *
            `
            const data = await pool.query(deleteQuery, [id])
            return data.rows[0]

        } catch(err) {
            next(err)
        }
    }
}

module.exports = User;