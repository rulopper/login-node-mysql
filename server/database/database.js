//Modulos requeridos
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'rulopper',
    password: 'Acceso',
    database: 'node-mysql',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Base de datos online');
    }
});

module.exports = mysqlConnection;