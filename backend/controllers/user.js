const sql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');

exports.signup = (req, res, next) => {
    if (req.method == "POST") {
        let email = req.body.email;
        let password = req.body.password;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let token_userGen = uuidv4();

        bcrypt.hash(password, 10, function (err, hash) {
            let sqlSignup = `INSERT INTO users (email, password, first_name, last_name, token_user) VALUES ('${email}', '${hash}', '${first_name}', '${last_name}', '${token_userGen}')`;
            sql.query(sqlSignup, function (err, result) {
                if (!err) {
                    let sqlLogin = `SELECT users.email, users.password, users.id, users.token_user FROM users WHERE email = '${email}'`;
                    sql.query(sqlLogin, function (err, result) {
                        if (err) {
                            throw err;
                        }
                        if (result.length == 0) {
                            return res.status(401).json({ message: 'Aucun user trouvé !' })
                        }
                        else {
                            let hash = bcrypt.compareSync(req.body.password, result[0].password)
                            if (hash) {
                                return res.status(200).json({
                                    user_id: result[0].id,
                                    token_user: result[0].token_user,
                                    token: jwt.sign({ user_id: result[0].id },
                                        process.env.JWT_TOKEN,
                                        { expiresIn: '24h' })
                                })
                            } else {
                                return res.status(403).json({ message: 'Mauvais mot de passe !' })
                            }
                        }
                    })
                } else {
                    console.log(err)
                    res.status(401).json({ message: 'Compte utilisateur non créé !' })
                }
            })
        })
    }
}

exports.login = (req, res, next) => {
    if (req.method == "POST") {
        let email = req.body.email;
        let sqlLogin = `SELECT users.email, users.password, users.id, users.token_user FROM users WHERE email = '${email}'`;
        sql.query(sqlLogin, function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length == 0) {
                return res.status(401).json({ message: 'Aucun user trouvé !' })
            }
            else {
                let hash = bcrypt.compareSync(req.body.password, result[0].password)
                if (hash) {
                    return res.status(200).json({
                        user_id: result[0].id,
                        token_user: result[0].token_user,
                        token: jwt.sign({ user_id: result[0].id },
                            process.env.JWT_TOKEN,
                            { expiresIn: '24h' })
                    })
                } else {
                    return res.status(403).json({ message: 'Mauvais mot de passe !' })
                }
            }
        })
    }
};

exports.delete = (req, res, next) => {
    if (req.method == "DELETE") {
        let token_user = req.params.token_user;
        let deleteUser = `DELETE FROM users WHERE users.token_user = '${token_user}'`;
        sql.query(deleteUser, function (err, result) {
            console.log(result)
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "L'utilisateur a bien été supprimé !" })
            } else {
                res.status(500).json({ message: "Erreur User" })
            }
        })
    }
};

exports.modify = (req, res, next) => {
    if (req.method == "PUT") {
        let email = req.body.email;
        let firstName = req.body.first_name;
        let lastName = req.body.last_name;
        let password = req.body.password;
        let token_user = req.params.token_user

        bcrypt.hash(password, 10, function (err, hash) {
            let updateUser = `UPDATE users SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', password = '${hash}' WHERE token_user = '${token_user}';`;
            sql.query(updateUser, function (err) {
                if (!err) {
                    res.status(200).json({ message: "L'utilisateur a bien été modifié !" })
                } else {
                    res.status(401).json({ message: "Aucune modification apportée !" })
                }
            })
        })
    }
};

exports.display = (req, res, next) => {
    if (req.method == "GET") {
        let token_user = req.params.token_user;
        let displayUser = `SELECT users.email, users.first_name, users.last_name FROM users WHERE users.token_user = '${token_user}'`;
        sql.query(displayUser, function (err, result) {
            if (result.length > 0) {
                res.status(200).json({ result })
            } else {
                res.status(401).json({ message: "Erreur dans la récupération du profile !" })
            }
        })
    }
};

exports.getCurrentUser = (req, res, next) => {
    if (req.method == "GET") {
        let token_user = req.params.token_user;
        let getCurrentUser = `SELECT users.email, users.first_name, users.isAdmin, users.last_name FROM users WHERE users.token_user = '${token_user}'`;
        sql.query(getCurrentUser, function (err, result) {
            if (result.length > 0) {
                res.status(200).json({ result })
            } else {
                res.status(401).json({ message: "Erreur dans la récupération du profile !" })
            }
        })
    }
};