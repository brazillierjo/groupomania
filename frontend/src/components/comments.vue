<template>
  <div class="container-comments">
    <div>
      <form class="textarea-container" v-on:submit.prevent="sendComment">
        <div class="user_id">Johan BRAZILLIER</div>
        <input v-model="content" placeholder="Écrivez un commentaire..." class="post-text-area" />
        <button class="send-comment">Publier</button>
      </form>
      <div class="display-comments">
        <div class="header-comments">
          <div class="user-id">NOM ET PRENOM</div>
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
  props: {
    first_name: String,
    last_name: String,
    post_create: String,
    post_id: Number,
  },
  data() {
    return {
      comments: [],
      content: "",
    };
  },
  methods: {
    sendComment() {
      this.$axios
        .post(
          `http://localhost:3000/api/posts/${token_user}/comments/`,
          {
            content: this.content,
          }
        )
        .then((response) => {
          this.posts = response.data.result;
          console.log(response);
        })
        .catch((error) => { error });
    },
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
  // beforeMount() {
  //   this.$axios
  //     .get(
  //       `http://localhost:3000/api/posts/${token_user}/comments${this.$props.props_post_id}`
  //     )
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
};
</script>

<style>
@import "../style.css";
</style>
