<template>
  <div>
    <headerPosts />
    <addPost />
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">{{ post.first_name + " " + post.last_name }}</div>
          <div class="time-post">{{ post.post_create }}</div>
        </div>
        <div>
          <img class="image-post" v-bind:src="post.imageUrl" title="post-img" />
        </div>
        <div class="post-content">
          <div>{{ post.content }}</div>
          <div @click="like(post.id)" class="like-comments">
            <button class="like">
              <i class="fas fa-thumbs-up"><span>{{ post.likes_number }}</span></i>
            </button>
            <button class="dislike">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <button @click="postDetails(post.id)" class="see-comments">
              <i class="fas fa-comments"></i>
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
import addPost from "@/components/addPost.vue";

export default {
  name: "posts",
  data: () => {
    return {
      posts: [],
      token_user: token_user,
    };
  },
  components: {
    headerPosts,
    addPost,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/`)
      .then((response) => {
        console.log(response)
        this.posts = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    like(id_post) {
      this.$axios
        .post(`http://localhost:3000/api/posts/${id_post}/like`, {
          token_user: this.token_user,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postDetails(id_post) {
      this.$router.push({
        path: `/postDetails/${id_post}`,
      });
    },
  },
};
</script>

<style>
@import "../style.css";
</style>
