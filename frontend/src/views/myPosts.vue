<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mes publications</h1>
    </div>
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">
            {{ post.first_name + " " + post.last_name }}
          </div>
          <div class="time-post">{{ post.post_create }}</div>
          <div class="time-post">{{ post.id }}</div>
        </div>
        <div>
          <img class="image-post" v-bind:src="post.imageUrl" title="post-img" />
        </div>
        <div class="post-content">
          <div>{{ post.content }}</div>
          <div class="like-comments">
            <button class="like">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button class="dislike">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <button @click="postDetails(post.id)" class="see-comments">
              <i class="fas fa-comments"></i>
            </button>
            <button @click="editPost(post.id)" class="see-comments">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deletePost(post.id)" class="see-comments">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");

import headerPosts from "@/components/headerPosts.vue";

export default {
  name: "postsID",
  props: {
    post_id: Number,
  },
  data: () => {
    return {
      posts: [],
    };
  },
  components: {
    headerPosts,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/profile/${token_user}`)
      .then((response) => {
        this.posts = response.data.result;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    postDetails(id_post) {
      this.$router.push({
        path: `/postDetails/${id_post}`,
      })
    },
    editPost(id_post) {
      this.$axios
        .put(`http://localhost:3000/api/posts/${token_user}/${id_post}`)
        .then((response) => {
          console.log(response);
          location.href = `/myposts/${token_user}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(id_post) {
      this.$axios
        .delete(`http://localhost:3000/api/posts/${token_user}/${id_post}`)
        .then((response) => {
          console.log(response);
          location.href = `/myposts/${token_user}`;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
@import "../style.css";
</style>
