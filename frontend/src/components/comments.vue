<template>
  <div class="container-comments">
    <div v-for="comment in comments" :key="comment.id" class="display-comments">
      <div class="header-comments">
        <div class="user-id">{{ comment.first_name }} {{ comment.last_name }}</div>
      </div>
      <p v-if="editComment" class="input">{{ comment.content }}</p>
      <p v-else class="comment-content" placeholder="Écrivez votre nouveau commentaire...">
        <input class="input" required v-model="content" />
      </p>

      <div v-show="showComment(comment)" class="button-comments">
        <button v-if="editComment" @click="editComment = false" class="update-comment">
          <i class="fas fa-pen"></i>
        </button>
        <button v-else @click="editComment = true" class="update-comment">
          <i class="fas fa-window-close"></i>
        </button>
        <button v-if="editComment" @click="deleteComment(comment.id)" class="delete-comment">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button v-else @click="editComment = true" class="update-comment">
          <i @click="updateComment(comment.id)" class="fas fa-save"></i>
        </button>
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
      editComment: true,
      token_user: sessionStorage.getItem("token_user"),
    };
  },
  computed: {},
  methods: {
    showComment: function (comment) {
      return this.token_user === comment.token_user;
    },
    shouldEditAndDelete(display) {
      this.editComment = display;
    },
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
          location.reload();
        })
        .catch((error) => {
          error;
        });
    },
    updateComment(id_com) {
      this.$axios
        .put(
          `http://localhost:3000/api/posts/${token_user}/comments/${id_com}`,
          {
            content: this.content,
          }
        )
        .then((response) => {
          console.log(response);
          location.reload();
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
    deleteComment(id_com) {
      this.$axios
        .delete(
          `http://localhost:3000/api/posts/${token_user}/comments/${id_com}`
        )
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Commentaire non supprimé";
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
