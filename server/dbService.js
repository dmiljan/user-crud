const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static create(){
        return instance ? instance : new DbService();
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";

                connection.query(query, (err, results) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(results);
                })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async insertNewUser(name, title){
        // console.log(name, title)
        try{
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (name, title) VALUES (?,?);";
                connection.query(query, [name, title], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    // console.log(result);
                    resolve(result.insertId);
                })
            });
            return{ //ovdje se ovako ovo vraca jer nemam response, a mogao sam ga imati da sam dole isao resolve(result)
                id: insertId,
                name: name,
                title: title
            }
        } catch(error){
            console.log(error);
        }
    }

    async deleteRowById(id){
        id = parseInt(id, 10);
        // console.log(id);
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM users WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    // console.log(result.affectedRows);
                    resolve(result.affectedRows);
                    
                });
            })
            return response === 1 ? true : false;
        } catch(error){
            console.log(error);
            return false;
        }
    }

    async searchByName(name){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE name = ?;";
                connection.query(query, [name], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result);
                })
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }

    async updateNameById(id, name, title){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET name = ?, title = ? WHERE id = ?;";
                connection.query(query, [name, title, id], (err, result) => {
                    if(err){
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            })
            return response === 1 ? true : false;
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = DbService;