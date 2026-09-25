 const pool = require('../config.js/db');


async function testDatabase() {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows);
  } catch (error) {
    console.error('Database error:', error);
  }
}

testDatabase();