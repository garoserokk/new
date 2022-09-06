const mysql =require("mysql2/promise");

const pool = mysql.createPool({
    host:"43.200.206.77",
    user:"hun",
    password:"woadjqtdj1!",
    database:"order_system",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

module.exports={pool}