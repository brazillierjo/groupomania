const sql = require('../mysql');
const fs = require('fs');

exports.createPosts = (req, res, next) => {
    if (req.method == "POST") {
        let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.name}`;
        console.log('imageUrl ' + imageUrl);

        let token_user = req.params.token_user;
        let content = req.body.content;
        let postSQL = `INSERT INTO posts (imageUrl, content, token_user, post_create) VALUES ('${imageUrl}', '${content}', '${token_user}', NOW());`;
        sql.query(postSQL, function (err, result) {
            if (result) {
                res.status(200).json({ message: "La publication a bien été postée !" })
            } else {
                res.status(401).json({ message: "La publication n'a pas été postée !" })
            }
        })
    }
};

exports.getAllPosts = (req, res, next) => {
    if (req.method == "GET") {
        let allPostReq = `SELECT users.first_name, users.last_name, posts.post_create, posts.content, posts.imageUrl, posts.id FROM posts INNER JOIN users ON posts.token_user = users.token_user;`;
        sql.query(allPostReq, function (err, result) {
            if (result.length > 0) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ message: "Aucun post a été trouvé !" })
            }
        })
    }
};

exports.getOnePosts = (req, res, next) => {
    if (req.method == "GET") {
        let token_user = req.params.token_user;
        let onePostsReq = `SELECT users.first_name, users.last_name, posts.post_create, posts.content, posts.id FROM posts INNER JOIN users ON posts.token_user = users.token_user WHERE users.token_user = '${token_user}';`;
        sql.query(onePostsReq, function (err, result) {
            if (result.length > 0) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ message: "Aucun post a été trouvé !" })
            }
        })
    }
};

exports.modifyPosts = (req, res, next) => {
    if (req.method == "PUT") {
        let modifyContent = req.body.content;
        let post_id = req.params.post_id;
        let SQLModify = `UPDATE posts SET content = '${modifyContent}' WHERE id = '${post_id}'`;
        sql.query(SQLModify, function (err, result) {
            if (result) {
                return res.status(200).json({ message: 'Publication bien modifiée !' })
            } else {
                return res.status(403).json({ message: "Modification non apportée !" })
            }
        })
    }
};

exports.deletePosts = (req, res, next) => {
    if (req.method == "DELETE") {
        let post_id = req.params.post_id;
        let token_user = req.params.token_user;
        let SQLDrop = `DELETE FROM posts WHERE token_user = ${token_user} AND id = '${post_id}'`;
        sql.query(SQLDrop, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Publication bien suprimée !" })
            } else {
                return res.status(403).json({ message: "Modification non supprimée !" })
            }
        })
    }
};

exports.getAllcomments = (req, res, next) => {
    if (req.method == "GET") {
        let post_id = req.params.id;
        let displayComments = `SELECT comments.content, comments.date_comment, users.first_name, users.last_name FROM comments INNER JOIN users ON comments.token_user = users.token_user WHERE post_id = ${post_id};`
        sql.query(displayComments, function (err, result) {
            if (result) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.postComments = (req, res, next) => {
    if (req.method == "POST") {
        let token_user = req.params.token_user;
        let post_id = req.params.id;
        let postContent = req.body.content;
        let SQLComments = `INSERT INTO comments (content, post_id, token_user, date_comment) VALUES ('${postContent}', '${post_id}','${token_user}', NOW());`;
        sql.query(SQLComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien publié !" })
            } else {
                return res.status(403).json({ message: err })
            }
        })
    }
};

exports.modifyComments = (req, res, next) => { // A finir
    if (req.method == "PUT") {
        let token_user = req.params.token_user;
        let post_id = req.body.id;
        let id = req.body.id;
        let postContent = req.body.content;
        let SQLModifyComments = `UPDATE comments SET content = '${postContent}', post_id = '${post_id}', token_user = '${token_user}', date_comment = NOW() WHERE id = '${id}'`;
        sql.query(SQLModifyComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien modifié !" })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.deleteComments = (req, res, next) => { // A finir
    if (req.method == "DELETE") {
        let idComments = req.body.commentId;
        let SQLDeleteComments = `DELETE FROM comments WHERE id = '${idComments}'`;
        sql.query(SQLDeleteComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien publié !" })
            } else {
                return res.status(403).json({ message: "Erreur dans la publication du commentaire !" })
            }
        })
    }
};

exports.postLikes = (req, res, next) => { // A finir
    if (req.method == "POST") {
        let bodyId = req.body.user_id;
        let postId = req.params.id;
        let ifExist = `SELECT IF (EXISTS (SELECT * FROM likes WHERE user_id = ${bodyId} AND post_id = ${postId}) 1, 0)`;
        sql.query(ifExist, function (err, result) {
            switch (result) {
                case 0:
                    console.log(result + ' 0')
                    let addLike = `INSERT INTO likes (user_id, post_id) VALUES (${bodyId}, ${postId})`;
                    sql.query(addLike, function (err, result) {
                        if (result) {
                            return res.status(200).json({ message: "Like bien ajouté !" })
                        } else {
                            return res.status(403).json({ message: "Erreur dans l'ajout du like !" })
                        }
                    })
                case 1:
                    console.log(result + ' 1')

                default:
                    console.log(result + ' default')
                    return res.status(404).json({ message: 'Erreur !' })
            }
        })
    }
};