<template>
  <div class="container-comments">
    <div class="payload">
      <form class="textarea-container" v-on:submit.prevent="sendComment">
        <div class="user_id">Johan BRAZILLIER</div>
        <input v-model="content" placeholder="Écrivez un commentaire..." class="post-text-area" />
        <button class="send-comment">Publier</button>
      </form>
      <div class="display-comments">
        <div class="header-comments">
          <div class="user-id">NOM ET PRENOM</div>
          <div class="time-comment">6 juin</div>
        </div>
        <div class="comment-content">Contenu du commentaire</div>
        <div class="button-comments">
          <button @click="updateComment" class="update-comment">Modifier</button>
          <button @click="deleteComment" class="delete-comment">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");
export default {
  name: "comments",
  data() {
    return {
      comments: [],
      content: "",
      post_id: "",
    };
  },
  methods: {
    sendComment() {
      this.$axios
        .post(`http://localhost:3000/api/posts/${token_user}/comments`, {
          content: this.content,
          post_id: this.comments.id,
        })
        .then((response) => {
          this.posts = response.data.result;
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Commentaire non publié";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur";
          }
        });
    },
    // displayComments() {
    //   this.$axios
    //     .get(`http://localhost:3000/api/posts/${token_user}/comments/${post_id}`)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 401) {
    //         this.message = "Commentaire non publié";
    //       }
    //       if (error.response.status === 500) {
    //         this.message = "Erreur serveur";
    //       }
    //     });
    // },
    updateComment() {
      this.$axios
        .put(`http://localhost:3000/api/posts/${token_user}/comments`, {
          content: this.content,
          post_id: this.comments.id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Commentaire non modifié";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur";
          }
        });
    },
    deleteComment() {
      this.$axios
        .delete(`http://localhost:3000/api/posts/${token_user}/comments`, {
          content: this.content,
          post_id: this.comments.id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Commentaire non modifié";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur";
          }
        });
    },
  },
};
</script>

<style>
.container-comments {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  background-color: white;
  width: 50%;
  border: 1px solid lightgrey;
  border-radius: 2px;
}

.user_id,
.time-comment, .button-comments {
  padding: 10px;
  width: 20%;
  text-align: center;
}

.time-comment {
  color: grey;
}

.textarea-container {
  display: flex;
  justify-content: space-between;
}

.post-text-area {
  padding: 2px;
  border-radius: 10px;
  width: 60%;
  height: 30px;
  margin-top: 5px;
}

.send-comment {
  background-color: #008cba;
  border: none;
  border-radius: 4px;
  color: white;
  margin: 5px;
  padding: 3px 8px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.display-comments {
  margin-top: 20px;
  display: flex;
  border: 1px solid lightgrey;
}

.comment-content {
  padding: 10px;
  width: 60%;
  text-align: left;
}

.update-comment, .delete-comment {
  background-color: white;
  width: 50px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

.update-comment:hover, .delete-comment:hover {
  background-color: lightgrey;
  cursor: pointer;
}
</style>