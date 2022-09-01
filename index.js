const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host :"43.200.206.77",
    //port:3306이 생략되어있다.
    user : 'hun',
    password :"",
    database :'jony',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

module.exports ={pool};

//외부에서 받아올때는 const{pool} = require("./db/index.js")

//modul.exports = pool;
//외부에서 받아올때 const pool = require("./db/index.js")
