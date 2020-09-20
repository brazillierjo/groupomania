const sql = require('../mysql');
const fs = require('fs');

exports.createPosts = (req, res, next) => {
    if (req.method == "POST") {
        console.log(req.file);
        let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        let token_user = req.params.token_user;
        let content = req.body.content;
        let postSQL = `INSERT INTO posts (imageUrl, content, token_user, post_create) VALUES ('${image}', '${content}', '${token_user}', NOW());`;
        sql.query(postSQL, function (err, result) {
            if (result) {
                res.status(200).json({ result })
            } else {
                res.status(401).json({ message: "La publication n'a pas été postée !" })
            }
        })
    }
};

exports.getAllPosts = (req, res, next) => {
    if (req.method == "GET") {
        let allPostReq = `SELECT users.first_name, users.last_name, posts.content, posts.imageUrl, posts.token_user, posts.id, posts.likes_number, posts.dislikes_number, users.isAdmin, DATE_FORMAT(posts.post_create, 'le %e %M %Y à %kh%i') AS post_create FROM posts INNER JOIN users ON posts.token_user = users.token_user ORDER BY posts.post_create DESC;`;
        sql.query(allPostReq, function (err, result) {
            if (result.length > 0) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ message: "Aucun post a été trouvé !" })
            }
        })
    }
};

exports.getPostsUser = (req, res, next) => {
    if (req.method == "GET") {
        let token_user = req.params.token_user;
        let onePostsReq = `SELECT users.first_name, users.last_name, posts.content, posts.id, posts.imageUrl, posts.token_user, posts.likes_number, users.isAdmin, posts.dislikes_number, DATE_FORMAT(posts.post_create, 'le %e %M %Y à %kh%i') AS post_create FROM posts INNER JOIN users ON posts.token_user = users.token_user WHERE users.token_user = '${token_user}' ORDER BY posts.post_create DESC;;`;
        sql.query(onePostsReq, function (err, result) {
            if (result.length > 0) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ message: "Aucun post a été trouvé !" })
            }
        })
    }
};

exports.getOnePostId = (req, res, next) => {
    if (req.method == "GET") {
        let post_id = req.params.id;
        let onePostsReq = `SELECT users.first_name, users.last_name, posts.content, posts.id, users.isAdmin, posts.imageUrl, posts.likes_number, posts.dislikes_number, DATE_FORMAT(posts.post_create, 'le %e %M %Y à %kh%i') AS post_create FROM posts INNER JOIN users ON posts.token_user = users.token_user WHERE posts.id = '${post_id}';`;
        sql.query(onePostsReq, function (err, result) {
            if (result.length > 0) {
                return res.status(200).json({ result })
            } else {
                return res.status(403).json({ message: 'Err 403' })
            }
        })
    }
};

