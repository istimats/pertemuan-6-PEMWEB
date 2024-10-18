const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');
//halaman register
router.get ('/register', (req, res) => {
    res.render('register');
});
//registrasi akun
router.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query,[username, email, hashPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/auth/login');
    });
});
//halaman login
router.get('/login', (req, res) => {
    res.render('login');
});
//login akun
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect('/auth/profil');   
            } else {
                res.send('Password yang anda masukkan salah!');
            }
        }else{
            res.send('username tidak ditemukan!');
        }
    });    
});
//halaman profil user

router.get('/profil', (req, res) => {
    if (req.session.user) {
        res.render('profil', {user: req.session.user});
    } else {
        res.send('anda harus login terlebih dahulu');
        res.redirect('/auth/login');
    }
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
})
module.exports = router;