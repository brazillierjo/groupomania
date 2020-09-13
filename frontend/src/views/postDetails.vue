<template>
  <div>
    <headerPosts />
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">
            {{ post.first_name + " " + post.last_name }}
          </div>
          <div class="time-post">{{ post.post_create }}</div>
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
            <button @click="showComments = !showComments" class="see-comments">
              <i class="fas fa-comments"></i>
            </button>
          </div>
        </div>
      </div>
      <comments />
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");

import headerPosts from "@/components/headerPosts.vue";
import comments from "@/components/comments.vue";

export default {
    name: "postDetails",
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
    comments,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/${token_user}/${this.$props.post_id}`)
      .then((response) => {
        this.posts = response.data.result;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}
</script>

<style>
@import '../style.css';
</style>