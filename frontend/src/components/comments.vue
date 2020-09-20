<template>
  <div class="container-comments">
    <div v-for="comment in comments" :key="comment.id" class="display-comments">
      <div class="header-comments">
        <div class="user-id">{{ comment.first_name }} {{ comment.last_name }}</div>
      </div>
      <p v-if="comment == commentToEdit" class="comment-content">
        <input class="input" required v-model="content" />
      </p>
      <p v-else class="input">{{ comment.content }}</p>

      <div v-show="showComment(comment)" class="button-comments">

        <button
          v-if="comment == commentToEdit"
          @click="editComment(null)"
          class="update-comment"
        >
          <i class="fas fa-window-close"></i>
        </button>
        <button 
        v-else 
        @click="editComment(comment)" 
        class="update-comment">
        <i class="fas fa-pen"></i>
        </button>

        <button
          v-if="comment == commentToEdit"
          @click="editComment(comment)"
          class="update-comment"
        >
          <i @click="updateComment(comment.id)" 
          class="fas fa-save"></i>
        </button>
        <button 
        v-else 
        @click="deleteComment(comment.id)" 
        class="delete-comment">
        <i class="fas fa-trash-alt"></i>
        </button>

      </div>
    </div>
    <div>
      <form class="textarea-container" v-on:submit.prevent="sendComment">
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
      commentToEdit: null,
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
    editComment(comment) {
      this.commentToEdit = comment;
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