exports.modifyPosts = (req, res, next) => {
    if (req.method == "PUT") {
        let modifyContent = req.body.content;
        let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        let post_id = req.params.id;
        let SQLModify = `UPDATE posts SET content = '${modifyContent}', imageUrl = '${image}' WHERE id = '${post_id}'`;
        sql.query(SQLModify, function (err, result) {
            if (result) {
                return res.status(200).json({ message: 'Publication bien modifiée !' })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.deletePosts = (req, res, next) => {
    if (req.method == "DELETE") {
        let post_id = req.params.id;
        let SQLDrop = `DELETE FROM posts WHERE id = '${post_id}'`;
        sql.query(SQLDrop, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Publication bien suprimée !" })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.getAllcomments = (req, res, next) => {
    if (req.method == "GET") {
        let post_id = req.params.id;
        let displayComments = `SELECT comments.content, comments.date_comment, comments.id, users.first_name, comments.token_user ,users.last_name FROM comments INNER JOIN users ON comments.token_user = users.token_user WHERE post_id = ${post_id};`
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

exports.modifyComments = (req, res, next) => {
    if (req.method == "PUT") {
        let token_user = req.params.token_user;
        let id = req.params.id;
        let postContent = req.body.content;
        let SQLModifyComments = `UPDATE comments SET content = '${postContent}', token_user = '${token_user}', date_comment = NOW() WHERE token_user = '${token_user}' AND id = '${id}'`;
        sql.query(SQLModifyComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien modifié !" })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.deleteComments = (req, res, next) => {
    if (req.method == "DELETE") {
        let idComments = req.params.id;
        let token_user = req.params.token_user;
        let SQLDeleteComments = `DELETE FROM comments WHERE token_user = '${token_user}' AND id = '${idComments}'`;
        sql.query(SQLDeleteComments, function (err, result) {
            if (result) {
                return res.status(200).json({ message: "Commentaire bien supprimé !" })
            } else {
                return res.status(403).json({ err })
            }
        })
    }
};

exports.postLikes = (req, res, next) => {
    let token_user = req.body.token_user;
    let post_id = req.params.id;
    let ifExists = " \
        SELECT IF (EXISTS (SELECT * FROM likes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'), '1', '0') \
        UNION ALL \
        SELECT IF (EXISTS (SELECT * FROM dislikes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'), '1', '0')";
    sql.query(ifExists, function (err, result) {
        var valueOne = parseInt(Object.values(result[0]))
        var valueTwo = parseInt(Object.values(result[1]))
        switch (valueOne) {
            case 0:
                let addLike = " \
                    INSERT INTO likes (token_user, post_id) VALUES ('" + token_user + "', '" + post_id + "'); \
                    UPDATE Posts SET likes_number = likes_number +1 WHERE id = '" + post_id + "' \
                ";
                sql.query(addLike, function (err, result) {
                    if (result) {
                        switch (valueTwo) {
                            case 0:
                                return res.status(200).json({ message: "Le post a bien été liké !" })
                                break
                            case 1:
                                let addLikeAndRemoveDislike = " \
                                    DELETE FROM dislikes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "';\
                                    UPDATE Posts SET dislikes_number = dislikes_number -1 WHERE id = '" + post_id + "' \
                                ";
                                sql.query(addLikeAndRemoveDislike, function (err, result) {
                                    if (result) {
                                        return res.status(200).json({ message: "Le dislike du post a bien été supprimé !" })
                                    } else {
                                        return res.status(403).json({ message: "Une erreur est survenue !" })
                                    }
                                })
                                break
                            default:
                                return res.status(404).json({ message: "Une erreur est survenue dans le cas 0 du switch !" })
                        }
                    } else {
                        return res.status(403).json({ message: "Une erreur est survenue !" })
                    }
                })
                break;
            case 1:
                let removeLike = " \
                    DELETE FROM likes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'; \
                    UPDATE Posts SET likes_number = likes_number -1 WHERE id = '" + post_id + "' \
                " ;
                sql.query(removeLike, function (err, result) {
                    if (result) {
                        return res.status(200).json({ message: "Le like a était retirer du post !" })
                    } else {
                        return res.status(403).json({ message: "Une erreur est survenue !" })
                    }
                })
                break;
            default:
                return res.status(404).json({ message: "Une erreur est survenue !" })
        }
    })
}
exports.postDislike = (req, res, next) => {
    let token_user = req.body.token_user;
    let post_id = req.params.id;
    let ifExists = " \
        SELECT IF (EXISTS (SELECT * FROM dislikes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'), '1', '0')\
        UNION ALL \
        SELECT IF (EXISTS (SELECT * FROM likes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'), '1', '0')";
    sql.query(ifExists, function (err, result) {
        var valueOne = parseInt(Object.values(result[0]))
        var valueTwo = parseInt(Object.values(result[1]))
        switch (valueOne) {
            case 0:
                let addUnlike = " \
                    INSERT INTO dislikes (token_user, post_id) VALUES ('" + token_user + "', '" + post_id + "'); \
                    UPDATE posts SET dislikes_number = dislikes_number +1 WHERE id = '" + post_id + "' \
                ";
                sql.query(addUnlike, function (err, result) {
                    if (result) {
                        switch (valueTwo) {
                            case 0:
                                return res.status(200).json({ message: "Le post a bien été disliké !" })
                                break
                            case 1:
                                let addUnlikeAndRemoveLike = " \
                                    DELETE FROM likes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "';\
                                    UPDATE posts SET likes_number = likes_number -1 WHERE id = '" + post_id + "' \
                                ";
                                sql.query(addUnlikeAndRemoveLike, function (err, result) {
                                    if (result) {
                                        return res.status(200).json({ message: "Le like du post a bien été supprimé !" })
                                    } else {
                                        return res.status(403).json({ message: "1 Une erreur est survenue !" })
                                    }
                                })
                                break
                            default:
                                return res.status(404).json({ message: "Une erreur est survenue dans le cas 0 du switch !" })
                        }
                    } else {
                        return res.status(403).json({ message: "2 Une erreur est survenue !" })
                    }
                })
                break;
            case 1:
                let removeUnlike = " \
                    DELETE FROM dislikes WHERE token_user = '" + token_user + "' AND post_id = '" + post_id + "'; \
                    UPDATE posts SET dislikes_number = dislikes_number -1 WHERE id = '" + post_id + "' \
                " ;
                sql.query(removeUnlike, function (err, result) {
                    if (result) {
                        return res.status(200).json({ message: "Le dislike a était retiré du post !" })
                    } else {
                        return res.status(403).json({ message: "Une erreur est survenue !" })
                    }
                })
                break;
            default:
                return res.status(404).json({ message: "Une erreur est survenue !" })
        }
    })
};