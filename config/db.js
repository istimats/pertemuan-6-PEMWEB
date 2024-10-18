const mysql = require('mysql'); 


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'pemweb6'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
}); 

module.exports = db;