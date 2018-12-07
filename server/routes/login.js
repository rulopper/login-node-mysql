//Modulos requeridos
const express = require('express');
const bcrypt = require('bcrypt');
const mysqlConnection = require('../database/database');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    mysqlConnection.query('SELECT * FROM usuarios WHERE email = ?', [body.email], (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        console.log('Muestra:', usuarioDB[0].pass);
        console.log(body.pass);

        // if (usuarioDB.length === 0) {
        //     //console.log('Nada');
        //     return res.status(400).json({
        //         ok: false,
        //         err: {
        //             message: '(Usuario) o contraseña incorrectos'
        //         }
        //     });
        // }
        if (bcrypt.compare(body.pass, usuarioDB[0].pass)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        res.json({
            ok: true,
            message: "Acceso"
        });

    });
});

module.exports = app;