<template>
  <div class="container-comments">
    <div v-for="comment in comments" :key="comment.id" class="display-comments">
      <div class="header-comments">
        <div class="user-id">{{ first_name }} {{ last_name }}</div>
      </div>
      <div class="comment-content">{{ comment.content }}</div>
      <div class="button-comments">
        <button @click="updateComment" class="update-comment">Modifier</button>
        <button @click="deleteComment" class="delete-comment">Supprimer</button>
      </div>
    </div>
    <div>
      <form class="textarea-container" v-on:submit.prevent="sendComment">
        <div class="user_id">{{ first_name }} {{ last_name }}</div>
        <input v-model="content" placeholder="Écrivez un commentaire..." class="post-text-area" />
        <button class="send-comment">Publier</button>
      </form>
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");

export default {
  name: "comments",
  props: {
    post_id: Number,
    first_name: String,
    last_name: String,
  },
  data() {
    return {
      comments: [],
      content: "",
      posts: [],
    };
  },
  methods: {
    sendComment() {
      this.$axios
        .post(
          `http://localhost:3000/api/posts/${token_user}/comments/${this.$props.post_id}`,
          {
            content: this.content,
          }
        )
        .then((response) => {
          this.posts = response.data.result;
          console.log(response);
        })
        .catch((error) => {
          error;
        });
    },
    updateComment() {
      this.$axios
        .put(
          `http://localhost:3000/api/posts/${token_user}/comments/${this.$props.post_id}`,
          {
            content: this.content,
          }
        )
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
        .delete(
          `http://localhost:3000/api/posts/${token_user}/comments/${this.$props.post_id}`,
          {
            content: this.content,
            post_id: this.comments.id,
          }
        )
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
  beforeMount() {
    this.$axios
      .get(
        `http://localhost:3000/api/posts/${token_user}/comments/${this.$props.post_id}`
      )
      .then((response) => {
        this.comments = response.data.result;
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
};
</script>

<style>
@import "../style.css";
</style>
