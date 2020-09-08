<template>
  <div class="container">
    <headerPosts />
    <div class="profile">
      <h1>Mes publications</h1>
    </div>
    <div v-for="post in posts" :key="post.id" class="post-comments">
      <div class="container-post">
        <div class="header-post">
          <div class="user-id">{{ post.first_name + ' ' + post.last_name }}</div>
          <div class="time-post">{{ post.post_create }}</div>
        </div>
        <div>
          <img class="image-post" src="..\assets\test-post.jpg" title="post-img" />
        </div>
        <div class="post-content">{{ post.content }}</div>
      </div>
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
      <comments v-if="showComments" />
    </div>
  </div>
</template>

<script>
const token_user = sessionStorage.getItem("token_user");
import headerPosts from "@/components/headerPosts.vue";
import comments from "@/components/comments.vue";

export default {
  name: "postsID",
  data: () => {
    return {
      showComments: false,
      posts: [],
    };
  },
  components: {
    headerPosts,
    comments,
  },
  beforeMount() {
    this.$axios
      .get(`http://localhost:3000/api/posts/${token_user}`)
      .then((response) => (this.posts = response.data.result))
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
* {
  font-family: "Open Sans Condensed", sans-serif;
}
</style>