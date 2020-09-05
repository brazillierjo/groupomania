const sql = require('../mysql');
const fs = require('fs');

exports.createPosts = (req, res, next) => {
    if (req.method == "POST") {
        let imageUrl = req.body.imageUrl;
        let content = req.body.content;
        let user_id = req.body.user_id;
        let postSQL = `INSERT INTO posts (imageUrl, content, user_id, post_create) VALUES ('${imageUrl}', '${content}', '${user_id}', NOW());`;
        sql.query(postSQL, function (err, result) {
            if (result) {
                res.status(200).json({ message: "La publication a bien été postée !" })
            } else {
                res.status(401).json({ err })
            }
        })
    }
};

exports.getAllPosts = (req, res, next) => {
    if (req.method == "GET") {
        let allPostReq = "SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id;";
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
        let onePostsReq = `SELECT * FROM posts INNER JOIN users WHERE posts.user_id = users.id;`;
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
        let postId = req.params.id;
        let SQLModify = `UPDATE posts SET content = '${modifyContent}' WHERE id = '${postId}'`;
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
        let postId = req.params.id;
        let SQLDrop = `DELETE FROM posts WHERE id = '${postId}'`;
        sql.query(SQLDrop, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Publication bien suprimée !" })
            } else {
                return res.status(403).json({ message: "Modification non supprimée !" })
            }
        })
    }
};

exports.postComments = (req, res, next) => { //erreur
    if (req.method == "POST") {
        let postContent = req.params.content;
        let user_id = req.params.user_id;
        let SQLComments = `INSERT INTO comments (content, user_id) VALUES ('${postContent}', '${user_id}', NOW());`;
        sql.query(SQLComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien publié !" })
            } else {
                return res.status(403).json({ message: "Erreur dans la publication du commentaire !" })
            }
        })
    }
};

exports.modifyComments = (req, res, next) => { //erreur
    if (req.method == "PUT") {
        let modifyComments = req.params.content;
        let user_id = req.params.user_id;
        let SQLModifyComments = `INSERT INTO comments (content, user_id) VALUES ('${postContent}', '${user_id}', NOW());`;
        sql.query(SQLModifyComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien publié !" })
            } else {
                return res.status(403).json({ message: "Erreur dans la publication du commentaire !" })
            }
        })
    }
};

exports.deleteComments = (req, res, next) => {
    if (req.method == "DELETE") {
        let idComments = req.params.commentId;
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