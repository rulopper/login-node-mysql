//Modulos requeridos
const express = require('express');
const bcrypt = require('bcrypt');
const mysqlConnection = require('../database/database');

const app = express();

app.get('/usuario', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    //console.log(body.id_usuario, body.nombre, body.email, body.pass);
    const sql = `
        SET @id_usuario = ?; 
        SET @nombre=?; 
        SET @email=?; 
        SET @pass=?; 
        CALL userAddOrEdit(@id_usuario, @nombre, @email, @pass);
        `;
    mysqlConnection.query(sql, [body.id_usuario, body.nombre, body.email, bcrypt.hashSync(body.pass, 10)], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'ok, saved'
            });
        } else {
            console.log(object);
        }
    });
});

app.put('/usuario:id_usuario', (req, res) => {
    let { nombre, email, pass } = req.body;
    let id_usuario = req.params.id_usuario;
    console.log(id_usuario, nombre, email, pass);
    const sql = `
        SET @id_usuario = ?; 
        SET @nombre=?; 
        SET @email=?; 
        SET @pass=?; 
        CALL userAddOrEdit(@id_usuario, @nombre, @email, @pass);
        `;
    mysqlConnection.query(sql, [id_usuario, nombre, email, pass], (err, rows, fields) => {
        if (!err) {
            res.json({
                Status: 'ok, updated'
            });
        } else {
            console.log(err);
        }
    });
});


module.exports = app;