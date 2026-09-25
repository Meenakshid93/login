
const pool = require("../config.js/db");
const bcrypt = require("bcrypt");

exports.getUsers = async() => {
 const users = await pool.query("SELECT * FROM users");
 return users.rows;
};


exports.getUserById = async (id) =>{
 const user = await pool.query( "SELECT * FROM users WHERE id = $1",
    [id] );
      if(user.rows.length === 0){
         const error = new Error (`user not found`);
         error.statusCode = 404;
         throw error;
      }else{
         console.log(user.rows)
         return user.rows[0];
      }
   
};

exports.createEmployee = async (name, email,age) => {
   const userResult = await pool.query( "INSERT INTO users (name, email, age) VALUES ($1, $2,$3) RETURNING *",
    [name, email, age]);
      return userResult.rows[0];
};

exports.updateUser = async (name, email, age,id) => {
const updateUser = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         age =$3
     WHERE id = $4
     RETURNING *`,
    [name, email, age, id])
     return updateUser.rows[0];
}

exports.patchUser = async(name, email, age, id) => {
   const patchUser = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         age =$3
     WHERE id = $4
     RETURNING *`,
    [name, email, age, id])
     return patchUser.rows[0];
}

 exports.deleteUser = async(id) => {
   console.log(id)
   const deleteUser = await pool.query(
     `DELETE FROM users
     WHERE id = $1
     RETURNING *`,
    [id])
    console.log(deleteUser)
     return deleteUser.rows[0];
}


exports.createUsers = async(name, email, passwordData) => {

   // hashing password
  const password = await bcrypt.hash(passwordData, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, password]
  );
  return result.rows[0];
}

exports.loginUsers = async(email) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    console.log("result", result)
    return result.rows[0];
}